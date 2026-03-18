import { useState} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {useLogin} from "../hooks/useLogin.js";

export const OAuthButton = () => {
    const { themeButtonGoogleLogin } = useState('dark');
    const {loginWithGoogle} = useLogin()

    async function handleInputOnChange(res) {
        await loginWithGoogle({credential: res.credential})
    }

    return (
        <div style={{placeItems: 'center'}}>
            <GoogleLogin
                onSuccess={(res) => handleInputOnChange(res)}
                onError={() => {
                    alert('Login Failed');
                }}
                locale='en'
                theme={themeButtonGoogleLogin}
                size={window.matchMedia('(max-width: 253px)').matches ? 'medium' : 'large'}
            />
        </div>
    );
};