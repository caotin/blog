import { Component, OnInit } from '@angular/core';
import {NgModel,NgForm} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router';
import { User } from './user/user';

declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showmenu=false;
  routers:Router;
  userlocal:User;
  constructor(private router:Router) {
    this.routers=router;
  }

  ngOnInit() {
    this.userlocal=JSON.parse(localStorage.getItem('currentUser'));
  }
  logout(){
    localStorage.removeItem('currentUser');
  }
}
