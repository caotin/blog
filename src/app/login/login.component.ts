import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormsModule,NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthenticationService]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    
   }

  ngOnInit() {
    this.authenticationService.logout();
  }
  login() {
    this.loading = true;
    console.log(this.model.username);
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(result => {

            if (result === true) {
                this.router.navigate(['//']);
                // window.location.href="/";
            } else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
  } 
}
