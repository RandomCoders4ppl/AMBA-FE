import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/Service/navbar.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,AfterViewInit{
  
  constructor( private navBarService : NavbarService ){}

    
  @ViewChild('matNavbar', { static: true })
  matNavbar!: ElementRef ;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    var width = this.matNavbar.nativeElement.offsetWidth;
    this.navBarService.heightOfNavbar = this.matNavbar.nativeElement.offsetHeight;
    console.log('Width:' + width);
    console.log('Height: ' + this.navBarService.heightOfNavbar);
  }

}
