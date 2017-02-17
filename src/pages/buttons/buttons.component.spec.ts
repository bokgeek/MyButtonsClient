/*
 * Testing a simple Angular 2 component
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#simple-component-test
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ButtonService } from './../../providers/buttons-service';
import { ButtonsPageComponent } from './buttons';
import { BusyIndicatorService } from './../../providers/busy-indicator.service';

describe('ButtonsPageComponent TEST', () => {
    let fixture: ComponentFixture<ButtonsPageComponent>;
    let instance: ButtonsPageComponent;

    let buttonService: ButtonService;
    let busyIndicatorService: BusyIndicatorService;

    let buttonServiceStub = {
        getButtons(): any {
            let myJson =
                `{"_id": "589f41b8ca02fd04004a3d9a",
            "label": "Google",
            "description": "This button navigate to Google!",
            "action": "http://www.google.com",
            "type": "Link",
            "color": "Blue",
            "__v": 0}`;

            return { subscribe: () => { <any>JSON.parse(myJson); } };
        },

    };

    let busyIndicatorServiceStub = {
        loadingAnimationStart(text: string) { }
    };


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsPageComponent
            ],
            providers: [
                { provide: NavController },
                { provide: NavParams },
                { provide: Observable },
                { provide: ButtonService, useValue: buttonServiceStub },
                { provide: BusyIndicatorService, useValue: busyIndicatorServiceStub }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonsPageComponent);
        instance = fixture.componentInstance;

        buttonService = fixture.debugElement.injector.get(ButtonService);
        busyIndicatorService = fixture.debugElement.injector.get(BusyIndicatorService);
    });

    it('should enter the assertion (Dummy Test)', () => {
        fixture.detectChanges();
        expect(true).toBe(true);
    });

    it('should check getButtons is called', () => {
        spyOn(buttonService, 'getButtons').and.callThrough();
        instance.ionViewDidLoad();
        expect(buttonService.getButtons).toHaveBeenCalled();
    });

    it('should check html is show', () => {
        fixture.detectChanges();
        const p = fixture.debugElement.query(By.css('p')).nativeElement;
        expect(p.textContent).toBe('These buttons are loaded dynamically from an external server');
    });


});
