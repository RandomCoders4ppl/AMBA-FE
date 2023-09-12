import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionPageComponent } from './admin-question-page.component';

describe('AdminQuestionPageComponent', () => {
  let component: AdminQuestionPageComponent;
  let fixture: ComponentFixture<AdminQuestionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminQuestionPageComponent]
    });
    fixture = TestBed.createComponent(AdminQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
