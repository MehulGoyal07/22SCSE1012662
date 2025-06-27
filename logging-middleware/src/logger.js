const axios = require('axios');

const ALLOWED_STACKS = ["backend", "frontend"];
const ALLOWED_LEVELS = ["debug", "warn", "error", "fatal"];
const ALLOWED_PACKAGES = {
    backend: ["cache", "controller", "cron job", "db", "domain", "handler", "repository", "route"],
    frontend: ["service", "api", "component", "hook", "page", "state", "style"],
    common: ["auth", "config", "middleware", "utils"]
};

const validateInput = (stack, level, packageName) => {
    if (!ALLOWED_STACKS.includes(stack)) {
        throw new Error(`Invalid stack. Allowed: ${ALLOWED_STACKS.join(", ")}`);
    }
    if (!ALLOWED_LEVELS.includes(level)) {
        throw new Error(`Invalid level. Allowed: ${ALLOWED_LEVELS.join(", ")}`);
    }

    const allowedPackages = [...ALLOWED_PACKAGES[stack], ...ALLOWED_PACKAGES.common];
    if (!allowedPackages.includes(packageName)) {
        throw new Error(`Invalid package for ${stack}. Allowed: ${allowedPackages.join(", ")}`);
    }
};

const Log = async(stack, level, packageName, message, authToken) => {
    try {
        validateInput(stack, level, packageName);

        const response = await axios.post(
            'http://20.244.56.144/evaluation-service/logs', {
                stack: stack.toLowerCase(),
                level: level.toLowerCase(),
                package: packageName.toLowerCase(),
                message: message
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        console.log(`Log sent successfully (ID: ${response.data.logID})`);
        return response.data;
    } catch (error) {
        console.error("Logging failed:", error.message);
        throw error;
    }
};

module.exports = Log;