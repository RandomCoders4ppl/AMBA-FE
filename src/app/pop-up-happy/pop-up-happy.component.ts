import { Component ,Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-happy',
  templateUrl: './pop-up-happy.component.html',
  styleUrls: ['./pop-up-happy.component.css']
})
export class PopUpHappyComponent {
  constructor(
    public dialogRef: MatDialogRef<PopUpHappyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  header: string;
  text: string;
}
