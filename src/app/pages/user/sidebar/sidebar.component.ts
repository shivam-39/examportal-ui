import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    constructor(private categoryService: CategoryService, private _snack: MatSnackBar) { }

    categoryList: any = []

    ngOnInit(): void {
        this.categoryService.getAllCategory().subscribe(
            (result) => {
                this.categoryList = result;
            },
            (error) => {
                console.log(error);
                this._snack.open("Error loading data", "OK", {
                    duration: 3000,
                });
            }
        );
    }

}
