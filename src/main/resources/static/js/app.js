var springbox = angular.module('springbox', ['ngRoute']).config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'home'
        })        
        .otherwise('/');

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

springbox.controller('navigation', function ($rootScope, $scope, $http, $location, $route, userStore) {
    $scope.tab = function (route) {
        return $route.current && route === $route.current.controller;
    };

    $http.get('user')
        .success(function (data) {
            if (data.name) {
                $rootScope.authenticated = true;
                $rootScope.userName = data.name;
                $rootScope.email = data.email; 
                $rootScope.gname = data.given_name;
                $rootScope.pname = data.preferred_username;
                userStore.userName = data.name;
            } else {
                $rootScope.authenticated = false;
                $rootScope.userName = null;
            }
        })
        .error(function () {
            $rootScope.authenticated = false;
            $rootScope.userName = null;
        });

    $scope.credentials = {};

    $scope.logout = function () {
        $http.post('logout', {})
            .success(function () {
                $rootScope.authenticated = false;
                $rootScope.userName = null;                
                $location.path("/");
            })
            .error(function (data) {
                console.log("Logout failed");
                $rootScope.userName = null;
                $rootScope.authenticated = false;
            });
    }
});

springbox.factory('userStore', function () {
    return {};
});
