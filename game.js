const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progress-bar-full');

const loader = document.getElementById('loader');
const game = document.getElementById('game');
// console.log(choices);

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// fetch("questions.json")
// .then(res => {
//     return res.json();
// })
// .then( loadedQuestions =>{
//     console.log(loadedQuestions);
//     questions = loadedQuestions;
//     startGame();
// })
// .catch(err=> {
//     console.error(err);
// });

fetch("https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple") //https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple
.then(res => {
    return res.json();
})
.then( loadedQuestions =>{
    // console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*3) + 1;
        answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice"+(index+1)] = choice;
        })
        return formattedQuestion;
    })
    // questions = loadedQuestions;
    
    startGame();
})
.catch(err=> {
    console.error(err);
});

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions)
    getNewQuestion();
    loader.classList.add('hidden')
    game.classList.remove('hidden')
};

getNewQuestion = () => {
    // Game over
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html');
    }
    questionCounter ++;
    // questionCounterText.innerText = questionCounter +"/"+ MAX_QUESTIONS;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    
    // Update progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // console.log(currentQuestion)
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+number]
    });
    availableQuestions.splice(questionIndex,1);
    acceptAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        // console.log(e.target)
        if(!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // let classToApply = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer) {
        //     classToApply = 'correct'

        // };
        // FOR ONLY 2 classes
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            
        }, 1000);

        // console.log(classToApply);

    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

// startGame()