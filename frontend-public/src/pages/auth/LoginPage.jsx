import {LoginForm, OAuthButton} from "../../features/auth/index.js";
import {HashLink} from "react-router-hash-link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center"
             style={{
                 backgroundImage: "url('./bookstore.webp')",
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 backgroundRepeat: "no-repeat"
             }}>
            <div
                className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <LoginForm/>
                <div className="text-center text-sm text-gray-500 my-2">atau</div>
                <OAuthButton/>
                <br />
                <div className={'flex items-center justify-between gap-4 flex-wrap'}>
                    <HashLink className={'text-[length:var(--s)] text-[var(--link-color)] hover:underline'} to={'/'}>Or see our product first</HashLink>
                    <HashLink className={'text-[length:var(--s)] text-[var(--link-color)] hover:underline'} to={'/register'}>Register</HashLink>
                </div>
            </div>
        </div>
    )
}
