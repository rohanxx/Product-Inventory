import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Input() edit = false;
  @Input() productId = '';
  productData;

  attributes = {
    sizes : [32, 40],
    operatingSystems : ['android', 'ios', 'none'],
    qualities : ['4k', '8k'],
    frameRates : [720, 1024],
    prices : [30000, 45000]
  };

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    metaInfo: new FormControl('', [Validators.required]),
    size: new FormControl(this.attributes.sizes[0]),
    os: new FormControl(this.attributes.operatingSystems[0]),
    quality: new FormControl(this.attributes.qualities[0]),
    frameRate: new FormControl(this.attributes.frameRates[0]),
    price: new FormControl(this.attributes.prices[0])
  });

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.productId !== '') {
      this.getDataForEdit();
    }
  }

  onSubmit() {
    if(this.productForm.invalid) {
      return;
    }

    console.log(this.productForm.value);
    
    if(!this.edit) {
      this.productService.addProduct(this.productForm.value).subscribe((response) => {
        this.resetForm();
        if (response.status === 200) {
          this.toastr.success('Product Added');
        }
       
      });
    }
    else {
      this.productService.editProduct(this.productId, this.productForm.value).subscribe((response) => {
        this.resetForm();
        if (response.status === 200) {
          this.toastr.success('Product Updated');
        }
        this.router.navigateByUrl('products');
      });
    }
  }

  getDataForEdit() {
    this.productService.getEditData(this.productId).subscribe((response) => {
      this.productData = response.data;
      this.productForm.setValue(this.productData);
    });
  }

  resetForm() {
    this.productForm.reset();
  }
}
