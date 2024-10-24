import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinssCardComponent } from './create-businss-card.component';

describe('CreateBusinssCardComponent', () => {
  let component: CreateBusinssCardComponent;
  let fixture: ComponentFixture<CreateBusinssCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBusinssCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusinssCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
