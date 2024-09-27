import { config } from "dotenv"
config();

export default {

    // GITHUB
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URL: process.env.GITHUB_REDIRECT_URL,
    GITHUB_APP_ACCESS_TOKEN: process.env.GITHUB_APP_ACCESS_TOKEN,
}