import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  productForm!: FormGroup;


  constructor(

    private _product: ProductService,
    private _router:Router
  ) { }

  ngOnInit(): void {

    this.setForm();

    this.getProducts();

  }

  setForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl(''),
      productQnty: new FormControl(''),
      productRate: new FormControl(''),

    })


  }

  productList: any = [];
  submit() {
    this._product.addNewProduct(this.productForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        this.closeModal('addProductModal');
        this.productForm.reset();

       
      }, 
      error: (err) => { 
        console.log(err);
        if(err.status== 401){
          this.closeModal('addProductModal');
          Swal.fire({
            title: "Unauthorized",
            text: 'Login Required!', 
            icon: "error"
          }).then(()=>{
            this._router.navigate(['/'])
          })
        }else{
          Swal.fire({
            title: "Error",
            text: 'Please Contact to Web Admin!', 
            icon: "error"
          });
        }

       
      } 
    }); 
  
    this.productList.push(this.productForm.value);
    // console.log("product List:", this.productList);
    
   
  }

// modal open method
index: any;
openModal(modalId: any, index: any) {

  if (modalId == 'updateProductModal') {

    this.productForm = new FormGroup({
      productId: new FormControl(this.productList[index].productId),
      productName: new FormControl(this.productList[index].productName),
      productQnty: new FormControl(this.productList[index].productQnty),
      productRate: new FormControl(this.productList[index].productRate),

    })

  }



  console.log(index);
  this.index = index;
  const modalElement: any = document.getElementById(modalId);
  const modal: any = new bootstrap.Modal(modalElement);
  modal.show();
}

closeModal(modalId: any) {
  const modalElement: any = document.getElementById(modalId);
  const modal: any = bootstrap.Modal.getInstance(modalElement);

  if (modal) {
    modal.hide();
  }
  modal.hide();
}

delete () {

  console.log(this.index);
  console.log(this.productList);
  this.productList.splice(this.index, 1)
  this.closeModal('deleteModal')
}

update(){
  console.log(this.productForm.value);
  this.productList[this.index].productId = this.productForm.value.productId;
  this.productList[this.index].productName = this.productForm.value.productName;
  this.productList[this.index].productQnty = this.productForm.value.productQnty;
  this.productList[this.index].productRate = this.productForm.value.productRate

}

getProducts(){

  this._product.getAllProducts().subscribe({next:(resp)=>{
    console.log(resp);
    this.productList = resp;
  },error:(err)=>{
    console.log(err);
    if(err.status== 401){
      this.closeModal('addProductModal');
      Swal.fire({
        title: "Unauthorized",
        text: 'Login Required!', 
        icon: "error"
      }).then(()=>{
        this._router.navigate(['/'])
      })
    }else{
      Swal.fire({
        title: "Error",
        text: 'Please Contact to Web Admin!', 
        icon: "error"
      });
    }


  }})
}

}
