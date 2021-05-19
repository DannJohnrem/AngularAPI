import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Pizza';

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyAeyyZJPwbrHUgIHxxYS1BYfgY3C6f8T2g'
    })

    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map"), {
        center: {lat: -122.087461, lng: 37.422069},
        zoom: 6
      })
    })
  }
  

}
