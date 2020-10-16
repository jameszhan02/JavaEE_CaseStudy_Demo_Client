import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Vendor } from './vendor';
// import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends GenericHttpService<Vendor>{
  constructor(public http: HttpClient) {
    super(http, `${BASEURL}/vendors`)
  }// constructor

}
