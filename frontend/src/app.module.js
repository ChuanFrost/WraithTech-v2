'use strict';

import angular from 'angular';
import 'angular-resource';

export default angular.module('wraithTech',
    [
        'ngResource'
    ]).config(function($httpProvider)
    {
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    })
