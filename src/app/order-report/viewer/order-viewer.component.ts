import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vendor } from '../../vendor/vendor';
import { Product } from '../../product/product';
import { OrderItem } from '../order-item';
import { Order } from '../order';
import { BASEURL, PDFURL } from '../../constants';
import { VendorService } from '../../vendor/vendor.service';
import { ProductService } from '../../product/product.service';
import { OrderService } from '../order.service';
@Component({
  selector: 'app-order-viewer',
  templateUrl: './order-viewer.component.html',
  styles: [
  ]
})
export class OrderViewerComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  poReport: FormControl;
  productid: FormControl;
  qty: FormControl;
  subscription: Subscription;
  products$: Observable<Product[]>; // everybody's products
  vendors$: Observable<Vendor[]>; // all vendors
  poReports$: Observable<Order[]>;
  selectedReport: Order;
  vendorproducts$: Observable<Product[]>; // all products for a particular vendor
  items: Array<OrderItem>; // product items that will be in report
  selectedproducts: Array<Product>; // products that being displayed currently in app
  selectedproduct: Product; // the current selected product
  selectedVendor: Vendor; // the current selected employee
  selectedQty: string;
  pickedProduct: boolean;
  pickedQty: boolean;
  pickedVendor: boolean;
  generated: boolean;
  hasProducts: boolean;
  hasReport: boolean;
  pono: number;
  msg: string;
  total: number;
  tax: number;
  amount: number;
  finalTotal: number;
  url: string;
  constructor(private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private orderService: OrderService) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.generated = false;
    this.pickedQty = false;
    this.total = 0.0;
    this.url = BASEURL + 'orders';
  } // constructor
  ngOnInit(): void {
    this.msg = '';
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.poReport = new FormControl('');
    this.qty = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      poReport: this.poReport,
      qty: this.qty
    });
    this.onPickVendor();
    this.onPickPoReport();
    this.msg = 'loading Vendors and product from server...';
    this.vendors$ = this.vendorService.getAll().pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]); // returns an empty array if there's a problem
      })
    );
    this.products$ = this.productService.getAll().pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    this.msg = 'server data loaded';
  } // ngOnInit
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } // ngOnDestroy
  /**
  * onPickVendor - Another way to use Observables, subscribe to the select change event
  * then load specific vendor products for subsequent selection
  */
//  onPickPoReport(): void{
  
//  }

  onPickVendor(): void {
    this.subscription = this.generatorForm.get('vendorid').valueChanges.subscribe(val => {
      // console.log(val);
      
      this.selectedproduct = null;
      this.selectedVendor = val;
      this.selectedQty = null;
      this.poReports$ = this.orderService.getById(val.id).pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.msg = `Error: ${error.error.message}`;
          } else {
            this.msg = `Error: ${error.message}`;
          }
          return of([]); // returns an empty array if there's a problem
        })
      );
      this.loadVendorProducts();
      this.pickedProduct = false;
      this.hasProducts = false;
      this.hasReport = false;
      this.msg = 'choose product for the vendor';
      this.pickedVendor = true;
      this.generated = false;
      this.items = []; // array for the report
      this.selectedproducts = []; // array for the details in app html
    });
  } // onPickEmployee

  viewPdf(): void {
    window.open(PDFURL + this.selectedReport.id, '');
  } // viewPdf

  //can not call
  onPickQty(): void {
    // const xSubscr = this.generatorForm.get('qty').valueChanges.subscribe(val => {
    console.log("iam in qty");
    let qtyTxt = this.generatorForm.get('qty').value;
    const item: OrderItem = { id: 0, poid: 0, productid: this.selectedproduct.id, qty: 0, price: 0 };
    if (this.items.find(it => it.productid === this.selectedproduct.id)) { // ignore entry
    } else { // add entry
      let SelectedQty = 0;
      SelectedQty = this.selectedproduct[qtyTxt];
      item.qty = SelectedQty;
      item.price = SelectedQty * this.selectedproduct.costprice;
      // this.selectedproduct['qtyNum'] = SelectedQty;
      this.selectedproducts.push(this.selectedproduct);
      // this.selectedproductsQty.push(SelectedQty);
      this.total = 0.0;
      this.items.push(item);
      this.items.forEach(orderItem => this.total += orderItem.price);
      console.log(this.total);
      this.tax = this.total * 0.15;
      this.finalTotal = this.tax + this.total;
    }
    if (this.items.length > 0) {
      this.hasProducts = true;
    }
    // })
    // this.subscription.add(xSubscr);
    // this.subscription.add(xSubscr); // add it as a child, so all can be destroyed together
  }//end of onpickqty
  onPickPoReport(): void {
    const xSubscr = this.generatorForm.get('poReport').valueChanges.subscribe(val => {
      console.log("iam in");
      this.selectedReport = val;
      this.total = this.selectedReport.amount;
      this.tax = this.total * 0.13;
      this.finalTotal = this.tax + this.total;
      // this.hasReport = true;
      this.selectedReport.items.map(item => {
        this.products$
        .pipe(map(products => products
        .find(product => product.id === item.productid)))
        .subscribe(exp => {
        exp.qtyNum = item.qty;
        exp.subSum = exp.qtyNum * exp.costprice;
        this.selectedproducts.push(exp);
        
        console.log(this.selectedproducts);
        });
        this.hasReport = true;
        });
      this.pickedProduct = true;
      this.generatorForm.get('qty').setValue("");
      // console.log("iam in qty");
      // let qtyTxt = val;
      // let SelectedQty = 0;
      // const item: OrderItem = { id: 0, poid: 0, productid: this.selectedproduct.id, qty: 0, price: 0  };
      // if (this.items.find(it => it.productid === this.selectedproduct.id)) { // ignore entry
      // } else { // add entry
      //   this.items.push(item);
      //   if(qtyTxt != ""){
      //     SelectedQty = this.selectedproduct[qtyTxt];
      //     this.selectedproduct['qrcode'] = SelectedQty;
      //     this.selectedproducts.push(this.selectedproduct);
      //   }
      //   // this.selectedproductsQty.push(SelectedQty);
      // }
      // if (this.items.length > 0) {
      //   this.hasProducts = true;
      // }
      // this.total = 0.0;
      // this.selectedproducts.forEach(orderItem => this.total += orderItem.costprice * SelectedQty);
    })
    this.subscription.add(xSubscr);
  }
  loadVendorProducts(): void {
    this.vendorproducts$ = this.products$.pipe(
      map(products =>
        // map each expense in the array and check whether or not it belongs to selected employee
        products.filter(product => product.vendorid === this.selectedVendor.id)
      )
    );
  } // loadEmployeeExpenses
  /**
  * createReport - create the client side report
  */
  createReport(): void {
    this.generated = false;
    const report: Order = { id: 0, items: this.items, vendorid: this.selectedproduct.vendorid, amount: this.total, podate: '' };
    const rSubscr = this.orderService.add(report).subscribe(
      payload => { // server should be returning new id
        typeof payload === 'number'
          ? this.msg = `Report ${payload} added!`
          : this.msg = 'Report not added! - server error';
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        if (typeof payload === 'number') {
          this.msg = `Report ${payload} added!`;
          this.pono = payload;
          this.generated = true;
        } else {
          this.msg = 'Report not added! - server error';
        }

      },
      err => {
        this.msg = `Error - expense not added - ${err.status} - ${err.statusText}`;
      });
    this.subscription.add(rSubscr); // add it as a child, so all can be destroyed together
  } // createReport
} // ReportGeneratorComponent