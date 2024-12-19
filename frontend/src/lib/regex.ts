/**
 * Validates an email address.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export const validateEmail = (email: string): boolean => {
    const regex = /^[\w!#$%&'*+/=?`{|}~^.-]+(?:\.[\w!#$%&'*+/=?`{|}~^.-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

/**
 * Validates a Sri Lankan phone number.
 * 
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
export const validatePhone = (phone: string): boolean => {
    const regex = /^(?:\+94|0)?(7[0-9]{8})$/;
    return regex.test(phone);
}

/**
 * Validates a password.
 * The password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.
 * 
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */
export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}

/**
 * Validates a name.
 * The name can only contain letters and must be a maximum of 10 characters long.
 * 
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
export const validateName = (name: string): boolean => {
    const regex = /^[a-zA-Z]{1,10}$/;
    return regex.test(name);
}