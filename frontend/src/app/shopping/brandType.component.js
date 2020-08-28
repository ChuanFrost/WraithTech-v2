import Tabulator from 'tabulator-tables';
import Swal from 'sweetalert2';
import {path} from '../../constant.js';

export default angular.module('wraithTech')
    .component('brandType',
    {
        templateUrl: 'shopping/brandType.html',
        controller: ['$http', '$state', 'handleSuccess', 'handleError',
            function aboutTypeCtrl($http, $state, handleSuccess, handleError)
            {
                var ctrl = this;

                ctrl.$onChanges = function (changes)
                {
                    if (changes.data)
                    {
                        ctrl.dataCopy = angular.copy(ctrl.data);
                        ctrl.error = {};

                        var deleteIcon = function(cell, formatterParams, onRendered)
                        {
                            return '<i class="fas fa-times text-danger"></i>'
                        }

                        var typesTable = new Tabulator('#typesTable',
                        {
                            layout: "fitColumns",
                            headerFilterPlaceholder: "Search",
                            data: ctrl.dataCopy.types,
                            columns:
                            [

                                {title: "ID", field: "id", visible: false},
                                {title: "Type", field: "type", headerFilter:true, widthGrow: 3},
                                {title:"Remove", formatter:deleteIcon, widthGrow: 2, align:"center", tooltip:"Remove",
                                    cellClick(e, cell)
                                    {
                                        Swal.fire(
                                        {
                                            icon: 'warning',
                                            title: 'Are you sure on removing this?',
                                            text: 'Type: ' + cell.getData().type,
                                            showCancelButton:true,
                                            cancelButtonColor:'#d9534f',
                                            cancelButtonText: "No",
                                            confirmButtonColor:'#5cb85c',
                                            confirmButtonText: 'Yes'
                                        }).then((result) =>
                                            {
                                                if(result.value)
                                                {
                                                    $http.delete(
                                                        path.product.type + '/' + cell.getData().id,
                                                    ).then(
                                                        function()
                                                        {
                                                            var msg = 'Type:' + cell.getData().type + ' successfully deleted.';
                                                            handleSuccess(msg,$state);
                                                        },
                                                        function(response)
                                                        {
                                                            handleError(response);
                                                        }
                                                    )
                                                }
                                            });

                                    }
                                }
                            ]
                        });

                        var brandsTable = new Tabulator('#brandsTable',
                        {
                            layout: "fitColumns",
                            headerFilterPlaceholder: "Search",
                            data: ctrl.dataCopy.brands,
                            columns:
                            [

                                {title: "ID", field: "id", visible: false},
                                {title: "Brand", field: "brand", headerFilter:true, widthGrow: 3},
                                {title:"Remove", formatter:deleteIcon, widthGrow: 2, align:"center", tooltip:"Remove",
                                    cellClick(e, cell)
                                    {
                                        Swal.fire(
                                        {
                                            icon: 'warning',
                                            title: 'Are you sure on removing this?',
                                            text: 'Brand: ' + cell.getData().brand,
                                            showCancelButton:true,
                                            cancelButtonColor:'#d9534f',
                                            cancelButtonText: "No",
                                            confirmButtonColor:'#5cb85c',
                                            confirmButtonText: 'Yes'
                                        }).then((result) =>
                                            {
                                                if(result.value)
                                                {
                                                    $http.delete(
                                                        path.product.brand + '/' + cell.getData().id,
                                                    ).then(
                                                        function()
                                                        {
                                                            var msg = 'Brand:' + cell.getData().brand + ' successfully deleted.';
                                                            handleSuccess(msg,$state);
                                                        },
                                                        function(response)
                                                        {
                                                            handleError(response);
                                                        }
                                                    )
                                                }
                                            });

                                    }
                                }
                            ]
                        });
                    }
                }

                ctrl.newType = "";
                ctrl.newBrand = "";

                ctrl.addType = addType;
                ctrl.addBrand = addBrand;

                function addType()
                {
                    $http.post(
                        path.product.type,
                        {type:ctrl.newType}
                    ).then(
                        function()
                        {
                            var msg = 'Type:' + ctrl.newType + ' successfully added.';
                            handleSuccess(msg,$state)
                        },
                        function(response)
                        {
                            handleError(response);
                            ctrl.error = response.data.error;
                        }
                    )
                }

                function addBrand()
                {
                    $http.post(
                        path.product.brand,
                        {brand:ctrl.newBrand}
                    ).then(
                        function()
                        {
                            var msg = 'Brand:' + ctrl.newBrand + ' successfully added.';
                            handleSuccess(msg,$state)
                        },
                        function(response)
                        {
                            handleError(response);
                            ctrl.error = response.data.error;
                        }
                    )
                }
            }
        ],
        bindings:
        {
            data: '<',
            onClose: '&'
        }
    })
