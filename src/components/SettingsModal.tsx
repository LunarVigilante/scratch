import { X, Check } from 'lucide-react';
import { themes, type ThemeId } from '../themes';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTheme: ThemeId;
    onThemeChange: (theme: ThemeId) => void;
}

export function SettingsModal({ isOpen, onClose, currentTheme, onThemeChange }: SettingsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-bg text-fg border border-border rounded-xl shadow-2xl w-full max-w-5xl mx-4 max-h-[80vh] overflow-hidden transform transition-all flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-border bg-surface shrink-0">
                    <h2 className="text-xl font-bold">Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-fg/60 hover:text-fg transition-colors p-1 rounded-full hover:bg-surface-highlight"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-fg/60 mb-4">Theme</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {Object.entries(themes).map(([id, theme]) => (
                            <button
                                key={id}
                                onClick={() => onThemeChange(id)}
                                className={`
                  relative flex items-center p-3 rounded-lg border transition-all
                  ${currentTheme === id
                                        ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                        : 'border-border hover:border-primary/50 hover:bg-surface-highlight'
                                    }
                `}
                            >
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <div
                                        className="w-6 h-6 rounded-full border border-white/10 shadow-sm shrink-0"
                                        style={{ backgroundColor: theme.bg }}
                                    />
                                    <span className="font-medium text-sm text-left truncate">{theme.name}</span>
                                </div>
                                {currentTheme === id && (
                                    <div className="absolute right-3 text-primary">
                                        <Check size={16} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
