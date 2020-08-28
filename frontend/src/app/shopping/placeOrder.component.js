import Swal from 'sweetalert2';

export default angular.module('wraithTech')
    .component('placeOrder',
    {
        templateUrl: 'shopping/placeOrder.html',
        controller:['OrderService', '$state', 'handleSuccess', 'handleError',
            function(OrderService, $state, handleSuccess, handleError)
            {
                var ctrl = this;

                ctrl.errorDetail = {
                    name: "",
                    email: "",
                    contact: "",
                    address: ""
                };

                ctrl.handleSubmit = handleSubmit;
                ctrl.closeOverlay = closeOverlay;

                function handleSubmit() {
                    $state.reload();
                    if(ctrl.data.cartList.length <= 0)
                    {
                        Swal.fire(
                            {
                                icon: 'error',
                                title: 'Cart is empty. Unable to place order.'
                            }
                        )
                        return 0;
                    }

                    var obj = {};
                    Object.assign(obj, ctrl.orderDetail);
                    obj.cart = ctrl.data.cartList;
                    obj.total_price = ctrl.data.totalPrice.toFixed(2);

                    OrderService.save(
                        {}, obj,
                        function(response)
                        {
                            handleSuccess('Order successfully placed', $state);
                        },
                        function(response)
                        {
                            handleError(response)
                            ctrl.error = response.data.error;
                        }
                    )
                }

                function closeOverlay()
                {
                    ctrl.error = {};
                    ctrl.errorDetail = {
                        name: "",
                        email: "",
                        contact: "",
                        address: ""
                    };

                    ctrl.onClose();
                }
            }
        ],
        bindings:
        {
            data: '<',
            onClose: '&'
        }
    })
