import { forwardRef } from 'react';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    onCursorChange?: (line: number, col: number, selectionCount: number) => void;
    onScroll?: (e: React.UIEvent<HTMLTextAreaElement>) => void;
}

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(({ value, onChange, onCursorChange, onScroll }, ref) => {

    const handleCursor = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        if (!onCursorChange) return;

        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd, value } = textarea;

        const textBeforeCursor = value.substring(0, selectionStart);
        const lines = textBeforeCursor.split('\n');
        const line = lines.length;
        const col = lines[lines.length - 1].length + 1;
        const selectionCount = selectionEnd - selectionStart;

        onCursorChange(line, col, selectionCount);
    };

    return (
        <textarea
            ref={ref}
            onScroll={onScroll}
            className="w-full h-full p-6 resize-none outline-none bg-editor-bg text-fg font-mono text-sm leading-relaxed selection:bg-primary/30"
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
                handleCursor(e);
            }}
            onKeyUp={handleCursor}
            onMouseUp={handleCursor}
            onClick={handleCursor}
            placeholder="Type your markdown here..."
            spellCheck={false}
        />
    );
});

Editor.displayName = 'Editor';
