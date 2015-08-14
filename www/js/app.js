angular.module('starter', ['ionic', 'ngCordova', 'ui.router'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'imageController'
  })
  $stateProvider.state('next', {
    url: '/next',
    templateUrl: 'templates/next.html',
    controller: 'imageController'
  })
})

.service('ImageService', function($cordovaCamera, $cordovaFile, $state) {
    var self = this;
    this.images = [];
    this.addImage = function() {
    
      var options = {
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : Camera.DestinationType.CAMERA,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };
      
      $cordovaCamera.getPicture(options).then(function(imageData) {
       $state.go('next');
        self.images.push({url: imageData}).then($state.go('next'));
      }, function(err) {
        console.log(err);
      });
      console.log(this.images)
    }
})

.controller('imageController', function($scope, ImageService, $cordovaCamera, $cordovaFile, $state) {
    $scope.time = new Date();

    $scope.imageService = ImageService;
    // extract to service!

 
    $scope.urlForImage = function(imageName) {
     // var name = imageName.substr(imageName.lastIndexOf('/') + 1);
     // var trueOrigin = cordova.file.dataDirectory + name;
     // return trueOrigin;
     return imageName.url;
    }
});
