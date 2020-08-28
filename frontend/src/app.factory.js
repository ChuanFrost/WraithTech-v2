'use strict';

import {path} from './constant.js';
import Swal from 'sweetalert2';

export default angular.module('wraithTech')
    .factory('ProductService', ['$resource',
        function($resource) {
            return $resource(
                    path.product.index + '/:id',
                    {},
                    {
                        "save": {method: 'POST', headers: {'Content-Type': undefined }},
                        "update": {params: {_method:"PATCH"}, method: 'POST', headers: {'Content-Type': undefined }}
                    }
                )
        }]
    )
    .factory('OrderService', ['$resource',
        function($resource) {
            return $resource(
                    path.order.index + '/:id',
                )
        }]
    )
    .factory('handleSuccess',
        function()
        {
            return function(msg, $state)
            {
                Swal.fire(
                    {
                        icon:'success',
                        title: msg,
                    }
                );

                $state.reload();
            }
        }
    )
    .factory('handleError',
        function()
        {
            return function(response)
            {
                switch(response.status)
                {
                    case 400 :
                        Swal.fire(
                            {
                                icon:'error',
                                title: 'Validation Error',
                            }
                        );
                        break;

                    default :
                        Swal.fire(
                            {
                                icon:'error',
                                title: 'Internal Server Error',
                                text: response.data.error,
                            }
                        );
                }
            }
    }
)
