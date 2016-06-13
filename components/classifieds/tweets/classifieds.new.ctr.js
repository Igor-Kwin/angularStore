(function() {
    "use strict"

    angular
        .module("ngClassifieds")
        .controller("newClassifiedsCtrl", function($rootScope, $scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;

            $timeout(function() {
                $mdSidenav('left').open();
            })

            $scope.$watch('vm.sidenavOpen', function(sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('classifieds');
                        });
                }
            });

            function closeSidebar() {
                vm.sidenavOpen = false;
            }

            function saveClassified(classified) {
                if (classified) {

                    classified.contact = {
                        name: "Ryan Chenkie",
                        phone: "(555)555-555",
                        email: "igor24@yandex.ru"
                    }

                  $rootScope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }

            }
        });
})();
