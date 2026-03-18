/*
Cara pake di parent:
import { useState } from 'react'
import BottomSheet from './BottomSheet'

const [show, setShow] = useState(false)

<div onClick={() => setShow(true)} className="cursor-pointer">click</div>
<BottomSheet show={show} onClose={() => setShow(false)} />
*/

export default function BottomSheet({ show = false, onClose, children }) {
    return (
        <div
            className={`fixed left-1/2 -translate-x-1/2 z-[999] max-w-[88dvw] bg-[var(--bg-color)] h-[85dvh] w-[100dvw] border border-[var(--border-color)] rounded-t-[var(--xxxx)] overflow-hidden box-border transition-all duration-300 ease-in ${
                show ? 'bottom-0' : 'bottom-[-90dvh]'
            }`}
        >
            <div
                className="flex min-h-[8dvh] cursor-pointer items-center justify-center text-[size:var(--m)] transition-all duration-300 hover:scale-105"
                onClick={onClose}
            >
                🖱
            </div>

            <div className="grid grid-flow-row auto-rows-max max-h-[77dvh] overflow-y-auto border-t border-[var(--border-color)] px-0 py-[var(--m)] mx-[var(--l)]">
                {children ?? <h1>Example Content</h1>}
            </div>
        </div>
    )
}
