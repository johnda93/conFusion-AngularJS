'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;
        $scope.showMenu = true;
        $scope.message = "Loading ...";

        $scope.dishes = menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
    
        $scope.select = function (setTab) {
            $scope.tab = setTab;
    
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };
    
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
    
        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])
    .controller('ContactController', ['$scope', function ($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };
    
        $scope.channels = [
            {
                value:"tel",
                label:"Tel."
            },
            {
                value:"Email",
                label:"Email"
            }
        ];
    
        $scope.invalidChannelSelection = false;
    }])
    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
        $scope.sendFeedback = function () {
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
            } else {
                new feedbackFactory($scope.feedback).$save();
                
                $scope.invalidChannelSelection = false;
                
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
    
                $scope.feedbackForm.$setPristine();
            }
        };
    }])
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
        $scope.order = "";
        $scope.showDish = true;
        $scope.message = "Loading ...";

        $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id)}).$promise.then(
            function (response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    }])
    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.comment = {
            rating: 5
        };
    
        $scope.submitComment = function () {
            $scope.comment.date = new Date().toISOString();
    
            $scope.dish.comments.push($scope.comment);

            menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
    
            $scope.comment_form.$setPristine();
    
            $scope.comment = {
                rating: 5
            };
        }
    }])
    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showLeader = false;
        $scope.message = "Loading ...";

        menuFactory.getDishes().get({id: 0}).$promise.then(
            function (response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
                $scope.showDish = false;
            }
        );

        $scope.promotion = menuFactory.getPromotion().get({id: 0}).$promise.then(
            function (response){
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
                $scope.showPromotion = false;
            }
        );

        corporateFactory.get({id: 0}).$promise.then(
            function (response){
                $scope.leader = response;
                $scope.showLeader = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
                $scope.showLeader = false;
            }
        );
    }])
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function ($scope, $stateParams, corporateFactory) {
        $scope.message = "Loading ...";
        $scope.showLeaders = false;

        corporateFactory.query(
            function (response){
                $scope.leadership = response;
                $scope.showLeaders = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
                $scope.showLeaders = false;
            }
        );
    }]);