'use strict';

import {path} from './constant.js';

export default angular.module('wraithTech')
    .factory('ProductService', ['$resource',
        function($resource) {
            return $resource(
                path.product.index + '/:id',
                )
        }])
