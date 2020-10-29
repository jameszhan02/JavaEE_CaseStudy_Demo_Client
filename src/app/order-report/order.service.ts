import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Order } from './order';
import { GenericHttpService } from '../generic-http.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService extends GenericHttpService<Order>{
  constructor(public http: HttpClient) {
    super(http, `${BASEURL}/orders`)
  }// constructor
}