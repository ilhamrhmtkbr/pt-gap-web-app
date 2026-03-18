export default function FormWrapper({ name = 'Add', children }) {
    return (
        <div className="max-w-lg box-border border-style-default shadow-md p-[var(--xx)] rounded-[var(--m)] grid auto-rows-max gap-[var(--m)] w-full min-w-[77dvw]">
            <div className="mb-2">
                <h3 className="font-['Bold',_ui-sans-serif] text-lg">{name} Form</h3>
            </div>
            {children}
        </div>
    )
}
