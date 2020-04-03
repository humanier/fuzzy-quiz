let currentQuestion = { id: -1 }

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

    $.get(`/api/v1/questions/${currentQuestion.id}/next`,
        (data) => {
            if (data) {
                currentQuestion = data;
                divQuestion.innerText = data.question;
                enableAnswerControlls(true);
            }
        });
}

const enableAnswerControlls = isEnabled => {
    document.getElementById('checkButton').disabled = !isEnabled;
    document.getElementById('answer').disabled = !isEnabled;
}

enableAnswerControlls(false);
getNextQuestion();