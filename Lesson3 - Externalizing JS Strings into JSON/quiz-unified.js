// quiz.js - Unified version with externalized strings
// This file replaces terminology-quiz_en-US.js and terminology-quiz_es-MX.js

// Helper function to format strings (simple placeholder replacement)
function formatString(str, ...args) {
    return str.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

function submitAnswers() {
    // Get the questions data from the loaded i18n object
    try {
        // Check if i18n is loaded
        if (!window.i18n || !window.i18n.quiz) {
            console.error('i18n data is not loaded properly');
            const errorElement = document.getElementById('quiz-error') || createErrorElement();
            errorElement.textContent = "Quiz data is not loaded. Please refresh the page.";
            errorElement.style.display = 'block';
            return false;
        }

        const form = document.forms["quizForm"];
        if (!form) {
            throw new Error(i18n.quiz.errorMessages.formNotFound || "Quiz form not found");
        }

        let unansweredQuestions = [];
        let totalCorrect = 0;
        
        // Define questions based on our externalized strings
        const questions = {
            q1: {
                correct: i18n.quiz.question1.correctAnswer,
                correctFeedback: i18n.quiz.question1.correctFeedback,
                incorrectFeedback: i18n.quiz.question1.incorrectFeedback
            },
            q2: {
                correct: i18n.quiz.question2.correctAnswer,
                correctFeedback: i18n.quiz.question2.correctFeedback,
                incorrectFeedback: i18n.quiz.question2.incorrectFeedback
            },
            q3: {
                correct: i18n.quiz.question3.correctAnswer,
                correctFeedback: i18n.quiz.question3.correctFeedback,
                incorrectFeedback: i18n.quiz.question3.incorrectFeedback
            }
        };

        // Hide any previous error messages and feedback
        const errorElement = document.getElementById('quiz-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        // Clear any previous feedback
        document.querySelectorAll('.feedback').forEach(element => {
            element.innerHTML = '';
        });

        // Remove any existing score display
        const existingScoreDisplay = document.getElementById('score-display');
        if (existingScoreDisplay) {
            existingScoreDisplay.remove();
        }

        // Loop through each question to check if all are answered
        for (const question in questions) {
            const radioButtons = form.elements[question];
            
            if (!radioButtons) {
                throw new Error(formatString(i18n.quiz.errorMessages.radioButtonsNotFound || "Radio buttons for question {0} not found", question));
            }

            // Check if question is answered
            let selectedValue = "";
            for (let i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked) {
                    selectedValue = radioButtons[i].value;
                    break;
                }
            }

            if (selectedValue === "") {
                unansweredQuestions.push(question.replace('q', ''));
            }
        }

        // Handle unanswered questions
        if (unansweredQuestions.length > 0) {
            const questionLabel = unansweredQuestions.length === 1 ? 
                i18n.quiz.errorMessages.question : 
                i18n.quiz.errorMessages.questions;
                    
            const errorMsg = formatString(
                i18n.quiz.errorMessages.unansweredQuestion || "Please answer {0} {1}",
                questionLabel,
                unansweredQuestions.join(', ')
            );
            
            const errorElement = document.getElementById('quiz-error') || createErrorElement();
            errorElement.textContent = errorMsg;
            errorElement.className = 'message error-message'; // This line needs to be added
            errorElement.style.display = 'block';
            
            // Scroll to the error message
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return false;
        }

        // Process answers only if all questions are answered
        for (const question in questions) {
            const radioButtons = form.elements[question];
            const feedbackElement = document.getElementById("feedback_" + question);
            
            if (!feedbackElement) {
                throw new Error(formatString(i18n.quiz.errorMessages.feedbackNotFound || "Feedback element for question {0} not found", question));
            }

            // Get selected value
            let selectedValue = "";
            for (let i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked) {
                    selectedValue = radioButtons[i].value;
                    break;
                }
            }

            // Process answer
            const isCorrect = selectedValue === questions[question].correct;
            if (isCorrect) {
                totalCorrect++;
                feedbackElement.innerHTML = questions[question].correctFeedback;
                feedbackElement.style.color = "green";
            } else {
                // Handle different types of incorrect feedback data structures
                let feedback;
                if (typeof questions[question].incorrectFeedback === 'string') {
                    feedback = questions[question].incorrectFeedback;
                } else if (typeof questions[question].incorrectFeedback === 'object') {
                    feedback = questions[question].incorrectFeedback[selectedValue] || 
                        (i18n.quiz.errorMessages && i18n.quiz.errorMessages.incorrect ? 
                        i18n.quiz.errorMessages.incorrect : "Incorrect. Please try again.");
                } else {
                    feedback = i18n.quiz.errorMessages && i18n.quiz.errorMessages.incorrect ? 
                        i18n.quiz.errorMessages.incorrect : "Incorrect. Please try again.";
                }
                feedbackElement.innerHTML = feedback;
                feedbackElement.style.color = "red";
            }

            // Make feedback accessible to screen readers
            feedbackElement.setAttribute('role', 'alert');
        }

        // Create and display score announcement
        const scoreText = formatString(
            i18n.quiz.errorMessages.scoreAnnouncement || "You got {0} out of {1} questions correct", 
            totalCorrect, 
            Object.keys(questions).length
        );
        
        // Create visible score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.id = 'score-display';
        scoreDisplay.className = 'message'; // Base message class
        
        // Style based on score
        if (totalCorrect === Object.keys(questions).length) {
            // All correct - green styling
            scoreDisplay.classList.add('success-message');
        } else {
            // Some incorrect - red styling
            scoreDisplay.classList.add('error-message');
        }
        
        scoreDisplay.textContent = scoreText;
        
        // Add for screen readers
        scoreDisplay.setAttribute('role', 'status');
        scoreDisplay.setAttribute('aria-live', 'polite');
        
        // Add the score display after the form
        const quizForm = document.getElementById('quizForm');
        quizForm.parentNode.insertBefore(scoreDisplay, quizForm.nextSibling);
        
        // Scroll to show the score
        scoreDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error('Quiz error:', error);
        const errorElement = document.getElementById('quiz-error') || createErrorElement();
        errorElement.textContent = i18n.quiz.errorMessages?.processingError || "An error occurred while processing your answers. Please refresh the page and try again.";
        errorElement.style.display = 'block';
    }

    return false;
}

