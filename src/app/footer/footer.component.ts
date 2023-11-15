import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  aboutUS = [{text :"AMBA NGO",link:"https://www.ambaforlife.org/"}]
  US = [{text :"AMBA NGO",link:"https://www.ambaforlife.org/"}]
  Projects = [{text :"AMBA NGO",link:"https://www.ambaforlife.org/"}]
  date = new Date().getFullYear()
}
