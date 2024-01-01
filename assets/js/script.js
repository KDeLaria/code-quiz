var heading = document.querySelector("h2");
var info = document.querySelector("p");
var quizDiv = document.querySelector("#quiz");
var resultDiv = document.querySelector("#result");
var quizTimer = document.querySelector("#countdown");
var startButton = document.querySelector("#start-button");
var resetButton = document.querySelector("#reset-button");
var scoresButton = document.querySelector("#view-scores");
var saveButton = document.querySelector("#save-button");
var backButton = document.querySelector("#back-button");

var quizTime = 30;
var countdownTimer = 0;
var timer = quizTime;
var score = 0;
var quizIndex = 0;
var question = ["How do you display data in the console in Javascript?",
  "Which is NOT an array in Javascript?",
  "How do you access the first h3 element in an HTML document using Javascript?",
  "How do you store an object on a local machine in Javascript?",
  "How do you remove all whitespace characters surrounding a string in Javascript?",
  "Which is not a way to change a selected element's background color to green in Javascript?",
  "How do you prevent bubbling on click events in Javascript?"];
var answer = ["console.log()", "var myArray[];", "document.querySelector('h3');",
  "localStorage.setItem('myObject', JSON.stringify(myObject));", "myString.trim();",
  "mySelectedElement.style.background-color = 'green';", "event.stopPropagation();"];
var possibleAnswer = [["document.innerHTML()", "document.textContent", "console.log()", "console.write()"],
["var myArray = ['item1', 'item2', 'item3', 'item4'];",
  "var myArray[];", "var myArray = [1, 2, 3, 4];", "myArray[2] = 'item2';"],
["document.querySelector('h3');", "document.body.children[0];",
  "document.innerHTML('h3');", "document.getElementById('h3');"],
["localStorage.setItem('myObject', JSON.stringify(myObject));", "localStorage.setItem('myObject', myObject);",
  "localStorage.setItem('myObject', myObject);", "localStorage.setItem(JSON.stringify(myObject), 'myObject');"],
["myString.split(' ')", "myString.removeWhitespaceChars();", "myString.trim();", "myString.replaceAll(' ');"],
["mySelectedElement.setAttribute('style', 'background-color: green;');",
  "mySelectedElement.style.backgroundColor = 'green';", "mySelectedElement.style.background-color = 'green';",
  "document.getElementById(mySelectedElementID).setAttribute('style', 'background-color: green;');"],
["event.stopPropagation();", "event.preventDefault();", "preventPropagation();", "event.stopDefault();"]];
var numOfQuestions = question.length;
var quizIndex = 0;

startButton.addEventListener("click", startQuiz);


// Checks the clicked answer against the correct answer
// if the answer is incremented by 1, but if the answer is wrong
// 5 seconds are subtracted from the quiz timer
function answerQuestion(event) {
  event.stopPropagation();
  var clickedAnswer = event.target.textContent;
  if (clickedAnswer === answer[quizIndex]) {
    score++;
    resultDiv.textContent = "Correct";
    resultDiv.setAttribute("style", "display: flex;");
    setTimeout(function(){
      resultDiv.textContent = "";
      resultDiv.setAttribute("style", "display: none;");}, 1000
    );
  }
  else {
    timer = timer - 5; // 5 seconds are subtracted from the timer
    resultDiv.textContent = "Wrong";
    resultDiv.setAttribute("style", "display: flex;");
    setTimeout(function(){
      resultDiv.textContent = "";
      resultDiv.setAttribute("style", "display: none;");}, 1000
    );
  }
  quizIndex++;
  clearQuizBox();
  askQuestion(); // ask next question
}

// Displays the next quiz question with possible
// answers
function askQuestion() {
  if (quizIndex < numOfQuestions) {
    info.textContent = question[quizIndex];

    // Creates a button and listener for each possible answer
    for (var i = 0; i < possibleAnswer[quizIndex].length; i++) {
      var ans = document.createElement("button");
      ans.textContent = possibleAnswer[quizIndex][i];
      ans.setAttribute("class", "quiz-button");
      quizDiv.appendChild(ans);
      ans.addEventListener("click", answerQuestion);
    }
  }
  else {
    timer = 0;
  }
}

