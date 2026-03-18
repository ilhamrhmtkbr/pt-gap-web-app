const defaultItems = [
    { title: 'Project Started', description: 'The amazing UI showcase project began', time: '2 hours ago', active: true },
    { title: 'Components Added', description: 'All major UI components have been implemented', time: '1 hours ago', active: false },
    { title: 'Deploy to Production', description: 'Ready for launch', time: 'Upcoming', active: false },
]

export default function Timeline({ items = defaultItems }) {
    return (
        <div className="grid grid-cols-1 auto-rows-max">
            {items.map((item, key) => (
                <div key={key}>
                    <div className="flex items-start gap-x-[var(--xs)] mt-[var(--m)]">
                        <div className={`flex min-w-[41px] min-h-[41px] max-w-[41px] max-h-[41px] cursor-pointer items-center justify-center rounded-full bg-[var(--border-color)] font-['Medium',_ui-sans-serif] transition-colors hover:bg-[var(--primary-color)] hover:text-white ${item.active ? 'bg-[var(--primary-color)] text-white' : ''}`}>
                            {key + 1}
                        </div>
                        <div className="max-w-sm h-max max-h-[300px] overflow-auto">
                            <div className="font-['Medium',_ui-sans-serif] text-[length:var(--l)]">{item.title}</div>
                            <div className="text-sm">{item.description}</div>
                            <div className="font-['Light',_ui-sans-serif] text-[length:var(--xs)] opacity-70">{item.time}</div>
                        </div>
                    </div>
                    <div className="min-h-[63px] min-w-[2px] ml-[20px] bg-[var(--primary-color)]" />
                </div>
            ))}
        </div>
    )
}
