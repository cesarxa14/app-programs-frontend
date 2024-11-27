import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyCustomerModalComponent } from './edit-my-customer-modal.component';

describe('EditMyCustomerModalComponent', () => {
  let component: EditMyCustomerModalComponent;
  let fixture: ComponentFixture<EditMyCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyCustomerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMyCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
