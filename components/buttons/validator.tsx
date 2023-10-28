interface ValidatorProps {
    label: String;
    onClick: () => {};
}

export default function Validator({label, onClick}: ValidatorProps) {
    return (
        <button
            className="bg-[url('/button_marvel_snap_validate.png')] bg-no-repeat bg-contain whitespace-nowrap w-36 h-12 capitalize font-bold"
            onClick={onClick}
        >
            {label}
        </button>
    );
}
