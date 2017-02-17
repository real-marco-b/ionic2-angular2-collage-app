import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LayoutEditorComponent} from '../../components/layout-editor/layout-editor.component';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {
  private selectedLayout: string;
  private layoutWidth: number;

  @ViewChild('layoutEditor') layoutEditor: LayoutEditorComponent;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.layoutWidth = Math.floor(window.innerWidth * 0.9);
    this.selectedLayout = navParams.get("layoutUrl");
  }

  private onSave(): void {
    this.layoutEditor.save();
  }

}
