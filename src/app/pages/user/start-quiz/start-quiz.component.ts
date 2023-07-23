import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

// import { fromEvent, Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-start-quiz',
    templateUrl: './start-quiz.component.html',
    styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

    constructor(private _locationStrategy: LocationStrategy, private _activatedRoute: ActivatedRoute, private questionService: QuestionService) { }

    // private unsubscriber: Subject<void> = new Subject<void>();

    quizId: Number = -1;
    questionList: any = [{
        quiz: {
            title: ""
        }
    }];
    marksGot = 0;
    correctAnswer = 0;
    quesAttempted = 0;
    isSubmit: Boolean = false;
    timer: any = 0;

    ngOnInit(): void {
        this.preventBackButton();
        this.quizId = this._activatedRoute.snapshot.params["qid"];
        this.getQuestionByQuiz(this.quizId);
    }

    public preventBackButton(): void {
        history.pushState(null, "", location.href);
        this._locationStrategy.onPopState(() => {
            history.pushState(null, "", location.href);
        })
        // history.pushState(null, '', location.href);
        // fromEvent(window, 'popstate').pipe(
        //     takeUntil(this.unsubscriber)
        // ).subscribe((_) => {
        //     history.pushState(null, '');
        //     this.showErrorModal(`You can't make changes or go back at this time.`);
        // });
    }

    // ngOnDestroy(): void {
    //     this.unsubscriber.next();
    //     this.unsubscriber.complete();
    // }

    public getQuestionByQuiz(qid: Number) {
        this.questionService.getQuestionByQuiz(qid).subscribe(
            (result) => {
                this.questionList = result;
                this.questionList.forEach((q: any) => {
                    q["givenAnswer"] = "";
                });
                console.log(this.questionList);
                this.timer = this.questionList.length * 2 * 60;
                this.startTimer();
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Could not load quiz", "error");
            }
        )
    }

    public submitTest() {
        Swal.fire({
            title: "Do you want to Submit the Test ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            icon: 'info'
        }).then((result) => {
            if (result.isConfirmed) {
                this.evaluateTest();
            }
        });
    }

    public startTimer() {
        let t = window.setInterval(() => {
            if (this.timer <= 0) {
                Swal.fire({
                    title: "Test has ended, go to result ?",
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    icon: 'info'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.evaluateTest();
                    }
                });
                clearInterval(t);
            } else {
                this.timer--;
            }
        }, 1000);
    }

    public getFormattedTime(): string {
        let mm = Math.floor(this.timer / 60);
        let ss = this.timer - mm * 60;
        return `${mm} min : ${ss} sec`
    }

    public evaluateTest() {
        this.isSubmit = true;
        this.questionService.evaluateQuiz(this.questionList).subscribe(
            (result: any) => {
                console.log(result);
                this.correctAnswer = result.correctAnswer;
                this.marksGot = result.marksGot;
                this.quesAttempted = result.quesAttempted;
            },
            (error) => {
                console.log(error);
                Swal.fire("Error", "Quiz could not be evaluated", "error");
            }
        )
        // this.questionList.forEach((q: any) => {
        //     if (q.givenAnswer == q.answer) {
        //         this.correctAnswer++;
        //         let singleQuesMarks = this.questionList[0].quiz.maxMarks / this.questionList.length;
        //         this.marksGot += singleQuesMarks;
        //         this.quesAttempted++;
        //     } else if (q.givenAnswer.trim() != "") {
        //         this.quesAttempted++;
        //     }
        // });
        // console.log(this.correctAnswer);
        // console.log(this.marksGot);
        // console.log(this.quesAttempted);
    }

    public getTimerColor() {
        let timeleft = (this.timer * 100) / (this.questionList.length * 2 * 60);
        if (timeleft > 25) {
            return "primary";
        } else {
            return "warn";
        }
    }

    public printPage() {
        window.print();
    }

}
