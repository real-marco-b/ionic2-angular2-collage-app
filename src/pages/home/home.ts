import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LayoutPreviewComponent} from '../../components/layout-editor/layout-preview.component';
import {EditPage} from '../edit/edit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public onLayoutSelected(layoutUrl: string): void {
    this.navCtrl.push(EditPage, {
      "layoutUrl": layoutUrl
    });
  }

}
