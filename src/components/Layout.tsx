import { useState, useEffect, useRef, type ReactNode } from 'react';

interface LayoutProps {
    editor: ReactNode;
    preview: ReactNode;
    isFocusMode: boolean;
}

export function Layout({ editor, preview, isFocusMode }: LayoutProps) {
    const [editorWidth, setEditorWidth] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = () => {
        setIsDragging(true);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

            // Clamp between 20% and 80%
            const clampedWidth = Math.min(Math.max(newWidth, 20), 80);
            setEditorWidth(clampedWidth);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    if (isFocusMode) {
        return (
            <div className="h-full w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-border shadow-sm bg-bg">
                {editor}
            </div>
        );
    }

    return (
        <div ref={containerRef} className="flex h-full w-full overflow-hidden gap-2">
            <div style={{ width: `${editorWidth}%` }} className="h-full overflow-hidden rounded-xl border border-border shadow-sm bg-bg">
                {editor}
            </div>

            <div
                className="w-1 hover:bg-primary/50 cursor-col-resize flex items-center justify-center transition-colors z-10 rounded-full"
                onMouseDown={handleMouseDown}
            >
                <div className="h-8 w-1 bg-border rounded-full" />
            </div>

            <div style={{ width: `${100 - editorWidth}%` }} className="h-full overflow-hidden rounded-xl border border-border shadow-sm bg-bg">
                {preview}
            </div>
        </div>
    );
}
