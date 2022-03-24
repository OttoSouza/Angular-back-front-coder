import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from 'src/app/model/Products.dto';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../product-create/product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  product!: Product;
  form: FormGroup;
  isLoading = true;
  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.readById(id).subscribe((res) => {
      this.product = res;
      this.updateForm(this.product);
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  updateForm(product: Product) {
    this.form.get('name')?.setValue(product.name);
    this.form.get('price')?.setValue(product.price);
  }

  updateProduct() {
    Object.assign(this.product, {
      name: this.form.value.name,
      price: this.form.value.price,
    });

    this.service.update(this.product).subscribe((response) => {
      this.service.showMessage('Produto atualizado com sucesso');
      this.router.navigate(['/products']);
    });
  }

  backToProduct() {
    console.log(this.form);
    this.router.navigate(['/products']);
  }
}
