import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private _http: HttpClient) { }

    public getQuestionByQuiz(qid: Number) {
        return this._http.get(`${baseUrl}/question/quiz/${qid}`);
    }

    public getAllQuestionByQuiz(qid: Number) {
        return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
    }

    public addQuestion(question: any) {
        return this._http.post(`${baseUrl}/question/`, question);
    }

    public deleteQuestion(quesId: any) {
        return this._http.delete(`${baseUrl}/question/${quesId}`);
    }

    public evaluateQuiz(questionList: Array<any>) {
        return this._http.post(`${baseUrl}/question/eval-quiz`, questionList);
    }
}
