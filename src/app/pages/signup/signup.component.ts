import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(
        private userService: UserService,
        private _snack: MatSnackBar
    ) { }

    public user = {
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    }

    ngOnInit(): void {
    }

    public registerSubmit(): void {
        console.log(this.user);
        if (this.user.username == "" || this.user.username == null) {
            // alert("Username is required !!");
            this._snack.open("Username is required.", "OK", {
                duration: 3000
            });
            return;
        }
        if (this.user.password == "" || this.user.password == null) {
            // alert("Username is required !!");
            this._snack.open("Password is required.", "OK", {
                duration: 3000
            });
            return;
        }
        if (this.user.email == "" || this.user.email == null) {
            // alert("Username is required !!");
            this._snack.open("Email is required.", "OK", {
                duration: 3000
            });
            return;
        }

        this.userService.addUser(this.user).subscribe(
            (data: any) => {
                //success
                console.log(data);
                // alert("success");
                Swal.fire("Success", "Thanks " + data.username, 'success');
            },
            (error) => {
                //error
                console.log(error);
                this._snack.open(error.error, "OK");
            }
        )
    }

    // public verifyEmpty(value:string): boolean{
    //   if(value == "" || value==null)return true;
    //   return false;
    // }

}
