"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const validator_1 = __importDefault(require("validator"));
const winston_1 = __importDefault(require("winston"));
class Utils {
    /**
     * Sanitize and validate an email address.
     * @param email - The email address to sanitize.
     * @returns The sanitized email or null if invalid.
     */
    static sanitizeEmail(email) {
        if (!email) {
            this.logger.warn('Email input is empty');
            return null;
        }
        if (validator_1.default.isEmail(email)) {
            const sanitizedEmail = validator_1.default.normalizeEmail(email);
            this.logger.info(`Sanitized email input: "${email}" to "${sanitizedEmail}"`);
            return sanitizedEmail;
        }
        else {
            this.logger.warn(`Invalid email input: "${email}"`);
            return null;
        }
    }
    /**
     * Sanitize input value based on its type.
     * @param value - The input value to sanitize.
     * @returns The sanitized value or null if invalid.
     */
    static sanitizeInput(value) {
        if (value === null) {
            this.logger.info('Input value is null');
            return null;
        }
        if (typeof value === 'string') {
            const trimmedValue = validator_1.default.trim(value);
            if (validator_1.default.isEmail(trimmedValue)) {
                return this.sanitizeEmail(trimmedValue);
            }
            else {
                this.logger.info(`Sanitized string input: "${value}" to "${trimmedValue}"`);
                return trimmedValue;
            }
        }
        if (typeof value === 'number') {
            this.logger.info(`Input value is a number: ${value}`);
            return value;
        }
        this.logger.warn(`Unexpected input type: ${typeof value}`);
        return null; // Retourne null pour les types inattendus
    }
    /**
     * Validate a username.
     * @param username - The username to validate.
     * @returns True if valid, false otherwise.
     */
    static validateUsername(username) {
        const isValid = validator_1.default.isAlphanumeric(username) && username.length >= 3 && username.length <= 20;
        this.logger.info(`Username validation for "${username}": ${isValid}`);
        return isValid;
    }
    /**
     * Validate a password.
     * @param password - The password to validate.
     * @returns True if valid, false otherwise.
     */
    static validatePassword(password) {
        const isValid = password.length >= 8; // Add more complex validation as needed
        this.logger.info(`Password validation for provided password: ${isValid}`);
        return isValid;
    }
    /**
     * Generate a random string for use as a token or identifier.
     * @param length - The length of the generated string.
     * @returns A random string of the specified length.
     */
    static generateRandomString(length) {
        const randomString = [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
        this.logger.info(`Generated random string of length ${length}: ${randomString}`);
        return randomString;
    }
}
exports.Utils = Utils;
// Configuration de Winston pour la journalisation
Utils.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'combined.log' })
    ]
});
