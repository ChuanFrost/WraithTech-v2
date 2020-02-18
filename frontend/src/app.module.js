'use strict';

angular.module('wraithTech',
    [
        'ngResource'
    ]).config(function($httpProvider)
    {
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    })
