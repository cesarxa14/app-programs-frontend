import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSalesComponent } from './panel-sales.component';

describe('PanelSalesComponent', () => {
  let component: PanelSalesComponent;
  let fixture: ComponentFixture<PanelSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
