import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-quiz-instructions',
    templateUrl: './quiz-instructions.component.html',
    styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit {

    constructor(private _activatedRoute: ActivatedRoute, private quizService: QuizService, private _router: Router) { }

    quizId: Number = -1;
    quizData: any = {
        title: "",
        description: "",
        numberOfQues: "",
        maxMarks: ""
    };

    ngOnInit(): void {
        this.quizId = this._activatedRoute.snapshot.params['qid'];
        this.quizService.getQuiz(this.quizId).subscribe(
            (result) => {
                this.quizData = result;
                console.log(this.quizData);
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Could not load quiz", "error");
            }
        );
    }

    public startQuiz() {
        Swal.fire({
            title: "Do you want to start the quiz ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            icon: 'info'
        }).then((result) => {
            if (result.isConfirmed) {
                this._router.navigate(["/start/" + this.quizData.qid]);
            }
        });
    }

}
