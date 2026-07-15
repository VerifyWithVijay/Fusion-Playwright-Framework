import dotenv from "dotenv";
import path from "path";

// If TEST_ENV is not provided, use QA by default
const testEnv = process.env.TEST_ENV || "qa";

// Build the file name dynamically
const envFile = `.env.${testEnv}`;

// Load the selected environment file
dotenv.config({
    path: path.resolve(process.cwd(), envFile),
});

// Validate required variables
if (
    !process.env.BASE_URL ||
    !process.env.SAUCE_USERNAME ||
    !process.env.SAUCE_PASSWORD
) {
    throw new Error(
        `Failed to load environment variables from ${envFile}`
    );
}

export const env = {
    BASE_URL: process.env.BASE_URL,
    USERNAME: process.env.SAUCE_USERNAME,
    PASSWORD: process.env.SAUCE_PASSWORD,
};