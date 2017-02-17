import {Component, Input, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import { AlertController } from 'ionic-angular';

import {LayoutService} from '../../services/layout.service';
import {GalleryService} from '../../services/gallery.service';
import {Rect} from '../../data/rect';
import {TileEditorComponent} from '../tile-editor/tile-editor.component';

@Component({
    selector: 'layout-editor',
    template: `
        <div class="layout-editor">
            <tile-editor #editors *ngFor="let seg of segments" [left]="seg.left" [top]="seg.top" [width]="seg.width" [height]="seg.height" style="margin:20px;">
            </tile-editor>
        </div>
    `
})
export class LayoutEditorComponent implements AfterViewInit {
    @Input('size') private size: number;
    @Input('layout') private layoutUrl: string;
    private segments: Array<Rect>;

    @ViewChildren('editors') private editors: QueryList<TileEditorComponent>;

    constructor(
        private layoutService: LayoutService, 
        private galleryService: GalleryService,
        private alertCtrl: AlertController) {
    }

    public ngAfterViewInit(): void {
        if(this.layoutUrl != null) {
            this.layoutService.getLayout(this.layoutUrl).subscribe(layout => {
                this.segments = new Array<Rect>();
                layout.segments.map(seg => {
                    let r = Rect.fromSegment(seg);
                    r.multiply(this.size / 100);
                    r.applyMargin(10, this.size);

                    this.segments.push(r);
                });
            });
        }
    }

    public save(): void {
        let cv = <HTMLCanvasElement>document.createElement('canvas');
        cv.width = this.size;
        cv.height = this.size;
        let context = cv.getContext('2d');

        context.fillStyle = '#fff';
        context.fillRect(0, 0, cv.width, cv.height);

        this.editors.map((tile: TileEditorComponent) => {
            let cvChild = <HTMLCanvasElement>document.getElementById(tile.canvasId);
            context.drawImage(cvChild, tile.left, tile.top, tile.width, tile.height);
        });

        let data = cv.toDataURL('image/png');
        this.galleryService.savePicture(data).subscribe(success => {
            if(success) {
                this.showSuccess();
            }
            else {
                this.showError();
            }
        });
    }

    private showSuccess(): void {
        let alert = this.alertCtrl.create({
            title: 'Save to Device',
            subTitle: 'Your collage has been saved to your device photo album. :)',
            buttons: ['OK']
        });
        alert.present();
    }

    private showError(): void {
        let alert = this.alertCtrl.create({
            title: 'Save to Device',
            subTitle: 'Something went wrong on saving your collage. Did you grant photo access to this damn fine app?',
            buttons: ['OK']
        });
        alert.present();
    }
}