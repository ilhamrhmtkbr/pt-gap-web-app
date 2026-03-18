export default function Data() {
    return (
        <div className="grid gap-[var(--m)] pl-[var(--xx)] border-l-[5px] border-l-[var(--primary-color)] rounded-[var(--m)]">
            <p className="font-['Bold',_ui-sans-serif]">Data</p>
            <div className="grid grid-cols-[max-content_1fr] gap-[var(--m)_var(--xxxx)]">
                <div className="font-['Medium',_ui-sans-serif] capitalize">Name</div>
                <div>: Ilham Rahmat Akbar</div>
                <div className="font-['Medium',_ui-sans-serif] capitalize">Position</div>
                <div>: Fullstack</div>
                <div className="font-['Medium',_ui-sans-serif] capitalize">Rate</div>
                <div>: A</div>
            </div>
        </div>
    )
}
