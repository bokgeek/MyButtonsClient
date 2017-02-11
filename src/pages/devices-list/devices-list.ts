import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SpinnerDialog } from 'ionic-native';

import { PostService } from './../../providers/posts-service';

@Component({
    selector: 'mb-devices-list',
    templateUrl: 'devices-list.html'
})

export class DevicesListComponent {

    posts: Array<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private postService: PostService) { }

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
        SpinnerDialog.show();
        this.postService.getPosts().subscribe(
            data => {
                this.posts = data;
                console.log(data);
                SpinnerDialog.hide();
            },
            err => {
                console.log(err);
                SpinnerDialog.hide();
            },
            () => console.log('Yeah!! I get all posts')
        );
    }

}
