import { useState } from 'react'

export default function Accordion() {
    const [active, setActive] = useState(false)

    return (
        <div
            className="block p-[var(--m)] border-style-default rounded-lg max-w-[85dvw]"
            onClick={() => setActive(prev => !prev)}
        >
            <label
                className={`grid cursor-pointer relative transition-all duration-300 ease-in-out ${
                    active
                        ? 'pb-[var(--m)] border-b border-b-[var(--border-color)] mb-[var(--m)]'
                        : 'pb-0 border-b border-transparent'
                }`}
            >
                <div className="flex items-center justify-between">
                    <p>What is Lorem Ipsum?</p>
                    <span>▼</span>
                </div>
                <small className="text-[var(--s)]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </small>
            </label>
            <div
                className={`[&::-webkit-scrollbar]:w-[7px] h-max box-border pr-[var(--xxs)] transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    active ? 'max-h-[300px] overflow-y-auto' : 'max-h-0 overflow-hidden'
                }`}
            >
                <p>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                </p>
            </div>
        </div>
    )
}
