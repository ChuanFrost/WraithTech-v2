'use strict';

export default angular.module('wraithTech')
    .factory('ProductService', ['$resource',
        function($resource) {
            return $resource(
                // 'http://localhost:8000/api/product'
                'data.json'
                )
        }])
