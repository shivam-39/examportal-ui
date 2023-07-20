import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private http: HttpClient) { }

    public getAllQuiz() {
        return this.http.get(`${baseUrl}/quiz/`);
    }

    public addQuiz(quizData: any) {
        return this.http.post(`${baseUrl}/quiz/`, quizData);
    }

    public deleteQuiz(qid: number) {
        return this.http.delete(`${baseUrl}/quiz/${qid}`);
    }

    public getQuiz(qid: Number) {
        return this.http.get(`${baseUrl}/quiz/${qid}`);
    }

    public updateQuiz(quizData: any) {
        return this.http.put(`${baseUrl}/quiz/`, quizData);
    }

}
