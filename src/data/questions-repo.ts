import { Question } from './question';

const questions = new Map();

[
    new Question(1, "Who is the fastest animal on Earth?", "cheetah"),
    new Question(2, "What is the deepest place in the ocean?", "Mariana trench"),
    new Question(3, "Who is the fastest runner?", "Usain St Leo Bolt")
].forEach(q => questions.set(q.id, q));

export const questionsRepo = {
    all(): IterableIterator<Question> {
        return questions.values();
    },

    getById(id: number): Question {
        return questions.get(id);
    },

    first(): Question {
        return this.getById(1);
    },

    next(id: number): Question {
        if (id < 1 || id > questions.size - 1) {
            return this.first();
        }

        return this.getById(id + 1);
    }
}