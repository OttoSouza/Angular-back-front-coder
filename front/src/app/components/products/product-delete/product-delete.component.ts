import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../product-create/product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss'],
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
  };

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.readById(id).subscribe((res) => {
      this.product = res;
    });
  }

  deleteProducts() {
    this.service.delete(this.product.id).subscribe((response) => {
      this.service.showMessage('Produto atualizado com sucesso');
      this.router.navigate(['/products']);
    });
  }

  backToProduct() {
    this.router.navigate(['/products']);
  }
}
