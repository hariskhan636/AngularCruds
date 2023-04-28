import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  showAddProd = false
  showAddVen = false
  showAddCat = false
  showEdit = false
  showViewProd = false
  showViewVen = false
  showViewCat = false
  showDelProd = false
  showGetByCat = false
  showGetByVen = false
  showCheap = false

  products: any[] = []
  vendor: any[] = []
  category: any[] = []

  productForm!: FormGroup;
  vendorForm!: FormGroup;
  categoryForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {

    const id = new FormControl('', Validators.required)
    const name = new FormControl('', Validators.required)
    const price = new FormControl('', Validators.required)
    const ven_id = new FormControl('', Validators.required)
    const cat_id = new FormControl('', Validators.required)
    const first_name = new FormControl('', Validators.required)
    const last_name = new FormControl('', Validators.required)
    const status = new FormControl('', Validators.required)

    this.productForm = new FormGroup(
      {
        id: id,
        name: name,
        price: price,
        vendorId: ven_id,
        categoryId: cat_id
      }
    )

    this.vendorForm = new FormGroup(
      {id: ven_id,
       firstName: first_name,
       lastName: last_name,
       status: status
      }
    )

    this.categoryForm = new FormGroup(
      {id: cat_id,
       name: name,
       status: status
      }
    )


  }

  addProduct(){
    this.showAddProd = false
    this.productForm.get('id')?.setValue(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    const data = this.productForm.getRawValue()
    this.products.push(data)
  }

  editProduct(){
    console.log('edit prod');
  }

  addVendor(){
    this.showAddVen = false
    const data = this.vendorForm.getRawValue()
    this.vendor.push(data)
  }
 
  addCategory(){
    this.showAddCat = false
    const data = this.categoryForm.getRawValue()
    this.category.push(data)
  }

  deleteVendor(i: number){
    const vendorId = this.vendor[i].id;
    for (let i = 0; i < this.vendor.length; i++) {
      if (this.vendor[i].id === vendorId) {
        for (let j = 0; j < this.products.length; j++) {
          if (this.products[j].vendorId === vendorId) {
            this.products.splice(j, 1);
            j--;
          }
        }
        this.vendor.splice(i, 1);
        break;
      }
    }
  }

  deleteCategory(i:number){
    const categoryId = this.category[i].id;
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].id === categoryId) {
        for (let j = 0; j < this.products.length; j++) {
          if (this.products[j].categoryId === categoryId) {
            this.products.splice(j, 1);
            j--;
          }
        }
        this.category.splice(i, 1);
        break;
      }
    }
  }

  deleteProductById(i: number){
    
    this.products.splice(i,1)
  }

  deleteProductByName(){
    this.showDelProd = false
    console.log('del prod by name');
  }  

  getCategoryProducts(){
    this.showGetByCat = false
    console.log('get cat prod');
  }

  getVendorProducts(){
    this.showGetByVen = false
    console.log('get ven prod');
  }
  
  getCheapProducts(){
    this.showCheap = false
    console.log('get cheap');
  }

}
