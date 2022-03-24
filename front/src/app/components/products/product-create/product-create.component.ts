import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from '../../../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDTO } from 'src/app/model/Products.dto';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  product: Product = {
    name: '',
    price: 0,
  };
  constructor(
    private service: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required,]],
    });
  }

  createProduct() {
    const newProduct = new ProductDTO();
    console.log(this.form.value)
    Object.assign(newProduct, this.form.value);

    this.service.create(newProduct).subscribe(() => {
      this.service.showMessage('Operação executada');
      this.router.navigate(['/products']);
    });
  }

  backToProduct() {
    return this.router.navigate(['/products']);
  }
}
