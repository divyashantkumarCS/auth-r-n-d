

import axios from 'axios';
import jwt from 'jsonwebtoken';
import appconf from '../config/config.js'

// Steps to connect using OAuth 2.0
// Step 1: Construct an Authorize URL
// Step 2: GET oauth2/authorize
// https://developer.x.com/en/docs/authentication/oauth-2-0/user-access-token
export const getTwitterAuthorizationUrl = async (req, res) => {
    const endpoint = "https://twitter.com/i/oauth2/authorize";
    const parameters = {
        response_type: "code",
        client_id: appconf.TWITTER_CLIENT_ID,
        redirect_uri: appconf.TWITTER_REDIRECT_URL,
        scope: "users.read tweet.read offline.access",
        state: 'state', // A unique state parameter that is used to prevent CSRF (Cross-Site Request Forgery) attacks.
        code_challenge: "challenge", // In production you should use a random string for the code_challenge
        code_challenge_method: "plain"
    }
    let queryParams = '';
    Object.keys(parameters).forEach(key => {
        queryParams += `${key}=${parameters[key]}&`
    })

    queryParams = queryParams.slice(0, -1);

    res.status(200).send({
        url: `${endpoint}?${queryParams}`,
    })
}

// Steps to connect using OAuth 2.0
// https://developer.x.com/en/docs/authentication/oauth-2-0/user-access-token
// Step 3: POST oauth2/token - Access Token
export const getUserAccessToken = async (client_id, client_secret, redirect_uri, code) => {
    try {
        const endpoint = "https://api.x.com/2/oauth2/token";
        const body = {
            client_id: client_id,
            redirect_uri: redirect_uri,
            code: code,
            grant_type: "authorization_code",
            code_verifier: "challenge"
        }

        const authorizationString = `${client_id}:${client_secret}`;
        const base64Encoded = Buffer.from(authorizationString).toString('base64');

        const response = await axios.post(endpoint, body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${base64Encoded}`
            }
        })

        return response?.data?.access_token;
    } catch (error) {
        console.log(error.response)
        throw "Error: GET User AccessToken"
    }
}

// https://developer.x.com/en/docs/x-api/users/lookup/api-reference/get-users-me
export const getUserData = async (user_access_token) => {
    try {
        const endpoint = "https://api.x.com/2/users/me";

        const parameters = {
            'user.fields': 'profile_image_url,verified,verified_type,protected,location,entities',
        }

        let queryParams = '';
        Object.keys(parameters).forEach(key => {
            queryParams += `${key}=${parameters[key]}&`
        })

        queryParams = queryParams.slice(0, -1);

        const response = await axios.get(`${endpoint}?${queryParams}`, {
            headers: {
                "Authorization": `Bearer ${user_access_token}`
            }
        });

        return response?.data;
    } catch (error) {
        console.log(error.response)
        throw "Error: GET user DATA"
    }
}

export const twitterOAuthCallback = async (req, res) => {
    try {
        const authorizationCode = req?.query?.code;
        console.log("1. authorizationCode : ", authorizationCode);

        // Get the User Access Token by exchanging authorizationCode
        const access_token = await getUserAccessToken(appconf.TWITTER_CLIENT_ID, appconf.TWITTER_CLIENT_SECRET, appconf.TWITTER_REDIRECT_URL, authorizationCode);
        console.log("2. user_access_token : ", access_token);

        const userData = await getUserData(access_token);
        console.log("3. userData : ", userData);

        // replace true with some comdition like data save in ds success or not
        if (true) {
            const tokenSignature = {
                userData: {
                    "email": userData?.email,
                    "name": userData?.name,
                    "picture": userData?.profile_image,
                    "roles": userData?.roles
                }
            };

            const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), ...tokenSignature }, 'privetKey', { algorithm: 'HS256' });

            res.cookie("token", `Bearer ${token}`, {
                maxAge: (3600000 * 24),
                httpOnly: false,
                //here domain, which can access this cookie like localhost, www.checkedspot.com
                //specify .checkedspot.com, isetn this case all the subdomains can also access this cookie like blog.checkedspot.com, checkedspot.com
                domain: process.env.DOMAIN,
                path: "/",
                secure: true,
                sameSite: "Lax",
            })
            res.redirect(process.env.REDIRECT_TO_UI);
        } else {
            res.redirect(process.env.ERROR_REDIRECT_TO_UI)
        }
    } catch (error) {
        console.log(error)
    }
}

export const twitterDeauthorize = async (req, res) => {

}

export const twitterDataDeletion = async (req, res) => {

}


/*
    *****We cannot get email of a user from "Twitter api using oAuth 2.0 v2 Apis" 
    There is not endpoint that will return email using oAuth 2.0
    *****So we must handle that part ourselves.

    *****But there is an endpoint in twitter Api v1 that uses only oAuth 1.0a --> https://developer.x.com/en/docs/authentication/oauth-1-0a
    email endpoint doc using oAuth 1.0a -->  https://developer.x.com/en/docs/x-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-verify_credentials
    *****So here we can use oAuth 1.0a to authenticate the user on the application
*/