import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from './product';
import { Vendor } from '../vendor/vendor';
import {ValidateInt} from '../validators/intCheck.validator';
import {ValidateDecimal} from '../validators/decimal.validator';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})


export class ProductDetailComponent implements OnInit {
  // setter
  @Input() selectedProduct: Product;
  @Input() vendors: Vendor[];
  @Input() products: Product[];
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  productForm: FormGroup;
  inventoryForm: FormGroup;
  id: FormControl;
  vendorid: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  // method helper
  uniqueCodeValidator = (control) => {
    /**
    * uniqueCodeValidator - needed access to products property so not
    * with the rest of the validators
    */
    if (this.products) {
    return this.products.find(p => p.id === control.value && !this.selectedProduct.id) ? {idExists: true} : null;
    } 
  }//uniqueCodeValidator
  constructor(private builder: FormBuilder) {
    this.id = new FormControl('', Validators.compose([Validators.required, this.uniqueCodeValidator]));
    this.vendorid = new FormControl('', Validators.compose([Validators.required]));
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl('', Validators.compose([Validators.required, ValidateDecimal]));
    this.msrp = new FormControl('', Validators.compose([Validators.required, ValidateDecimal]));
    this.rop = new FormControl('', Validators.compose([Validators.required, ValidateInt]));
    this.eoq = new FormControl('', Validators.compose([Validators.required, ValidateInt]));
    this.qoh = new FormControl('', Validators.compose([Validators.required, ValidateInt]));
    this.qoo = new FormControl('', Validators.compose([Validators.required, ValidateInt]));
  } // constructor
  ngOnInit(): void {
    console.log(this.vendors);
    console.log(this.selectedProduct);
    this.inventoryForm = this.builder.group({
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
    });
    this.productForm = this.builder.group({
      id: this.id,
      vendorid: this.vendorid,
      name: this.name,
      msrp: this.msrp,
      costprice: this.costprice
    });
    // patchValue doesn't care if all values are present
    this.productForm.patchValue({
      id: this.selectedProduct.id,
      vendorid: this.selectedProduct.vendorid,
      name: this.selectedProduct.name,
      msrp: this.selectedProduct.msrp,
      costprice: this.selectedProduct.costprice
    });
    this.inventoryForm.patchValue({
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo
    });
  } // ngOnInit
  updateSelectedProduct(): void {
    this.selectedProduct.id = this.productForm.get('id').value;
    this.selectedProduct.vendorid = this.productForm.get('vendorid').value;
    this.selectedProduct.name = this.productForm.get('name').value;
    this.selectedProduct.msrp = this.productForm.get('msrp').value;
    this.selectedProduct.costprice = this.productForm.get('costprice').value;
    this.selectedProduct.rop = this.inventoryForm.get('rop').value;
    this.selectedProduct.eoq = this.inventoryForm.get('eoq').value;
    this.selectedProduct.qoh = this.inventoryForm.get('qoh').value;
    this.selectedProduct.qoo = this.inventoryForm.get('qoo').value;
    this.saved.emit(this.selectedProduct);
  }
} // ExpenseDetailComponent

