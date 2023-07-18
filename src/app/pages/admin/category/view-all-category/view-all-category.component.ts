import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-all-category',
    templateUrl: './view-all-category.component.html',
    styleUrls: ['./view-all-category.component.css']
})
export class ViewAllCategoryComponent implements OnInit {

    categoryList: any = [];

    constructor(private categoryService: CategoryService) { }

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

}
