import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class PostService {

    constructor(private platform: Platform, public http: Http) {
        console.log('Hello PostService Provider');
    }

    getPosts() {
        let url = 'https://post-castle-74525.herokuapp.com/api/infos';
        let response = this.http.get(url).map(res => res.json());

        return response;
    }
}
