'use strict';

import 'angular';
import 'angular-resource';
import '@uirouter/angularjs';

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
                name: 'product',
                url: '/product',
                component: 'productManager'
            },
            {
                name: 'order',
                url: '/order',
                component: 'orderManager'
            }
        ]

        states.forEach((state)=>$stateProvider.state(state))

        $urlRouterProvider.otherwise('/')
    })
