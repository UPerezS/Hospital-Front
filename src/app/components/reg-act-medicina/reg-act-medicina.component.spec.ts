import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegActMedicinaComponent } from './reg-act-medicina.component';

describe('RegActMedicinaComponent', () => {
  let component: RegActMedicinaComponent;
  let fixture: ComponentFixture<RegActMedicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegActMedicinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegActMedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
