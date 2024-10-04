import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemDeleteComponent } from './menu-item-delete.component';

describe('MenuItemDeleteComponent', () => {
  let component: MenuItemDeleteComponent;
  let fixture: ComponentFixture<MenuItemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
