# Lesson 3: JavaScript and Externalizing Strings

## Lesson Objectives
- Identify and explain the challenges of embedding translatable strings directly in JavaScript code
- Implement and demonstrate the JSON-based approach to externalize strings for efficient localization
- Compare the maintenance, workflow, and performance implications of different JavaScript localization methods
- Apply best practices for organizing localized content and implementing language switching functionality

## Required Tools
- Web browser: Google Chrome preferred
- Text editor: Visual Studio Code

## Lesson Setup

### Project Structure

#### Lesson 1
```
├── lesson1/
│   ├── TerminologyWebpage_LocDemo_en-US.html
│   ├── TerminologyWebpage_LocDemo_es-MX.html
│   ├── style.css
│   ├── SemanticTriangle_en-US.png
│   ├── SemanticTriangle_es-MX.png
│   ├── language-picker.js
│   ├── terminology-quiz_en-US.js
│   ├── terminology-quiz_es-MX.js
│   └── terminology-quiz_es-MX.js
```

#### Lesson 3
```
├── lesson3/
│   ├── TerminologyWebpage_LocDemo_en-US.html (improved version)
│   ├── TerminologyWebpage_LocDemo_es-MX.html (improved version)
│   ├── style.css
│   ├── SemanticTriangle_en-US.png
│   ├── SemanticTriangle_es-MX.png
│   ├── language-picker.js (improved version)
│   ├── quiz.js (unified JS file replacing the two separate files)
│   ├── locale/
│   │   ├── en-US.json (English strings)
│   └── └── es-MX.json (Spanish strings)
```

### Learning Process

#### Teaching Notes
This approach presented in this lesson prepares students for professional web development where localization is a standard requirement for global applications. This demonstration effectively shows:
- The Problem: The original files show direct string embedding in JS, requiring duplicate files for each language.
- The Solution: Externalizing strings to JSON and loading them dynamically.
- Real-world Application: This pattern is used by major internationalization libraries like i18next, react-intl, and vue-i18n.
- Developer Workflow: The workflow is now cleaner:
  - Developers write code once and mark elements for translation
  - Translators work with straightforward JSON files
  - Integration is automatic when JSON files are loaded

#### Step 1 - Initial Observations

The set of files from Lesson 1 demonstrates a common but problematic approach to localization:

Duplicated JavaScript files (terminology-quiz_en-US.js and terminology-quiz_es-MX.js)
- Almost identical code structure, but with translated strings embedded directly in the code
- Maintenance nightmare: any functional changes need to be implemented twice
- Risk of functionality divergence between language versions

Error messages in language-picker.js
- Uses a JavaScript object to store localized error messages
- Better than duplicating files, but still mixes code and content

#### Step 2 - Show the Specific Problems with the Current Implementation
- Code duplication - Show how the two quiz JS files are nearly identical except for strings
- Maintenance challenges - Explain how a bug fix would require changes in multiple files
- Increased file size - Duplicated code increases download sizes
- Developer/translator workflow issues - Translators need to work with code files
- Context issues - Translators may not understand the context of strings embedded in code

#### Step 3 - Demonstrate the Improved JSON Implementation

Show the file structure with the JSON implementation to demonstrate the better approach:
- A single unified quiz.js file that loads strings from JSON
- Separate JSON files for each language (en-US.json, es-MX.json)

This demonstrates:
- **Separation of Code and Content (i.e. separation of concerns)** - Code (functionality logic) remains separate from content (translatable strings), allowing translators to work with simple JSON files without touching code and developers to update functionality without risking translation issues.
- **Simplified Maintenance** - Only one JavaScript file needs maintenance for each feature, bug fixes automatically apply to all language versions, and adding new languages requires only creating new JSON files.
- **Better Context for Translators** - JSON structure provides logical grouping of related strings, ability to add notes or context for translators, and clear organization of UI elements, error messages, etc.
- **Improved Loading Performance** - Load a single JS file plus small JSON files instead of multiple large JS files and significantly improves page load times for multilingual sites.
- **Enhanced Translation Quality** - Support for pluralization through explicit handling, proper formatting of strings with placeholders, and ability to handle language-specific grammar rules.

## Localization Assignment

### Part 1: Compare Implementation Approaches

Navigate to the Lesson1 folder and examine the following files:
- terminology-quiz_en-US.js
- terminology-quiz_es-MX.js (If you created this file during Lesson 1, use your version)
- language-picker.js

Make notes on the following:
- How are strings handled in these JavaScript files?
- What are the potential maintenance challenges when adding features or fixing bugs?
- How would a translator need to work with these files?

### Part 2: Explore the JSON-based Approach
Navigate to the Lesson3 folder and examine the following files:
- quiz.js (the unified JavaScript file)
- locale/en-US.json (the externalized English strings)

Take note of how the new implementation:
- Separates code from translatable content
- Organizes strings in a structured format
- Loads language resources dynamically

### Part 3: Create a Spanish JSON Translation
1. Using locale/en-US.json as your template, create a new file named es-MX.json in the locale folder.
2. Translate all strings from English to Spanish, maintaining the exact same JSON structure and key names.
3. Pay special attention to:
- Question text and answer options
- Feedback messages
- UI labels and instructions

### Part 4: Test Your Implementation
1. After creating your Spanish JSON file, open TerminologyWebpage_LocDemo_en-US.html in your browser.
2.  Use the language switcher to change to Spanish.
3. Verify that:
- All text elements display correctly in Spanish
- The quiz functionality works properly
- You can switch between languages without issues

### Part 5: Reflection
In a short paragraph (100-150 words), reflect on the advantages of the JSON-based approach compared to having separate JavaScript files for each language. Consider:
- Development workflow
- Maintenance requirements
- Translation process
- Performance implications

Submit your completed es-MX.json file and reflection paragraph.

### Assignment Evaluation

- **Full Points:** Created a properly formatted es-MX.json file with accurate translations, maintained correct JSON structure, and submitted a complete reflection demonstrating understanding of the advantages.
- **Half Points:** Created an es-MX.json file with minor formatting issues or translation errors, or submitted an incomplete reflection that only partially addresses the advantages.
- **No Points:** Failed to create a working es-MX.json file, or the file has major structural problems that prevent functionality, or did not submit a reflection.
