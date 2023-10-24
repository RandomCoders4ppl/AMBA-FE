import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private formbuilder : FormBuilder,private auth: AuthService,private router:Router){}

  public NewUser : Boolean = false;

  public LoginForm! : FormGroup;

  public SignUp! : FormGroup;
  
  ngOnInit(): void {
    this.LoginForm = this.formbuilder.group({
      User_Email : new FormControl(null,[Validators.required,Validators.email]),
      User_Password : new FormControl(null,[Validators.required,Validators.minLength(3)])
    })

    this.SignUp = this.formbuilder.group({
      Name : new FormControl(null,Validators.required),
      User_Email : new FormControl(null,[Validators.required,Validators.email]),
      User_Password : new FormControl(null,[Validators.required,Validators.minLength(3)])
    })
  }


  setNewUser(state : Boolean){
   this.NewUser = state;
  }

  LogIn(){
  if(this.LoginForm.valid){
    const email  = this.LoginForm.value.User_Email;
    const password = this.LoginForm.value.User_Password;
    localStorage.removeItem("token")
    this.auth.login(email,password).subscribe(res=> {
      // Save token to local storage
      if(res !== null && res.token!==null){
      localStorage.setItem("token",res.token)
      this.router.navigate([""])
      }
    })
  }
  }

  RegNewUser(){
    if(this.SignUp.valid){
      const name  = this.SignUp.value.Name;
      const email  = this.SignUp.value.User_Email;
      const password = this.SignUp.value.User_Password;
      this.auth.SignUp(name,email,password).subscribe(res =>console.log(res))
    }

  }

}
