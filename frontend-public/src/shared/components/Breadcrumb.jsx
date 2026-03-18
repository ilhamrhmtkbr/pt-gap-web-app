import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumb() {
    const location = useLocation()

    const breadcrumbs = useMemo(() => {
        const pathArray = location.pathname.split('/').filter(path => path)

        const customLabels = {
            'cms': 'Dashboard',
            'v1': 'Version 1',
            'auth': 'Autentikasi'
        }

        const crumbs = []
        let cumulativePath = ''

        pathArray.forEach((path) => {
            cumulativePath += `/${path}`

            // Jangan masukkan kalau path-nya cuma angka (ID)
            if (!/^\d+$/.test(path)) {
                crumbs.push({
                    label: customLabels[path] || path.replace(/-/g, ' ').replace(/_/g, ' '),
                    url: cumulativePath,
                    isLast: false
                })
            }
        })

        if (crumbs.length > 0) {
            crumbs[crumbs.length - 1].isLast = true
        }

        return crumbs
    }, [location.pathname])

    return (
        <nav className="flex box-border flex-wrap items-center gap-[var(--s)_var(--xxs)] p-[var(--xs)] text-[length:var(--s)] rounded-[var(--radius-s)] border-[var(--border-color)] border w-max max-w-[85dvw]">
            <Link to="/" className="px-[var(--xs)] py-[2px] text-[var(--link-color)] hover:text-[var(--primary-color)]">
                Home
            </Link>

            {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-[var(--xxs)]">
                    <span className="text-[var(--border-color)] opacity-50">/</span>
                    <Link
                        to={crumb.url}
                        className={`px-[var(--xs)] py-[2px] capitalize transition-all ${
                            crumb.isLast
                                ? 'text-[var(--primary-color)] font-semibold'
                                : 'text-[var(--link-color)] hover:text-[var(--primary-color)]'
                        }`}
                    >
                        {crumb.label}
                    </Link>
                </span>
            ))}
        </nav>
    )
}
