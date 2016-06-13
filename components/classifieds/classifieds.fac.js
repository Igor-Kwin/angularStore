(function() {
    "use strict"

    angular
        .module("ngClassifieds")
        .factory("classifiedsFactory", function($http, $firebaseArray) {

           var ref = new Firebase('https://dazzling-heat-9969.firebaseio.com/');

            return {
                ref: $firebaseArray(ref)
            };
        });

})();
