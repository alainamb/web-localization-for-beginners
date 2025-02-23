function submitAnswers() {
    const questions = {
        q1: {
            correct: "False",
            correctFeedback: "¡Correcto! \“Es importante recordar que, aunque las comunidades de hablantes usan un lenguaje común, no significa que esos hablantes compartan exactamente la misma conceptualización de cada objeto designado... Si se les pidiera dibujar su conceptualización de una mesa, ninguno de los hablantes individuales de un idioma dibujaría exactamente la misma mesa del inventario mental de las que han encontrado o imaginado en sus vidas. Esto es significativo porque quienes están fuera de los servicios lingüísticos y la localización asumen que el significado está contenido en la designación, pero las palabras en sí mismas son arbitrarias y vacías. El significado verdaderamente está en el ojo o el cerebro del observador.\” (Alaina Brandt, Primeros pasos en la gestión de la terminología, traducido del inglés, The ATA Chronicle)",
            incorrectFeedback: {
                "True": "Incorrecto. \“Es importante recordar que, aunque las comunidades de hablantes usan un lenguaje común, no significa que esos hablantes compartan exactamente la misma conceptualización de cada objeto designado... Si se les pidiera dibujar su conceptualización de una mesa, ninguno de los hablantes individuales de un idioma dibujaría exactamente la misma mesa del inventario mental de las que han encontrado o imaginado en sus vidas. Esto es significativo porque quienes están fuera de los servicios lingüísticos y la localización asumen que el significado está contenido en la designación, pero las palabras en sí mismas son arbitrarias y vacías. El significado verdaderamente está en el ojo o el cerebro del observador.\” (Alaina Brandt, Primeros pasos en la gestión de la terminología, traducido del inglés,  The ATA Chronicle)",
            }
        },
        q2: {
            correct: "use in a specific subject field",
            correctFeedback: "¡Correcto! El lenguaje especializado es un lenguaje natural utilizado en un campo temático y caracterizado por el uso de medios de expresión específicos. (ISO 1087)",
            incorrectFeedback: {
                "independent of any specific subject field": "Incorrecto. El lenguaje especializado es un lenguaje natural utilizado en un campo temático y caracterizado por el uso de medios de expresión específicos. (ISO 1087)",
            }
        },
        q3: {
            correct: "rendering of ideas",
            correctFeedback: "¡Correcto!",
            incorrectFeedback: {
                "written content": "Incorrecto. Una característica compartida de la traducción y la interpretación es que ambas son una transmisión de ideas expresadas en un idioma a otro idioma.",
                "verbal content": "Incorrecto. Una característica compartida de la traducción y la interpretación es que ambas son una transmisión de ideas expresadas en un idioma a otro idioma."
            }
        }
    };

    try {
        const form = document.forms["quizForm"];
        if (!form) {
            throw new Error("No se encontró el formulario del cuestionario");
        }
    
        let unansweredQuestions = [];
        let totalCorrect = 0;
    
        // Loop through each question
        for (const question in questions) {
            const radioButtons = form[question];
            const feedbackElement = document.getElementById("feedback_" + question);
            
            if (!feedbackElement) {
                throw new Error(`No se encontró el elemento de retroalimentación para la pregunta ${question}`);
            }
    
            if (!radioButtons) {
                throw new Error(`No se encontraron botones de opción para la pregunta ${question}`);
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
                feedbackElement.innerHTML = questions[question].incorrectFeedback[selectedValue] || "Incorrecto. Por favor, intenta de nuevo.";
                feedbackElement.style.color = "red";
            }
    
            // Make feedback accessible to screen readers
            feedbackElement.setAttribute('role', 'alert');
        }
    
        // Handle unanswered questions
        if (unansweredQuestions.length > 0) {
            const errorMsg = `Por favor, responde ${unansweredQuestions.length === 1 ? 'la pregunta' : 'las preguntas'} ${unansweredQuestions.join(', ')}`;
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
        scoreAnnouncement.textContent = `Respondiste correctamente ${totalCorrect} de ${Object.keys(questions).length} preguntas`;
        document.querySelector('.quiz-container').appendChild(scoreAnnouncement);
    
    } catch (error) {
        console.error('Quiz error:', error);
        const errorElement = document.getElementById('quiz-error') || createErrorElement();
        errorElement.textContent = 'Ocurrió un error al procesar tus respuestas. Por favor, actualiza la página e intenta de nuevo.';
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