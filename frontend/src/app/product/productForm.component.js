import Swal from 'sweetalert2';
import {url,path} from '../../constant.js';

export default angular.module('wraithTech')
.component('productForm',
    {
        templateUrl: 'product/productForm.html',
        controller: ['ProductService', '$state',
                    function productFormCtrl(ProductService, $state)
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
                        ctrl.closeOverlay = closeOverlay;

                        function handleSubmit($event) {
                            var form = new FormData($event.target);

                            if (ctrl.data.isEdit)
                            {
                                ProductService.update(
                                    {}, form,
                                    function(response)
                                    {
                                        handleSuccess('Product successfully updated');
                                    },
                                    function (response)
                                    {
                                        handleError(response);
                                    }
                                )
                            }
                            else
                            {
                                ProductService.save(
                                    {}, form,
                                    function()
                                    {
                                        handleSuccess('Product successfully created');
                                    },
                                    function (response)
                                    {
                                        handleError(response);
                                    }
                                )
                            }
                        }

                        function handleError(response)
                        {
                            switch(response.status)
                            {
                                case 400 :
                                    ctrl.error = response.data.error;
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

                        function handleSuccess(msg)
                        {
                            Swal.fire(
                                {
                                    icon:'success',
                                    title: msg,
                                }
                            );

                            $state.reload();
                            ctrl.onClose();
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

                        function closeOverlay(){
                            ctrl.onClose();
                        }
                    }],
        bindings:
        {
            data: '<',
            overlayType: '<',
            onClose: '&'
        }
    })
