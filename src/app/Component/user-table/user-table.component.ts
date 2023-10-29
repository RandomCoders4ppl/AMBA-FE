import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { ReportService } from 'src/app/Service/report.service';
import { Report } from '../../Models/report';
import * as moment from 'moment';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit,OnDestroy {

  hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  data : Report[] = []

  hotSettings: Handsontable.GridSettings = {
    data: this.data,
    columns: [
      {
        title: 'Email',
        type: 'text',
        data: 'email',
        readOnly: true
      },
      {
        title: 'Project',
        type: 'text',
        data: 'project',
        readOnly: true
      },
      {
        title: 'Project Type',
        type: 'text',
        data: 'type',
        readOnly: true
      },
      {
        title: 'Question completed',
        type: 'numeric',
        data: 'questionNumber',
        readOnly: true
      },
      {
        title: 'Score',
        type: 'text',
        data: 'score',
        className: 'htRight',
        readOnly: true
      },
      {
        title: 'Total Questions',
        type: 'text',
        data: 'totalQuestions',
        className: 'htCenter',
        readOnly: true
      },
      {
        title: 'Role',
        type: 'text',
        data: 'role',
        className: 'htRight',
        readOnly: true
      },
      {
        title: 'View All Answer',
        type: 'text',
        data: 'model',
      },
      {
        title: 'Report Date and Time',
        type: 'text',
        data: 'reportDateTime',
        readOnly: true
      }
    ],
    colHeaders: true,
    filters: true,
    dropdownMenu: true,
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',

  };

  constructor(private reportService: ReportService) { }

  ngAfterViewInit(): void {
    this.reportService.getAdminReport().subscribe(res => { 
      let hot = this.hotRegisterer.getInstance(this.id);
      res.forEach((element :Report) => {
        element.reportDateTime = moment(element.reportDateTime).format('DD/MM/YYYY HH:MM:SS');
        this.data.push(element)
      });
      hot.loadData(this.data)
      hot.render()
      })
  }

  ngOnDestroy() {
    this.hotRegisterer.getInstance(this.id).destroy();
  }

}
