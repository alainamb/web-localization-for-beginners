function submitAnswers() {
  const questions = {
      q1: {
          correct: "False",
          correctFeedback: "Correct! “It’s important to remember that just because communities of speakers use common language doesn’t mean that those speakers share the exact same conceptualization of each object that’s designated... If asked to draw their conceptualization of a table, no two individual speakers of a language will draw the same one from the mental inventory of those they’ve encountered or imagined in their lives. This is significant because those outside the language services and localization professions assume that meaning is held within the designation, but words themselves are arbitrary and empty. Meaning truly is in the eye or brain of the beholder.” (Alaina Brandt, Getting Started with Terminology Management, The ATA Chronicle)",
          incorrectFeedback: {
              "True": "Incorrect. “It’s important to remember that just because communities of speakers use common language doesn’t mean that those speakers share the exact same conceptualization of each object that’s designated... If asked to draw their conceptualization of a table, no two individual speakers of a language will draw the same one from the mental inventory of those they’ve encountered or imagined in their lives. This is significant because those outside the language services and localization professions assume that meaning is held within the designation, but words themselves are arbitrary and empty. Meaning truly is in the eye or brain of the beholder.” (Alaina Brandt, Getting Started with Terminology Management, The ATA Chronicle)",
          }
      },
      q2: {
          correct: "use in a specific subject field",
          correctFeedback: "Correct! Special language is a natural language used in a subject field and characterized by the use of specific means of expression. (ISO 1087)",
          incorrectFeedback: {
              "independent of any specific subject field": "Incorrect. Special language is a natural language used in a subject field and characterized by the use of specific means of expression. (ISO 1087)",
          }
      },
      q3: {
          correct: "rendering of ideas",
          correctFeedback: "Correct!",
          incorrectFeedback: {
              "written content": "Incorrect. A shared characteristic of translation and interpreting is that both are a rendering of ideas expressed in one language into another language.",
              "verbal content": "Incorrect. A shared characteristic of translation and interpreting is that both are a rendering of ideas expressed in one language into another language."
          }
      }
  };

  try {
    const form = document.forms["quizForm"];
    if (!form) {
        throw new Error("Quiz form not found");
    }

    let unansweredQuestions = [];
    let totalCorrect = 0;

    // Loop through each question
    for (const question in questions) {
        const radioButtons = form[question];
        const feedbackElement = document.getElementById("feedback_" + question);
        
        if (!feedbackElement) {
            throw new Error(`Feedback element for question ${question} not found`);
        }

        if (!radioButtons) {
            throw new Error(`Radio buttons for question ${question} not found`);
        }

        // Check if question is answered
        const selectedValue = radioButtons.value;
        if (selectedValue === "") {
            unansweredQuestions.push(question.replace('q', ''));
            continue;
        }

        // Process answer
        const isCorrect = selectedValue === questions[question].correct;
        if (isCorrect) {
            totalCorrect++;
            feedbackElement.innerHTML = questions[question].correctFeedback;
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerHTML = questions[question].incorrectFeedback[selectedValue] || "Incorrect. Please try again.";
            feedbackElement.style.color = "red";
        }

        // Make feedback accessible to screen readers
        feedbackElement.setAttribute('role', 'alert');
    }

    // Handle unanswered questions
    if (unansweredQuestions.length > 0) {
        const errorMsg = `Please answer ${unansweredQuestions.length === 1 ? 'question' : 'questions'} ${unansweredQuestions.join(', ')}`;
        const errorElement = document.getElementById('quiz-error') || createErrorElement();
        errorElement.textContent = errorMsg;
        errorElement.style.display = 'block';
        return false;
    }

    // Announce final score to screen readers
    const scoreAnnouncement = document.createElement('div');
    scoreAnnouncement.setAttribute('role', 'status');
    scoreAnnouncement.setAttribute('aria-live', 'polite');
    scoreAnnouncement.className = 'sr-only';
    scoreAnnouncement.textContent = `You got ${totalCorrect} out of ${Object.keys(questions).length} questions correct`;
    document.querySelector('.quiz-container').appendChild(scoreAnnouncement);

} catch (error) {
    console.error('Quiz error:', error);
    const errorElement = document.getElementById('quiz-error') || createErrorElement();
    errorElement.textContent = 'An error occurred while processing your answers. Please refresh the page and try again.';
    errorElement.style.display = 'block';
}

return false;
}

function createErrorElement() {
const errorElement = document.createElement('div');
errorElement.id = 'quiz-error';
errorElement.className = 'error-message';
errorElement.setAttribute('role', 'alert');
errorElement.style.color = 'red';
document.querySelector('.quiz-container').insertBefore(errorElement, document.querySelector('#quizForm'));
return errorElement;
}