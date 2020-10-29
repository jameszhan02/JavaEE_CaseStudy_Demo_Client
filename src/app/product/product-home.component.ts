import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Product } from './product';
import { Vendor } from '../vendor/vendor';
import { VendorService } from '../vendor/vendor.service';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styles: [
  ]
})

export class ProductHomeComponent implements OnInit {
  Vendors$: Observable<Vendor[]>;
  products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  displayedColumns: string[] = ['id', 'name', 'vendorid'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private vendorService: VendorService, private productService: ProductService) {
    this.hideEditForm = true;
  } // constructor
  ngOnInit(): void {
    this.msg = 'loading Vendors from server...';
    this.msg = `Vendor's loaded`;
    this.Vendors$ = this.vendorService.getAll().pipe(
      share(),
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    this.msg = `product's loaded`;
    this.products$ = this.productService.getAll().pipe(
      share(),
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    console.log(this.Vendors$);
    console.log(this.products$);
    this.refreshDS();
  }
  select(product: Product): void {
    this.todo = 'update';
    this.selectedProduct = product;
    this.msg = `product ${product.id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
  * cancelled - event handler for cancel button
  */
  cancel(msg?: string): void {
    this.hideEditForm = !this.hideEditForm;
    this.refreshDS();
  } // cancel
  /**
  * update - send changed update to service update local array
  */
  update(product: Product): void {
    this.msg = 'Updating...';
    this.productService.update(product).subscribe(payload => {
      if (payload.id) {
        this.msg = `product ${product.id} updated!`;
      } else {
        this.msg = 'product not updated! - server error';
      }
      this.refreshDS();
    },
      err => {
        this.msg = `Error - product not updated - ${err.status} - ${err.statusText}`;
      });
    this.hideEditForm = !this.hideEditForm;
  } // update
  /**
  * save - determine whether we're doing and add or an update
  */
  save(product: Product): void {
    (product.id) ? this.update(product) : this.add(product);
  } // save
  /**
  * add - send product to service, receive newid back
  */
  add(product: Product): void {
    this.msg = 'Adding...';
    // product.id = 0;  No Use since Id is a string 
    this.productService.add(product).subscribe(payload => {
      if (payload.id) {
        this.msg = `product ${payload.id} added!`;
      } else {
        this.msg = 'product not added! - server error';
      }
      this.refreshDS();
    },
      err => {
        this.msg = `Error - product not added - ${err.status} - ${err.statusText}`;
      });
    this.hideEditForm = !this.hideEditForm;
  } // add
  /**
  * newExpense - create new product instance
  */
  newProduct(): void {
    this.selectedProduct = {
      id: null, vendorid: null, name: '',
      costprice: null, msrp: null, rop: null, eoq: null, qoh: null, qoo: null, qrcode: null, qrcodetxt: "", qtyNum: null
    };
    this.msg = 'New product';
    this.hideEditForm = !this.hideEditForm;
  } // newExpense
  /**
  * delete - send product id to service for deletion
  */
  delete(product: Product): void {
    this.msg = 'Deleting...';
    this.productService.deleteStrId(product.id)
      .subscribe(payload => {
        if (payload === 1) { // server returns # rows deleted
          this.msg = `product ${product.id} deleted!`;
        } else {
          this.msg = 'product not deleted!';
        }
        this.refreshDS();
      },
        err => {
          this.msg = `Error - product not deleted - ${err.status} - ${err.statusText}`;
        });
    this.hideEditForm = !this.hideEditForm;
  } // delete
  /**
  * refresh - update data table with any changes,
  * and reset sort directive
  */
  refreshDS(): void {
    this.products$.subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
    });
  } // refresh
} // ExpenseHomeComponent
