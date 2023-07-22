import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-quiz-questions',
    templateUrl: './view-quiz-questions.component.html',
    styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

    constructor(private _activatedRoute: ActivatedRoute, private questionService: QuestionService) { }

    quizId: Number = -1;
    quizTitle = null;
    questionList: any = [];

    ngOnInit(): void {
        this.quizId = this._activatedRoute.snapshot.params['qid'];
        this.quizTitle = this._activatedRoute.snapshot.params['title'];
        this.questionService.getAllQuestionByQuiz(this.quizId).subscribe(
            (data) => {
                console.log(data);
                this.questionList = data;
            },
            (error) => {
                Swal.fire("Error", "Could not get data, server error", "error");
                console.log(error);
            }
        )
    }

    public deleteQuestion(quesId: any) {
        console.log(quesId);
        Swal.fire({
            icon: "warning",
            title: "Are you sure ?",
            confirmButtonText: "Delete",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.questionService.deleteQuestion(quesId).subscribe(
                    (data: any) => {
                        this.questionList = this.questionList.filter((question: any) => question.quesId != quesId);
                        Swal.fire("Success", "Question deleted successfully from Quiz", "success");
                    },
                    (error) => {
                        console.log(error);
                        Swal.fire("Error", "Could not delete question from Quiz", "error");
                    }
                )
            }
        });

    }

}
