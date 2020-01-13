import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['/product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle = 'Prooduct List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = '';

    _listFilter: string;
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    constructor(private productService: ProductService) {
      // this.listFilter = 'cart';
    }

    filteredProducts: IProduct[];
    products: IProduct[];

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err,
        complete: () => console.log('Observer got a complete notification')
      });
    }
}
