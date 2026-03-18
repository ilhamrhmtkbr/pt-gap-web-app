/*
 * Toggle.jsx
 *
 * Props:
 *   - value    : boolean — state checkbox (controlled)
 *   - onChange : callback saat toggle berubah, menerima boolean baru
 *   - label    : teks label di samping toggle
 *
 * Cara pake:
 *   const [isActive, setIsActive] = useState(false)
 *   <Toggle value={isActive} onChange={setIsActive} label="Dark Mode" />
 */

export default function Toggle({ value = false, onChange, label = 'sample' }) {
    return (
        <div className="flex items-center gap-[var(--m)]">
            <label className="relative inline-block w-[63px] h-[33px] cursor-pointer rounded-[33px] border-[var(--border-color)] border transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-color)] shadow-[inset_3px_3px_6px_0_rgb(204,219,232),inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_0_rgba(0,0,0,0.5),inset_-3px_-3px_6px_1px_rgba(255,255,255,0.1)]">
                <input
                    type="checkbox"
                    className="peer hidden"
                    checked={value}
                    onChange={e => onChange?.(e.target.checked)}
                />
                <span className="absolute left-[3px] top-1/2 flex h-[25px] w-[25px] -translate-y-1/2 items-center justify-center rounded-[33px] border-[var(--border-color)] border bg-[var(--sidebar-color)] transition-all duration-300 ease-in-out shadow-[0_4px_8px_-2px_rgba(9,30,66,0.25),0_0_0_1px_rgba(9,30,66,0.08)] peer-checked:left-[34px]" />
            </label>
            <span className="min-w-[60px] text-[16px] font-[500] text-[var(--text-color)]">{label}</span>
        </div>
    )
}
