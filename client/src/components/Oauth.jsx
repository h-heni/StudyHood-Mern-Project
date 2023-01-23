import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"


function Oauth() {

    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })

                console.log(res.data)
            } catch (err) {
                console.log(err)

            }

        }
    });
  return (
    <div>
        <div>
    {/* <button onClick={login}>
                    <i class="fa-brands fa-google"></i>
                    Continue with google
                </button> */}
                <GoogleLogin
                    onSuccess={credentialResponse => {
                    console.log(credentialResponse.credential);
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log(decoded)
                }}
                    onError={() => {
                    console.log('Login Failed');
                }}/>
        </div>          
    </div>
  )
}

export default Oauth