import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public loginStatusSubject = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { }

    public generateToken(userData: any) {
        return this.http.post(`${baseUrl}/generate-token`, userData);
    }

    public getCurrentUser() {
        return this.http.get(`${baseUrl}/current-user`);
    }

    public loginUser(token: string): boolean {
        localStorage.setItem("token", token);
        return true;
    }

    public isLoggedIn(): boolean {
        let tokenStr = localStorage.getItem("token");
        if (tokenStr == undefined || tokenStr == null || tokenStr == "") {
            return false;
        }
        return true;
    }

    public logout(): boolean {
        localStorage.removeItem("token");
        localStorage.clear();
        // this.loginStatusSubject.next(true);
        // this.router.navigate(['']);
        return true;
    }

    public getToken() {
        return localStorage.getItem("token");
    }

    public setUser(user: any) {
        localStorage.setItem("User", JSON.stringify(user));
    }

    public getUser() {
        let userStr = localStorage.getItem("User");
        if (userStr != null) {
            return JSON.parse(userStr);
        } else {
            this.logout();
            return null;
        }
    }

    public getUserRole() {
        let user = this.getUser();
        console.log(user);
        return user.authorities[0].authority;
    }
}
