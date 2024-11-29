import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePortalComponent } from './store-portal.component';

describe('StorePortalComponent', () => {
  let component: StorePortalComponent;
  let fixture: ComponentFixture<StorePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
