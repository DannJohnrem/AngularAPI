import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UriService {
  public Http: string = "https://localhost:44337/api/";
  public WebSocket: string = "ws://localhost:44337/api/";
  public Image_API: string = "http://localhost:44337/images/";
  public Image_Default: string = "assets/images/image.png";
}
