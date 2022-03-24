import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../product-create/product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0
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

  updateProduct() {
    this.service.update(this.product).subscribe((response) => {
      this.service.showMessage('Produto atualizado com sucesso');
      this.router.navigate(['/products']);
    });
  }

  backToProduct() {
    this.router.navigate(['/products']);
  }
}
