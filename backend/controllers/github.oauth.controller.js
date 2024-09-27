

import axios from 'axios';
import jwt from 'jsonwebtoken';
import appconf from '../config/config.js'
import { config } from 'dotenv';
config()


// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
export const getGithubAuthorizationUrl = async (req, res) => {
    const endpoint = "https://github.com/login/oauth/authorize";
    const parameters = {
        client_id: appconf.GITHUB_CLIENT_ID,
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

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
export const getUserAccessToken = async (client_id, client_secret, code) => {
    const endpoint = 'https://github.com/login/oauth/access_token';
    const body = {
        client_id,
        client_secret,
        code,
    }

    const response = await axios.post(endpoint, body, {
        headers: {
            'accept': 'application/json'
        }
    });
   
    return response?.data?.access_token;
}

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api
// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api
export const getUserData = async (user_access_token) => {
    const endpoint = "https://api.github.com/user";

    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${user_access_token}`
        }
    })

    return response.data;
    /*
        response.data: {
            3. userData :  {
                login: 'divyashantkumar',
                id: 105981407,
                node_id: 'U_kgDOBlEl3w',
                avatar_url: 'https://avatars.githubusercontent.com/u/105981407?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/divyashantkumar',
                html_url: 'https://github.com/divyashantkumar',
                followers_url: 'https://api.github.com/users/divyashantkumar/followers',
                following_url: 'https://api.github.com/users/divyashantkumar/following{/other_user}',
                gists_url: 'https://api.github.com/users/divyashantkumar/gists{/gist_id}',
                starred_url: 'https://api.github.com/users/divyashantkumar/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/divyashantkumar/subscriptions',
                organizations_url: 'https://api.github.com/users/divyashantkumar/orgs',
                repos_url: 'https://api.github.com/users/divyashantkumar/repos',
                events_url: 'https://api.github.com/users/divyashantkumar/events{/privacy}',
                received_events_url: 'https://api.github.com/users/divyashantkumar/received_events',
                type: 'User',
                site_admin: false,
                name: 'divyashant kumar',
                company: null,
                blog: '',
                location: null,
                email: null,    //EMAIL
                hireable: null,
                bio: null,
                twitter_username: null,
                notification_email: null,
                public_repos: 14,
                public_gists: 0,
                followers: 0,
                following: 0,
                created_at: '2022-05-21T14:36:49Z',
                updated_at: '2024-09-23T06:57:46Z'
            }
        }
    */
}

export const githubOAuthCallback = async (req, res) => {
    const authorizationCode = req?.query?.code;
    console.log("1. authorizationCode : ", authorizationCode)

    const user_access_token = await getUserAccessToken(appconf.GITHUB_CLIENT_ID, appconf.GITHUB_CLIENT_SECRET, authorizationCode)
    console.log("2. user_access_token : ", user_access_token)

    const userData = await getUserData(user_access_token);
    console.log("3. userData : ", userData);

    // replace true with some comdition like data save in ds success or not
    if (true) {
        const tokenSignature = {
            userData: {
                "email": userData?.email,
                "name": userData?.name,
                "picture": userData?.avatar_url,
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
}

export const githubDeauthorize = async (req, res) => {

}

export const githubDataDeletion = async (req, res) => {

}


/*
    *****We cannot get email of a user from "github user api" unless user allow his/her email to be accessable from their profile. 
    *****And in case of some github account the name parameter in response is also NULL.
    *****So we must handle that part ourselves. 
*/