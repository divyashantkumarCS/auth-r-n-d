import { Router } from "express";
import {
    getAuthorizationUrlFromGoogle,
    getTokensFromGoogle
} from "../controllers/google.oauth2.controller.js";
import {
    facebookDataDeletion,
    facebookDeauthorize,
    facebookOauth,
    getLoginDialog
} from "../controllers/facebook.oauth2.controller.js";
import {
    getInstaAuthorizationUrl,
    instagramDataDeletion,
    instagramDeauthorize,
    oAuthCallback
} from "../controllers/instagram.oauth2.controller.js";
import {
    getGithubAuthorizationUrl,
    githubDataDeletion,
    githubDeauthorize,
    githubOAuthCallback
} from "../controllers/github.oauth2.controller.js";
import {
    getPintrestAuthorizationUrl,
    pintrestOAuthCallback,
    pintrestDeauthorize,
    pintrestDataDeletion,
} from "../controllers/pintrest.oauth2.controller.js";
import {
    getTwitterAuthorizationUrl,
    twitterOAuthCallback,
    twitterDeauthorize,
    twitterDataDeletion
} from "../controllers/twitter.oauth2.controller.js";

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



// PINTREST oauth routes
oAuthRouter.get('/getPintrestAuthorizationUrl', getPintrestAuthorizationUrl);
// instagram redirect endpoint
oAuthRouter.get('/pintrest-callback/auth', pintrestOAuthCallback);
oAuthRouter.get('/pintrest/deauthorize', pintrestDeauthorize);
oAuthRouter.get('/pintrest/data_deletion', pintrestDataDeletion);



// TWITTER oauth routes
oAuthRouter.get('/getTwitterAuthorizationUrl', getTwitterAuthorizationUrl);
// instagram redirect endpoint
oAuthRouter.get('/twitter-callback/auth', twitterOAuthCallback);
oAuthRouter.get('/twitter/deauthorize', twitterDeauthorize);
oAuthRouter.get('/twitter/data_deletion', twitterDataDeletion);

