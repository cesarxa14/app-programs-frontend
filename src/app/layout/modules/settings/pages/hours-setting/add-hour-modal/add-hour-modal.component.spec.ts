import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHourModalComponent } from './add-hour-modal.component';

describe('AddHourModalComponent', () => {
  let component: AddHourModalComponent;
  let fixture: ComponentFixture<AddHourModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHourModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
