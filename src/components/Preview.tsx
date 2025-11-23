import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { FileText } from 'lucide-react';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

interface PreviewProps {
    content: string;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
    themeType: 'dark' | 'light';
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ content, onScroll, themeType }, ref) => {
    if (!content.trim()) {
        return (
            <div
                ref={ref}
                className="h-full w-full flex flex-col items-center justify-center text-fg/30 select-none"
            >
                <FileText size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">Nothing to preview...</p>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={`h-full w-full overflow-auto p-8 prose max-w-none ${themeType === 'dark' ? 'prose-invert prose-code:bg-white/10' : 'prose-code:bg-black/5'} prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit`}
            onScroll={onScroll}
            style={themeType === 'dark' ? {
                '--tw-prose-body': 'rgba(255, 255, 255, 0.8)',
                '--tw-prose-headings': 'rgba(255, 255, 255, 0.9)',
                '--tw-prose-bold': 'rgba(255, 255, 255, 0.9)',
                '--tw-prose-links': 'var(--primary-color)',
                '--tw-prose-code': 'rgba(255, 255, 255, 0.9)',
            } as React.CSSProperties : undefined}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
});

Preview.displayName = 'Preview';
