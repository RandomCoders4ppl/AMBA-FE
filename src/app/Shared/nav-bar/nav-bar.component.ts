import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Service/auth.service';
import { NavbarService } from 'src/app/Service/navbar.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,AfterViewInit{

  constructor( private navBarService : NavbarService,private auth:AuthService,private cdr: ChangeDetectorRef){}
  
  name: string = '';
  email:string = '';
    
  @ViewChild('matNavbar', { static: true })
  matNavbar!: ElementRef ;

  ngOnInit(): void {
    this.auth.getUser().subscribe(user=>{
      this.name=user.name;
      this.email=user.name;
    })
  }

  ngAfterViewInit(): void {
    var width = this.matNavbar.nativeElement.offsetWidth;
    this.navBarService.heightOfNavbar = this.matNavbar.nativeElement.offsetHeight;
    console.log('Width:' + width);
    console.log('Height: ' + this.navBarService.heightOfNavbar);
  }

  LogOut() {
    this.auth.clear()
  }

  LogIn(){
    this.auth.toLoginPage()
  }

  Profile() {
     this.auth.toProfilePage();
  }

}
