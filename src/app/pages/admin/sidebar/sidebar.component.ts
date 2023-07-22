import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    constructor(private loginService: LoginService) { }

    ngOnInit(): void {
    }

    public logout() {
        this.loginService.logout();
        console.log(localStorage);
        // this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
        //     this.isLoggedIn = this.loginService.isLoggedIn();
        //     this.username = this.loginService.getUser().username;
        // });
        window.location.reload();
    }

}
