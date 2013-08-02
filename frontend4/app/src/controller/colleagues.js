/**
 * @name ColleaguesCtrl
 * @requires
 * @description Colleagues list controller.
 */

/*globals angular */

var ColleaguesCtrl = angular.module('ColleagueList')
    .controller('ColleaguesCtrl', function ($scope, $filter, $window, $log) {
        "use strict";

        var lastId = 4, Colleague, list, sortAsc;

        /**
         * Constructor function of the colleague object (view model).
         *
         * @param  string name  The name of the colleague.
         * @param  string email The email adress of the colleague.
         * @return object       Colleague object.
         */
        Colleague = function (data) {
            data.id = data.id || null;
            data.name = data.name || null;
            data.email = data.email || null;

            if (!(this instanceof Colleague)) {
                return new Colleague(data);
            }

            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
        };

        /**
         * Helper method: setting the id of a new colleague.
         */
        Colleague.prototype.setId = function () {
            this.id = lastId + 1;

            // Update lastId
            lastId = this.id;
        };

        /**
         * The list object stores a list of colleague objects
         * and provides methods to manage the store.
         *
         * @type object
         */
        list = {
            store: [
                {id: 1, name: "Michael Kleinschnitz", email: "michael.kleinschnitz@mayflower.de"},
                {id: 2, name: "Peter Ritt", email: "peter.ritt@mayflower.de"},
                {id: 3, name: "Steven Klar", email: "steven.klar@mayflower.de"},
                {id: 4, name: "Norbert Schmidt", email: "norbert.schmidt@mayflower.de"}
            ],

            length: function () {
                return this.store.length;
            },

            add: function (item) {
                this.store.push(item);
            },

            find: function (id) {
                var i, max = this.length();

                for (i = 0; i < max; i += 1) {
                    if (this.store[i].id === id) {
                        return {
                            index: i,
                            data: this.store[i]
                        };
                    }
                }

                return false;
            },

            update: function (data) {
                if (data.id === undefined) {
                    $log.error("list.update(): Parameter 'data.id' is missing!");
                    return;
                }

                var item = this.find(data.id);

                if (!item) {
                    $log.error("list.update(): There is no item with id " + data.id + " in list!");
                    return;
                }

                this.store[item.index] = data;
            },

            delete: function (id) {
                if (id === undefined) {
                    $log.error("list.delete(): Parameter 'id' is missing!");
                    return;
                }

                var confirm, item = this.find(id);

                if (!item) {
                    $log.error("list.delete(): There is no item with id " + id + " in list!");
                    return;
                }

                // User has to confirm the delete action.
                confirm = $window.confirm(
                    "Are you sure to remove ' " + item.data.name + "' from the list?"
                );

                if (confirm) {
                    this.store.splice(item.index, 1);
                }
            },

            sort: function (callback) {
                this.store.sort(callback);
            },

            reverse: function () {
                this.store.reverse();
            }
        };

        /**
         * Sorts an array in ascending order by name.
         */
        sortAsc = function () {
            return function (a, b) {
                var nameA = (a && a.name) || "",
                    nameB = (b && b.name) || "";

                return nameA.localeCompare(nameB);
            };
        };

        // Define $scope variables.
        $scope.search = "";
        $scope.data = {};
        $scope.itemExists = false;
        $scope.asc = true;
        // Assign the list object to $scope.
        $scope.list = list;
        $scope.listLength = $scope.list.store.length;
        $scope.filteredLength = 0;

        /**
         * Sort colleague list.
         */
        $scope.list.sort(sortAsc());

        /**
         * Sorts the colleague list by name and reverses the current order.
         */
        $scope.sortList = function () {
            $scope.list.reverse();
            $scope.asc = !$scope.asc;
        };

        /**
         * Resets the the form to its default values
         * and sorts the colleague list in ascending order by name.
         */
        $scope.reset = function () {
            $scope.search = "";
            $scope.data = {};
            $scope.itemExists = false;
            $scope.list.sort(sortAsc());
            $scope.listLength = $scope.list.store.length;
        };

        /**
         * Prepares a single colleague object (view model) to be updated.
         *
         * @param  integer id  The id of the selected colleague object.
         */
        $scope.update = function (id) {
            // Get selected colleague object (view model) from list.
            var colleague = $scope.list.find(id);

            // Init update mode.
            $scope.itemExists = true;

            // Set form values.
            $scope.data.id = colleague.data.id;
            $scope.data.name = colleague.data.name;
            $scope.data.email = colleague.data.email;
        };

        /**
         * Saves a newly created or a updated existing colleague.
         */
        $scope.save = function () {
            // Create new colleague object (view model)
            // and get index of selected list item
            var colleague = new Colleague($scope.data);

            if (!colleague.name || !colleague.email) {
                $window.alert("Please, provide a name and an email address.");
                return;
            }

            if ($scope.itemExists) {
                // Update existing colleague...
                $scope.list.update(colleague);
                $window.alert("Updated colleague's entry!");
            } else {
                // ...otherwise add new colleague to list.
                colleague.setId();
                $scope.list.add(colleague);
                $window.alert("Added new colleague to the list!");
            }

            $scope.reset();
        };

        /**
         * Removes a colleague object (view model) from the list.
         *
         * @param  integer index The selected array index.
         */
        $scope.remove = function (id) {
            $scope.list.delete(id);

            $scope.reset();
        };

        /**
         * Watch the store length and the filtered
         * list lenght and apply both to scope vars.
         */
        $scope.$watch("list.store", function (store) {
            $scope.listLength = store.length;
        });

        $scope.$watch("search", function (search) {
            $scope.filteredLength = $filter("filter")($scope.list.store, search).length;
        });

    });

ColleaguesCtrl.$inject = ['$scope', '$filter', '$window', '$log'];
