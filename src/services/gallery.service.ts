import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Base64ToGallery } from 'ionic-native';

@Injectable()
export class GalleryService {
    public savePicture(base64dataUrl: string): Observable<boolean> {
        let observable = Observable.create(observer => {8
            Base64ToGallery.base64ToGallery(base64dataUrl, {
                prefix: 'collage_',
                mediaScanner: true
            }).then(
                res => observer.next(true),   
                err => observer.next(false)
            );
        });

        return observable;
    }
}