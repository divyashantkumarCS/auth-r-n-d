import { Router } from "express";
import {
    getAuthorizationUrlFromGoogle,
    getTokensFromGoogle
} from "../controllers/google.oauth.controller.js";

import {
    facebookDataDeletion,
    facebookDeauthorize,
    facebookOauth,
    getLoginDialog
} from "../controllers/facebook.oauth.controller.js";

import {
    getInstaAuthorizationUrl,
    instagramDataDeletion,
    instagramDeauthorize,
    oAuthCallback
} from "../controllers/instagram.oauth.controller.js";
import { 
    getGithubAuthorizationUrl, 
    githubDataDeletion, 
    githubDeauthorize, 
    githubOAuthCallback 
} from "../controllers/github.oauth.controller.js";

export const oAuthRouter = Router();

// GOOGLE oauth routes
oAuthRouter.get('/getAuthorizationUrl', getAuthorizationUrlFromGoogle);

// google redirect endpoint
oAuthRouter.get('/google-callback/auth', getTokensFromGoogle)




// FACEBOOK oauth routes
oAuthRouter.get('/getLoginDialogUrl', getLoginDialog);
// facebook redirect endpoint
oAuthRouter.get('/facebook-oauth', facebookOauth);
oAuthRouter.get('/facebook/deauthorize', facebookDeauthorize);
oAuthRouter.get('/facebook/data_deletion', facebookDataDeletion);



// GUIDE
// https://www.filestack.com/docs/tutorials/instagram-oauth/
// INSTAGRAM oauth routes
oAuthRouter.get('/getInstaAuthorizationUrl', getInstaAuthorizationUrl);
// instagram redirect endpoint
oAuthRouter.get('/instagram-callback/auth', oAuthCallback);
oAuthRouter.get('/instagram/deauthorize', instagramDeauthorize);
oAuthRouter.get('/instagram/data_deletion', instagramDataDeletion);



// GITHUB oauth routes
oAuthRouter.get('/getGithubAuthorizationUrl', getGithubAuthorizationUrl);
// instagram redirect endpoint
oAuthRouter.get('/github-callback/auth', githubOAuthCallback);
oAuthRouter.get('/github/deauthorize', githubDeauthorize);
oAuthRouter.get('/github/data_deletion', githubDataDeletion);