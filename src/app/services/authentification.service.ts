import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/authUser.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  auth = 'http://localhost:8080/login';
  constructor(private http:HttpClient) { 
  }

  LoginUser(user:AuthUser):Observable<any>{
    return this.http.post(this.auth,user,{observe:'response'});
  }

  GetRoleUtilisateur():string{
    let token=localStorage.getItem('token');
    const helper = new JwtHelperService();
    const role=helper.decodeToken(token).roles[0].authority;
    if(!helper.isTokenExpired(token)){
      return role;
    }else{
      return "";
    }
  }

  Access(){
    let token=localStorage.getItem('token');
    const helper = new JwtHelperService();
    if(!helper.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
  }

}
