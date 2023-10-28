// icon:arrow-down-up | Lucide https://lucide.dev/ | Lucide
import * as React from 'react';

function IconArrowDownUp(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M3 16l4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16" />
        </svg>
    );
}

export default IconArrowDownUp;
