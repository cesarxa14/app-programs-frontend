import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAssistComponent } from './historial-assist.component';

describe('HistorialAssistComponent', () => {
  let component: HistorialAssistComponent;
  let fixture: ComponentFixture<HistorialAssistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAssistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
