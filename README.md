```
  ___        _      _    _  __          
 / _ \ _   _(_) ___| | _| |/ /___ _   _ 
| | | | | | | |/ __| |/ / ' // _ \ | | |
| |_| | |_| | | (__|   <| . \  __/ |_| |
 \__\_\\__,_|_|\___|_|\_\_|\_\___|\__, |
                                  |___/ 
```

# QuickKey 🔐

A powerful, modular CLI tool for generating secure passwords and API keys with ease. QuickKey provides an interactive terminal interface with beautiful ASCII art and instant clipboard integration.

## ✨ Features

- 🎨 **Beautiful ASCII Interface** - Eye-catching terminal UI with colorful output
- 🔐 **Secure Password Generation** - Customizable passwords with uppercase, lowercase, numbers, and symbols
- 🔑 **API Key Generation** - Generate secure API keys with uppercase letters and numbers
- 📋 **Clipboard Integration** - Automatically copy generated keys to your clipboard
- 🎯 **Input Validation** - Graceful error handling and input validation
- 🔄 **Interactive Menu** - Easy-to-use menu system that keeps you in the flow
- 🧩 **Modular Architecture** - Clean, reusable functions for developers

## 📦 Installation

### Global Installation (Recommended)

Install QuickKey globally to use it anywhere on your system:

```bash
npm install -g quickkey
```

After installation, simply run:

```bash
quickkey
```

### Local Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/quickkey.git
cd quickkey
npm install
```

Link the package locally:

```bash
npm link
```

Now you can run `quickkey` from anywhere!

### Run Without Installation

```bash
npx quickkey
```

## 🚀 Usage

### Interactive Mode

Simply run the command and follow the interactive prompts:

```bash
quickkey
```

### Password Generation

1. Select "Generate Password" from the main menu
2. Specify the desired length (4-128 characters, default: 16)
3. Choose which character types to include:
   - Uppercase letters (A-Z)
   - Lowercase letters (a-z)
   - Numbers (0-9)
   - Symbols (!@#$%^&*()_+-=[]{}|;:,.<>?)
4. Your password is generated and automatically copied to clipboard!

**Example Output:**
```
✅ Password generated successfully!
────────────────────────────────────────────────────────────

  aB3$xK9#mN2@pQ7!

────────────────────────────────────────────────────────────
📋 Copied to clipboard!
```

### API Key Generation

1. Select "Generate API Key" from the main menu
2. Specify the desired length (16-128 characters, default: 32)
3. Your API key is generated (uppercase letters + numbers) and copied to clipboard!

**Example Output:**
```
✅ API Key generated successfully!
────────────────────────────────────────────────────────────

  K9X2M7P4Q8R3T6Y1W5N0Z4A8C2

────────────────────────────────────────────────────────────
📋 Copied to clipboard!
```

## 🛠️ For Developers

### Modular Functions

QuickKey is built with modularity in mind. You can import and use the core functions in your own projects:

```javascript
const { generatePassword, generateApiKey, copyToClipboard } = require('./keyforge');

// Generate a 20-character password with all character types
const password = generatePassword(20, {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true
});

// Generate a 32-character API key
const apiKey = generateApiKey(32);

// Copy to clipboard
await copyToClipboard(password);
```

### Function Reference

#### `generatePassword(length, options)`

Generates a random password.

**Parameters:**
- `length` (number, default: 16): Length of the password (4-128)
- `options` (object):
  - `uppercase` (boolean, default: true): Include uppercase letters
  - `lowercase` (boolean, default: true): Include lowercase letters
  - `numbers` (boolean, default: true): Include numbers
  - `symbols` (boolean, default: true): Include symbols

**Returns:** String

#### `generateApiKey(length)`

Generates a random API key with uppercase letters and numbers.

**Parameters:**
- `length` (number, default: 32): Length of the API key (16-128)

**Returns:** String

#### `copyToClipboard(text)`

Copies text to the system clipboard.

**Parameters:**
- `text` (string): Text to copy

**Returns:** Promise<boolean> - Success status

## 📚 Dependencies

QuickKey is built with the following awesome packages:

- **[chalk](https://www.npmjs.com/package/chalk)** - Terminal string styling
- **[figlet](https://www.npmjs.com/package/figlet)** - ASCII art text generation
- **[inquirer](https://www.npmjs.com/package/inquirer)** - Interactive command line prompts
- **[clipboardy](https://www.npmjs.com/package/clipboardy)** - Cross-platform clipboard access

## 🔒 Security

QuickKey uses JavaScript's built-in `Math.random()` for key generation, which is suitable for most use cases. For cryptographically secure random number generation in production environments, consider using Node.js's `crypto.randomBytes()`.

## 📝 License

MIT License - feel free to use QuickKey in your projects!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/quickkey/issues).

## 👨‍💻 Author

Created with ❤️ by the QuickKey team

## 🌟 Show Your Support

If you find QuickKey helpful, please give it a ⭐️ on [GitHub](https://github.com/yourusername/quickkey)!

## 📖 Changelog

### Version 1.0.0
- Initial release
- Password generation with customizable options
- API key generation
- Clipboard integration
- Interactive CLI menu
- ASCII art banner

---

**Happy Key Generating! 🔐✨**
