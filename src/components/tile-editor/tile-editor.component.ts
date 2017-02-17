import {Component, Input, AfterViewInit} from '@angular/core';
import {Gesture} from 'ionic/Gesture';
import {Camera} from 'ionic-native';

var nextTileCanvasId = 0;
declare var Hammer: any;

@Component({
    selector: 'tile-editor',
    template: `
        <div class="tile-editor" (mousedown)="onMouseDown($event)" (mouseup)="onMouseUp($event)">
            <canvas [id]="canvasId" [width]="width" [height]="height" [ngStyle]="{ 'position': 'absolute', 'left.px': left, 'top.px': top }">
            </canvas>
        </div>
    `
})
export class TileEditorComponent implements AfterViewInit {
    @Input('left') 
    public left: number;

    @Input('top') 
    public top: number;

    @Input('width') 
    public width: number;

    @Input('height') 
    public height: number;

    public canvasId: string = `tile-editor-cv-${nextTileCanvasId++}`;

    @Input('bgColor') 
    private bgColor: string = '#c0c0c0';
    
    private image: HTMLImageElement = null;
    private x: number = 0;
    private y: number = 0;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private scale: number = 1;

    public ngAfterViewInit() {
        this.render();
        this.initializeInteraction();
    }

    private render(): void {
        let cv = <HTMLCanvasElement>document.getElementById(this.canvasId);
        let context = cv.getContext('2d');

        context.fillStyle = this.bgColor;
        context.fillRect(0, 0, this.width, this.height);

        if(this.image != null) {
            let size = Math.max(this.width, this.height);
            context.drawImage(this.image, this.x, this.y, size * this.scale, size * this.scale);
        }
    }

    private onMouseDown(e) {
    }

    private onMouseUp(e) {
        let options = {
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true
        };
        Camera.getPicture(options).then((imageData) => {
            let imageSource = "data:image/jpeg;base64," + imageData;
            this.image = new Image();
            this.image.onload = () => {
                this.render();
            };
            this.image.src = imageSource;
        }, (err) => {
            console.log("ERROR: " + err.message);
        });
    }

    private initializeInteraction(): void {
        let hm = new Hammer(document.getElementById(this.canvasId));
        hm.get('pinch').set({ enable: true });
        hm.on('pinchstart pinchmove', e => {
            this.scale = e.scale;
            this.render();
        });

        hm.on('panstart', e => {
            this.offsetX = this.x;
            this.offsetY = this.y;
        });
        hm.on('panmove', e => {
            this.x = this.offsetX + e.deltaX;
            this.y = this.offsetY + e.deltaY;

            this.render();
        });
    }
}