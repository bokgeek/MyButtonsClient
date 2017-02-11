import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SpinnerDialog } from 'ionic-native';

import { ButtonService } from './../../providers/buttons-service';
import { ButtonModel } from './buttons.model';

@Component({
    selector: 'mb-page-buttons',
    templateUrl: 'buttons.html'
})
export class ButtonsPageComponent {

    buttons: Array<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private buttonService: ButtonService) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ButtonsPage');

        this.getButtons();
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        this.getButtons();

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 500);
    }

    getButtons() {
        SpinnerDialog.show();
        this.buttonService.getButtons().subscribe(
            data => {
                this.buttons = data;
                console.log(data);
                SpinnerDialog.hide();
            },
            err => {
                console.log(err);
                SpinnerDialog.hide();
            },
            () => console.log('Yeah!! I get all buttons')
        );
    }

    doAction(button: ButtonModel) {
        console.log(button[0].label);
        console.log(button[0].description);
        this.buttonService.doAction(button[0]);
    }
}