// Sets up the page back to the begining
function goBack() {
  clearQuizBox();

  timer = quizTime;  // Reset timer
  resetButton.setAttribute("style", "display: none;");
  backButton.setAttribute("style", "display: none;");
  scoresButton.setAttribute("style", "display: none;");
  saveButton.setAttribute("style", "display: none;");
  startButton.setAttribute("style", "display: flex;");
  heading.textContent = "Code Quiz";
  info.textContent = "Press the button to start the timed quiz.";
  startButton.addEventListener("click", startQuiz);
}

// Clears all socres saved on the user's machine
function resetScores() {
  localStorage.clear();
  displayScores();
}

// Diplays all of the scores that are saved on the user's machine
function displayScores() {
  clearQuizBox();
  saveButton.setAttribute("style", "display: none;");
  heading.textContent = "Scores";
  scoresButton.setAttribute("style", "display: none;");
  resetButton.setAttribute("style", "display: flex;");
  resetButton.addEventListener("click", resetScores);
  var scores = JSON.parse(localStorage.getItem("hiScore"));
  if (!(scores === null)) {
    var list = document.createElement("ul");
    quizDiv.appendChild(list);
    for (var i = 0; i < scores.length; i++) {
      var scoreItem = document.createElement("li");
      scoreItem.textContent = scores[i].name + " " + scores[i].score;
      scoreItem.setAttribute("class", "score-item");
      list.appendChild(scoreItem);
    }
  }
}

// Saves the user's name and score on their machine and adds it 
// to the previously saved scores
function saveHiScore(event) {
  event.preventDefault();

  var nameInput = document.querySelector("#nameInput");
  if (!(nameInput.value === "")) {
    var scores = JSON.parse(localStorage.getItem("hiScore"));
    if (scores === null) {
      var hiScore = [{
        name: nameInput.value,
        score: score
      }];
      localStorage.setItem("hiScore", JSON.stringify(hiScore));
    }
    else {
      var hiScore = {
        name: nameInput.value,
        score: score
      };
      scores.push(hiScore);
      localStorage.setItem("hiScore", JSON.stringify(scores));
    }
    clearQuizBox();
    heading.textContent = "Your score has been saved!";
  }
}

// Displays a form to save the user's name and score
function displaySave() {
  saveButton.setAttribute("style", "display: none");
  heading.textContent = "Enter your name to save your score";
  quizDiv.innerHTML = "<form id='nameForm' method='POST'><label for='nameInput'>Name: \
  </label>\<input type='text' placeholder='Name' name='nameInput' id='nameInput'>\
  <button class='control-button'>Save</button></form>";
  var nameForm = document.querySelector("#nameForm");
  nameForm.addEventListener("submit", saveHiScore);
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

    for (var x = possibleAnswer[i].length - 1; x > 0; x--) {
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

    if (timer === 0 || timer < 0 || quizIndex >= numOfQuestions) {
      clearInterval(timeInterval);
      clearQuizBox();
      heading.innerHTML = "Time is up!";
      info.textContent = "Your score is " + score + ".";
      saveButton.setAttribute("style", "display: flex;");
      saveButton.addEventListener("click", displaySave);
      scoresButton.setAttribute("style", "display: flex;");
      scoresButton.addEventListener("click", displayScores);
      backButton.setAttribute("style", "display: flex;");
      backButton.addEventListener("click", goBack);
      quizTimer.textContent = "";
    }

    timer--;
  }, 1000);
}

// Starts countdown timer before the quiz starts
function startQuiz() {
  startButton.setAttribute("style", "display: none;");
  resetButton.setAttribute("style", "display: none;");
  saveButton.setAttribute("style", "display: none;");
  clearQuizBox();
  score = 0;
  var timeLeft = countdownTimer;
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
  heading.textContent = "";
  info.textContent = "";
  quizDiv.innerHTML = "";
}