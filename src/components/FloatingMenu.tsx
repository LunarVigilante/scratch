import { Bold, Italic, Link, Heading1, Heading2 } from 'lucide-react';

interface FloatingMenuProps {
    position: { x: number; y: number } | null;
    onFormat: (type: string) => void;
    visible: boolean;
}

export function FloatingMenu({ position, onFormat, visible }: FloatingMenuProps) {
    if (!visible || !position) return null;

    const IconButton = ({ onClick, icon: Icon, title }: { onClick: () => void, icon: any, title: string }) => (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
            className="p-2 hover:bg-surface-highlight text-fg/70 hover:text-fg transition-colors first:rounded-l-lg last:rounded-r-lg"
            title={title}
        >
            <Icon size={16} />
        </button>
    );

    return (
        <div
            className="fixed z-50 flex items-center bg-surface border border-border rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-200"
            style={{
                left: position.x,
                top: position.y - 50, // Position above selection
                transform: 'translateX(-50%)'
            }}
            onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
        >
            <IconButton onClick={() => onFormat('bold')} icon={Bold} title="Bold" />
            <IconButton onClick={() => onFormat('italic')} icon={Italic} title="Italic" />
            <div className="w-px h-4 bg-border mx-1" />
            <IconButton onClick={() => onFormat('h1')} icon={Heading1} title="Heading 1" />
            <IconButton onClick={() => onFormat('h2')} icon={Heading2} title="Heading 2" />
            <div className="w-px h-4 bg-border mx-1" />
            <IconButton onClick={() => onFormat('link')} icon={Link} title="Link" />
        </div>
    );
}
