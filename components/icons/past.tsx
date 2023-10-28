// icon:clipboard-paste | Lucide https://lucide.dev/ | Lucide
import * as React from 'react';

function IconClipboardPaste(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M15 2H9a1 1 0 00-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1z" />
            <path d="M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2M16 4h2a2 2 0 012 2v2m-9 6h10" />
            <path d="M17 10l4 4-4 4" />
        </svg>
    );
}

export default IconClipboardPaste;
