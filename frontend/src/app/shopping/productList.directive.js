'use strict';

export default angular.module('wraithTech')
    .component('productList',
    {
        templateUrl: 'shopping/productList.html',
        controller: ['$scope', 'ProductService',
        function productListCtrl($scope, ProductService,)
        {
            $scope.products = []

            function initialize()
            {
                ProductService.get(
                    {},
                    function(response)
                    {
                        $scope.products = response.data;
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




