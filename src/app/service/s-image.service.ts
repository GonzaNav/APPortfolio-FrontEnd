import { Injectable } from '@angular/core';
import {Storage, ref, uploadBytes, list, getDownloadURL} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SImageService {
  url : string = '';
  constructor(private storage: Storage) { }

  public subirImagen($event : any, name: string) {
    const archivo = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/acercade/`+name)
    uploadBytes(imgRef, archivo).then(resp => {
      this.getImages();
    }).catch(err => {
      console.log(err);
    })
  }

  public getImages() {
    const imagenesRef = ref(this.storage, 'imagen/acercade/');
    list(imagenesRef).then(async resp => {
      for (let item of resp.items) {
        this.url = await getDownloadURL(item);
        console.log('La url es '+this.url);
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
