# Lesson 1: Identifying Translatable Content in HTML Files

## Lesson Objectives
- Understand the structure of HTML files
- Identify elements that require translation
- Practice basic web localization techniques

## Required Tools
- Web browser: Google Chrome
- Text editor: Visual Studio Code
- Chrome Developer Tools

## Resources
- [Getting started with Visual Studio Code](https://code.visualstudio.com/docs/introvideos/basics)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [MDN Web Docs - HTML Localization](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [Chrome DevTools: Overview](https://developer.chrome.com/docs/devtools/overview)

**Presentation in Spanish-Mexico that Corresponds to this Lesson**
- [Localización Web para Principiantes (Español-México) - Lección 1: HTML](https://www.youtube.com/watch?v=SdTLpCEZDvE)

## Lesson Setup

### Project Structure
```
web-localization-for-beginners/
│
├── lesson1/
│   ├── TerminologyWebpage_LocDemo_en-US.html
│   ├── Resources/
│   │   ├── language-picker.js
│   │   ├── SemanticTriangle_en-US.png
│   │   ├── style.css
│   │   └── terminology-quiz_en-US.js
│   ├── Answers/
│   │   ├── TerminologyWebpage_LocDemo_es-MX.html
│   │   ├── SemanticTriangle_es-MX.png
│   │   └── terminology-quiz_es-MX.js
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

#### Step 4: Add the Translated Content
1. Once completed, move `TerminologyWebpage_LocDemo_es-MX.html` and `terminology-quiz_es-MX.js` (if translated) to the top-level directory
2. Refresh the browser
3. Verify that you are now able to switch the page between English and Spanish and that the interactive elements of the quiz work in both languages
4. Example localized files can be found in the Answers directory.

## Key Localization Areas to Focus On
- HTML Content
  - Page title
  - Headings (h1, h2, h3)
  - Paragraph text
  - Navigation elements
  - Lists
  - Figure captions
  - Comments

- Metadata and SEO
  - Character encoding (UTF-8)
  - HTML lang attribute using ISO language codes
  - Page title tag
  - Meta description

- Interactive Elements
  - Language selector
  - Quiz question text
  - Button text

- Accessibility
  - Image alt text
  - More advanced topics to cover later: ARIA labels, error messages

## Localization Considerations

### Text Expansion and Contraction
- Spanish typically expands 15-30% compared to English
- Ensure design flexibility for varying text lengths
- Test responsive layouts with translated content

### Context in Translation
- Translation is more than word-for-word conversion
- Understand the cultural and contextual nuances
- Consider: idiomatic expressions, cultural references, technical terminology, audience expectations

### More advanced topics to cover later
- Text direction to accomodate both left-to-right and right-to-left languages

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
  - Comments

## Inspecting the HTML Elements Using Chrome DevTools
- Right-click on page element
- Select "Inspect" or press Ctrl+Shift+I (Cmd+Option+I on Mac)
- Explore: HTML structure

## Localization Checklist
Create and localize the HTML elements in the `TerminologyWebpage_LocDemo_es-MX.html` file.
Refer to the `Assignment Checklist.docx` for detailed grading criteria and translation guidelines.

### Important Notes
- Preserve HTML formatting while translating
- Maintain grammatical correctness
- Consider cultural nuances
- Be mindful of text expansion in Spanish

### Extra Credit
Create and localize the `terminology-quiz-es-MX.js` file with culturally appropriate quiz content.

## Development Notes
- **AI Assistance:** This lesson was developed with support from Claude 3.5 Sonnet and Claude 3.5 Haiku
- **Localization Approach:** While externalizing strings into JSON files is a best practice, this lesson focuses on foundational localization concepts using inline content.

## Troubleshooting
- Ensure all files are in the correct directory
- Verify file paths and encoding
