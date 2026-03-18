import {Suspense} from 'react'
import {I18nextProvider} from 'react-i18next'
import i18n from "../lib/i18n.js";
import {GoogleOAuthProvider} from "@react-oauth/google";

export default function Providers({children}) {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<div>Loading...</div>}>
                    {children}
                </Suspense>
            </I18nextProvider>
        </GoogleOAuthProvider>
    )
}
