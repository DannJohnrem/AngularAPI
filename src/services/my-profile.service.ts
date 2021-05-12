import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(private http: HttpService) { }

  // SaveMyProfile(data: any) {
  //   console.log(data)
  // }

  // public async GetFiles() {
  //   return await this.http.HttpGet('admin-console/get-files', '');
  // }

  public async SaveMyProfile(data: any) {
    return await this.http.HttpPost('my-profile/save-my-profile', '', data);
  }

  public async GetMyProfile() {
    return await this.http.HttpGet('my-profile/get-my-profile', '');
  }

  public async DeleteMyProfile(id: string) {
    return await this.http.HttpGet('my-profile/delete-my-profile/', id);
  }

  public async UpdateMyProfile(data: string) {
    return await this.http.HttpGet('my-profile/update-my-profile/', data)
  }
}


