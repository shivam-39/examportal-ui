import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-all-quiz',
    templateUrl: './view-all-quiz.component.html',
    styleUrls: ['./view-all-quiz.component.css']
})
export class ViewAllQuizComponent implements OnInit {

    quizList: any = [];

    dialogData = {
        action: "Delete",
        entity: "Quiz",
        isConfirm: false
    }

    constructor(private quizService: QuizService, private matDialog: MatDialog) { }

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
        );
    }

    // public deleteQuiz(qid: number) {
    //     const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
    //         data: { action: this.dialogData.action, entity: this.dialogData.entity, isConfirm: this.dialogData.isConfirm }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //     });

    //     const dialogSubmitSubscription = dialogRef.componentInstance.submitClicked.subscribe(result => {
    //         if (result.isConfirm == null || !result.isConfirm) {
    //             return;
    //         }
    //         this.quizService.deleteQuiz(qid).subscribe(
    //             (data) => {
    //                 this.quizList = this.quizList.filter((quiz: any) => quiz.qid != qid);
    //                 Swal.fire("Success", "Quiz deleted successfully", "success");
    //             },
    //             (error) => {
    //                 console.log(error);
    //                 Swal.fire("Error", "Quiz could not be deleted", "error");
    //             }
    //         );
    //         dialogSubmitSubscription.unsubscribe();
    //     });
    // }

    public deleteQuiz(qid: number) {
        Swal.fire({
            icon: "warning",
            title: "Are you sure ?",
            confirmButtonText: "Delete",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.quizService.deleteQuiz(qid).subscribe(
                    (data) => {
                        this.quizList = this.quizList.filter((quiz: any) => quiz.qid != qid);
                        Swal.fire("Success", "Quiz deleted successfully", "success");
                    },
                    (error) => {
                        console.log(error);
                        Swal.fire("Error", "Quiz could not be deleted", "error");
                    }
                );
            }
        });
    }

}