function createErrorElement() {
    const errorElement = document.createElement('div');
    errorElement.id = 'quiz-error';
    errorElement.className = 'message error-message'; // Use our CSS classes
    errorElement.setAttribute('role', 'alert');
    
    // Insert at the top of the form
    const quizForm = document.getElementById('quizForm');
    const quizContainer = document.querySelector('.quiz-container');
    
    if (quizContainer && quizForm) {
        quizContainer.insertBefore(errorElement, quizForm);
    } else if (quizContainer) {
        quizContainer.prepend(errorElement);
    }
    
    return errorElement;
}

// Function to initialize quiz UI with loaded i18n data
function initializeQuiz() {
    if (!window.i18n || !window.i18n.quiz) {
        console.warn('Quiz initialization attempted but i18n data not available yet');
        return;
    }

    // Update quiz title and intro
    const quizTitle = document.getElementById('quiz-title');
    const quizIntro = document.getElementById('quiz-intro');
    
    if (quizTitle) quizTitle.textContent = i18n.quiz.title;
    if (quizIntro) quizIntro.textContent = i18n.quiz.intro;
    
    // Question 1
    const q1Title = document.getElementById('q1-title');
    const q1Text = document.getElementById('q1-text');
    const q1aLabel = document.getElementById('q1a-label');
    const q1bLabel = document.getElementById('q1b-label');
    
    if (q1Title) q1Title.textContent = i18n.quiz.question1.title;
    if (q1Text) q1Text.textContent = i18n.quiz.question1.text;
    if (q1aLabel) q1aLabel.textContent = i18n.quiz.question1.options.true;
    if (q1bLabel) q1bLabel.textContent = i18n.quiz.question1.options.false;
    
    // Question 2
    const q2Title = document.getElementById('q2-title');
    const q2Text = document.getElementById('q2-text');
    const q2aLabel = document.getElementById('q2a-label');
    const q2bLabel = document.getElementById('q2b-label');
    
    if (q2Title) q2Title.textContent = i18n.quiz.question2.title;
    if (q2Text) q2Text.textContent = i18n.quiz.question2.text;
    if (q2aLabel) q2aLabel.textContent = i18n.quiz.question2.options.independent;
    if (q2bLabel) q2bLabel.textContent = i18n.quiz.question2.options.specific;
    
    // Question 3
    const q3Title = document.getElementById('q3-title');
    const q3Text = document.getElementById('q3-text');
    const q3aLabel = document.getElementById('q3a-label');
    const q3bLabel = document.getElementById('q3b-label');
    const q3cLabel = document.getElementById('q3c-label');
    
    if (q3Title) q3Title.textContent = i18n.quiz.question3.title;
    if (q3Text) q3Text.textContent = i18n.quiz.question3.text;
    if (q3aLabel) q3aLabel.textContent = i18n.quiz.question3.options.renderingIdeas;
    if (q3bLabel) q3bLabel.textContent = i18n.quiz.question3.options.writtenContent;
    if (q3cLabel) q3cLabel.textContent = i18n.quiz.question3.options.verbalContent;
    
    // Update submit button
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.textContent = i18n.quiz?.ui?.submitButton || i18n.ui?.submitButton || "Submit Answers";
        
        // Add click event listener to the submit button if not already added
        if (!submitButton.hasAttribute('data-listener-added')) {
            submitButton.addEventListener('click', submitAnswers);
            submitButton.setAttribute('data-listener-added', 'true');
        }
    }
    
    // Clear any existing feedback
    document.querySelectorAll('.feedback').forEach(element => {
        element.innerHTML = '';
    });
    
    // Hide any existing error or score display
    const errorElement = document.getElementById('quiz-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.remove();
    }
    
    // Show quiz container as it's now ready
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.style.display = 'block';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz script loaded, waiting for i18n data...');
    
    // Initially hide quiz container until strings are loaded
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.style.display = 'none';
    }
    
    // Try to initialize quiz if i18n is already loaded
    if (window.i18n && window.i18nLoaded) {
        console.log('i18n already loaded, initializing quiz');
        initializeQuiz();
    }
    
    // Listen for i18n loaded event
    document.addEventListener('i18nLoaded', function() {
        console.log('i18nLoaded event received, initializing quiz');
        initializeQuiz();
    });
    
    // Add click event listener to submit button as a backup
    const submitButton = document.getElementById('submit-button');
    if (submitButton && !submitButton.hasAttribute('data-listener-added')) {
        submitButton.addEventListener('click', submitAnswers);
        submitButton.setAttribute('data-listener-added', 'true');
    }
});