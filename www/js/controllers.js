angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $localStorage, $rootScope) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
//    $scope.personagens = [];
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // An alert dialog
   $scope.showAlert = function (title, msg) {
     var alertPopup = $ionicPopup.alert({
       title: title,
       template: msg
     });
     alertPopup.then(function(res) {
       console.log('fechou alert');
     });
   };

   $scope.doLogout = function() {
      if (confirm('Sair?')) {
          delete $localStorage.user;
          delete $rootScope.user;
      }
   };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    if (!$scope.loginData.username || !$scope.loginData.password) {
        $scope.showAlert('Falha', 'Usuário e senha devem estar preenchidos!');        
        return;
    }

    var user = undefined;
    for (var i = 0; i < $rootScope.personagens.length; i++) {
        p = $rootScope.personagens[i];
        if (p.apelido == $scope.loginData.username && p.senha == $scope.loginData.password) {
            user = angular.copy(p);
        }
    };

    if (user) {
        $scope.showAlert('Sucesso', 'Bem vindo, <strong>' + user.jogador+'</strong>!');
        $localStorage.user = user;   
        $rootScope.user = user;
    } else {
        $scope.showAlert('Falha', 'Usuário ou senha inválidos!');        
        return;
    }
    // $scope.showAlert('Sucesso', 'Login realizado com sucesso');

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  if ($localStorage.user) {
      $rootScope.user = $localStorage.user;
  }

})

.controller('PersonagensCtrl', function ($scope, $http) {

})

.controller('PersonagemCtrl', function($scope, $stateParams) {
    console.log('$stateParams', $stateParams);
    $scope.personagem = $stateParams.personagem;
})

.controller('FeedsCtrl', function($scope, $stateParams, Feeds) {

    $scope.formData = {};
    $scope.feeds = Feeds;

    $scope.addFeed = function() {
      
      if ($scope.formData.mensagem) {
        $scope.feeds.$add({
          "nome": $scope.user.nome + ' ('+$scope.user.jogador+')', 
          "mensagem": $scope.formData.mensagem,
          "imagem": $scope.user.claImage,
          "data": Date.now()
        })
        .then(function () {
            $scope.formData.mensagem = '';
        });
      }
    };

    $scope.doRefresh = function () {
        console.log('Refreshing....');
        $scope.$broadcast('scroll.refreshComplete');

        /*
        
        
        $http.get('/new-items')
         .success(function(newItems) {
           $scope.items = newItems;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         }); 

        */       
    };

    //https://glaring-fire-2264.firebaseio.com/#-JsigPT5itr5P6JNC1jt|37775b3c2c26d0a3dc3165043b69a4b9


})
.factory("Feeds", function($firebaseArray) {
  var feedsRef = new Firebase("https://glaring-fire-2264.firebaseio.com/feeds");
  var query = feedsRef.limitToLast(40);
  return $firebaseArray(query);
})

.controller('NpcsCtrl', function($scope, $stateParams) {
})

;
