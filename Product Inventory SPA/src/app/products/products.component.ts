import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((response) => {
        this.products = response.data; 
    });
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe((response) => {
      if(response.status === 200) {
        this.toastr.success('Product deleted');
      }
      
      this.fetchProducts();
    });
  }

  updateProduct(productId) {
    this.router.navigate(['edit', productId]);
  }

  checkLength() {
    return this.products.length > 0 ? true: false; 
  }
}
