'use strict';
import Swal from 'sweetalert2';

export default angular.module('wraithTech')
    .component('shoppingCart',
    {
        templateUrl: 'shopping/shoppingCart.html',
        controller: ['ProductService',
        function productListCtrl(ProductService)
        {
            var ctrl = this;

            ctrl.products = [];
            ctrl.cartList = [];
            ctrl.totalPrice = 0.00;

            ctrl.addToCart = addToCart;
            ctrl.updateList = updateList;
            ctrl.removeFromCart = removeFromCart;

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

            function updateList() {
                Swal.fire(
                {
                    icon:'error',
                    title: 'abc',
                    text: 'efg',
                })
            };

            function initialize()
            {
                ProductService.get(
                    {},
                    function(response)
                    {
                        ctrl.products = response.data;
                    },
                    function()
                    {
                        console.log("error")
                    }
                )
            }
            initialize();
        }]

    });




