angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $localStorage, $rootScope, $firebaseAuth) {
  
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

   
   $scope.doRegister = function() {
      var userInfo = $scope.loginData;
      fbAuth.$createUser({email: userInfo.username, password: userInfo.password}).then(function(userData) {
          return fbAuth.$authWithPassword({
              email: userInfo.username,
              password: userInfo.password
          });
      }).then(function(authData) {
          $scope.closeLogin();
      }).catch(function(error) {
          console.error("ERROR: " + error);
          alert('ERROR: ' + error);
      });

  };


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    var userInfo = $scope.loginData;

    if (!$scope.loginData.username || !$scope.loginData.password) {
        $scope.showAlert('Falha', 'Usuário e senha devem estar preenchidos!');        
        return;
    }

    /*
    var user = undefined;
    for (var i = 0; i < $rootScope.personagens.length; i++) {
        p = $rootScope.personagens[i];
        if (p.apelido == $scope.loginData.username && p.senha == $scope.loginData.password) {
            user = angular.copy(p);
        }
    };
  */
    var fbAuth = $firebaseAuth(fb);

    fbAuth.$authWithPassword({
        email: userInfo.username,
        password: userInfo.password
    }).then(function(authData) {
        $scope.showAlert('Sucesso', 'Bem vindo!!!');
        console.error("AuthData: " + JSON.stringify(authData));

    }).catch(function(error) {
        console.error("ERROR: " + error);
        $scope.showAlert('Falha', 'Usuário ou senha inválidos!');        
    });
/*
    if (user) {
        $scope.showAlert('Sucesso', 'Bem vindo, <strong>' + user.jogador+'</strong>!');
        $localStorage.user = user;   
        $rootScope.user = user;
    } else {
        $scope.showAlert('Falha', 'Usuário ou senha inválidos!');        
        return;
    }
  */
    // $scope.showAlert('Sucesso', 'Login realizado com sucesso');

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
      $scope.closeLogin();
    //}, 1000);
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

.controller('FeedsCtrl', function ($scope, $stateParams, Feeds, $rootScope, $cordovaLocalNotification) {

    $scope.formData = {};
    $scope.enviarMsg = false;
    $scope.feeds = Feeds;

    $scope.mostraEnvio = function () {
        $scope.enviarMsg = !$scope.enviarMsg;
    };

    $scope.testeNotificacao = function () {
      var alarmTime = new Date();
          alarmTime.setMinutes(alarmTime.getMinutes() + 1);
          $cordovaLocalNotification.add({
              id: "1234",
              date: alarmTime,
              message: "This is a message",
              title: "This is a title",
              autoCancel: true,
              sound: null
          }).then(function () {
              console.log("The notification has been set");
          });

        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    };

    $scope.addFeed = function() {
      
      if ($scope.formData.mensagem) {
        $scope.feeds.$add({
          "nome": $scope.user.nome, 
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

/*

.factory("Feeds", function ($firebaseArray) {
  var feedsRef = new Firebase("https://glaring-fire-2264.firebaseio.com/feeds");
  var query = feedsRef.limitToLast(40);
  return $firebaseArray(query);
}) */

;
