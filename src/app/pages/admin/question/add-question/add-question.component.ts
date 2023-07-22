import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

    constructor(private _activatedRoute: ActivatedRoute, private quizService: QuizService, private questionService: QuestionService) { }

    public Editor = ClassicEditor;

    quizId: Number = -1;

    questionData: any = {
        content: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        quiz: {}
    }

    ngOnInit(): void {
        this.quizId = this._activatedRoute.snapshot.params['qid'];
        this.quizService.getQuiz(this.quizId).subscribe(
            (response) => {
                this.questionData.quiz = response;
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Could not load data", "error");
            }
        )
    }

    public addQuestion() {
        if (this.questionData.content == null || this.questionData.content.trim() == "" ||
            this.questionData.answer == null || this.questionData.answer.trim() == "" ||
            this.questionData.quiz == null || this.questionData.quiz.qid == null || this.questionData.quiz.qid == "") {
            return;
        }
        this.questionService.addQuestion(this.questionData).subscribe(
            (result: any) => {
                Swal.fire("Success", "Question successfully added to Quiz", "success");
                this.questionData.content = "";
                this.questionData.option1 = "";
                this.questionData.option2 = "";
                this.questionData.option3 = "";
                this.questionData.option4 = "";
                this.questionData.answer = "";
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Could not add question to Quiz", "error");
            }
        )
    }

}
