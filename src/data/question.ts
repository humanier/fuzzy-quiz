export class Question {
    private _id: number;
    private _question: string;
    private _answer: string;

    constructor(id: number, question: string, answer: string) {
        this._id = id;
        this._question = question;
        this._answer = answer;
    }

    get id() { return this._id; }
    get question() { return this._question; }
    get answer() { return this._answer; }
}