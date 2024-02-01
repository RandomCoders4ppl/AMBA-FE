import { AfterContentChecked, AfterViewInit, Component, DestroyRef, DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Service/auth.service';
import { NavbarService } from 'src/app/Service/navbar.service';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,AfterViewInit{

  constructor( public navBarService : NavbarService,private auth:AuthService,private cdr: ChangeDetectorRef,private router:Router){}
  
  name: string = '';
  email:string = '';
  admin:boolean = false;

  hide :boolean=false;
    
  @ViewChild('matNavbar', { static: false })
  matNavbar!: ElementRef;

  ngOnInit(): void {
    this.auth.getUser().subscribe(user=>{
      this.name=user.name;
      this.email=user.email;
      this.admin = (user.role as string).toUpperCase()==="ADMIN"?true:false;
    })
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if(event.url.includes("/project/")){
          this.hide=true;
        }else{
          this.hide=false;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.matNavbar)
    var width = this.matNavbar.nativeElement.offsetWidth;
    this.navBarService.heightOfNavbar = this.matNavbar.nativeElement.offsetHeight;
    console.log('Width:' + width);
    console.log('Height: ' + this.navBarService.heightOfNavbar);
  }

  LogOut() {
    this.email = "";
    this.name = "";
    this.admin = false;
    this.auth.clear()
  }

  LogIn(){
    this.auth.toLoginPage()
  }

  Profile() {
     this.auth.toProfilePage();
  }

}
