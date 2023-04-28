import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  deleteByName=''; catName=''; venName=''; 
  
  cheap=0; showProds='all'; editIndex=0;

  updateName=''; updatePrice=''; updateVendor=''; updateCategory='';

  showAddProd = false; showAddVen = false; showAddCat = false; showEdit = false;
  showViewProd = false; showViewVen = false; showViewCat = false; showDelProd = false;
  showGetByCat = false; showGetByVen = false; showCheap = false;

  products: any[] = []; vendor: any[] = []; category: any[] = [];

  productForm!: FormGroup; vendorForm!: FormGroup; categoryForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {

    const id = new FormControl()

    this.productForm = new FormGroup(
      {
        id: id,
        name: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        vendorId: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required),
      }
    )

    this.vendorForm = new FormGroup(
      {
        id: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
      }
    )

    this.categoryForm = new FormGroup(
      {
        id: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
      }
    )
  }

  addProduct(){
    this.showAddProd = false
    this.productForm.get('id')?.setValue(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    const data = this.productForm.getRawValue()
    this.products.push(data)
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

  editProduct(i:number){
    this.showViewProd = false
    this.showEdit = true
    this.editIndex = i
    this.updateName = this.products[i].name
    this.updatePrice = this.products[i].price 
    this.updateVendor = this.products[i].vendorId 
    this.updateCategory = this.products[i].categoryId
  }

  updateProduct(){
    this.products[this.editIndex].name = this.updateName
    this.products[this.editIndex].price = this.updatePrice
    this.products[this.editIndex].vendorId = this.updateVendor
    this.products[this.editIndex].categoryId = this.updateCategory
    this.showEdit = false
    this.showViewProd = true
    this.editIndex = 0
    this.updateName=''; this.updatePrice=''; this.updateVendor=''; this.updateCategory=''; 
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
    for(let i=0;i<this.products.length;i++){
      if(this.deleteByName==this.products[i].name){
        this.products.splice(i,1)
      }
    }
  }  

  getCategoryProducts(){
    this.showGetByCat = false
    this.showProds='cat'
    this.showViewProd = true
  }

  getVendorProducts(){
    this.showGetByVen = false
    this.showProds='ven'
    this.showViewProd = true
  }
  
  getCheapProducts(){
    this.showCheap = false
    this.showProds='cheap'
    this.showViewProd = true
  }

}
