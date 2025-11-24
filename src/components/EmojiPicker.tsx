import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { emojiCategories, type Emoji } from '../data/emojis';
import twemoji from 'twemoji';

interface EmojiPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (emoji: string) => void;
}

export function EmojiPicker({ isOpen, onClose, onSelect }: EmojiPickerProps) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('Smileys & Emotion');

    const filteredCategories = useMemo(() => {
        try {
            if (!search) return Object.entries(emojiCategories);

            const lowerSearch = search.toLowerCase();
            const allEmojis = Object.values(emojiCategories).flat();

            const matchingEmojis = allEmojis.filter(emoji =>
                emoji.name.toLowerCase().includes(lowerSearch) ||
                emoji.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearch))
            );

            if (matchingEmojis.length === 0) return [];

            return [['Search Results', matchingEmojis]] as [string, Emoji[]][];
        } catch (e) {
            console.error("Error filtering emojis:", e);
            return [];
        }
    }, [search]);

    // Memoize rendered emojis to avoid re-parsing Twemoji on every render
    const renderedEmojis = useMemo(() => {
        const cache = new Map<string, string>();

        return (char: string) => {
            if (cache.has(char)) return cache.get(char)!;

            const html = twemoji.parse(char, {
                folder: 'svg',
                ext: '.svg'
            });
            cache.set(char, html);
            return html;
        };
    }, []);

    const scrollToCategory = (category: string) => {
        setActiveCategory(category);
        const element = document.getElementById(`emoji-category-${category}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                <div className="p-4 border-b border-border flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fg/50" size={18} />
                            <input
                                type="text"
                                placeholder="Search emojis..."
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

                    {/* Category Navigation */}
                    {!search && (
                        <div className="grid grid-cols-5 gap-2 pb-2">
                            {Object.entries(emojiCategories).map(([category, emojis]) => (
                                <button
                                    key={category}
                                    onClick={() => scrollToCategory(category)}
                                    className={`px-2 py-1.5 rounded-lg transition-colors text-xs font-medium hover:bg-surface-highlight truncate ${activeCategory === category ? 'bg-primary/10 text-primary ring-1 ring-primary/20' : 'text-fg/70'
                                        }`}
                                    title={category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="overflow-y-auto p-4 space-y-4">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map(([category, emojis]) => (
                            <div key={category} id={`emoji-category-${category}`}>
                                <h3 className="text-sm font-semibold text-fg/70 mb-2 sticky top-0 bg-bg/95 backdrop-blur py-1 z-10">{category}</h3>
                                <div className="grid grid-cols-8 gap-2">
                                    {Array.isArray(emojis) && emojis.map((emoji, index) => (
                                        <button
                                            key={`${emoji.char}-${index}`}
                                            onClick={() => handleEmojiClick(emoji.char)}
                                            className="text-2xl hover:bg-surface-highlight rounded-lg p-2 transition-all hover:scale-110 active:scale-95 flex items-center justify-center w-10 h-10"
                                            title={emoji.name}
                                            dangerouslySetInnerHTML={{
                                                __html: renderedEmojis(emoji.char)
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-fg/50 py-8">
                            No emojis found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
