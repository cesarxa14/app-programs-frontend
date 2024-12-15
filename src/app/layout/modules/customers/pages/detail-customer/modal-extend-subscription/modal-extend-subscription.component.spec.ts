import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExtendSubscriptionComponent } from './modal-extend-subscription.component';

describe('ModalExtendSubscriptionComponent', () => {
  let component: ModalExtendSubscriptionComponent;
  let fixture: ComponentFixture<ModalExtendSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExtendSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExtendSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
