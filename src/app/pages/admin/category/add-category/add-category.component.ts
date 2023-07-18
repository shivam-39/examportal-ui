import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    category = {
        title: "",
        description: ""
    }

    constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }

    ngOnInit(): void {
    }

    public addCategory() {
        console.log("add button clicked")
        if (this.category.title == null || this.category.title.trim() == "") {
            this.snack.open("Title required", "OK", {
                duration: 3000
            });
            return;
        } else if (this.category.description == null || this.category.description.trim() == "") {
            this.snack.open("Description required", "OK", {
                duration: 3000
            });
            return;
        }
        this.categoryService.addCategory(this.category).subscribe(
            (data) => {
                this.category.title = "";
                this.category.description = "";
                Swal.fire("Success", "Category added successfully", "success");
            },
            (error) => {
                Swal.fire("Error", "Category could not be added", "error");
            }
        )
    }

}
