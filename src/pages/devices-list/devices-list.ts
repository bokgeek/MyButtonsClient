import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PostService } from './../../providers/posts-service';
import { BusyIndicatorService } from './../../providers/busy-indicator.service';

@Component({
    selector: 'mb-devices-list',
    templateUrl: 'devices-list.html'
})

export class DevicesListComponent {

    posts: Array<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private postService: PostService,
                private busyIndicatorService: BusyIndicatorService) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DevicesListPage');
        this.getPosts();
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        this.getPosts();

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 500);
    }

    getPosts() {
        this.busyIndicatorService.loadingAnimationStart();
        this.postService.getPosts().subscribe(
            data => {
                this.posts = data;
                console.log(data);
                if (this.busyIndicatorService.isBusyIndicatorVisible()) {
                     this.busyIndicatorService.loadingAnimationEnd();
                }
            },
            err => {
                console.log(err);
                if (this.busyIndicatorService.isBusyIndicatorVisible()) {
                     this.busyIndicatorService.loadingAnimationEnd();
                }
            },
            () => console.log('Yeah!! I get all posts')
        );
    }

}
