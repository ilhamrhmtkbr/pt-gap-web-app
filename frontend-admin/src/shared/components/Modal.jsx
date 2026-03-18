import { useState, forwardRef, useImperativeHandle } from 'react'

/*
 * Modal.jsx
 *
 * Pakai forwardRef + useImperativeHandle supaya parent bisa
 * panggil modalRef.current.toggleModal() dari luar.
 *
 * Props:
 *   - title    : judul modal
 *   - children : konten utama (menggantikan slot #content)
 *   - footer   : konten footer, terima JSX (menggantikan slot #footer)
 *
 * Cara pake di parent:
 *   const modalRef = useRef(null)
 *
 *   <button onClick={() => modalRef.current.toggleModal()}>Open</button>
 *   <Modal ref={modalRef} title="Judul" footer={<a href="#">Need help?</a>}>
 *       <p>Isi modal di sini</p>
 *   </Modal>
 */

const Modal = forwardRef(function Modal({ title, children, footer }, ref) {
    const [isHidden, setIsHidden] = useState(true)

    useImperativeHandle(ref, () => ({
        toggleModal: () => setIsHidden(prev => !prev)
    }))

    if (isHidden) return null

    return (
        <div className="fixed inset-0 flex z-[999] bg-[var(--transtext-color)]">
            <div className="m-auto w-[75dvw] max-h-[90dvh] bg-[var(--bg-color)] box-border rounded-[var(--radius-m)] p-[var(--xxx)] grid grid-rows-[max-content_1fr_max-content] gap-[var(--m)]">

                {/* Header */}
                <div className="flex justify-between items-center pb-[var(--l)]">
                    <p className="text-[length:var(--l)] font-['Bold',_ui-sans-serif]">{title}</p>
                    <div
                        className="cursor-pointer font-['Bold',_ui-sans-serif] w-[29px] h-[29px] flex items-center justify-center rounded-full bg-[var(--transdanger-color)] border-2 border-solid border-[var(--danger-color)] text-[var(--danger-color)] hover:bg-[var(--danger-color)] hover:text-white"
                        onClick={() => setIsHidden(true)}
                    >
                        &times;
                    </div>
                </div>

                {/* Content */}
                <div className="grid auto-rows-max gap-[var(--m)] place-items-[start_center] overflow-auto relative box-border">
                    {children ?? '...'}
                </div>

                {/* Footer */}
                <div className="pt-[var(--l)] mt-[var(--m)] text-center text-[length:var(--s)] text-[var(--link-color)]">
                    {footer ?? '...'}
                </div>
            </div>
        </div>
    )
})

export default Modal
