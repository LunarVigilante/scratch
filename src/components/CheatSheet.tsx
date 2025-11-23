import { X } from 'lucide-react';

interface CheatSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CheatSheet({ isOpen, onClose }: CheatSheetProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-bg border border-border rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col text-fg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-border flex items-center justify-between bg-surface">
                    <h2 className="text-xl font-bold">Markdown Cheat Sheet</h2>
                    <button
                        onClick={onClose}
                        className="text-fg/60 hover:text-fg transition-colors p-1 rounded-full hover:bg-surface-highlight"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-6 bg-bg">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold mb-2 text-lg text-primary">Basic Formatting</h3>
                            <ul className="space-y-2 text-sm">
                                <li><code className="bg-surface px-1 rounded">**Bold**</code> → <strong>Bold</strong></li>
                                <li><code className="bg-surface px-1 rounded">*Italic*</code> → <em>Italic</em></li>
                                <li><code className="bg-surface px-1 rounded"># Heading 1</code> → H1</li>
                                <li><code className="bg-surface px-1 rounded">## Heading 2</code> → H2</li>
                                <li><code className="bg-surface px-1 rounded">- List item</code> → Bullet</li>
                                <li><code className="bg-surface px-1 rounded">1. List item</code> → Numbered</li>
                                <li><code className="bg-surface px-1 rounded">[Link](url)</code> → <span className="text-primary underline">Link</span></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-2 text-lg text-primary">Code & Math</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex flex-col gap-1">
                                    <code className="bg-surface p-1.5 rounded border border-border font-mono text-xs">`Inline Code`</code>
                                    <div className="text-xs opacity-70">→ <code className="bg-surface-highlight px-1 rounded">Inline Code</code></div>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <code className="bg-surface p-1.5 rounded border border-border font-mono text-xs block whitespace-pre">```python{'\n'}print("Hi"){'\n'}```</code>
                                    <div className="text-xs opacity-70">→ Code Block</div>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <code className="bg-surface p-1.5 rounded border border-border font-mono text-xs">$E=mc^2$</code>
                                    <div className="text-xs opacity-70">→ Inline Math</div>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <code className="bg-surface p-1.5 rounded border border-border font-mono text-xs block whitespace-pre">$$ {'\n'}{`\\sum_{i=0}^n i^2`}{'\n'} $$</code>
                                    <div className="text-xs opacity-70">→ Block Math</div>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 mt-4 border-t border-border pt-4">
                            <h3 className="font-bold mb-2 text-lg text-primary">Keyboard Shortcuts</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <ul className="space-y-2">
                                    <li><kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Ctrl</kbd> + <kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">S</kbd> → Save</li>
                                    <li><kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Ctrl</kbd> + <kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">O</kbd> → Open</li>
                                    <li><kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Ctrl</kbd> + <kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Z</kbd> → Undo</li>
                                </ul>
                                <ul className="space-y-2">
                                    <li><kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Ctrl</kbd> + <kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">B</kbd> → Bold</li>
                                    <li><kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Ctrl</kbd> + <kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">I</kbd> → Italic</li>
                                    <li><kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Ctrl</kbd> + <kbd className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-border">Y</kbd> → Redo</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
