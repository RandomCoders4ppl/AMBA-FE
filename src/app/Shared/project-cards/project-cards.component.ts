import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-cards',
  templateUrl: './project-cards.component.html',
  styleUrls: ['./project-cards.component.css']
})
export class ProjectCardsComponent implements OnInit{

  constructor( private router: Router ) { }

  ngOnInit(): void {}
    
  @Input() id = '';
  @Input() name = ''
  @Input() image =''


  onclickProject(){
    this.router.navigate(["/project/"+this.id])
  }

}
