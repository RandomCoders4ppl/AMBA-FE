import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassiveQuestionUploadStatusComponent } from './massive-question-upload-status.component';

describe('MassiveQuestionUploadStatusComponent', () => {
  let component: MassiveQuestionUploadStatusComponent;
  let fixture: ComponentFixture<MassiveQuestionUploadStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MassiveQuestionUploadStatusComponent]
    });
    fixture = TestBed.createComponent(MassiveQuestionUploadStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
