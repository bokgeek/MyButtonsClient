import { Injectable } from '@angular/core';
import { LoadingController, Loading, LoadingOptions } from 'ionic-angular';

const DEFAULT_MESSAGE = 'Please wait...';

@Injectable()
export class BusyIndicatorService {

    private loading: Loading;

    constructor(private loadingCtrl: LoadingController) {
    }

    public loadingAnimationStart(message?: string): void {
        if (!message) {
            message = DEFAULT_MESSAGE;
        }
        let options: LoadingOptions = {content: message};
        this.loading = this.loadingCtrl.create(options);
        this.loading.present();
    }

    public loadingAnimationEnd(): void {
        if (this.loading) {
            this.loading.dismiss().catch(() => {});
        }
    }

    public isBusyIndicatorVisible(): boolean {
        return this.loading !== undefined;
    }

}
