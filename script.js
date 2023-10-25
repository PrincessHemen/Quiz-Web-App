const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Elephant", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Hippopotamus", correct: false},
            { text: "Rhinoceros", correct: false},
        ]     
    },
    {
        question: "What year was Queen Elizabeth II crowned?",
        answers: [
            { text: "1958", correct: true},
            { text: "1957", correct: false},
            { text: "1956", correct: false},
            { text: "1955", correct: false},
        ] 
    },
    {
        question: "Where were the 'Hanging Gardens' located?",
        answers: [
            { text: "Persia", correct: false},
            { text: "Babylon", correct: true},
            { text: "Greece", correct: false},
            { text: "Japan", correct: false},
        ]     
    },
    {
        question: "When did Pele win his last World Cup?",
        answers: [
            { text: "1958", correct: false},
            { text: "1962", correct: false},
            { text: "1966", correct: false},
            { text: "1970", correct: true},
        ]     
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ".  " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer) 
    })
}


function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length){
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()

