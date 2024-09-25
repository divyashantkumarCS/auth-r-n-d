import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'

// Routers
import { oAuthRouter } from './routes/oauth.route.js';

// Load environment variables from a .env file into process.env
config();

// Define the port number from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Initialize an Express application
const app = express();

// handle CORS(cross origin resource sharing) requests
app.use(cors());


// Route for OAuth API
app.use('/api/v1', oAuthRouter);

// // Default root route (must be placed after specific routes to avoid conflicts)
// app.use('/', (req, res) => {
//     res.send(`<h1>Server is active</h1>`);
// });


// Start the server and listen on the specified port for incoming requests
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Caught an error: ${err}`);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});
