import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyProfileModel } from 'src/model/my-profile.model'
import { MyProfileService } from 'src/services/my-profile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
  
})
export class MyprofileComponent implements OnInit {

  fName: string
  lName: string
  add: string
  city: string

  MyProfile: MyProfileModel = new  MyProfileModel();
  SelectedProfile: MyProfileModel = new MyProfileModel();
  Profiles: MyProfileModel [] = []
  closeResult: string;

  constructor( 
    private MyProfileService: MyProfileService,
    private modalService: NgbModal
    
  ) { }

  ngOnInit(): void {
    this.GetProfile();
  }

  SaveProfile() {
    this.MyProfileService.SaveMyProfile(this.MyProfile).then((data) => {
      if (data.StatusCode === 200) {
        this.GetProfile()
        alert("success");
      }
    });

  }

  GetProfile() {
    this.MyProfileService.GetMyProfile().then((data) => {
      if (data.StatusCode === 200) {
        console.log(data.Body)
        this.Profiles = data.Body
      }
    });
  }

  DeleteProfile(id: string) {
    this.MyProfileService.DeleteMyProfile(id).then((data) => {
      if (data.StatusCode === 200) {
        console.log(data.Body)
        this.GetProfile()
      }
    });
    // console.log(id)
  }

  UpdateProfile() {
    this.MyProfileService.UpdateMyProfile(this.SelectedProfile).then((data) => {
      if (data.StatusCode === 200) {
        console.log(data.Body)
      }
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
