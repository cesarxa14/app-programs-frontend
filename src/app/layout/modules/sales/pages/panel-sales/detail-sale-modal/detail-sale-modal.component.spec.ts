import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSaleModalComponent } from './detail-sale-modal.component';

describe('DetailSaleModalComponent', () => {
  let component: DetailSaleModalComponent;
  let fixture: ComponentFixture<DetailSaleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSaleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSaleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
