var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        title: "Tana Trip Booking",
        templateUrl: "/dashboards.html"
    })
    .when("/dashboards", {
        title: "Dashboards",
        templateUrl: "/dashboards.html"
    })
    .when("/trips",{
        title: "Trips",
        templateUrl:"/trips.html"
    })
});

app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);