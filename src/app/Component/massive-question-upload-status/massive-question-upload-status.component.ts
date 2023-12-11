import { AfterViewInit, Component, Input } from '@angular/core';
import * as moment from 'moment';
import { QuestionService } from 'src/app/Service/question.service';


@Component({
  selector: 'app-massive-question-upload-status',
  templateUrl: './massive-question-upload-status.component.html',
  styleUrls: ['./massive-question-upload-status.component.css']
})
export class MassiveQuestionUploadStatusComponent{

  @Input()  uploadStatus!: string ;

  @Input()  uploadID!: string ;

  @Input()  uploadDateTime!: String ;
  
  constructor( private questionService: QuestionService) { }

  downloadRespDocument(){
    this.questionService.downloadRespDocument(Number(this.uploadID)).subscribe(data=>{
      console.log(data)
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}));
      downloadLink.download = "document_"+this.uploadID+".docx";
      console.log(downloadLink.download)
      downloadLink.click();
    });
  }
}
