import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators ,ReactiveFormsModule } from "@angular/forms";

import { CategoryService } from "./category.service";
import { Category } from './category';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {
  //Component properties
  allCategory: Category[];
  statusCode: number;
  requestProcessing = false;
  categoryIdToUpdate = null;
  processValidation = false;
  category:Category;
  
  //Create constructor to get service instance
  constructor(private categoryService: CategoryService) {
  }

  //Create ngOnInit() and and load category
  ngOnInit(): void {
    this.getAllCategory();
  }   

  //Fetch all category
  getAllCategory() {
        this.categoryService.getAll()
        .subscribe(
               data => this.allCategory = data,
               errorCode =>  this.statusCode = errorCode
              );   
  }
  createCategory(name:String){
    let date=new Date();
    let d=date.getDate();
    let m=date.getMonth()+1;
    let y=date.getFullYear();
    let fulldate=y+"-"+m+"-"+d;
    this.category=new Category(0,name,fulldate);
    this.categoryService.create(this.category)
          .subscribe(successCode => {
           this.statusCode = successCode;
           this.getAllCategory();	
          },
            errorCode => this.statusCode = errorCode
          );
  }
  // //Handle create and update article
  // onCategoryFormSubmit() {
  //  this.processValidation = true;   
  //  if (this.categoryForm.invalid) {
  //       return; //Validation failed, exit from method.
  //  }   

  //  //Form is valid, now perform create or update
  //   this.preProcessConfigurations();
  //   let category = this.categoryForm.value;
  //   if (this.categoryIdToUpdate === null) {  
  //     //Generate article id then create article
  //     this.categoryService.getAll()
  //     .subscribe(categorys => {
      
      
  //     //Create article
  //       
  //   });		
  //  } else {  
  //         //Handle update article
  //         category.cid = this.categoryIdToUpdate; 		
  //         this.categoryService.update(category)
  //         .subscribe(successCode => {
  //         this.statusCode = successCode;
  //         this.getAllCategory();	
  //         this.backToCreateCategory();
  //         },
  //         errorCode => this.statusCode = errorCode);	  
  //  }
  // }
  //Load article by id to edit

  saveCategory(id:number,name: String){
    let date=new Date();
    let d=date.getDate();
    let m=date.getMonth();
    let y=date.getFullYear();
    let fulldate=y+"-"+m+"-"+d;
    this.category=new Category(id,name,fulldate);
    this.categoryService.update(this.category)
    .subscribe(successCode => {
    this.statusCode = successCode;
    this.getAllCategory();	
    },
    errorCode => this.statusCode = errorCode);
  }	
  loadCategoryToEdit(categoryId: number) {
     this.preProcessConfigurations();
     this.categoryService.getbyid(categoryId)
       .subscribe(category => {
               this.categoryIdToUpdate = category.cid;   
               
          this.processValidation = true;
          this.requestProcessing = false;   
           },
           errorCode =>  this.statusCode = errorCode);   
  }
  //Delete article
  deleteCategory(categoryId: number) {
     this.preProcessConfigurations();
     this.categoryService.deletebyId(categoryId)
       .subscribe(successCode => {
          this.statusCode = 204;
           this.getAllCategory();	
         },
           errorCode => this.statusCode = errorCode);    
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
  }
  
}
