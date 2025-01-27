# Chrome Speech to Text Extension

This project is a Chrome extension that utilizes the Web Speech API to provide speech-to-text functionality. It allows users to convert spoken words into text within the browser.

## Project Structure

```
5_value_first
└── exercises
    └── chrome-speech-to-text
        ├── src
        │   ├── background.ts
        │   ├── content.ts
        │   ├── popup.ts
        │   └── types
        │       └── index.ts
        ├── public
        │   ├── popup.html
        │   ├── manifest.json
        │   └── styles.css
        ├── package.json
        ├── tsconfig.json
        └── README.md
```

## Setup Instructions

1. **Clone the Repository**
   Clone this repository to your local machine using:
   ```
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**
   Change to the project directory:
   ```
   cd 5_value_first/exercises/chrome-speech-to-text
   ```

3. **Install Dependencies**
   Install the required npm packages:
   ```
   npm install
   ```

4. **Build the Project**
   Compile the TypeScript files:
   ```
   npm run build
   ```

5. **Load the Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click on "Load unpacked" and select the `public` directory of this project.

## Usage

- Click on the extension icon to open the popup.
- Press the "Start" button to begin speech recognition.
- Speak into your microphone, and the recognized text will appear in the text area.

## License

This project is licensed under the MIT License. See the LICENSE file for details.