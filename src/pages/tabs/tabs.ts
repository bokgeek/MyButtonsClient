import { Component } from '@angular/core';

import { HomePageComponent } from '../home/home';
import { ButtonsPageComponent } from './../buttons/buttons';
import { DevicesListComponent } from './../devices-list/devices-list';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPageComponent {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePageComponent;
    tab2Root: any = ButtonsPageComponent;
    tab3Root: any = DevicesListComponent;

    constructor() {

    }
}
