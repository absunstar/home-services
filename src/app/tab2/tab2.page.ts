import { Component } from '@angular/core';
import { IsiteService } from '../services/isite.service';
import { ActionSheetController } from '@ionic/angular';
import { UserPhoto } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  async ngOnInit() {
    await this.isiteService.db.photoService.loadSaved();
  }
  constructor(
    public isiteService: IsiteService,
    public actionSheetController: ActionSheetController
  ) {
  
  }
  selectService(s){
    this.isiteService.db.order.service = s;
    console.log(this.isiteService.db.order.service)
  }
  addPhotoToGallery() {
    this.isiteService.db.photoService.addNewToGallery();
  }
  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.isiteService.db.photoService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
