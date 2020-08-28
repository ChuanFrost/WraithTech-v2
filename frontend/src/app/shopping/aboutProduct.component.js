import {url} from '../../constant.js';

export default angular.module('wraithTech')
    .component('aboutProduct',
    {
        templateUrl: 'shopping/aboutProduct.html',
        controller: [function aboutProductCtrl()
            {
                var ctrl = this;

                ctrl.url = url;
            }
        ],
        bindings:
        {
            data: '<',
            onClose: '&'
        }
    })
