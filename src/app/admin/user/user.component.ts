import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators ,ReactiveFormsModule } from "@angular/forms";

import { User } from './user';
import { UserService } from './user.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {

  allUser: User[];
  statusCode: number;
  requestProcessing = false;
  userIdToUpdate = null;
  processValidation = false;
  //user:User;
  //Create constructor to get service instance
  constructor(private userService: UserService) {
  }

  //Create ngOnInit() and and load 
  ngOnInit(): void {
    this.getAll();
  }   

  //Fetch all 
  getAll() {
        this.userService.getAll()
        .subscribe(
               data => this.allUser = data,
               errorCode =>  this.statusCode = errorCode
              );   
  }
  create(username:String,password:String,role:String){
    let user=new User(username,password,role);
    this.userService.create(user)
          .subscribe(successCode => {
           this.statusCode = successCode;
           this.getAll();	
          },
            errorCode => this.statusCode = errorCode
          );
  }
  

  save(username:String,password:String,role:String){
    let user=new User(username,password,role);
    this.userService.update(user)
    .subscribe(successCode => {
    this.statusCode = successCode;
    this.getAll();	
    },
    errorCode => this.statusCode = errorCode);
  }	
  
  //Delete article
  delete(username: String) {
     this.preProcessConfigurations();
     this.userService.deletebyId(username)
       .subscribe(successCode => {
          this.statusCode = 204;
           this.getAll();	
         },
           errorCode => this.statusCode = errorCode);    
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
  }

}
