import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private formbuilder : FormBuilder,private auth: AuthService){}

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
  if(!this.LoginForm.invalid){
    const email  = this.LoginForm.value.User_Email;
    const password = this.LoginForm.value.User_Password;
    this.auth.login(email,password).subscribe(res=> console.log(res))
  }
  }

  RegNewUser(){

  }

}
