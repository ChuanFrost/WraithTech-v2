'use strict';

angular
    .module('wraithTech')
        .factory('ProductService', ['$resource',
            function($resource) {
                return $resource(
                    'http://localhost:8000/api/product'
                    )
            }])
