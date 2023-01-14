import { Injectable } from '@angular/core';
import {Storage, ref, getDownloadURL, uploadBytesResumable} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SImageService {
  url : string = '';
  constructor(private storage: Storage) { }

  public subirImagen($event : any, name: string, storagePath: string) {
    const archivo = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/`+storagePath+'/'+name);
    const uploadTask = uploadBytesResumable(imgRef, archivo);
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    async () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        this.url = downloadURL;
        console.log('File available at', downloadURL);
      });
    }
    );
  }


}
