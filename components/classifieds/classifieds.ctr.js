(function() {
    "user strict"

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function($rootScope, $scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {


            var vm = this;
            vm.openSidebar = openSidebar;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
            vm.editClassified = editClassified;
            vm.saveEdit = saveEdit;
            vm.deleteClassified = deleteClassified;

            vm.classifieds;
            vm.categories;
            vm.editing;
            vm.classified;
            vm.classifieds = classifiedsFactory.ref;
            vm.classifieds.$loaded().then(function(classifieds){
              vm.categories = getCategories(classifieds);
            });

            //      classifiedsFactory.getClassifieds().then(function(classifieds) {
            //          vm.classifieds = classifieds.data;
            //          vm.categories = getCategories(vm.classifieds);
            //      });

            $rootScope.$on('newClassified', function(event, classified) {
                vm.classifieds.$add(classified);
                showToast();
            });
            $scope.$on('$editSaved', function(event, message) {
                showToast(message);
            });
            var contact = {
                name: "Ryan Chenkie",
                phone: "(555)555-555",
                email: "igor24@yandex.ru"
            }

            function openSidebar() {
                $state.go('classifieds.new');
            }

            function closeSidebar() {
                $mdSidenav('left').close();
            }

            function saveClassified(classified) {
                if (classified) {
                    vm.classifieds.push(classified);
                }
                classified.contact = contact;
                vm.classified = {};
                closeSidebar();
                $showToast("Classified saved!");
            }


            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.$id
                });
            }

            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast("Edit Saved");
            }

            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure, you want to delete ' + classified.title + '' + ' ?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    var index = vm.classifieds.indexOf(classified);
                    vm.classifieds.splice(index, 1);
                }, function() {

                })
            }

            function showToast(message) {
                $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(2000)
            }

            function getCategories(classifieds) {

                var categories = [];

                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }

            ////var data =


          //  var firebase = classifiedsFactory.ref;
          // angular.forEach(data, function(item) {
          //      firebase.$add(item);
          //  });

        });
})();
