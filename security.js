// Import necessary modules
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

// Initialize express app
const app = express();

// Function to initialize security measures
function initSecurity() {
    // Use Helmet to secure HTTP headers
    app.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use(limiter);

    // Protect against XSS attacks
    app.use(xss());

    // Prevent HTTP Parameter Pollution
    app.use(hpp());

    // Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    // Enable CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
}

// Export the initSecurity function
module.exports = {
    initSecurity
};
