import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { InAppBrowser, Device } from 'ionic-native';

import { ButtonModel } from './../pages/buttons/buttons.model';
import { InfoModel } from './../app/models/info.model';

@Injectable()
export class ButtonService implements OnInit {

    constructor(private platform: Platform, public http: Http) {
        console.log('Hello ButtonService Provider');
        this.ngOnInit(); // ngOnInit is not fired for services
    }

    ngOnInit() {
        this.platform.ready().then(() => {
            this.getContext();
        });
    }

    getContext() {
        console.log('DEVICE INFORMATION: ');
        console.log('Device UUID is: ' + Device.uuid);
        console.log('Device Model is: ' + Device.model);
        console.log('Device Platform is: ' + Device.platform);
        console.log('Device Version is: ' + Device.version);
    }

    getButtons() {
        let url = 'https://cryptic-dusk-67637.herokuapp.com/api/buttons';
        let response = this.http.get(url).map(res => res.json());

        return response;
    }

    doAction(button: ButtonModel) {
        console.log('BUTTON.TYPE: ' + button.type);

        switch (button.type) {
            case 'Link':
                this.actionBrowser(button.action);
                break;

            case 'API':
                this.actionPost(button);
                break;

            case 'App':
                this.actionApp(button.action); // Sends a mail, for now not opens other apps
                break;

            default:
                console.log('Acción no compatible');
        }
    }

    actionPost(button: ButtonModel) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        let infoPost: InfoModel = new InfoModel();
        infoPost.label = 'Date: ' + Date();
        infoPost.content = 'UUID: ' + Device.uuid + ' Platform: ' + Device.platform + ' Version: ' + Device.version;
        infoPost.user = 'Default User';
        infoPost.device = Device.model;

        console.log(button);

        let postParams = {
            label: infoPost.label,
            content: infoPost.content,
            user: infoPost.user,
            device: infoPost.device,
        };

        this.http.post('https://post-castle-74525.herokuapp.com/api/infos', postParams, options)
            .subscribe(data => {
                console.log(data['_body']);
            }, error => {
                console.log(error); // Error getting the data
            });
    }

    actionBrowser(url: string) {
        new InAppBrowser(url, '_system');
    }

    actionApp(url: string) {
        new InAppBrowser(url, '_system');
    }
}
