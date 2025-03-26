import validator from 'validator';
import winston from 'winston';

export class Utils {
    // Configuration de Winston pour la journalisation
    private static logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });

    /**
     * Sanitize and validate an email address.
     * @param email - The email address to sanitize.
     * @returns The sanitized email or null if invalid.
     */
    static sanitizeEmail(email: string): string | null | any  {
        if (!email) {
            this.logger.warn('Email input is empty');
            return null;
        }

        if (validator.isEmail(email)) {
            const sanitizedEmail = validator.normalizeEmail(email);
            this.logger.info(`Sanitized email input: "${email}" to "${sanitizedEmail}"`);
            return sanitizedEmail;
        } else {
            this.logger.warn(`Invalid email input: "${email}"`);
            return null;
        }
    }

    /**
     * Sanitize input value based on its type.
     * @param value - The input value to sanitize.
     * @returns The sanitized value or null if invalid.
     */
    static sanitizeInput(value: string | number | null): string | number | null {
        if (value === null) {
            this.logger.info('Input value is null');
            return null;
        }

        if (typeof value === 'string') {
            const trimmedValue = validator.trim(value);
            if (validator.isEmail(trimmedValue)) {
                return this.sanitizeEmail(trimmedValue);
            } else {
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
    static validateUsername(username: string): boolean {
        const isValid = validator.isAlphanumeric(username) && username.length >= 3 && username.length <= 20;
        this.logger.info(`Username validation for "${username}": ${isValid}`);
        return isValid;
    }

    /**
     * Validate a password.
     * @param password - The password to validate.
     * @returns True if valid, false otherwise.
     */
    static validatePassword(password: string): boolean {
        const isValid = password.length >= 8; // Add more complex validation as needed
        this.logger.info(`Password validation for provided password: ${isValid}`);
        return isValid;
    }

    /**
     * Generate a random string for use as a token or identifier.
     * @param length - The length of the generated string.
     * @returns A random string of the specified length.
     */
    static generateRandomString(length: number): string {
        const randomString = [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
        this.logger.info(`Generated random string of length ${length}: ${randomString}`);
        return randomString;
    }
}