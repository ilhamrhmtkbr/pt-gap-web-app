/*
 * Toast.jsx
 *
 * Props:
 *   - type    : 'primary' | 'warning' | 'danger' | 'success'
 *   - message : teks pesan
 *   - onClose : callback saat tombol × diklik
 *
 * Cara pake:
 *   const [toast, setToast] = useState({ show: false, type: 'success', message: '' })
 *
 *   {toast.show && (
 *       <Toast type={toast.type} message={toast.message} onClose={() => setToast(p => ({...p, show: false}))} />
 *   )}
 */

export default function Toast({ type = 'primary', message = 'Message content here...', onClose }) {
    const bgStyle = { backgroundColor: `var(--${type}-color)` }

    return (
        <div className="fixed right-[var(--m)] bottom-[100px] z-[99] w-max text-white">
            <div
                style={bgStyle}
                className="flex h-max max-w-[75dvw] items-center gap-[var(--m)] break-all border-[var(--border-color)] border rounded-[var(--radius-m)] p-[var(--s)_var(--l)] box-border"
            >
                <span>{message}</span>
                <div
                    onClick={onClose}
                    className="group flex min-h-[23px] min-w-[23px] max-h-[23px] max-w-[23px] cursor-pointer items-center justify-center rounded-full border-[1.5px] font-['Bold',_ui-sans-serif] bg-[var(--bg-color)] text-[length:var(--s)] font-bold text-[var(--danger-color)] transition-all hover:border-white hover:bg-[var(--danger-color)] hover:text-white"
                >
                    &times;
                </div>
            </div>
        </div>
    )
}
