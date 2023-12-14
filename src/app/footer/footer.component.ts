import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  aboutUS = [{text :"AMBA NGO",link:"https://www.ambaforlife.org/"}]
  US = [{text :"AMBA NGO",link:"https://www.ambaforlife.org/"}]
  Projects = [{text :"AMBA NGO",link:"https://www.ambaforlife.org/"}]
  date = new Date().getFullYear()

  hide :boolean=false;

  constructor(private router:Router){}

  ngOnInit(): void {
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

}
