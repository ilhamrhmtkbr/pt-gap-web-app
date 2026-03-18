import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {useTranslation} from "react-i18next";
import Breadcrumb from "../components/Breadcrumb.jsx";
import {useLogout} from "../../features/auth/hooks/useLogout.js";

export default function MemberLayout({ children }) {
    const [hideSidebar, setHideSidebar]     = useState(false)
    const [minifySidebar, setMinifySidebar] = useState(false)
    const [isDarkMode, setIsDarkMode]       = useState(false)
    const {t} = useTranslation()
    const {logout} = useLogout()

    const location = useLocation()

    function changeTheme() {
        setIsDarkMode(prev => {
            const next = !prev
            document.body.classList.toggle('dark-mode', next)
            return next
        })
    }

    function determineSidebarActiveLink(path, isChildLink = true) {
        const baseClass = "hover:bg-[var(--sidebar-hover-color)] hover:text-[var(--primary-color)] font-['Medium',_ui-sans-serif] h-max flex gap-[var(--m)] p-[var(--s)_var(--m)] items-center cursor-pointer box-border border-l-[3px] border-l-solid relative"
        const isActive  = location.pathname.startsWith(path)
        const activeClass   = 'bg-[var(--transsecond-primary-color)] text-[var(--primary-color)] border-l-[var(--second-primary-color)]'
        const inactiveClass = 'border-l-transparent'
        const afterDataTitleClass = "after:content-[attr(data-title)] after:invisible after:opacity-0 after:bg-[var(--bg-color)] after:rounded-[var(--radius-l)] after:px-[var(--xxx)] after:py-[var(--x)] after:fixed after:z-[999] after:whitespace-nowrap after:text-[var(--xx)] after:left-1/2 after:top-[20dvh] after:-translate-x-1/2 after:transition-[opacity,visibility] after:duration-300 after:shadow-[var(--box-shadow)] after:border-[var(--border)] after:font-[Medium,ui-sans-serif] hover:after:visible hover:after:opacity-100"
        return [
            baseClass,
            isActive ? activeClass : inactiveClass,
            isChildLink ? 'pl-[calc(var(--m)_*_2_+_var(--s))]' : 'pl-[var(--m)]',
            !isChildLink ? afterDataTitleClass : 'text-[length:var(--s)]'
        ].join(' ')
    }

    const hamburgerPathClass = (isMiddle = false) => {
        const base = 'fill-none stroke-[var(--text-color)] stroke-[8] transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]'
        if (isMiddle) return `${base} ${minifySidebar ? '[stroke-dasharray:1_60] [stroke-dashoffset:-30]' : '[stroke-dasharray:60_60]'}`
        return `${base} ${minifySidebar ? '[stroke-dasharray:90_207] [stroke-dashoffset:-134]' : '[stroke-dasharray:60_207]'}`
    }

    return (
        <>
            {/* ── HEADER ── */}
            <header className={[
                'flex justify-between box-border fixed top-0 left-0 right-0 z-[99] flex items-center h-[var(--height-header)] bg-[var(--transbg-color)] backdrop-blur-[5px] border-b-[var(--border-color)] border-b p-[5px_var(--m)_5px_var(--padding-left-has-sidebar)]',
                hideSidebar
                    ? 'max-md:pl-[var(--m)]'
                    : minifySidebar
                        ? 'pl-[var(--padding-left-has-sidebar-active)]'
                        : 'pl-[var(--padding-left-has-sidebar)] max-md:pl-[var(--padding-left-has-sidebar-active)]'
            ].join(' ')}>

                <p className="example-button-change-theme cursor-pointer" onClick={changeTheme}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </p>

                {/* Hamburger — mobile only */}
                <svg
                    onClick={() => setHideSidebar(p => !p)}
                    className="bg-transparent border-none cursor-pointer p-0 hidden max-md:block w-[31px] h-[31px] max-w-[31px] max-h-[31px]"
                    viewBox="0 0 100 100"
                >
                    <path className={hamburgerPathClass()} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
                    <path className={hamburgerPathClass(true)} d="M 20,50 H 80"/>
                    <path className={hamburgerPathClass()} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
                </svg>

                {/* Desktop nav links — Ganti <a> → NavLink (react-router-dom) */}
                <div className="flex items-center justify-between gap-x-[var(--m)] max-md:hidden">
                    <NavLink to="/" end className={({ isActive }) =>
                        `relative cursor-pointer before:content-[''] before:absolute before:h-[3px] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:rounded before:bg-[var(--primary-color)] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full ${isActive ? 'before:w-full' : 'before:w-0'}`
                    }>
                        Products
                    </NavLink>
                    <div onClick={logout} className={`relative cursor-pointer before:content-[''] before:absolute before:h-[3px] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:rounded before:bg-[var(--primary-color)] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full before:w-0`}>
                        Logout
                    </div>
                </div>
            </header>

            {/* ── BOTTOM NAV mobile ── */}
            <nav className="md:hidden flex items-center justify-between flex-wrap h-max gap-[var(--m)] font-['Medium',_ui-sans-serif] fixed left-0 right-0 bottom-0 m-[var(--m)] p-[var(--m)] bg-[var(--bg-color)] shadow-[var(--box-shadow)] border-[var(--border)] rounded-[var(--radius-m)] z-[100]">
                <Link to="/">Products</Link>
                <div onClick={logout}>Logout</div>
            </nav>

            {/* ── MAIN ── */}
            <main className="w-full max-w-[1920px] box-border grid min-h-[100dvh] ml-auto mr-auto grid-rows-[1fr] grid-cols-[max-content_1fr]">

                {/* Page content — Ganti <slot/> → {children} */}
                <section className={[
                    'grid w-[99.2dvw] max-w-[1920px] h-max auto-rows-max gap-[var(--xx)] px-[var(--m)] pt-[var(--ideal-distance-to-header)] pb-[var(--ideal-distance-to-header)] max-md:pl-[var(--m)]',
                    minifySidebar ? 'pl-[var(--padding-left-has-sidebar-active)]' : 'pl-[var(--padding-left-has-sidebar)]'
                ].join(' ')}>
                    <Breadcrumb />
                    {children}
                </section>

                {/* ── SIDEBAR ── */}
                <aside className={[
                    'grid grid-rows-[max-content_1fr_max-content] fixed left-0 top-0 box-border [&::-webkit-scrollbar]:w-[7px] z-[99] bg-[var(--sidebar-color)] min-h-[100dvh] max-h-[100dvh] pb-[var(--m)] border-r-[var(--border-color)] border-r transition-all duration-500 max-md:z-[111] max-md:bottom-0 max-md:duration-[.3s]',
                    hideSidebar ? 'max-md:left-[-90dvw]' : 'max-md:left-0',
                    minifySidebar ? 'w-[var(--width-sidebar-active)]' : 'w-[var(--width-sidebar)] max-md:w-[70dvw]'
                ].join(' ')}>

                    {/* Logo */}
                    <div className={[
                        'flex items-center gap-[var(--xs)] h-[var(--height-header)] border-b-[var(--border-color)] border-b box-border mb-[2rem] text-[var(--primary-color)]',
                        minifySidebar ? 'justify-center pl-0' : 'justify-start pl-[var(--m)]'
                    ].join(' ')}>
                        <svg className="max-w-[var(--m)] max-h-[var(--m)]" xmlns="http://www.w3.org/2000/svg" width="35.52" height="32.544" viewBox="0 0 6380 5852" shapeRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd">
                            <path d="M2770 4042V2703c0-560 841-560 841 0v1339c0 559-841 559-841 0z" fill="#ffc300"/>
                            <path d="M4920 3444l561 972v2c37 63 55 130 55 196 0 67-18 134-55 197v1c-36 64-85 113-143 146v1c-55 31-122 48-198 48v2H4016c-539 0-539 841 0 841h1124v2c222 0 433-58 618-165h2c182-105 337-259 450-454h0c114-196 170-407 170-619 0-211-56-422-170-618h0l-562-973c-269-466-998-46-728 421z" fill="#ef2323"/>
                            <path d="M4094 2013c269 467 997 46 728-420l-561-973v-1c-112-193-266-347-451-454v-1C3625 57 3414 0 3190 0c-223 0-434 57-620 164v1c-184 107-339 261-450 454v1l-562 973c-269 466 459 887 729 420l561-973 1 1c38-66 86-116 142-148h1c55-32 123-49 198-49 76 0 143 17 198 49h2c55 32 104 82 142 148v-1l562 973z" fill="#009f4d"/>
                            <path d="M899 4416l562-972c269-467-459-887-729-421l-561 973h-1C57 4192 0 4403 0 4614c0 212 57 423 170 619 112 194 267 348 450 454h2c185 107 396 165 618 165v-2h1124c539 0 539-841 0-841H1240v-2c-76 0-143-17-198-48l1-1c-57-32-107-82-144-147-36-63-55-130-55-197 0-66 19-133 55-196v-2z" fill="#0060fa"/>
                        </svg>
                        <p className={minifySidebar ? 'hidden' : 'block font-semibold'}>POS</p>
                    </div>

                    {/* Nav links */}
                    <div className="grid auto-rows-max capitalize overflow-y-auto overflow-x-hidden box-border pr-[4px] max-h-[calc(100dvh_-_var(--height-header)_-_calc(var(--m)_*_2))]">

                        <Link to="/profile" data-title="Profile" className={determineSidebarActiveLink('/profile', false)}>
                            <svg className="max-w-[var(--s)] max-h-[var(--s)] fill-[var(--link-color)]">
                                <use href="/sprite.svg#profile" />
                            </svg>
                            <span className={minifySidebar ? 'hidden' : 'block text-sm'}>Profile</span>
                        </Link>
                        <Link to="/carts" data-title={t('carts')} className={determineSidebarActiveLink('/carts', false)}>
                            <svg className="max-w-[var(--s)] max-h-[var(--s)] fill-[var(--link-color)]">
                                <use href="/sprite.svg#carts" />
                            </svg>
                            <span className={minifySidebar ? 'hidden' : 'block text-sm'}>{t('carts')}</span>
                        </Link>
                        <Link to="/transactions" data-title={t('transactions')} className={determineSidebarActiveLink('/transactions', false)}>
                            <svg className="max-w-[var(--s)] max-h-[var(--s)] fill-[var(--link-color)]">
                                <use href="/sprite.svg#transactions" />
                            </svg>
                            <span className={minifySidebar ? 'hidden' : 'block text-sm'}>{t('transactions')}</span>
                        </Link>

                    </div>

                    {/* Toggle minify */}
                    <div
                        className={`hover:bg-[var(--sidebar-hover-color)] p-[var(--s)_var(--m)] cursor-pointer box-border flex ${minifySidebar ? 'justify-center' : ''}`}
                        onClick={() => setMinifySidebar(p => !p)}
                    >
                        <svg className="max-w-[var(--s)] max-h-[var(--s)] fill-[var(--link-color)]">
                            <use href="/sprite.svg#hide-sidebar" />
                        </svg>
                    </div>
                </aside>
            </main>

        </>
    )
}