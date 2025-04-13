const quizData = [
    {
      question: "Which of the following are programming languages?",
      options: ["HTML", "Python", "JavaScript", "CSS"],
      correct: [1, 2],
      type: "multi"
    },
    
    {
      question: "_____ is used to style a web page.",
      correctText: "CSS",
      type: "text"
    },
    
   {
          question: "What does HTML stand for?",
          options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "None of the above"],
          correct: [1],
          type: "single"
        },
        {
            question: "What is the correct way to complete this function to return the factorial of a number in JavaScript?\n\nfunction factorial(n) {\n  // Your code here\n}",
            options: [
              "return n * n - 1;",
              "if (n <= 1) return 1; return n * factorial(n - 1);",
              "return n + factorial(n - 1);",
              "while(n > 0) return n * factorial(n);"
            ],
            correct: [1],
            type: "single"
          }
,          
        {
          question: "What does CSS stand for?",
          options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Syntax"],
          correct: [1],
          type: "single"
        },
        {
            question: "Which HTML tag is used to define an internal style sheet_____",
            correctText: "Style",
            type: "text"
          },
        {
          question: "Which of the following is not a programming language?",
          options: ["Python", "Java", "HTML", "C++"],
          correct: [2],
          type: "single"
        },
        {
            question: "Which option correctly reverses a string in JavaScript?\n\nfunction reverseString(str) {\n  // Your code here\n}",
            options: [
              "return str.reverse();",
              "return str.split('').reverse().join('');",
              "return str.split().join().reverse();",
              "return reverse(str);"
            ],
            correct: [1],
            type: "single"
          },
          
        {
          question: "Which language is used for web apps?",
          options: ["PHP", "Python", "JavaScript", "All of the above"],
          correct: [3],
          type: "single"
        },
        {
          question: "Which tool can you use to ensure code quality?",
          options: ["Angular", "jQuery", "RequireJS", "ESLint"],
          correct: [3],
          type: "single"
        },
        {
          question: "Which symbol is used for comments in JavaScript?",
          options: ["!-- --", "//", "/* */", "#"],
          correct: [1],
          type: "single"
        },
        {
            question: "What is the correct recursive implementation to find the Nth Fibonacci number?\n\nfunction fibonacci(n) {\n  // Your code here\n}",
            options: [
              "if(n < 2) return n; return fibonacci(n-1) + fibonacci(n-2);",
              "return n + fibonacci(n-1);",
              "return fibonacci(n) + fibonacci(n-1);",
              "if(n === 2) return 1; return fibonacci(n-1);"
            ],
            correct: [0],
            type: "single"
          }
          
      ];
      

  
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");
  const reviewContainer = document.getElementById("review");
  const submitButton = document.getElementById("submit");
  
  let timeLeft = 600;
  const timerDisplay = document.getElementById("time");
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswers();
      submitButton.disabled = true;
    }
  }, 1000);
  
  function loadQuiz() {
    quizContainer.innerHTML = "";
  
    quizData.forEach((q, index) => {
      const questionElem = document.createElement("div");
      questionElem.classList.add("question");
      questionElem.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
  
      const optionsElem = document.createElement("div");
      optionsElem.classList.add("options");
  
      if (q.type === "multi" || q.type === "single") {
        const inputType = q.type === "multi" ? "checkbox" : "radio";
        q.options.forEach((option, i) => {
          const inputName = `q${index}`;
          optionsElem.innerHTML += `
            <label>
              <input type="${inputType}" name="${inputName}" value="${i}">
              ${option}
            </label>
          `;
        });
      } else if (q.type === "text") {
        optionsElem.innerHTML += `<input type="text" name="q${index}" placeholder="Type your answer">`;
      }
  
      questionElem.appendChild(optionsElem);
      quizContainer.appendChild(questionElem);
    });
  }
  
  function getSelectedAnswers() {
    return quizData.map((q, index) => {
      if (q.type === "multi") {
        const selected = [];
        const inputs = document.querySelectorAll(`input[name="q${index}"]`);
        inputs.forEach(input => {
          if (input.checked) selected.push(parseInt(input.value));
        });
        return selected;
      } else if (q.type === "single") {
        const input = document.querySelector(`input[name="q${index}"]:checked`);
        return input ? [parseInt(input.value)] : [];
      } else if (q.type === "text") {
        const input = document.querySelector(`input[name="q${index}"]`);
        return input ? input.value.trim().toLowerCase() : "";
      }
    });
  }
  
  function checkAnswers() {
    clearInterval(timer);
    const answers = getSelectedAnswers();
    let score = 0;
    reviewContainer.innerHTML = "<h3>Review:</h3>";
  
    answers.forEach((ans, i) => {
      const q = quizData[i];
      const review = document.createElement("div");
      review.innerHTML = `<strong>Q${i + 1}:</strong> ${q.question}<br>`;
  
      if (q.type === "text") {
        const isCorrect = ans === q.correctText.toLowerCase();
        if (isCorrect) score++;
        review.innerHTML += `Your Answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${ans}</span><br>`;
        review.innerHTML += `Correct Answer: ${q.correctText}<br><br>`;
      } else {
        const correct = q.correct.sort().toString();
        const selected = ans.sort().toString();
        const isCorrect = correct === selected;
        if (isCorrect) score++;
  
        const userAnswers = ans.map(i => q.options[i]).join(", ");
        const correctAnswers = q.correct.map(i => q.options[i]).join(", ");
        review.innerHTML += `Your Answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${userAnswers}</span><br>`;
        review.innerHTML += `Correct Answer: ${correctAnswers}<br><br>`;
      }
  
      reviewContainer.appendChild(review);
    });
  
    resultContainer.innerHTML = `Your Score: ${score} / ${quizData.length}`;
    submitButton.disabled = true;
  }
  
  submitButton.addEventListener("click", () => {
    checkAnswers();
  });
  function updateProgress() {
    const total = quizData.length;
    let answered = 0;
  
    quizData.forEach((q, i) => {
      if (q.type === "text") {
        const input = document.querySelector(`input[name="q${i}"]`);
        if (input && input.value.trim() !== "") answered++;
      } else {
        const selected = document.querySelectorAll(`input[name="q${i}"]:checked`);
        if (selected.length > 0) answered++;
      }
    });
  
    const percent = (answered / total) * 100;
    document.getElementById("progress-bar").style.width = `${percent}%`;
  }
  updateProgress();

  setTimeout(() => {
    document.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", updateProgress);
      input.addEventListener("change", updateProgress);
    });
  }, 0);
  
  loadQuiz();
  