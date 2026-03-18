export default function Stepper({ items = ['Flow 1', 'Flow 2', 'Flow 3'] }) {
    if (!items.length) return null

    return (
        <div className="flex items-center justify-start gap-x-[var(--m)] overflow-x-auto pb-[var(--xxs)] [&::-webkit-scrollbar]:h-[7px]">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-x-[var(--xxs)]">
                    <div className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[var(--link-color)] font-['Medium',_ui-sans-serif] text-[length:var(--s)] transition-colors hover:bg-[var(--primary-color)] hover:text-white [&.active]:bg-[var(--primary-color)] [&.active]:text-white active">
                        {index + 1}
                    </div>
                    <div className="whitespace-nowrap font-['Medium',_ui-sans-serif]">{item}</div>
                    {index + 1 !== items.length && (
                        <div className="h-[1px] min-w-[111px] bg-[var(--primary-color)]" />
                    )}
                </div>
            ))}
        </div>
    )
}
