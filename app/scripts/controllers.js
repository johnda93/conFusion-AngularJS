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
    .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
                $scope.feedback.mychannel="";
    
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
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
        $scope.showDish = true;
        $scope.message = "Loading ...";

        $scope.dish = menuFactory.getDishes().get({id: 0}).$promise.then(
            function (response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.promotion = menuFactory.getPromotion("New");
        $scope.leader = corporateFactory.getLeader("Executive Chef");
    }])
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function ($scope, $stateParams, corporateFactory) {
        $scope.leadership = corporateFactory.getLeaders();
    }]);