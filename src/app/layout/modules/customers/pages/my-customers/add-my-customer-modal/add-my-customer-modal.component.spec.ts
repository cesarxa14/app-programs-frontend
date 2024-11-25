import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyCustomerModalComponent } from './add-my-customer-modal.component';

describe('AddMyCustomerModalComponent', () => {
  let component: AddMyCustomerModalComponent;
  let fixture: ComponentFixture<AddMyCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMyCustomerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMyCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
