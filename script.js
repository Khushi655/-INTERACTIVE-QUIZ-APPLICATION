const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Simple Sheets", correct: false },
      { text: "Cars SUVs Sailboats", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerId;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  let questionElement = document.createElement("div");
  questionElement.innerText = currentQuestion.question;
  questionContainer.innerHTML = "";
  questionContainer.appendChild(questionElement);

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerId);
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = 30;
  timerElement.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      nextButton.style.display = "block";
      disableAnswers();
    }
  }, 1000);
}

function disableAnswers() {
  Array.from(answerButtons.children).forEach(button => button.disabled = true);
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;
  saveScore(score);
  nextButton.innerText = "Restart";
  nextButton.style.display = "block";
}

function saveScore(score) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  const entry = {
    date: new Date().toLocaleString(),
    score: score
  };
  scores.push(entry);
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

startQuiz();
