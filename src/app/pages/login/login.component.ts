import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginData = {
        username: "",
        password: ""
    };

    constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
    }

    loginSubmit(): void {
        console.log("login submitted");
        if (this.loginData.username.trim() == "" || this.loginData.username == null) {
            this.snack.open("Username is required.", "OK", {
                duration: 3000
            });
            return;
        }
        if (this.loginData.password == "" || this.loginData.password == null) {
            this.snack.open("Password is required.", "OK", {
                duration: 3000
            });
            return;
        }
        //request to server to generate token
        this.loginService.generateToken(this.loginData).subscribe(
            (data: any) => {
                console.log("success");
                console.log(data);

                this.loginService.loginUser(data.token);
                this.loginService.getCurrentUser().subscribe(
                    (user: any) => {
                        this.loginService.setUser(user);
                        console.log(user);
                        if (this.loginService.getUserRole() == "ADMIN") {
                            //redirect: ADMIN dashboard
                            // window.location.href = "/admin-dashboard";
                            this.router.navigate(['admin-dashboard']);
                            this.loginService.loginStatusSubject.next(true);
                        } else if (this.loginService.getUserRole() == "NORMAL") {
                            //redirect: NORMAL dashboard
                            // window.location.href = "/dashboard";
                            this.router.navigate(['dashboard']);
                            this.loginService.loginStatusSubject.next(true);
                        } else {
                            this.loginService.logout();
                        }
                    },
                    (error) => {
                        console.log(error);
                        this.snack.open("Error getting user data", "OK", {
                            duration: 3000
                        });
                    }
                )
            },
            (error) => {
                console.log(error);
                this.snack.open("Invalid details.", "OK", {
                    duration: 3000
                });
            }
        )
    }

}
