import { questionsRepo } from './questions-repo';
import axios from 'axios';

type CheckResult = {
    questionId: number,
    userInput: string,
    correctAnswer: string,
    matchRatio: number
}

const baseIndexUrl = 'http://elasticsearch:9200/quiz/answer/';
const jsonRequestConfig = { headers: { "Content-type": "application/json" } };

type SearchResult = {
    data: {
        hits: {
            total: {
                value: number
            },
            max_score: number
        }
    }
};

function extractScore(result: SearchResult): number {
    if (!result || !result.data || result.data.hits.total.value === 0) {
        return 0;
    }

    return result.data.hits.max_score;
};

function buildSearchJson(questionId: number, answer: string) {
    return {
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "answer": {
                                "query": answer,
                                "operator": "AND",
                                "fuzziness": 2,
                                "prefix_length": 1
                            }
                        }
                    },
                    {
                        "term": {
                            "questionId": questionId
                        }
                    }
                ]
            }
        }
    }
}

export const answersRepo = {
    seedIndex: () => {
        for (const q of questionsRepo.all()) {
            const url = baseIndexUrl + q.id;

            const data = {
                questionId: q.id,
                answer: q.answer
            };

            axios.put(url, data, jsonRequestConfig)
                .catch(err => console.log(JSON.stringify(err)));
        };
    },

    async check(questionId: number, userInput: string): Promise<CheckResult> {
        // get score for correct answer
        const question = questionsRepo.getById(questionId);

        const getCorrectScore = axios({
            method: 'get',
            url: baseIndexUrl + '_search',
            data: buildSearchJson(questionId, question.answer),
            headers: jsonRequestConfig
        });

        // get score for user input
        const getUserScore = axios({
            method: 'get',
            url: baseIndexUrl + '_search',
            data: buildSearchJson(questionId, userInput),
            headers: jsonRequestConfig
        });

        const [correctResult, userResult]: any[] =
            await Promise.all([getCorrectScore, getUserScore]);

        const correctScore = extractScore(correctResult);
        const userScore = extractScore(userResult);

        return {
            questionId,
            userInput,
            correctAnswer: question.answer,
            matchRatio: userScore / correctScore
        }
    }
}