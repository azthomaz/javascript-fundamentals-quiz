// Quiz Data - Questions and Answers

const quizData = [
  {
    question: "→ What does console.log() do?",
    options: ["Sends an alert to the user.", "Outputs a message to web console.", "Starts a server.", "Saves a message to a file."],
    answer: 1,
  },
  {
    question: "→ What is the index of the first item in an array in JavaScript?",
    options: ["-1", "first", "0", "1"],
    answer: 2,
  },
  {
    question: "→ What happens if the loop condition is never true?",
    options: ["The loop will execute once.", "The program will crash.", "The loop will execute indefinitely.", "The loop will not execute at all."],
    answer: 3,
  },
  {
    question: "→ If I write for (let i = 0; i > 0; i--), what direction does the loop move?",
    options: ["The loop does not execute.", "The loop moves in a descending order.", "The loop moves in a random order.", "The loop moves in an ascending order."],
    answer: 1,
  },
  {
    question: "→ What does the container <div> do in the HTML structure?",
    options: ["It stores the CSS rules.", "It holds the buttons.", "It displays the boxes that are created by JavaScript.", "It displays user input text."],
    answer: 2,
  },
];

let currentQuestionIndex = 0;

// DOM Elements

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const quizContainer = document.getElementById('quiz-container');
const startScreen = document.getElementById('start-screen');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score');
const nextButton = document.getElementById('next-button');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

// Quiz Logic

// Function to start the quiz

function startQuiz() {
  if (!startScreen || !quizContainer || !scoreContainer) return;
  startScreen.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  scoreContainer.classList.remove('hidden');
  score = 0;
  answeredQuestions = 0;
  updateScore();
  nextButton.disabled = true;
  loadQuestion();
}

// Function to load a question and its options

let score = 0;
let answeredQuestions = 0;

function loadQuestion() {
  if (!questionContainer || !optionsContainer || quizData.length === 0) return;


  currentQuestionIndex = Math.floor(Math.random() * quizData.length);
  const currentQuestion = quizData[currentQuestionIndex];

  // Update question text
  questionContainer.textContent = currentQuestion.question;

  // Clear previous options
  optionsContainer.innerHTML = '';

  // Create a button for each option
  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.className = 'option-button';
    optionButton.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(optionButton);
  });
}

// Function to handle option selection

function selectOption(index) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (!currentQuestion) return;

  const isCorrect = index === currentQuestion.answer;
  if (isCorrect) {
    score += 1;
  }

  const buttons = optionsContainer.querySelectorAll('button');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === index) {
      btn.classList.add(isCorrect ? 'correct' : 'incorrect');
    } else {
      btn.classList.add('greyed');
    }
  });

  answeredQuestions += 1;
  updateScore();
  if (answeredQuestions >= quizData.length) {
    showFinalScore();
  } else {
    nextButton.disabled = false;
  }
}

// Function to update score display
function updateScore() {
  if (!scoreContainer || !scoreText) return;
  scoreText.textContent = `Your current score is ${score}.`;
}

// Function to show final score and hide quiz
function showFinalScore() {
  if (!quizContainer || !scoreContainer || !scoreText) return;
  quizContainer.classList.add('hidden');
  scoreText.textContent = `Your final score is ${score} out of ${quizData.length}.`;
}

// Event listener for next button
nextButton.addEventListener('click', () => {
  loadQuestion();
  if (nextButton) nextButton.disabled = true;
});

// Event listener for start button
if (startButton) {
  startButton.addEventListener('click', startQuiz);
}

// Event listener for restart button
restartButton.addEventListener('click', () => {
  score = 0;
  answeredQuestions = 0;
  if (quizContainer) quizContainer.classList.remove('hidden');
  updateScore();
  loadQuestion();
});

// Initial render
nextButton.disabled = true;
updateScore();