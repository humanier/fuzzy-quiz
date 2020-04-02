const questions = [
    'first', 
    'second',
    'third'
];

let currentQuestionId = -1;

const checkAnswer = () => {
    const divCheck = document.getElementById('result');

    if (!divCheck) {
        return;        
    }

    divCheck.innerText = 'bzzzzzzzzzzz';
}

const getNextQuestion = () => {
    const divQuestion = document.getElementById('question');
    
    if (!divQuestion) {
        return;
    }

    currentQuestionId = currentQuestionId + 1;
    if (currentQuestionId >= questions.length) {
        currentQuestionId = 0;
    }
    
    divQuestion.innerText = questions[currentQuestionId];
    enableAnswerControlls(true);
}

const enableAnswerControlls = isEnabled => {    
    document.getElementById('checkButton').disabled = !isEnabled;
    document.getElementById('answer').disabled = !isEnabled;
}

enableAnswerControlls(false);