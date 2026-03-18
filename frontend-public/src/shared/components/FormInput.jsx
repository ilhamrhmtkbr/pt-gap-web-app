import {removeUnderscoreAndCapitalize} from '../utils/formatText.js'

/*
 * Cara pake:
 * const [form, setForm] = useState({ username: '', option: '', desc: '', dob: '' })
 * const [errors, setErrors] = useState({})
 *
 * <FormInput label="username" name="username" id="username" placeholder="input"
 *     value={form.username} onChange={e => setForm(p => ({...p, username: e.target.value}))}
 *     error={errors.username} />
 *
 * <FormInput as="select" label="option" id="option"
 *     options={[{ value: 'a', label: 'A' }]}
 *     value={form.option} onChange={e => setForm(p => ({...p, option: e.target.value}))} />
 *
 * <FormInput as="textarea" label="desc" id="desc"
 *     value={form.desc} onChange={e => setForm(p => ({...p, desc: e.target.value}))} />
 *
 * <FormInput type="file" label="resume" id="files"
 *     onChange={e => setForm(p => ({...p, files: e.target.files[0]}))} />
 */

const inputClass = "text-[length:var(--m)] font-inherit w-full cursor-pointer bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--border-color)] border p-[var(--s)] outline-none box-border h-max rounded-[var(--radius-s)]"

export default function FormInput({
                                      label,
                                      value,
                                      onChange,
                                      type = 'text',
                                      register,
                                      name,
                                      id,
                                      placeholder,
                                      error = null,
                                      options = [],
                                      as = 'input',
                                  }) {

    const inputProps = register
        ? register(name)
        : {
            value: value ?? '',
            onChange
        }

    return (
        <div className="w-full grid auto-rows">
            <label className="capitalize font-['Medium',_ui-sans-serif]" htmlFor={id}>
                {removeUnderscoreAndCapitalize(label)}
            </label>

            {as === 'input' && (
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={inputClass}
                    {...inputProps}
                />
            )}

            {as === 'select' && (
                <select
                    id={id}
                    name={name}
                    className={inputClass}
                    {...inputProps}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}

            {as === 'textarea' && (
                <textarea
                    id={id}
                    name={name}
                    className={inputClass}
                    {...inputProps}
                />
            )}

            {error && (
                <p className="text-sm text-[var(--danger-color)]">
                    {error.message || error}
                </p>
            )}
        </div>
    )
}
