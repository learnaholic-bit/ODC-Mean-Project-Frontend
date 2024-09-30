import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBrowse1Component } from './menu-browse1.component';

describe('MenuBrowse1Component', () => {
  let component: MenuBrowse1Component;
  let fixture: ComponentFixture<MenuBrowse1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBrowse1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBrowse1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
