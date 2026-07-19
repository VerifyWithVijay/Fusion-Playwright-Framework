import dotenv from "dotenv";
import path from "path";

// Default environment
const testEnv = process.env.TEST_ENV || "qa";

// Load .env only if running locally
if (process.env.JENKINS_HOME) {
    console.log("Running inside Jenkins");
} else {
    dotenv.config({
        path: path.resolve(process.cwd(), `.env.${testEnv}`),
    });
}

// Validate required variables
const requiredVariables = [
    "BASE_URL",
    "SAUCE_USERNAME",
    "SAUCE_PASSWORD",
];

requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`${variable} is missing.`);
    }
});

export const env = {
    BASE_URL: process.env.BASE_URL!,
    USERNAME: process.env.SAUCE_USERNAME!,
    PASSWORD: process.env.SAUCE_PASSWORD!,
};