<template>
  <div>
    <div v-if="products.length === 0">
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any categories"
        md-description="Select button to add one.">
        <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <md-table>
        <md-table-row>
        <md-table-head>Code</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Catalog</md-table-head>
        <md-table-head>Image</md-table-head>
        <md-table-head>Delete</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(product) in visibleProducts" :Key="product.id"
          v-bind:product="product" v-bind:visibleProducts="visibleProducts" v-bind:currentPage="currentPage">
          <md-table-cell>{{product.code}}</md-table-cell>
          <md-table-cell>{{product.name}}</md-table-cell>
          <md-table-cell>{{product.catalog.name}}</md-table-cell>
          <md-table-cell v-if="product.image.thumbnailSrc === ''"> <md-button class="md-icon-button md-raised" @click="addImage = true, productCode = product.code, idSelected = product.id">
            <md-icon>add</md-icon> </md-button>
          </md-table-cell>
          <md-table-cell v-if="product.image.thumbnailSrc !== ''"><img v-bind:src="`${product.image.thumbnailSrc}-small`" @click="showMD = true, imgPath = `${product.image.thumbnailSrc}-big`, productCode = product.code, complete = false, idSelected = product.id, imageGallery = product.image.gallery"/></md-table-cell>
          <md-table-cell><md-button class="md-icon-button md-raised" @click.native="deleteItem(product.id)">
            <md-icon>delete</md-icon> </md-button></md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="products" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
      <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
    </div>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ message }}</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>

    <md-dialog :md-active.sync="showMD">
      <md-dialog-title>Product Selected: {{productCode}}</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Image">
          <img v-bind:src="imgPath"/>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="addImage = true, showMD = false">Editar</md-button>
        <md-button class="md-primary" @click="showMD = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="addImage">
      <md-dialog-title>Product Selected: {{productCode}}</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab @click="uploadExistingImage = false" md-label="Upload New Image">
          <md-field>
            <input type="file" @change="onFileSelected">
          </md-field>
          <md-checkbox  v-model="thumbnail" ref="storeCheck">Thumbnail Image</md-checkbox>
          <md-checkbox  v-model="main" ref="warehouseCheck">Main Image</md-checkbox>
        </md-tab>
        <md-tab @click="uploadExistingImage = true" class="scroll" v-if="imageGallery.length > 0" md-label="Select Existing Image">
          <div class="inline" v-for="(ig, index) in imageGallery" :Key="index">
            <img ref="index" class="imgHover" v-bind:src="`${ig}-small`" @click="imageClicked(index),updateImageUrl = index, clicked = true" alt="image description"/>
            <template class="inline" v-if="imageGallery.length == 1 && clicked == true">
              <md-button  class="md-icon-button" @click.native="reloadGallery()"><md-icon>cached</md-icon></md-button>
              <div>
                <md-checkbox v-model="thumbnail" ref="storeCheck">Thumbnail Image</md-checkbox>
                <md-checkbox v-model="main" ref="warehouseCheck">Main Image</md-checkbox>
              </div>
            </template>
          </div>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button v-if="!uploadExistingImage" class="md-primary" @click="upload">upload</md-button>
        <md-button v-if="uploadExistingImage" class="md-primary" @click="uploadImageUrl">upload</md-button>
        <md-button class="md-primary" @click="addImage = false,thumbnail = false, main = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Pagination from '../commons/Pagination.vue'
import Environment from '../../commons/environment-configuration'
import ProductService from '../../services/product-service'

export default {
  name: 'Products',
  mounted: function () {
    this.$store.dispatch('loadProductData')
    this.updateResource()
  },
  methods: {
    onFileSelected (event) {
      this.single = event.target.files[0]
      this.imageNameUpload = event.target.files[0].name
    },

    deleteItem (id) {
      console.log(id)
      ProductService.delete(id).then(data => {
        data = JSON.parse(data)
        if (data.status === 'success') {
          this.$store.dispatch('removeProduct', id)
          this.message = 'Product Deleted'
          this.complete = true
          this.showSnackbar = true
        }
      })
    },

    uploadImageUrl (index) {
      if (this.thumbnail === false && this.main === false) {
        this.showSnackbar = true
        this.complete = false
        this.message = 'Select image current to show'
        return
      }
      let body = {
        'productCode': this.productCode,
        'gallery': this.imageIndexSelected,
        'thumbnail': this.thumbnail,
        'main': this.main
      }

      ProductService.reloadImage(body).then(data => {
        data = JSON.parse(data)
        if (data.status === 'success') {
          this.$store.dispatch('updateProduct', data.data)
          this.message = 'Image Updated'
          this.complete = true
          this.showSnackbar = true
          this.thumbnail = false
          this.main = false
          this.products = this.$store.getters.products
          this.$store.dispatch('loadProductData')
          this.updateResource()
          setTimeout(function () {}, 500);
        } else {
          this.message = 'Error upload image'
          this.showSnackbar = true
        }
      })
    },
    openForm () {
      this.$router.push('Products-form')
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
    },
    updateResource () {
      this.visibleProducts = this.products.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleProducts.length === 0 && this.visibleProducts > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
    reloadGallery () {
      this.clicked = false
      this.imageGallery = this.imgGalleryRes
    },
    imageClicked (index) {
      this.imageIndexSelected = index
      this.imgGalleryRes = []
      this.imgGalleryRes = this.imageGallery
      this.imageGallery = []
      this.imageGallery.push(this.imgGalleryRes[index])
    },
    submit () {
      if (this.complete === true) {
        this.addImage = false
        this.showMD = false
      }
      this.showSnackbar = false
    },
    upload () {
      var fdata = new FormData()
      if (this.single === '') {
        this.showSnackbar = true
        this.complete = false
        this.message = 'Empty file'
        return
      }
      if (this.thumbnail === false && this.main === false) {
        this.showSnackbar = true
        this.complete = false
        this.message = 'Select image current to show'
        return
      }
      fdata.append('productImage', this.single)
      fdata.append('id', this.idSelected)
      fdata.append('thumbnail', this.thumbnail)
      fdata.append('main', this.main)
      ProductService.uploadImage(fdata).then(data => {
        data = JSON.parse(data)
        if (data.status === 'success') {
          this.$store.dispatch('updateProduct', data.data)
          this.message = 'Image Agree'
          this.complete = true
          this.showSnackbar = true
          this.thumbnail = false
          this.main = false
          this.$store.getters.products
          this.$store.dispatch('loadProductData')
          this.updateResource()
          setTimeout(function () {}, 1500);
        } else {
          this.message = 'Error upload image'
          this.showSnackbar = true
        }
      })
    }
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    isLoadedData () {
      this.updateResource()
      return this.$store.getters.productDataLoaded
    }
  },
  components: {
    Pagination
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 10000,
    isInfinity: false,
    currentPage: Environment.startCurrentPage,
    pageSize: Environment.sizeElementPagination,
    visibleProducts: [],
    showMD: false,
    imgPath: null,
    productCode: '',
    addImage: false,
    single: '',
    idSelected: '',
    message: '',
    imageNameUpload: '',
    thumbnail: false,
    main: false,
    complete: false,
    imageGallery: [],
    uploadExistingImage: false,
    updateImageUrl: '',
    imgGalleryRes: [],
    imageIndexSelected: '',
    clicked: false
  })
}
</script>
<style>
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .add-fab-button {
    float: right;
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #F44336;
    z-index: 1000;
  }
  .inline {
    display: inline-block;
    margin: 5px;
  }
  .scroll {
    overflow: visible;
  }
  .imgHover:hover {
    opacity:0.8;
  }


</style>
