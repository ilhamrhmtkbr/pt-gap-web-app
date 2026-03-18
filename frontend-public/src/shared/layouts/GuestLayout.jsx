import { useState } from 'react'
import {HashLink} from "react-router-hash-link";
import {useAuthStore} from "../../features/auth/index.js";
import {FooterLayout} from "./FooterLayout.jsx";

export default function GuestLayout({children}) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const user = useAuthStore((s) => s.user)

    function changeTheme() {
        setIsDarkMode(prev => {
            const next = !prev
            document.body.classList.toggle('dark-mode', next)
            return next
        })
    }

    return (
        <>
            {/* ── HEADER ── */}
            <header className={'flex justify-between box-border fixed top-0 left-0 right-0 z-[99] flex items-center h-[var(--height-header)] bg-[var(--transbg-color)] backdrop-blur-[5px] border-b-[var(--border-color)] border-b p-[5px_var(--m)_5px]'}>

                <p className="example-button-change-theme cursor-pointer" onClick={changeTheme}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </p>

                <div className="flex items-center justify-between gap-x-[var(--m)] max-md:hidden">
                    <HashLink to="/" className={({ isActive }) =>
                        `relative cursor-pointer before:content-[''] before:absolute before:h-[3px] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:rounded before:bg-[var(--primary-color)] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full ${isActive ? 'before:w-full' : 'before:w-0'}`
                    }>
                        Products
                    </HashLink>
                    {user === null ?
                        <HashLink to="/login" className={({ isActive }) =>
                            `relative cursor-pointer before:content-[''] before:absolute before:h-[3px] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:rounded before:bg-[var(--primary-color)] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full ${isActive ? 'before:w-full' : 'before:w-0'}`
                        }>
                            Login
                        </HashLink> :
                        <HashLink to="/profile" className={({ isActive }) =>
                            `relative cursor-pointer before:content-[''] before:absolute before:h-[3px] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:rounded before:bg-[var(--primary-color)] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full ${isActive ? 'before:w-full' : 'before:w-0'}`
                        }>
                            Profile
                        </HashLink>}
                </div>
            </header>

            {/* ── BOTTOM NAV mobile ── */}
            <nav className="md:hidden flex items-center justify-between flex-wrap h-max gap-[var(--m)] font-['Medium',_ui-sans-serif] fixed left-0 right-0 bottom-0 m-[var(--m)] p-[var(--m)] bg-[var(--bg-color)] shadow-[var(--box-shadow)] border-[var(--border)] rounded-[var(--radius-m)] z-[100]">
                <HashLink to="/">Products</HashLink>
                <HashLink to="/login">Login</HashLink>
                <HashLink to="/profile">Profile</HashLink>
            </nav>

            {/* ── MAIN ── */}
            <main className="w-full max-w-[1920px] box-border grid min-h-[100dvh] ml-auto mr-auto grid-rows-[1fr] justify-center">

                <section className={
                    'grid w-[99.2dvw] max-w-[1000px] h-max auto-rows-max gap-[var(--xx)] px-[var(--m)] pt-[var(--ideal-distance-to-header)] pb-[var(--ideal-distance-to-header)] max-md:pl-[var(--m)]'}>
                    {children}
                </section>
            </main>

            <FooterLayout />
        </>
    )
}