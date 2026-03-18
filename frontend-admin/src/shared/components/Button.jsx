import { useMemo } from 'react'

export default function Button({
    variety = 'submit',
    type = 'primary',
    text = 'Submit',
    isLoading = false,
    shape = 'shape-1',
    onClick
}) {
    const dynamicStyle = useMemo(() => ({
        '--current-color': `var(--${type}-color)`,
        '--trans-color': `var(--trans${type}-color)`
    }), [type])

    const baseClass = 'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer outline-none flex items-center justify-center gap-x-4 py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] w-max rounded-[var(--radius-s)] font-[\'Medium\',_ui-sans-serif] text-[length:var(--s)]'

    const spinner = (colorClass = 'text-[var(--current-color)]') => (
        isLoading && (
            <svg className={`animate-spin h-5 w-5 ${colorClass}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        )
    )

    if (shape === 'shape-1') return (
        <button
            type={variety}
            style={dynamicStyle}
            disabled={isLoading}
            onClick={onClick}
            className={`${baseClass} border border-solid border-[var(--border-color)] text-[var(--current-color)] hover:outline-4 hover:outline-solid hover:outline-[var(--trans-color)] hover:border-[1px] hover:border-solid hover:border-[var(--current-color)]`}
        >
            <span>{text}</span>
            {spinner()}
        </button>
    )

    if (shape === 'shape-2') return (
        <button
            type={variety}
            style={dynamicStyle}
            disabled={isLoading}
            onClick={onClick}
            className={`${baseClass} border-none text-white bg-[var(--current-color)] hover:outline-5 hover:outline-solid hover:outline-[var(--trans-color)]`}
        >
            <span>{text}</span>
            {spinner('text-white')}
        </button>
    )

    if (shape === 'shape-3') return (
        <button
            type={variety}
            style={dynamicStyle}
            disabled={isLoading}
            onClick={onClick}
            className={`${baseClass} border-none text-[var(--current-color)] bg-[var(--trans-color)] hover:bg-[var(--current-color)] hover:text-white`}
        >
            <span>{text}</span>
            {spinner()}
        </button>
    )

    if (shape === 'shape-4') return (
        <button
            type={variety}
            style={dynamicStyle}
            disabled={isLoading}
            onClick={onClick}
            className={`${baseClass} border-none text-white bg-[var(--current-color)] rounded-full hover:outline-5 hover:outline-solid hover:outline-[var(--trans-color)]`}
        >
            <span>{text}</span>
            {spinner('text-white')}
        </button>
    )

    return null
}
