var heading = document.querySelector("h2");
var info = document.querySelector("p");
var quizTimer = document.querySelector("#countdown");
var startButton = document.querySelector("#start-button");
var resetButton = document.querySelector("#reset-button");
var saveButton = document.querySelector("#save-button");
var quizButton1 = document.querySelector("#quiz-button1");
var quizButton2 = document.querySelector("#quiz-button2");
var quizButton3 = document.querySelector("#quiz-button3");
var quizButton4 = document.querySelector("#quiz-button4");

var timer = 30;
var score = 0;
var quizIndex = 0;
var question = ["How do you display data in the console in Javascript?",
  "Which is NOT an array in Javascript?",
  "How do you access the first h3 element in an HTML document using Javascript?",
  "How do you store an object on a local machine in Javascript?"];
var answer = ["console.log()", "var myArray[];", "document.querySelector('h3');",
"localStorage.setItem('myObject', JSON.stringify(myObject));"];
var possibleAnswer = [["document.innerHTML()", "document.textContent", "console.log()", "console.write()",
  "localStorage.setItem('myObject', JSON.stringify(myObject));"],
["var myArray = ['item1', 'item2', 'item3', 'item4'];",
  "var myArray[];", "var myArray = [1, 2, 3, 4];", "myArray[2] = 'item2';"],
["document.querySelector('h3');", "document.body.children[0];",
  "document.innerHTML('h3');", "document.getElementById('h3');"],
["localStorage.setItem('myObject', JSON.stringify(myObject));", "localStorage.setItem('myObject', myObject);",
  "localStorage.setItem('myObject', myObject);", "localStorage.setItem(JSON.stringify(myObject), 'myObject');"]];
  var numOfQuestions = question.length;
  var numOfPossibleAnswers = possibleAnswer[0].length - 1; // " - 1" Fixes length overflow issue
  var quizIndex = 0;

startButton.addEventListener("click", startQuiz);

quizButton1.addEventListener("click", answerQuestion);
quizButton2.addEventListener("click", answerQuestion);
quizButton3.addEventListener("click", answerQuestion);
quizButton4.addEventListener("click", answerQuestion);


function answerQuestion () {
  alert (this);
}

//
function askQuestion() {
  if (quizIndex < numOfQuestions) {
    info.textContent = question[quizIndex];

    for (var i = 0; i < numOfPossibleAnswers; i++) {
      var ans = document.querySelector("#quiz-button" + i);
      ans.textContent = (i + 1) + ". " + possibleAnswer[quizIndex][i];
    }
  }
  else {
    timer = 0;
  }
}

// Randomizes the order of the quiz
// Based on Fisher Yates Method
function shuffleQuestions() {
  for (var i = numOfQuestions - 1; i > 0; i--) {
    var questionIndex = Math.floor(Math.random() * (i + 1));
    var tempVar = question[i];
    question[i] = question[questionIndex];
    question[questionIndex] = tempVar;
    
    tempVar = answer[i];
    answer[i] = answer[questionIndex];
    answer[questionIndex] = tempVar;

    tempVar = possibleAnswer[i];
    possibleAnswer[i] = possibleAnswer[questionIndex];
    possibleAnswer[questionIndex] = tempVar;

    for (var x = numOfPossibleAnswers - 1; x > 0; x--) {
      var possibleAnswerIndex = Math.floor(Math.random() * (x + 1));
      tempVar = possibleAnswer[questionIndex][x];
      possibleAnswer[questionIndex][x] = possibleAnswer[questionIndex][possibleAnswerIndex];
      possibleAnswer[questionIndex][possibleAnswerIndex] = tempVar;
    }
  }
}

// Starts the timer for the quiz
function startQuizTimer() {
  clearQuizBox();
  shuffleQuestions();
  quizIndex = 0;
  askQuestion();

  var timeInterval = setInterval(function () {

    quizTimer.textContent = timer;

    if (timer === 0) {
      clearInterval(timeInterval);
      heading.innerHTML = "Time is up!";
      info.textContent = "Your score is " + score + ".";
      saveButton.setAttribute("style", "display: flex;");
    }

    timer--;
  }, 1000);
  timer = 30;  // Reset timer
}

// Starts countdown timer before the quiz starts
function startQuiz() {
  clearQuizBox();
  var timeLeft = 5;
  heading.textContent = "Get ready";

  var timeInterval = setInterval(function () {

    info.innerHTML = "The quiz starts in <b>" + timeLeft + "</b> seconds.";

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      info.textContent = "";
      heading.textContent = "";
      startQuizTimer();
    }

    timeLeft--;
  }, 1000);
}

// Clears the elements in the quiz-box
function clearQuizBox() {
  info.textContent = "";
  startButton.textContent = "";
  startButton.setAttribute("style", "display: none;");
  score = 0;
}