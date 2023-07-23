import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-load-quiz',
    templateUrl: './load-quiz.component.html',
    styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

    constructor(private _activatedRoute: ActivatedRoute, private quizService: QuizService) { }

    categoryId: Number = -1
    quizList: any = []

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params) => {
            this.categoryId = params['cid'];
            if (this.categoryId == 0) {
                this.quizService.getQuizByActive().subscribe(
                    (result) => {
                        this.quizList = result;
                    },
                    (error) => {
                        console.log(error);
                        Swal.fire("Error", "Could not load data", "error");
                    }
                )
            } else {
                this.quizService.getQuizByCategoryAndActive(this.categoryId).subscribe(
                    (result) => {
                        this.quizList = result;
                    },
                    (error) => {
                        console.log(error);
                        Swal.fire("Error", "Could not load data", "error");
                    }
                )
            }
        })

    }

}
