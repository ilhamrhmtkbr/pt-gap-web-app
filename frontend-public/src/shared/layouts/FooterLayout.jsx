import {HashLink} from "react-router-hash-link";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export const FooterLayout = () => {
    const {t, i18n} = useTranslation();
    const [lang, setLang] = useState(i18n.language);

    function handleChangeLang(lang) {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang);
        setLang(lang);
    }

    return (
        <footer className={'flex flex-wrap gap-6 justify-between px-[var(--m)] pt-[var(--xx)] pb-[72px] border-t border-t-[var(--border-color)]'}>
            <div className="grid gap-4">
                <img src={"https://course.iamra.site/iamra-logo.svg"}
                     style={{
                         maxWidth: 31,
                         maxHeight: 31
                     }}
                     alt={import.meta.env.VITE_APP_NAME}/>
                <div className={"font-['Bold',_ui-sans-serif] text-[length:var(--xxxx)]"}>Bookstore</div>
                <p>Senen, Jakarta Pusat</p>
                <p>copyright &copy; <a className='text-primary text-hover-underline cursor-pointer'
                                       href={import.meta.env.VITE_APP_URL_PROFILE}>Ilham
                    Rahmat Akbar</a> 2025</p>
            </div>

            <div className="grid gap-4">
                <div className={"font-['Medium',_ui-sans-serif] text-[length:var(--x)]"}>My Contact</div>
                <a className='hover:underline hover:text-[var(--link-color)]' target='_blank'
                   href={import.meta.env.VITE_LINK_GITHUB}>Github</a>
                <a className='hover:underline hover:text-[var(--link-color)]' target='_blank' href={import.meta.env.VITE_LINK_EMAIL}>Email</a>
                <a className='hover:underline hover:text-[var(--link-color)]' target='_blank'
                   href={import.meta.env.VITE_LINK_INSTAGRAM}>Instagram</a>
                <a className='hover:underline hover:text-[var(--link-color)]' target='_blank'
                   href={import.meta.env.VITE_LINK_WHATSAPP}>Whatsapp</a>
            </div>

            <div className="grid gap-4 auto-rows-max">
                <h2 className={"font-['Medium',_ui-sans-serif] text-[length:var(--x)]"}>Feature</h2>
                <HashLink to={'/'}
                          className={'hover:underline hover:text-[var(--link-color)]'}>
                    {t('products')}
                </HashLink>
                <div className={'flex items-center gap-4'}>
                    <div>Lang:</div>
                    <div className={'flex items-center gap-2'}>
                        <div
                            className={`hover:underline w-[32px] h-[32px] flex items-center justify-center max-w-[32px] max-h-[32px] cursor-pointer ${lang === 'id' ? 'bg-[var(--primary-color)] rounded-md' : ''}`}
                            style={{
                                padding: '0 3px',
                                color: lang === 'id' ? 'white' : 'var(--text-color)'
                            }}
                            onClick={() => handleChangeLang('id')}>id
                        </div>
                        <div
                            className={`hover:underline w-[32px] h-[32px] flex items-center justify-center max-w-[32px] max-h-[32px] cursor-pointer ${lang === 'en' ? 'bg-[var(--primary-color)] rounded-md' : ''}`}
                            style={{
                                padding: '0 3px',
                                color: lang === 'en' ? 'white' : 'var(--text-color)'
                            }}
                            onClick={() => handleChangeLang('en')}>en
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}