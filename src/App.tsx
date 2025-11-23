import { useState, useEffect, useRef } from 'react';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Footer } from './components/Footer';
import { Layout } from './components/Layout';
import { CheatSheet } from './components/CheatSheet';
import { SettingsModal } from './components/SettingsModal';
import { EmojiPicker } from './components/EmojiPicker';
import { FloatingMenu } from './components/FloatingMenu';
import { themes, defaultTheme, type ThemeId } from './themes';
import { defaultContent } from './defaultContent';

function App() {
  const [markdown, setMarkdown] = useState(() => {
    return localStorage.getItem('markdown-content') || defaultContent;
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorStats, setCursorStats] = useState({ line: 1, col: 1, selectionCount: 0 });
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    return (localStorage.getItem('theme') as ThemeId) || defaultTheme;
  });

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const [floatingMenuPosition, setFloatingMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isFocusMode || !editorRef.current) return;

    const textarea = editorRef.current;
    if (textarea.selectionStart !== textarea.selectionEnd) {
      setFloatingMenuPosition({ x: e.clientX, y: e.clientY });
    } else {
      setFloatingMenuPosition(null);
    }
  };

  // Theme Effect
  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[currentTheme] || themes[defaultTheme];

    root.style.setProperty('--bg-color', theme.bg);
    root.style.setProperty('--fg-color', theme.fg);
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--border-color', theme.border);
    root.style.setProperty('--surface-color', theme.surface);
    root.style.setProperty('--surface-highlight', theme.surfaceHighlight);
    root.style.setProperty('--editor-bg', theme.editorBg);

    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // Auto-Save & Default Content Effect
  useEffect(() => {
    const saved = localStorage.getItem('markdown-content');
    const initialContent = saved || DEFAULT_CONTENT;
    setMarkdown(initialContent);
    setHistory([initialContent]);
    setHistoryIndex(0);
  }, []);

  useEffect(() => {
    localStorage.setItem('markdown-content', markdown);
  }, [markdown]);

  const handleNew = () => {
    if (window.confirm('Are you sure you want to clear the editor? Unsaved changes will be lost.')) {
      setMarkdown('');
    }
  };

  const handleOpen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setMarkdown(content);
          setFileName(file.name.replace(/\.[^/.]+$/, "")); // Set filename from opened file
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const [fileName, setFileName] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // History management
  const addToHistory = (newContent: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setMarkdown(newIndex === -1 ? '' : history[newIndex]);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'o':
            e.preventDefault();
            handleOpen();
            break;
          case 'b':
            e.preventDefault();
            handleFormat('bold');
            break;
          case 'i':
            e.preventDefault();
            handleFormat('italic');
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [markdown, historyIndex, history]); // Dependencies for undo/redo/save

  // Initialize history
  useEffect(() => {
    if (history.length === 0 && markdown) {
      setHistory([markdown]);
      setHistoryIndex(0);
    }
  }, []);

  const updateMarkdown = (newMarkdown: string) => {
    setMarkdown(newMarkdown);
    addToHistory(newMarkdown);
  };

  const handleFormat = (type: string) => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    let newText = text;

    switch (type) {
      case 'bold':
        newText = `${before}**${selection || 'Bold'}**${after}`;
        break;
      case 'italic':
        newText = `${before}*${selection || 'Italic'}*${after}`;
        break;
      case 'strikethrough':
        newText = `${before}~~${selection || 'Strikethrough'}~~${after}`;
        break;
      case 'h1':
        newText = `${before}# ${selection || 'Heading 1'}${after}`;
        break;
      case 'h2':
        newText = `${before}## ${selection || 'Heading 2'}${after}`;
        break;
      case 'h3':
        newText = `${before}### ${selection || 'Heading 3'}${after}`;
        break;
      case 'h4':
        newText = `${before}#### ${selection || 'Heading 4'}${after}`;
        break;
      case 'list':
        newText = `${before}- ${selection || 'List item'}${after}`;
        break;
      case 'ordered-list':
        newText = `${before}1. ${selection || 'List item'}${after}`;
        break;
      case 'checklist':
        newText = `${before}- [ ] ${selection || 'Task'}${after}`;
        break;
      case 'link':
        newText = `${before}[${selection || 'Link text'}](url)${after}`;
        break;
      case 'image':
        newText = `${before}![${selection || 'Alt text'}](url)${after}`;
        break;
      case 'quote':
        newText = `${before}> ${selection || 'Quote'}${after}`;
        break;
      case 'hr':
        newText = `${before}\n---\n${after}`;
        break;
      case 'table':
        newText = `${before}| Header 1 | Header 2 |\n| :--- | :--- |\n| Cell 1 | Cell 2 |${after}`;
        break;
      case 'code':
        newText = `${before}\`\`\`\n${selection || 'Code'}\n\`\`\`${after}`;
        break;
      case 'inline-code':
        newText = `${before}\`${selection || 'code'}\`${after}`;
        break;
      case 'math':
        newText = `${before}$${selection || 'E=mc^2'}$${after}`;
        break;
      case 'emoji':
        setShowEmojiPicker(true);
        return; // Don't update markdown, wait for emoji selection
    }

    updateMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = `${before}${emoji}${after}`;
    updateMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const handleSave = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(fileName || 'Untitled').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setLastSaved(new Date());
  };

  const handleExportHtml = () => {
    if (!previewRef.current) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName || 'Untitled'}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background-color: #0d1117;
            color: #c9d1d9;
        }
        img { max-width: 100%; border-radius: 8px; }
        pre { background-color: #161b22; padding: 1rem; border-radius: 6px; overflow-x: auto; }
        code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; }
        blockquote { border-left: 4px solid #30363d; padding-left: 1rem; color: #8b949e; }
        table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        th, td { border: 1px solid #30363d; padding: 0.5rem; }
        th { background-color: #161b22; }
        a { color: #58a6ff; text-decoration: none; }
        a:hover { text-decoration: underline; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.5rem; margin-bottom: 1rem; color: #e6edf3; }
        hr { border: 0; border-top: 1px solid #30363d; margin: 2rem 0; }
    </style>
</head>
<body>
    ${previewRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(fileName || 'Untitled').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setLastSaved(new Date());
  };

  // Scroll Sync
  const handleScroll = (source: 'editor' | 'preview', e: React.UIEvent<HTMLElement>) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    const target = source === 'editor' ? previewRef.current : editorRef.current;
    const src = e.currentTarget;

    if (target) {
      const percentage = src.scrollTop / (src.scrollHeight - src.clientHeight);
      target.scrollTop = percentage * (target.scrollHeight - target.clientHeight);
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, 50);
  };

  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  const checkActiveFormats = (text: string, start: number, end: number) => {
    const formats: string[] = [];

    // Find the current line boundaries
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = text.indexOf('\n', end);
    const currentLineEnd = lineEnd === -1 ? text.length : lineEnd;

    const currentLine = text.substring(lineStart, currentLineEnd);

    // Calculate cursor position relative to the line start
    const relStart = start - lineStart;

    // Check for headings (at start of line)
    if (currentLine.startsWith('# ')) formats.push('h1');
    else if (currentLine.startsWith('## ')) formats.push('h2');
    else if (currentLine.startsWith('### ')) formats.push('h3');
    else if (currentLine.startsWith('#### ')) formats.push('h4');

    // Helper to check if cursor is inside a pair of tokens
    const isInside = (token: string) => {
      const parts = currentLine.split(token);
      if (parts.length < 3) return false; // Need at least 2 tokens to have an "inside"

      let charCount = 0;

      for (let i = 0; i < parts.length - 1; i++) {
        charCount += parts[i].length;
        if (i > 0) charCount += token.length; // Add token length for subsequent parts

        // If we are at a token boundary, toggle state
        // But we need to check if the cursor is in this segment

        // Simpler approach: find all token indices
      }

      // Regex approach for the line
      // Find all matches of the token pair
      // This is tricky with nested markdown, but for basic bold/italic:

      // Let's iterate through the line and track token toggles
      let tokenState = false;
      let lastTokenIndex = -1;

      // We need to handle escaped characters in a real parser, but for now simple check
      let i = 0;
      while (i < currentLine.length) {
        if (currentLine.substr(i, token.length) === token) {
          if (tokenState) {
            // Closing token
            // Check if our relative cursor position is between lastTokenIndex and i + token.length
            // We consider "inside" if the selection overlaps with the styled range
            if (relStart >= lastTokenIndex && relStart <= i + token.length) {
              return true;
            }
          }
          tokenState = !tokenState;
          lastTokenIndex = i;
          i += token.length;
        } else {
          i++;
        }
      }
      return false;
    };

    if (isInside('**')) formats.push('bold');
    if (isInside('*') && !formats.includes('bold')) formats.push('italic'); // Simple check to avoid confusion with bold
    if (isInside('~~')) formats.push('strikethrough');
    if (isInside('`')) formats.push('inline-code');

    setActiveFormats(formats);
  };

  const handleCursorChange = (line: number, col: number, selectionCount: number) => {
    setCursorStats({ line, col, selectionCount });
    if (editorRef.current) {
      checkActiveFormats(editorRef.current.value, editorRef.current.selectionStart, editorRef.current.selectionEnd);
    }
  };

  const wordCount = markdown.trim().split(/\s+/).filter(w => w.length > 0).length;
  const charCount = markdown.length;
  const totalLines = markdown.split('\n').length;

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-surface-highlight to-bg text-fg transition-colors duration-300 overflow-hidden">

      {isFocusMode && (
        <FloatingMenu
          position={floatingMenuPosition}
          onFormat={handleFormat}
          visible={!!floatingMenuPosition}
        />
      )}

      {!isFocusMode && (
        <>
          <div className="px-4 pt-2 shrink-0 group relative w-fit mb-2">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="bg-transparent text-lg font-bold text-fg outline-none placeholder:text-fg/50 w-full min-w-[200px] transition-opacity"
              placeholder="Untitled Document"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-fg/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            </div>
          </div>
          <Toolbar
            onFormat={handleFormat}
            onNew={handleNew}
            onOpen={handleOpen}
            onSave={handleSave}
            onSettings={() => setShowSettings(true)}
            onCheatSheet={() => setShowCheatSheet(true)}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onExportHtml={handleExportHtml}
            onToggleFocus={() => setIsFocusMode(!isFocusMode)}
            isFocusMode={isFocusMode}
            activeFormats={activeFormats}
          />
        </>
      )}

      {isFocusMode && (
        <div className="absolute top-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsFocusMode(false)}
            className="bg-surface p-2 rounded-lg shadow-lg border border-border text-fg"
            title="Exit Focus Mode"
          >
            ✕
          </button>
        </div>
      )}

      <div className={`flex-1 overflow-hidden p-2 flex gap-2 ${isFocusMode ? 'max-w-4xl mx-auto w-full' : ''}`}>
        <Layout
          isFocusMode={isFocusMode}
          editor={
            <div className="h-full w-full" onMouseUp={handleMouseUp}>
              <Editor
                ref={editorRef}
                value={markdown}
                onChange={updateMarkdown}
                onCursorChange={handleCursorChange}
                onScroll={(e) => handleScroll('editor', e)}
              />
            </div>
          }
          preview={
            <Preview
              ref={previewRef}
              content={markdown}
              onScroll={(e) => handleScroll('preview', e)}
              themeType={themes[currentTheme]?.type || 'light'}
            />
          }
        />
      </div>

      {!isFocusMode && (
        <Footer
          line={cursorStats.line}
          column={cursorStats.col}
          wordCount={wordCount}
          charCount={charCount}
          selectionCount={cursorStats.selectionCount}
          totalLines={totalLines}
          lastSaved={lastSaved}
          themeName={themes[currentTheme]?.name || 'Unknown'}
        />
      )}

      <CheatSheet isOpen={showCheatSheet} onClose={() => setShowCheatSheet(false)} />
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
      <EmojiPicker
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelect={handleEmojiSelect}
      />
    </div>
  );
}

const DEFAULT_CONTENT = `# Welcome to Markdown Editor

This is a **live demo** of the new editor.

## Features
- [x] Real-time Preview
- [x] GitHub Flavored Markdown
- [x] Math Support ($E=mc^2$)
- [x] Syntax Highlighting

## Code Example
\`\`\`python
def hello():
    print("Hello World")
\`\`\`

## Math Example
Block math:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## Tables
| Feature | Status |
| :--- | :--- |
| Dark Mode | ✅ |
| Auto-save | ✅ |
| Export | ✅ |

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci
`;

export default App;
