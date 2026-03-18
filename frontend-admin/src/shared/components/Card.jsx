export default function Card() {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(325px,1fr))] gap-[var(--x)_var(--l)] box-border">
            <div className="box-border shadow-[var(--box-shadow)] p-[var(--l)] rounded-[var(--radius-m)] grid auto-rows-max gap-[var(--m)]">
                <div>
                    <div className="font-['Medium',_ui-sans-serif] text-[length:var(--l)]">Ilham Rahmat Akbar</div>
                    <p>Fullstack Dev</p>
                    <small>Jakarta</small>
                </div>
                <div className="flex items-center justify-end gap-[var(--m)] cursor-pointer w-full text-[length:var(--s)] flex-wrap mt-[var(--xx)]">
                    <a className="text-[var(--primary-color)] hover:underline">Hire</a>
                    <a className="text-[var(--success-color)] hover:underline">Contact</a>
                </div>
                <small>5 min ago</small>
            </div>
            <div className="box-border border-style-default p-[var(--l)] rounded-[var(--radius-m)] grid auto-rows-max gap-[var(--m)]">
                <div>
                    <div className="font-['Medium',_ui-sans-serif] text-[length:var(--l)]">Ilham Rahmat Akbar</div>
                    <p>Fullstack Dev</p>
                    <small>Jakarta</small>
                </div>
                <div className="flex items-center justify-end gap-[var(--m)] cursor-pointer w-full text-[length:var(--s)] flex-wrap mt-[var(--xx)]">
                    <a className="text-[var(--primary-color)] hover:underline">Hire</a>
                    <a className="text-[var(--success-color)] hover:underline">Contact</a>
                </div>
                <small>5 min ago</small>
            </div>
        </div>
    )
}
