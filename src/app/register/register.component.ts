import { Component, OnInit } from '@angular/core';
import { UserService } from '../admin/user/user.service';
import { User } from '../admin/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService) { }
  message:String;
  ngOnInit() {
  }
  addUser(username:String,password:String){
    // if(username===""&&password==="") return;
    let user=new User(username,password,"USER");
    let datas;
    this.userService.getbyid(username).subscribe(data=>datas=data);
    if(datas==null)
    this.userService.create(user).subscribe(data=>this.message="Đăng ký thành công!");
    else 
    this.message="Đăng ký thất bại!"
  }
}
