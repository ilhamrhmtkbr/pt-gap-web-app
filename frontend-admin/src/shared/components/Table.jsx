/*
 * Table.jsx
 *
 * Props:
 *   - columns : Array of { label: string, key: string }
 *   - data    : Array of objects
 *   - actions : { detail: bool, edit: bool, delete: bool }
 *   - onDetail, onEdit, onDelete : callbacks
 *
 * Cara pake:
 *   <Table
 *       columns={[{ label: 'Nama', key: 'name' }, { label: 'Email', key: 'email' }]}
 *       data={users}
 *       actions={{ detail: true, edit: true, delete: false }}
 *       onEdit={item => console.log('edit', item)}
 *   />
 */

export default function Table({
    columns = [],
    data = [],
    actions = { detail: true, edit: true, delete: true },
    onDetail,
    onEdit,
    onDelete
}) {
    return (
        <div className="table-box overflow-auto text-[length:var(--s)] [&::-webkit-scrollbar]:w-[9px] [&::-webkit-scrollbar]:h-[9px]">
            <table className="w-full whitespace-nowrap border-separate border-spacing-0">
                <thead>
                    <tr className="[&_th]:bg-[var(--sidebar-color)] [&_th]:border-y [&_th]:border-y-[var(--border-color)] [&_th]:px-4 [&_th]:vertical-middle">
                        <th className="border-l border-l-[var(--border-color)] rounded-tl-[var(--radius-m)] rounded-bl-[var(--radius-m)] h-[63px]">No</th>
                        {columns.map(col => (
                            <th key={col.key} className="h-[63px]">{col.label}</th>
                        ))}
                        <th className="border-r border-r-[var(--border-color)] rounded-tr-[var(--radius-m)] rounded-br-[var(--radius-m)] h-[63px]">Actions</th>
                    </tr>
                </thead>
                <tbody className="[&_tr:nth-child(even)]:bg-[var(--sidebar-color)]">
                    {data.map((item, index) => (
                        <tr key={item.id ?? index} className="hover:bg-[var(--sidebar-hover-color)] transition-colors">
                            <td className="align-middle text-center border-l-[var(--border-color)] rounded-tl-[var(--radius-m)] rounded-bl-[var(--radius-m)] hover:bg-[var(--transsecond-primary-color)] min-h-[63px]">
                                {index + 1}
                            </td>
                            {columns.map(col => (
                                <td key={col.key} className="align-middle [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-w-[175px] min-h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                    {item[col.key]}
                                </td>
                            ))}
                            <td className="align-middle border-r-[var(--border-color)] rounded-tr-[var(--radius-m)] rounded-br-[var(--radius-m)] hover:bg-[var(--transsecond-primary-color)] min-h-[63px]">
                                <div className="flex items-center justify-around gap-[var(--s)]">
                                    {actions.detail && (
                                        <span onClick={() => onDetail?.(item)} className="cursor-pointer text-[var(--primary-color)] text-[length:var(--s)] capitalize font-['Medium',_sans-serif] hover:underline">
                                            detail
                                        </span>
                                    )}
                                    {actions.edit && (
                                        <span onClick={() => onEdit?.(item)} className="cursor-pointer text-[var(--success-color)] text-[length:var(--s)] capitalize font-['Medium',_sans-serif] hover:underline">
                                            edit
                                        </span>
                                    )}
                                    {actions.delete && (
                                        <span onClick={() => onDelete?.(item)} className="cursor-pointer text-[var(--danger-color)] text-[length:var(--s)] capitalize font-['Medium',_sans-serif] hover:underline">
                                            delete
                                        </span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
