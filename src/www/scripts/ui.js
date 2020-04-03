let currentQuestion = { id: -1 }

const checkAnswer = () => {
    const divCheck = document.getElementById('result');
    const userInput = document.getElementById('answer');

    if (!divCheck || !userInput) {
        return;
    }

    const checkData = {
        questionId: currentQuestion.id,
        userInput: userInput.value
    };

    enableAnswerControlls(false);
    $.post(`/api/v1/answers/check`, checkData, result => {
        enableAnswerControlls(true);
        divCheck.innerText = JSON.stringify(result, null, 2);
        
        const checkClass = (result.matchRatio > 0.8) ? 'success' : 'fail';
        divCheck.className = checkClass;
    });
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