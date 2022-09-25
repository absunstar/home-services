import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { Preferences } from '@capacitor/preferences';
import {
  NavController,
  MenuController,
  AlertController,
  ToastController,
  LoadingController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class IsiteService {
  accessToken: string = null;
  baseURL: string = 'http://egytag.com';
  loader: HTMLIonLoadingElement = null;
  constructor(
    public http: HttpClient,
    public db: DatabaseService,
    private alerCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    setInterval(() => {
      this.loadPosts();
    }, 1000 * 15);
  }

  alert(title, msg) {
    return this.alerCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'موافق',
        },
      ],
    });
  }

  msg(msg) {
    return this.toastCtrl
      .create({
        message: msg,
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast',
      })
      .then((toast) => {
        toast.present();
      });
  }
  async showLoading() {
    if (this.loader) {
      this.loader.present();
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'جارى التحميل'
      });
      this.loader = loader;
      this.loader.present();
    }
  }
  hideLoading(){
     this.loader.dismiss();
  }

  async start() {
    
    if (!this.accessToken) {
     await this.showLoading();
      this.accessToken =
        (await (await Preferences.get({ key: 'accessToken' })).value) || null;
      if (this.accessToken) {
        this.msg('التطبيق جاهز للعمل');
       this.hideLoading();
      }
    }
    if (!this.accessToken) {
      this.http
        .post(this.baseURL + '/x-api/session', {})
        .subscribe((res: any) => {
          if (res.done) {
            this.accessToken = res.session.accessToken;
            if (this.accessToken) {
              this.msg('التطبيق جاهز للعمل');
              this.hideLoading();
              Preferences.set({
                key: 'accessToken',
                value: this.accessToken,
              });
            }
          }
        });
    }
  }

  async post(options: any) {
    return new Promise((resolve, reject) => {
      if (!this.accessToken) {
        this.start();
        setTimeout(() => {
          this.post(options);
        }, 1000 * 5);
      } else {
        options.headers = options.headers || {};
        options.headers['Access-Token'] = this.accessToken;
        this.http
          .post(options.url, options.body, { headers: options.headers })
          .subscribe((res: any) => {
            resolve(res);
          });
      }
    });
  }

  loadPosts() {
    this.post({ url: 'https://egytag.com/api/posts/all' }).then((res: any) => {
      if (res.done) {
        this.db.list = res.list;
        console.log(this.db.list);
      }
    });
  }
}
