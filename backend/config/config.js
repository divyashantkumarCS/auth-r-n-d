import { config } from "dotenv"
config();

export default {

    // GITHUB
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URL: process.env.GITHUB_REDIRECT_URL,
    GITHUB_APP_ACCESS_TOKEN: process.env.GITHUB_APP_ACCESS_TOKEN,

    // PINTREST OAuth2
    PINTREST_APP_ID: process.env.PINTREST_APP_ID,
    PINTREST_APP_SECRET: process.env.PINTREST_APP_SECRET,
    PINTREST_REDIRECT_URL: process.env.PINTREST_REDIRECT_URL,
    PINTREST_APP_ACCESS_TOKEN: process.env.PINTREST_APP_ACCESS_TOKEN,

    // TWITTER OAuth2,
    TWITTER_API_KEY: process.env.TWITTER_API_KEY,
    TWITTER_API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET,
    TWITTER_1_REDIRECT_URL: process.env.TWITTER_1_REDIRECT_URL,

    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    TWITTER_REDIRECT_URL: process.env.TWITTER_REDIRECT_URL,
}