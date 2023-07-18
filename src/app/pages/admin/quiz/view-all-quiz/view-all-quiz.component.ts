import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-all-quiz',
    templateUrl: './view-all-quiz.component.html',
    styleUrls: ['./view-all-quiz.component.css']
})
export class ViewAllQuizComponent implements OnInit {

    quizList: any = [];

    constructor(private quizService: QuizService) { }

    ngOnInit(): void {
        this.quizService.getAllQuiz().subscribe(
            (data: any) => {
                this.quizList = data;
                console.log(data);
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Could not get Quizzes", "error");
            }
        )
    }

}
