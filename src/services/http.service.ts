import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpEventType, HttpRequest } from "@angular/common/http";
import { UriService } from "./uri.service";
import { of, throwError, Subscription } from "rxjs";

// import { Auth } from "../models/auth.model";
// import { Security } from '../helper/security';
// import { delay, retryWhen, concatMap } from "rxjs/operators";

export type ResponseData = { Body: any, StatusCode: number };

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(
    private http: HttpClient,
    // public Security: Security,
    private uriService: UriService
  ) { }

  /**
   * CREATE HTTP REQUEST HEADER
   *
   * @returns header Http Header for API Request Authentication
   * This method will create new HttpHeader for valid `Http Request` to handle `CORS`
   */
  public CreateHeader(): HttpHeaders {
    let header = new HttpHeaders({                                // HTTP HEADER FOR CORS
      'Content-Type': 'application/json; charset=utf-8',          // DESCRIPTION OF REQUEST BODY
      // 'Access-Control-Allow-Origin': '*',                      // ALLOWED API SERVER RECEIVER
      // 'Authorization': 'Basic ' + btoa('simplevia:mwssapisec2021')
    });

    return header;
  }

 
  public HttpGet(apiUri: string, uriParam: string, isAuth: boolean = false): Promise<ResponseData> {
    return new Promise((resolve, reject) => {
      let response: ResponseData;
      let subscription: Subscription = this.http.get<HttpResponse<any>>(
        `${this.uriService.Http}${apiUri}${uriParam}`,
        { observe: "response", headers: this.CreateHeader() }
      ).subscribe(
        (next) => {
          response = { Body: next.body, StatusCode: next.status };
          resolve(response);
        },
        (error) => {
          response = { Body: error.error, StatusCode: error.status };
          resolve(response);
        },
        () => subscription.unsubscribe()
      );
    });
  }
  
  public HttpPost(apiUri: string, uriParam: string, requestBody: any = null, isAuth: boolean = false): Promise<ResponseData> {
    return new Promise((resolve, reject) => {
      let response: ResponseData;
      let subscription: Subscription = this.http.post<HttpResponse<any>>(
        `${this.uriService.Http}${apiUri}${uriParam}`,
        requestBody,
        { observe: "response", headers: this.CreateHeader() }
      ).subscribe(
        (next) => {
          response = { Body: next.body, StatusCode: next.status };
          resolve(response);
        },
        (error) => {
          response = { Body: error.error, StatusCode: error.status };
          resolve(response);
        },
        () => subscription.unsubscribe()
      );
    });
  }

  public HttpPostFile(apiUri: string, uriParam: string, Files: any = null, isAuth: boolean = false): Promise<ResponseData> {
    return new Promise((resolve, reject) => {
      let response: ResponseData;
      let subscription: Subscription = this.http.post<HttpResponse<any>>(
        `${this.uriService.Http}${apiUri}${uriParam}`
        , Files
        , { observe: "response" })
        .subscribe(
          (next) => {
            response = { Body: next.body, StatusCode: next.status };
            resolve(response);
          },
          (error) => {
            response = { Body: error.error.Message, StatusCode: error.status };
            resolve(response);
          },
          () => subscription.unsubscribe()
        );
    })
  }

}
