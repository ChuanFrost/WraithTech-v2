export default angular.module('wraithTech')
.component('customOverlay',
{
    templateUrl: 'components/customOverlay/customOverlay.html',
    controller: [function customOverlayCtrl()
    {
        var ctrl = this;

        ctrl.closeOverlay = closeOverlay;

        function closeOverlay()
        {
            ctrl.isShow = false;
        }
    }],
    bindings: {
        isShow: '=',
        data: '<',
        onClose: '&'
    },
    transclude: true,
})
