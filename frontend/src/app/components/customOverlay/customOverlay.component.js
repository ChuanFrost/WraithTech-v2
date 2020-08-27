export default angular.module('wraithTech')
.component('customOverlay',
{
    templateUrl: 'components/customOverlay/customOverlay.html',
    controller: [function customOverlayCtrl()
    {
        var ctrl = this;

        ctrl.closeOverlay = closeOverlay;
        ctrl.overlayType = 'custom-overlay'
        function closeOverlay()
        {
            ctrl.isShow = false;
        }
    }],
    bindings: {
        isShow: '=',
        // data: '<',
        overlayType: '<',
        onClose: '&'
    },
    transclude: true,
})
