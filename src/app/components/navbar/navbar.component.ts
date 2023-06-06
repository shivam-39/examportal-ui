import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn = false;
    username = null;

    constructor(public loginService: LoginService) { }

    ngOnInit(): void {
        this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
            this.isLoggedIn = this.loginService.isLoggedIn();
            this.username = this.loginService.getUser().username;
        });
    }

    logout(): void {
        this.loginService.logout();
        console.log(localStorage);
        // this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
        //     this.isLoggedIn = this.loginService.isLoggedIn();
        //     this.username = this.loginService.getUser().username;
        // });
        window.location.reload();
    }
}
