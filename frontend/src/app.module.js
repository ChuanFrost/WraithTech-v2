'use strict';

import 'angular';
import 'angular-resource';
import '@uirouter/angularjs/release/angular-ui-router.js';

export default angular.module('wraithTech',
    [
        'ngResource', 'ui.router'
    ]).config(function($httpProvider, $locationProvider)
    {
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
        $locationProvider.hashPrefix('');
    }).config(function($stateProvider, $urlRouterProvider)
    {
        var states = [
            {
                name: 'shoppingCart',
                url: '/',
                component: 'shoppingCart'
            },
            {
                name: 'login',
                url: '/login',
                template: '<h1>I am login</h1>'
            }
        ]

        states.forEach((state)=>$stateProvider.state(state))

        $urlRouterProvider.otherwise('/')
    })
