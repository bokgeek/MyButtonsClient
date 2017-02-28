import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPageComponent } from '../pages/tabs/tabs';


@Component({
    templateUrl: 'app.html'
})
export class MyButtonsComponent {
    rootPage = TabsPageComponent;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            // Splashscreen.hide();
            // -this.hideSplashScreen();
        });
    }

    // private hideSplashScreen() {
    //     if (Splashscreen) {
    //         setTimeout(() => {
    //             Splashscreen.hide();
    //         }, 100);
    //     }
    // }
}
