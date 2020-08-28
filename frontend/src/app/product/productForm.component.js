import Swal from 'sweetalert2';
import {url,path} from '../../constant.js';

export default angular.module('wraithTech')
.component('productForm',
    {
        templateUrl: 'product/productForm.html',
        controller: ['ProductService', '$state', 'handleSuccess', 'handleError',
                    function productFormCtrl(ProductService, $state, handleSuccess, handleError)
                    {
                        var ctrl = this;

                        ctrl.$onChanges = function (changes)
                        {
                            if (changes.data)
                            {
                                ctrl.dataCopy = angular.copy(ctrl.data);
                                ctrl.error = {};
                            }
                        }

                        ctrl.url = url;
                        ctrl.path = path;

                        ctrl.handleSubmit = handleSubmit;
                        ctrl.previewImg = previewImg;
                        ctrl.previewImgDetail = previewImgDetail;

                        function handleSubmit($event) {
                            var form = new FormData($event.target);

                            if (ctrl.data.isEdit)
                            {
                                ProductService.update(
                                    {}, form,
                                    function(response)
                                    {
                                        handleSuccess('Product successfully updated', $state);
                                    },
                                    function (response)
                                    {
                                        handleError(response);
                                        ctrl.error = response.data.error;
                                    }
                                )
                            }
                            else
                            {
                                ProductService.save(
                                    {}, form,
                                    function()
                                    {
                                        handleSuccess('Product successfully created', $state);
                                    },
                                    function (response)
                                    {
                                        handleError(response);
                                        ctrl.error = response.data.error;
                                    }
                                )
                            }
                        }

                        function preview($event, name) {
                            let reader = new FileReader();

                            reader.onload = function(e)
                            {
                                $(name).attr('src', e.target.result);
                            }

                            reader.readAsDataURL(event.target.files[0]);

                            return $event.target.files[0].name;
                        }

                        function previewImg($event) {
                            ctrl.dataCopy.status.img = preview($event, '#img');
                        }

                        function previewImgDetail($event) {
                            ctrl.dataCopy.status.imgDetail = preview($event, '#imgDetail');
                        }
                    }],
        bindings:
        {
            data: '<',
            overlayType: '<',
            onClose: '&'
        }
    })
