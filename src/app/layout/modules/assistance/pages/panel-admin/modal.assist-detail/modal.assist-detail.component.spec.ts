import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssistDetailComponent } from './modal.assist-detail.component';

describe('ModalAssistDetailComponent', () => {
  let component: ModalAssistDetailComponent;
  let fixture: ComponentFixture<ModalAssistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAssistDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAssistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
