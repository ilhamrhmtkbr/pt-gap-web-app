export default function Badge({
    type = 'primary',
    text,
    size = 'no-close-small',
    onClose
}) {
    const determineBg = () => ({
        backgroundColor: `var(--trans${type}-color)`,
        color: `var(--${type}-color)`,
    })

    return (
        <div
            style={determineBg()}
            className={`flex break-all rounded-full box-border w-max max-w-[75dvw] h-max border-[1.5px] justify-between items-center gap-[var(--m)] ${
                size === 'no-close-small' ? 'p-[2px_15px]' : 'p-[5px_13px]'
            }`}
        >
            <p className={`${size.includes('small') ? 'text-[length:11px]' : 'text-[length:var(--s)]'} font-['Medium',_sans_serif]`}>
                {text}
            </p>
            {size === 'with-close' && (
                <div
                    onClick={onClose}
                    className="w-[20px] h-[20px] flex items-center justify-center font-bold cursor-pointer text-[var(--danger-color)] bg-white rounded-full border-[var(--danger-color)] border hover:bg-[var(--danger-color)] hover:text-white"
                >
                    &times;
                </div>
            )}
        </div>
    )
}

/*
Cara pake:
<Badge type="primary" text="Active" size="no-close-small" />
<Badge type="danger" text="Error" size="with-close" onClose={() => console.log('closed')} />
*/
