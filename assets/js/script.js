var heading = document.querySelector("h2");
var info = document.querySelector("p");
var quizDiv = document.querySelector("#quiz");
var quizTimer = document.querySelector("#countdown");
var startButton = document.querySelector("#start-button");
var resetButton = document.querySelector("#reset-button");
var saveButton = document.querySelector("#save-button");

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


// Checks the clicked answer against the correct answer
// if the answer is incremented by 1, but if the answer is wrong
// 
function answerQuestion() {
  var clickedAnswer = this.textContent; // Reads the clicked on text
  if (clickedAnswer === answer[quizIndex]) {
    score++;
    console.log("ClickedAnswer: " + clickedAnswer + "\nquizIndex: " + quizIndex + "\nscore: " + score);
  }
  else {
    timer = timer - 5; // 5 seconds are subtracted from the timer 
  }
  quizIndex++;
  quizDiv.innerHTML = "";  // Clears the possible answers
  askQuestion(); // ask next question
}

// Displays the next quiz question with possible
// answers
function askQuestion() {
  if (quizIndex < numOfQuestions) {
    info.textContent = question[quizIndex];

    // Creates a button and listener for each possible answer
    for (var i = 0; i < numOfPossibleAnswers; i++) {
      var ans = document.createElement("button");
      ans.textContent = possibleAnswer[quizIndex][i];
      ans.setAttribute("class", "quiz-button")
      document.querySelector("#quiz").appendChild(ans);
      ans.addEventListener("click", answerQuestion);
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
      saveButton.addEventListener("click", saveHiScore);
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
  quizDiv.innerHTML = "";
  startButton.setAttribute("style", "display: none;");
  resetButton.setAttribute("style", "display: none;");
  saveButton.setAttribute("style", "display: none;");
  score = 0;
}