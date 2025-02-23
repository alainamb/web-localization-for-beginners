# Lesson 1: Identifying Translatable Content in HTML Files

## Lesson Objectives
- Understand the structure of HTML files
- Identify elements that require translation
- Practice basic web localization techniques

## Required Tools
- Web browser: Google Chrome
- Text editor: Visual Studio Code
- Chrome Developer Tools

## Lesson Setup

### Project Structure
```
web-localization-for-beginners/
│
├── lesson1/
│   ├── TerminologyWebpage_LocDemo_en-US.html
│   ├── resources/
│   │   ├── language-picker.js
│   │   ├── Making Meaning of Language.png
│   │   ├── style.css
│   │   └── terminology-quiz-en-US.js
│   ├── Lesson1_README.md
│   └── Assignment Checklist.md
```

### Learning Process

#### Step 1: Initial Observation
1. Open `TerminologyWebpage_LocDemo_en-US.html` in Google Chrome
2. Notice that only text appears without styles or interactivity

#### Step 2: Adding Styles
1. Move `style.css` to the top-level directory
2. Refresh the browser
3. Observe how styles are now applied

#### Step 3: Adding Interactivity
1. Move `language-picker.js` and `terminology-quiz_en-US.js` to the top-level directory
2. Refresh the browser
3. Verify that interactive elements are now functioning

## Key Localization Areas to Focus On
- HTML Content
  - Page title
  - Headings (h1, h2, h3)
  - Paragraph text
  - Navigation elements
  - Lists
  - Figure captions

- Metadata and SEO
  - HTML lang attribute
  - Page title tag
  - Meta description

- Interactive Elements
  - Language selector
  - Quiz question text
  - Button text

- Accessibility
  - Image alt text
  - ARIA labels
  - Form input descriptions
  - Error messages

## Visual Studio Code Exploration
- Open files in Visual Studio Code
- Inspect HTML structure
- Identify key elements for translation:
  - `<head>` section
  - `<body>` content
  - `<div>` containers
  - Paragraph tags
  - Headings
  - Lists

## Inspecting the Webpage Using Chrome DevTools
- Navigating the Elements tab: HTML in main area; CSS under Styles on the right

## Localization Checklist
Create and localize the HTML elements in the `TerminologyWebpage_LocDemo_es-MX.html` file.
Refer to the `Assignment Checklist.docx` for detailed grading criteria and translation guidelines.

## Important Notes
- Preserve HTML formatting while translating
- Maintain grammatical correctness
- Consider cultural nuances
- Be mindful of text expansion in Spanish

## Extra Credit
Create and localize the `terminology-quiz-es-MX.js` file with culturally appropriate quiz content.

## Development Notes
- **AI Assistance:** This lesson was developed with support from Claude 3.5 Sonnet and Claude 3.5 Haiku
- **Localization Approach:** Inline content used to focus on fundamental concepts

## Next Steps
Prepare for Lesson 2: SEO Optimization for Localized Websites

## Troubleshooting
- Ensure all files are in the correct directory
- Check browser console for any JavaScript errors
- Verify file paths and encoding

## Resources
- [Getting started with Visual Studio Code](https://code.visualstudio.com/docs/introvideos/basics)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [MDN Web Docs - HTML Localization](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [Chrome DevTools: Overview](https://developer.chrome.com/docs/devtools/overview)
