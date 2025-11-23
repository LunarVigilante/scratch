import {
    Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, Heading4,
    List, ListOrdered, CheckSquare, Link, Image, Table, Quote, Minus, Smile,
    Code, Terminal, FilePlus, FolderOpen, Save, HelpCircle, Settings,
    Undo, Redo, Download, Maximize, Minimize
} from 'lucide-react';

interface ToolbarProps {
    onFormat: (type: string) => void;
    onNew: () => void;
    onOpen: () => void;
    onSave: () => void;
    onSettings: () => void;
    onCheatSheet: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onExportHtml: () => void;
    onToggleFocus: () => void;
    isFocusMode: boolean;
    activeFormats: string[];
}

export function Toolbar({
    onFormat, onNew, onOpen, onSave, onSettings, onCheatSheet, onUndo, onRedo,
    onExportHtml, onToggleFocus, isFocusMode, activeFormats
}: ToolbarProps) {

    const IconButton = ({ onClick, icon: Icon, title, active = false }: { onClick: () => void, icon: any, title: string, active?: boolean }) => (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg transition-all hover:scale-105 active:scale-95 ${active
                ? 'bg-primary text-bg hover:bg-primary/90'
                : 'hover:bg-surface-highlight text-fg/70 hover:text-fg'
                }`}
            title={title}
        >
            <Icon size={18} />
        </button>
    );

    const Divider = () => <div className="w-px h-6 bg-border mx-2" />;

    return (
        <div className="h-14 border-b border-border flex items-center px-4 bg-editor-bg justify-between shrink-0 z-20 relative shadow-sm overflow-x-auto">
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-1 bg-surface p-1 rounded-xl border border-border shadow-sm">
                    <IconButton onClick={onNew} icon={FilePlus} title="New File" />
                    <IconButton onClick={onOpen} icon={FolderOpen} title="Open File" />
                    <IconButton onClick={onSave} icon={Save} title="Save File" />
                    <IconButton onClick={onExportHtml} icon={Download} title="Export HTML" />
                </div>

                <div className="h-8 w-px bg-border/50 mx-2" />

                <div className="flex items-center space-x-1 bg-surface p-1 rounded-xl border border-border shadow-sm">
                    <IconButton onClick={() => onFormat('h1')} icon={Heading1} title="Heading 1" active={activeFormats.includes('h1')} />
                    <IconButton onClick={() => onFormat('h2')} icon={Heading2} title="Heading 2" active={activeFormats.includes('h2')} />
                    <IconButton onClick={() => onFormat('h3')} icon={Heading3} title="Heading 3" active={activeFormats.includes('h3')} />
                    <IconButton onClick={() => onFormat('h4')} icon={Heading4} title="Heading 4" active={activeFormats.includes('h4')} />
                    <IconButton onClick={() => onFormat('bold')} icon={Bold} title="Bold" active={activeFormats.includes('bold')} />
                    <IconButton onClick={() => onFormat('italic')} icon={Italic} title="Italic" active={activeFormats.includes('italic')} />
                    <IconButton onClick={() => onFormat('strikethrough')} icon={Strikethrough} title="Strikethrough" active={activeFormats.includes('strikethrough')} />
                </div>

                <div className="flex items-center space-x-1 bg-surface p-1 rounded-xl border border-border shadow-sm">
                    <IconButton onClick={() => onFormat('link')} icon={Link} title="Link" />
                    <IconButton onClick={() => onFormat('image')} icon={Image} title="Image" />
                    <IconButton onClick={() => onFormat('emoji')} icon={Smile} title="Emoji" />
                    <IconButton onClick={() => onFormat('inline-code')} icon={Terminal} title="Inline Code" />
                    <IconButton onClick={() => onFormat('code')} icon={Code} title="Code Block" />
                </div>

                <div className="flex items-center space-x-1 bg-surface p-1 rounded-xl border border-border shadow-sm">
                    <IconButton onClick={() => onFormat('quote')} icon={Quote} title="Quote" />
                    <IconButton onClick={() => onFormat('hr')} icon={Minus} title="Horizontal Rule" />
                    <IconButton onClick={() => onFormat('list')} icon={List} title="Unordered List" />
                    <IconButton onClick={() => onFormat('ordered-list')} icon={ListOrdered} title="Ordered List" />
                    <IconButton onClick={() => onFormat('checklist')} icon={CheckSquare} title="Checklist" />
                    <IconButton onClick={() => onFormat('table')} icon={Table} title="Table" />
                </div>

                <div className="flex items-center space-x-1 bg-surface p-1 rounded-xl border border-border shadow-sm">
                    <IconButton onClick={onUndo} icon={Undo} title="Undo" />
                    <IconButton onClick={onRedo} icon={Redo} title="Redo" />
                </div>
            </div>

            <div className="flex items-center space-x-1 bg-surface p-1 rounded-xl border border-border shadow-sm ml-4">
                <IconButton
                    onClick={onToggleFocus}
                    icon={isFocusMode ? Minimize : Maximize}
                    title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
                    active={isFocusMode}
                />
                <Divider />
                <IconButton onClick={onCheatSheet} icon={HelpCircle} title="Cheat Sheet" />
                <IconButton onClick={onSettings} icon={Settings} title="Settings" />
            </div>
        </div>
    );
}
