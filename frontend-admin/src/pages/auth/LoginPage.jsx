import {LoginForm} from "../../features/auth/index.js";

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
            </div>
        </div>
    )
}
