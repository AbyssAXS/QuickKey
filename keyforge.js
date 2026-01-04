/**
 * KeyForge - Modular password and API key generation functions
 */

/**
 * Generate a random password with customizable options
 * @param {number} length - Length of the password (default: 16)
 * @param {object} options - Options for character sets
 * @param {boolean} options.uppercase - Include uppercase letters (default: true)
 * @param {boolean} options.lowercase - Include lowercase letters (default: true)
 * @param {boolean} options.numbers - Include numbers (default: true)
 * @param {boolean} options.symbols - Include symbols (default: true)
 * @returns {string} Generated password
 */
function generatePassword(length = 16, options = {}) {
  const defaults = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  };

  const settings = { ...defaults, ...options };

  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  // Build character pool based on options
  let characterPool = '';
  if (settings.uppercase) characterPool += charSets.uppercase;
  if (settings.lowercase) characterPool += charSets.lowercase;
  if (settings.numbers) characterPool += charSets.numbers;
  if (settings.symbols) characterPool += charSets.symbols;

  // Validation
  if (characterPool.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  if (length < 4 || length > 128) {
    throw new Error('Password length must be between 4 and 128 characters');
  }

  // Generate password
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
}

/**
 * Generate a random API key
 * @param {number} length - Length of the API key (default: 32)
 * @returns {string} Generated API key
 */
function generateApiKey(length = 32) {
  // Validation
  if (length < 16 || length > 128) {
    throw new Error('API key length must be between 16 and 128 characters');
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let apiKey = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    apiKey += characters[randomIndex];
  }

  return apiKey;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy to clipboard
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
  try {
    const clipboardy = require('clipboardy');
    await clipboardy.write(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error.message);
    return false;
  }
}

module.exports = {
  generatePassword,
  generateApiKey,
  copyToClipboard
};
