import { Injectable } from '@angular/core';
import { PhotoService } from './photo.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  list: [];
  order: order;
  service: service;
  serviceList: [service];
  constructor(public photoService: PhotoService) {
    this.order = {
      service: null,
      description : null,
      danger : false
    };
    this.serviceList = [
      {
        id: 1,
        name: 'نجار',
        logo_url: 'assets/images/service0.png',
      },
    ];
    this.serviceList.push({
      id: 2,
      name: 'سباك',
      logo_url: 'assets/images/service0.png',
    });
    this.serviceList.push({
      id: 3,
      name: 'كهربائى',
      logo_url: 'assets/images/service0.png',
    });
    this.serviceList.push({
      id: 4,
      name: 'نقاش',
      logo_url: 'assets/images/service0.png',
    });
    this.serviceList.push({
      id: 4,
      name: 'تركيب فلتر',
      logo_url: 'assets/images/service0.png',
    });
  }
}
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}

export interface order {
  service: service;
  description : string;
  danger : boolean
}
export interface service {
  id: number;
  name: string;
  logo_url: string;
}
