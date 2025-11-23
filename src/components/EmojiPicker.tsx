import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

interface EmojiPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (emoji: string) => void;
}

const emojiCategories: Record<string, string[]> = {
    'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎'],
    'Gestures': ['👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌', '🤌', '🤏', '👈', '👉', '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐'],
    'People': ['👶', '👧', '👦', '👨', '👩', '🧑', '👴', '👵', '🧓', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨'],
    'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄'],
    'Food': ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🥒', '🥬', '🥦', '🍞', '🥐', '🥖'],
    'Activities': ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🎽', '🛹', '🛼', '🎿', '⛷️'],
    'Objects': ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏰', '⌛'],
    'Symbols': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '⭐', '🌟', '✨', '💫', '💥', '💢', '💦', '💨', '🔥']
};

export function EmojiPicker({ isOpen, onClose, onSelect }: EmojiPickerProps) {
    const [search, setSearch] = useState('');

    const filteredCategories = useMemo(() => {
        try {
            if (!search) return Object.entries(emojiCategories);
            const lowerSearch = search.toLowerCase();
            return Object.entries(emojiCategories).filter(([category]) =>
                category.toLowerCase().includes(lowerSearch)
            );
        } catch (e) {
            console.error("Error filtering emojis:", e);
            return [];
        }
    }, [search]);

    if (!isOpen) return null;

    const handleEmojiClick = (emoji: string) => {
        onSelect(emoji);
        onClose();
        setSearch('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-bg border border-border rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-border flex items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fg/50" size={18} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-surface pl-10 pr-4 py-2 rounded-lg border border-border focus:border-primary outline-none text-fg placeholder:text-fg/50"
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-fg/70 hover:text-fg transition-colors p-2 rounded-lg hover:bg-surface"
                    >
                        ✕
                    </button>
                </div>

                <div className="overflow-y-auto p-4 space-y-4">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map(([category, emojis]) => (
                            <div key={category}>
                                <h3 className="text-sm font-semibold text-fg/70 mb-2">{category}</h3>
                                <div className="grid grid-cols-8 gap-2">
                                    {Array.isArray(emojis) && emojis.map((emoji, index) => (
                                        <button
                                            key={`${emoji}-${index}`}
                                            onClick={() => handleEmojiClick(emoji)}
                                            className="text-2xl hover:bg-surface-highlight rounded-lg p-2 transition-all hover:scale-110 active:scale-95"
                                            title={emoji}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-fg/50 py-8">
                            No categories found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
