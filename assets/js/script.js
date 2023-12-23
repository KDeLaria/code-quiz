var heading = document.querySelector("h2");
var info = document.querySelector("p");
var quizTimer = document.querySelector("#countdown");
var startButton = document.querySelector("#start-button");

var timer = 30;
var score = 0;
var quizIndex = 0;
var quiz = [{
  question:"How do you display data in the console in Javascript?",
  answer: "console.log()",
  possibleAnswer:["document.innerHTML()","document.textContent",
  "console.log()","console.write()"]
},
{
  question:"Which is NOT an array in Javascript?",
  answer: "var myArray[];",
  possibleAnswer:["var myArray = ['item1', 'item2', 'item3', 'item4'];",
  "var myArray[];","var myArray = [1, 2, 3, 4];","myArray[2] = 'item2';"]
},
{
  question:"How do you access the first h3 element in an HTML document using Javascript?",
  answer: "document.querySelector('h3');",
  possibleAnswer:["document.querySelector('h3');","document.body.children[0];",
  "document.innerHTML('h3');","document.getElementById('h3');"]
},
{
  question:"How do you store an object on a local machine in Javascript?",
  answer: "localStorage.setItem('myObject', JSON.stringify(myObject));",
  possibleAnswer:["localStorage.setItem('myObject', JSON.stringify(myObject));","localStorage.setItem('myObject', myObject);",
  "localStorage.setItem('myObject', myObject);","localStorage.setItem(JSON.stringify(myObject), 'myObject');"]
}];

startButton.addEventListener("click", startQuiz);

console.log("original quiz: ");
console.log(quiz);


/////////
function askQuestion () {
  console.log("Shuffled Quiz: ");
  console.log(quiz);
}
//////////////

// Randomizes the question and possible answer order
function shuffleQuestions () {
  var quizSize = quiz.length;
  var possibleAnswerSize = quiz[0].possibleAnswer.length;
  var questionIndex = Math.floor(Math.random() * quizSize);
  var possibleAnswerIndex = Math.floor(Math.random() * possibleAnswerSize);
  var newQuiz = quiz;

  // Assigns questions to a random spot in the array
  for (var i = 0; i < quiz.length; i++){
    newQuiz = quiz[questionIndex];
    // Assigns possible answers to a random spot in the array
    for (var x = 0; x < quiz.length; x++){
      //newQuiz[i].possibleAnswer[x] = quiz[questionIndex].possibleAnswer[possibleAnswerIndex];
      possibleAnswerIndex = possibleAnswerSize % possibleAnswerIndex++;
    }
    questionIndex = quizSize % questionIndex++;
  }
  quiz = newQuiz; 
}

// Starts the timer for the quiz
function startQuizTimer () {
  clearQuizBox();
  shuffleQuestions();
  askQuestion();

    var timeInterval = setInterval(function () {
  
      quizTimer.innerHTML = timer;
  
      if (timer === 0) {
        clearInterval(timeInterval);
        heading.innerHTML = "Time is up!";

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