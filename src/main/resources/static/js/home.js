var springbox = angular.module('springbox');

springbox.controller('home', function ($rootScope, $scope, $http) {

    $http.get('user').success(function (data) {
        if (data.name) {
            $http.get('mbaas-core/login')
                .success(function (recs) {
                    $("response").html(recs);
                });
        }
    });
});