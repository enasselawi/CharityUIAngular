import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrls: ['./managecategory.component.css']
})
export class ManagecategoryComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = {};
  

  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  @ViewChild('updateDialog') updateDialog!: TemplateRef<any>;
  @ViewChild('createDialog') createDialog!: TemplateRef<any>;

  updateCategoryForm = new FormGroup({
    charitycategoryid: new FormControl(),
    categoryname: new FormControl('', Validators.required)
  });

  createCategoryForm = new FormGroup({
    categoryname: new FormControl('', Validators.required)
  });
  categoryToDeleteId?: number | undefined;
  constructor(
    private homeService: HomeService,
    public dialog: MatDialog,
    private toastr: ToastrService
    
  ) {}

  ngOnInit(): void {
    debugger; 
    this.loadCategories();
  }

  loadCategories() {
    this.homeService.getAllCategories().subscribe(
      data => {
        this.categories = data;
        this.toastr.success('Categories loaded successfully');
      },
      error => this.toastr.error('Failed to load categories')
    );
  }

  openCreateDialog() {
    this.createCategoryForm.reset();
    this.dialog.open(this.createDialog);
  }
  openDeleteDialog(id: number) {
    this.categoryToDeleteId = id; // Store the ID to delete
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
            this.deleteCategory();
        }
    });
}

deleteCategory() {
    if (this.categoryToDeleteId) {
        this.homeService.deleteCategory(this.categoryToDeleteId).subscribe(
            () => {
                this.toastr.success('Category deleted successfully');
                this.loadCategories(); // Refresh the categories list
                this.categoryToDeleteId = undefined; // Clear the ID
            },
            error => this.toastr.error('Failed to delete category')
        );
    }
}
  
  openUpdateDialog(category: any) {
    this.selectedCategory = category;
    this.updateCategoryForm.patchValue(category);
    this.dialog.open(this.updateDialog);
  }

  saveCategory() {
    const updatedCategory = this.updateCategoryForm.value;
    this.homeService.updateCategory(updatedCategory).subscribe(
      () => {
        this.toastr.success('Category updated successfully');
        this.loadCategories();
      },
      error => this.toastr.error('Failed to update category')
    );
  }

  createCategory() {
    const newCategory = this.createCategoryForm.value;
    this.homeService.createCategory(newCategory).subscribe(
      () => {
        this.toastr.success('Category created successfully');
        this.loadCategories();
      },
      error => this.toastr.error('Failed to create category')
    );
  }





}
