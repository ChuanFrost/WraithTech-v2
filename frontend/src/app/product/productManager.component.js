'use strict'

import '../components/fileOnChange/module.js';
import Swal from 'sweetalert2';
import {url,path} from '../../constant.js';


export default angular.module('wraithTech')
    .component('productManager',
    {
        templateUrl: 'product/productManager.html',
        controller:  ['ProductService','$http', '$state',
        function productManagerCtrl(ProductService, $http, $state)
        {
            var ctrl = this;

            ctrl.$onInit = function()
            {
                ctrl.getProduct()

                $http.get(path.product.searchParams).then(
                    function(response)
                    {
                        response = response.data;
                        ctrl.types = response.types;
                        ctrl.brands = response.brands;
                    },
                    function()
                    {
                        console.log('searchParams api error');
                    }
                );
            }

            ctrl.url = url;
            ctrl.isShow = {
                product: false,
                label: false
            };
            ctrl.status = {
                img: "No file is selected",
                imgDetail: "No file is selected"
            };

            ctrl.getProduct = getProduct;
            ctrl.create = create;
            ctrl.edit = edit;
            ctrl.remove = remove;
            ctrl.updateProducts = updateProducts;


            function getProduct()
            {
                ProductService.get(
                    {},
                    function(response)
                    {
                        ctrl.products = response.products;
                    },
                    function()
                    {
                        console.log("error");
                    }
                )
            }

            function create()
            {
                var product = {
                    id: '',
                    img: '/img/placeholder.png',
                    name: '',
                    imgDetail: '/img/placeholder.png',
                }

                ctrl.data = {
                    product: product,
                    isEdit: false,
                    types: ctrl.types,
                    brands: ctrl.brands,
                    status: ctrl.status
                }

                ctrl.isShow.product = true;
            }

            function edit(product)
            {
                var matchingType = ctrl.types.findIndex(x => x.type == product.type);
                if(matchingType == -1)
                {
                    product.tempoType = product.type;
                }

                var matchingBrand = ctrl.brands.findIndex(x => x.brand == product.brand );

                if(matchingBrand == -1)
                {
                    product.tempoBrand = product.brand;
                }

                ctrl.data = {
                    product: product,
                    isEdit: true,
                    types: ctrl.types,
                    brands: ctrl.brands,
                    status: ctrl.status
                }

                ctrl.isShow.product = true;
            }

            function remove(id)
            {
                Swal.fire(
                    {
                        icon: 'warning',
                        title: 'Are you sure on removing this product?',
                        showCancelButton:true,
                        cancelButtonColor:'#d9534f',
                        cancelButtonText: "No",
                        confirmButtonColor:'#5cb85c',
                        confirmButtonText: 'Yes'
                    }).then((result) =>
                        {
                            if(result.value)
                            {
                                ProductService.delete(
                                    {id:id},
                                    function(response)
                                    {
                                        Swal.fire(
                                            {
                                                icon:'success',
                                                title: 'Product successfully deleted.',
                                            }
                                        );
                                        $state.reload();
                                    },
                                    function(response)
                                    {
                                        Swal.fire(
                                            {
                                                icon:'error',
                                                title: 'Internal Server Error',
                                                text: response.data.error,
                                            }
                                        );
                                    }
                                    )

                            }
                        });
            }

            function updateProducts(products) {
                ctrl.products = products;
            };

        }]
    });
