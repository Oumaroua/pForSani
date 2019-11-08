import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthUser } from 'src/app/models/authUser.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private roles:Array<any>;
  constructor(private authService:AuthentificationService,private http:HttpClient,private router:Router,) { }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  Authentifier(fo:NgForm){
    const user:AuthUser=new AuthUser();
    user.username=fo.value.username;
    user.password=fo.value.password;
    console.log(user);
   
      this.authService.LoginUser(user).subscribe(
        response=>{
          let token:string=response.headers.get('Authorization'); 
          localStorage.setItem('token',token);
          const helper = new JwtHelperService();
         location.href='accueil';
        },error=>{
          console.log(error);
        }
      )

  }
}
