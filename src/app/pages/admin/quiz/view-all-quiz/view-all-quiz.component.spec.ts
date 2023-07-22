import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllQuizComponent } from './view-all-quiz.component';

describe('ViewAllQuizComponent', () => {
    let component: ViewAllQuizComponent;
    let fixture: ComponentFixture<ViewAllQuizComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ViewAllQuizComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ViewAllQuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
