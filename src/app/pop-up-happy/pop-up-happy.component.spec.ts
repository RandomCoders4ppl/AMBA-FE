import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpHappyComponent } from './pop-up-happy.component';

describe('PopUpHappyComponent', () => {
  let component: PopUpHappyComponent;
  let fixture: ComponentFixture<PopUpHappyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpHappyComponent]
    });
    fixture = TestBed.createComponent(PopUpHappyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
