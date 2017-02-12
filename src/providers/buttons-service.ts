import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform, AlertController } from 'ionic-angular';
import { InAppBrowser, Device, Toast } from 'ionic-native';

import { ButtonModel } from './../pages/buttons/buttons.model';
import { InfoModel } from './../app/models/info.model';
import { BusyIndicatorService } from './busy-indicator.service';

@Injectable()
export class ButtonService implements OnInit {

    constructor(private platform: Platform, public http: Http, public alertCtrl: AlertController,
                private busyIndicatorService: BusyIndicatorService) {
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
                this.actionApp(button.action); // Open apps wich has something like mailto: / tel: ...
                break;

            default:
                console.log('Acción no compatible');
        }
    }

    actionPost(button: ButtonModel) {

        // Ask for comments
        this.showPrompt(button);
    }

    actionBrowser(url: string) {
        new InAppBrowser(url, '_system');
    }

    actionApp(url: string) {
        new InAppBrowser(url, '_system');
    }

    // Posts device settings and, optionally, comments (input)
    postData(button: ButtonModel, input: string) {
        this.busyIndicatorService.loadingAnimationStart();
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        let infoPost: InfoModel = new InfoModel();
        infoPost.label = new Date(Date.now()).toLocaleString();
        infoPost.content = input;
        infoPost.user = 'Default User';

        if (Device.uuid) {
            infoPost.device = 'Device: ' + Device.model + 'UUID: ' +
                Device.uuid + ' Platform: ' + Device.platform + ' Version: ' + Device.version;
        }else {
            infoPost.device = 'Browser';
        }

        let postParams = {
            label: infoPost.label,
            content: infoPost.content,
            user: infoPost.user,
            device: infoPost.device
        };

        this.http.post('https://post-castle-74525.herokuapp.com/api/infos', postParams, options)
            .subscribe(data => {
                console.log(data['_body']);
                if (this.busyIndicatorService.isBusyIndicatorVisible()) {
                     this.busyIndicatorService.loadingAnimationEnd();
                }
                if (this.platform.is('cordova')) {
                    Toast.show('Post sent :)', '3000', 'center').subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );
                }

            }, error => {
                console.log(error); // Error getting the data
                if (this.busyIndicatorService.isBusyIndicatorVisible()) {
                     this.busyIndicatorService.loadingAnimationEnd();
                }
                if (this.platform.is('cordova')) {
                    Toast.show('Post failed! :(', '3000', 'center').subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );
                }
            });
    }

    showPrompt(button: ButtonModel) {

        let prompt = this.alertCtrl.create({
            title: 'Optional comments',
            message: 'Type your comments if needed',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: data => {
                        console.log('Send clicked');
                        this.postData(button, data.title);

                    }
                }
            ]
        });

        prompt.present();
    }
}
