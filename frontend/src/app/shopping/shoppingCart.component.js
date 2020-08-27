'use strict';
import '../components/searchProduct/module.js'
import '../components/customOverlay/module.js'
import Swal from 'sweetalert2';
import {url} from '../../constant.js';

export default angular.module('wraithTech')
    .component('shoppingCart',
    {
        templateUrl: 'shopping/shoppingCart.html',
        controller: ['ProductService',
        function productListCtrl(ProductService)
        {
            var ctrl = this;

            ctrl.$onInit = function()
            {
                ctrl.getProduct()
            }

            ctrl.cartList = [];
            ctrl.totalPrice = 0.00;
            ctrl.isShowAbout = false;
            ctrl.url = url;

            ctrl.addToCart = addToCart;
            ctrl.updateProducts = updateProducts;
            ctrl.removeFromCart = removeFromCart;
            ctrl.getProduct = getProduct;
            ctrl.showAbout = showAbout;

            function getProduct() {
                ProductService.get(
                    {},
                    function(response)
                    {
                        ctrl.products = response.products;
                    },
                    function()
                    {
                        console.log("error")
                    }
                )
            }

            function addToCart(index) {
                var obj = {};
                Object.assign(obj,ctrl.products[index])
                var	matchingIndex = ctrl.cartList.findIndex(x => x.id == obj.id)

                if( matchingIndex == -1)
                {
                    if(obj.qty <= 0)
                    {
                        Swal.fire(
                            {
                                icon:'error',
                                title: 'Unable to add.',
                                text: 'Item exceeds quantity left in stock.',
                            }
                        );
                    }
                    else
                    {
                        obj.qty = 1;
                        ctrl.cartList.push(obj);
                        ctrl.totalPrice += ctrl.products[index].price;
                    }
                }
                else
                {
                    if(obj.qty <= ctrl.cartList[matchingIndex].qty)
                    {
                        Swal.fire(
                            {
                                icon:'error',
                                title: 'Unable to add.',
                                text: 'Item exceeds quantity left in stock.',
                            }
                        );
                    }
                    else
                    {
                        ctrl.cartList[matchingIndex].qty += 1;
                        ctrl.totalPrice += ctrl.products[index].price;
                    }
                }
            };

            function removeFromCart(index) {
                var obj = ctrl.cartList[index];

                obj.qty -= 1;

                ctrl.totalPrice -= ctrl.cartList[index].price;

                if(obj.qty <= 0)
                {
                    ctrl.cartList.splice(index, 1);
                }
            }

            function updateProducts(products) {
                ctrl.products = products;
            };

            function showAbout(product) {
                ctrl.product = product;
                ctrl.isShowAbout = true;
            }
        }]

    });




