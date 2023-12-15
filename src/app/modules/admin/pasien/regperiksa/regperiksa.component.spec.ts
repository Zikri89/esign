import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegperiksaComponent } from './regperiksa.component';

describe('RegperiksaComponent', () => {
  let component: RegperiksaComponent;
  let fixture: ComponentFixture<RegperiksaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegperiksaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegperiksaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
