import { useRef } from 'react'
import Modal from './Modal'
import { removeUnderscoreAndCapitalize } from '../utils/formatText.js'

/*
 * Filter.jsx
 *
 * Props:
 *   - title      : label tombol filter
 *   - filters    : array of string ATAU array of { label, value }
 *   - value      : nilai yang sedang aktif
 *   - onChange   : callback saat user pilih item
 *
 * Cara pake:
 *   const [activeFilter, setActiveFilter] = useState('')
 *   <Filter
 *       title="Sort By"
 *       filters={['example-1', 'example-2']}
 *       value={activeFilter}
 *       onChange={setActiveFilter}
 *   />
 */

export default function Filter({
    title = 'Sort By',
    filters = [],
    value = '',
    onChange
}) {
    const modalRef = useRef(null)

    const getValue = (item) => item?.value ?? item
    const getLabel = (item) => item?.label ?? item

    function selectItem(item) {
        onChange?.(getValue(item))
        modalRef.current.toggleModal()
    }

    return (
        <>
            <div
                onClick={() => modalRef.current.toggleModal()}
                className="cursor-pointer group outline-none flex items-center justify-center gap-x-4 py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] w-max rounded-[var(--radius-s)] text-[length:var(--s)] border border-solid border-[var(--border-color)] hover:outline-4 hover:outline-solid hover:outline-[var(--transprimary-color)] hover:border-[1px] hover:border-solid hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
            >
                <svg className="max-w-[var(--l)] max-h-[var(--l)] fill-[var(--text-color)] group-hover:fill-[var(--primary-color)]"
                    xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v1.172a3 3 0 0 1-.879 2.121l-5.828 5.828a1 1 0 0 0-.293.707v2.343a3 3 0 0 1-.879 2.121l-2.202 2.202C10.842 22.572 9 21.809 9 20.286v-5.457a1 1 0 0 0-.293-.707L2.879 8.293A3 3 0 0 1 2 6.172V5z" />
                </svg>
                <span className="capitalize font-['Medium',_ui-sans-serif] text-[length:var(--s)]">
                    {value ? removeUnderscoreAndCapitalize(value) : title}
                </span>
            </div>

            <Modal ref={modalRef} title={title} footer={<p>Filter</p>}>
                {filters.map((item, key) => (
                    <div
                        key={key}
                        onClick={() => selectItem(item)}
                        className={`cursor-pointer font-['Medium',_ui-sans-serif] bg-[var(--translink-color)] py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] rounded-[var(--radius-s)] text-[length:var(--s)] border-2 border-solid transition-colors ${
                            getValue(item) === value
                                ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                                : 'border-transparent text-[var(--link-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]'
                        }`}
                    >
                        {removeUnderscoreAndCapitalize(getLabel(item))}
                    </div>
                ))}
            </Modal>
        </>
    )
}
