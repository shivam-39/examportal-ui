import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-update-quiz',
    templateUrl: './update-quiz.component.html',
    styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
        private quizService: QuizService,
        private categoryService: CategoryService,
        private router: Router
    ) { }

    quizId: Number = -1;
    quizData: any;
    categoryList: any = [];

    ngOnInit(): void {
        this.quizId = this.activatedRoute.snapshot.params['qid'];
        this.quizService.getQuiz(this.quizId).subscribe(
            (data) => {
                this.quizData = data;
            },
            (error) => {
                Swal.fire("Error", "Could not get data, Server Error", "error");
                console.log(error);
            }
        );
        this.categoryService.getAllCategory().subscribe(
            (data) => {
                this.categoryList = data;
            },
            (error) => {
                Swal.fire("Error", "Could not get data, Server Error", "error");
                console.log(error);
            }
        )
    }

    public updateQuiz() {
        if (this.quizData.title.trim() == ""
            || this.quizData.description.trim() == ""
            || this.quizData.maxMarks.trim() == ""
            || this.quizData.numberOfQues.trim() == ""
            || this.quizData.category.cid == null
        ) {
            return;
        }
        this.quizService.updateQuiz(this.quizData).subscribe(
            (data) => {
                Swal.fire("Success", "Updated Quiz sucessfully", "success").then((e) => {
                    this.router.navigate(["/admin-dashboard/view-all-quiz"]);
                });
            },
            (error) => {
                Swal.fire("Error", "Could not update quiz, Server Error", "error");
                console.log(error);
            }
        )
    }

}
