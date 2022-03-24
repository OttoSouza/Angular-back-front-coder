import { Component, OnInit } from '@angular/core';
import { Product } from '../product-create/product.model';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss'],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private service: ProductService) {}

  ngOnInit() {
    this.readProducts()
  }

  readProducts() {
    this.service.read().subscribe((response) => {
      this.products = response;
    });
  }

  deleteProduct(id: number) {
    this.service.delete(id).subscribe(() => {
      this.service.showMessage('deletado com sucesso');
      this.readProducts()
    });
  }
}
