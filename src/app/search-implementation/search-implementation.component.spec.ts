import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchImplementationComponent } from './search-implementation.component';

describe('SearchImplementationComponent', () => {
  let component: SearchImplementationComponent;
  let fixture: ComponentFixture<SearchImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchImplementationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
