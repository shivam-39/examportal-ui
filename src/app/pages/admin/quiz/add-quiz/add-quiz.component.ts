import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.component.html',
    styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

    categoryList: any = [];
    addQuizFormControl = new FormControl('', Validators.required);
    numberFormControl = new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.max(1000)]);
    quizData: any = {
        title: "",
        description: "",
        maxMarks: "",
        numberOfQues: "",
        active: true,
        category: {
            cid: null
        }
    }

    constructor(private categoryService: CategoryService, private quizService: QuizService) { }

    ngOnInit(): void {
        this.categoryService.getAllCategory().subscribe(
            (data: any) => {
                this.categoryList = data;
                console.log(this.categoryList);
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Could not get data", "error");
            }
        );
    }

    public addQuiz(): void {
        console.log("add Quiz Submit");
        console.log(this.quizData);
        if (this.quizData.title.trim() == ""
            || this.quizData.description.trim() == ""
            || this.quizData.maxMarks.trim() == ""
            || this.quizData.numberOfQues.trim() == ""
            || this.quizData.category.cid == null
        ) {
            return;
        }
        this.quizService.addQuiz(this.quizData).subscribe(
            (data) => {
                Swal.fire("Success", "Quiz added successfully!", "success");
                this.quizData = {
                    title: "",
                    description: "",
                    maxMarks: "",
                    numberOfQues: "",
                    active: true,
                    category: {
                        cid: ""
                    }
                }
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Quiz could not be added", "error");
            }
        )
    }

}
