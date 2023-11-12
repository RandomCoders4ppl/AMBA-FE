import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser! : User;

  constructor(private auth:AuthService){}



  ngOnInit(): void {
    this.auth.getUser().subscribe(user=>{
      this.currentUser = user;
    })
  }
     
}
