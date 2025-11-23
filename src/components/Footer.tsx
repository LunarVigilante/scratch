import { Move, Type, AlignJustify, List } from 'lucide-react';

interface FooterProps {
    line: number;
    column: number;
    wordCount: number;
    charCount: number;
    selectionCount: number;
    totalLines: number;
    lastSaved: Date | null;
    themeName: string;
}

export function Footer({ line, column, wordCount, charCount, selectionCount, totalLines, lastSaved, themeName }: FooterProps) {
    return (
        <div className="h-8 bg-surface border-t border-border flex items-center justify-between px-4 text-xs text-fg/60 shrink-0 select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2" title="Cursor Position">
                    <Move size={12} />
                    <span>Ln {line}, Col {column}</span>
                </div>
                {selectionCount > 0 && (
                    <div className="flex items-center gap-2 text-primary">
                        <AlignJustify size={12} />
                        <span>{selectionCount} selected</span>
                    </div>
                )}
                <div className="w-px h-3 bg-border" />
                <div className="flex items-center gap-2">
                    <List size={12} />
                    <span>{totalLines} lines</span>
                </div>
            </div>

            <div className="font-medium text-fg/80">
                {themeName}
            </div>

            <div className="flex items-center gap-4">
                {lastSaved && (
                    <>
                        <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                        <div className="w-px h-3 bg-border" />
                    </>
                )}
                <div className="flex items-center gap-2">
                    <Type size={12} />
                    <span>{wordCount} words</span>
                    <span>{charCount} chars</span>
                </div>
            </div>
        </div>
    );
}
