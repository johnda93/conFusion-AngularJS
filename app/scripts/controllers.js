'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;

        $scope.dishes = menuFactory.getDishes();
    
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
    
        $scope.dish = menuFactory.getDish(parseInt($stateParams.id));
    }])
    .controller('DishCommentController', ['$scope', function ($scope) {
        $scope.comment = {
            rating: 5
        };
    
        $scope.submitComment = function () {
            $scope.comment.date = new Date().toISOString();
    
            $scope.dish.comments.push($scope.comment);
    
            $scope.comment_form.$setPristine();
    
            $scope.comment = {
                rating: 5
            };
        }
    }])
    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
        $scope.dish = menuFactory.getDish(0);
        $scope.promotion = menuFactory.getPromotion("New");
        $scope.leader = corporateFactory.getLeader("Executive Chef");
    }])
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function ($scope, $stateParams, corporateFactory) {

    }]);