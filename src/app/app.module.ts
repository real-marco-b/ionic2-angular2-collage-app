import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EditPage } from '../pages/edit/edit';
import { HomePage } from '../pages/home/home';

import {LayoutService} from '../services/layout.service';
import {GalleryService} from '../services/gallery.service';

import {LayoutPreviewComponent} from '../components/layout-preview/layout-preview.component';
import {TileEditorComponent} from '../components/tile-editor/tile-editor.component';
import {LayoutEditorComponent} from '../components/layout-editor/layout-editor.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditPage,
    LayoutPreviewComponent,
    TileEditorComponent,
    LayoutEditorComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LayoutService,
    GalleryService
  ]
})
export class AppModule {}
