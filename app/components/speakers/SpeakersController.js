/**
 * Created by championswimmer on 29/5/15.
 */

var speakersModule = angular.module('oe.speakers', ['ui.router']);

var singleSpeaker = {};

speakersModule.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('/speakers', {
        url: '/speakers',
        templateUrl: 'app/components/speakers/speakers.html',
        controller: 'SpeakersController'
    })
}]);

speakersModule.controller('SpeakersController', 
	['$mdDialog', '$sessionStorage', '$rootScope', 'ApiJsonFactory',
        function($mdDialog, $sessionStorage, $rootScope, ApiJsonFactory) {
		var sc = this;
        sc.$storage = $sessionStorage;
        if ( sc.$storage.speakers == null || typeof(sc.$storage.speakers) == 'undefined')
        {
            sc.$storage.speakers = [];
        }
        sc.Speakers = sc.$storage.speakers;

        if (sc.Speakers.length === 0) {
            ApiJsonFactory.getJson('speakers')
                .then(function (response) {
                    sc.Speakers = response.data.speakers;
                    sc.$storage.speakers = sc.Speakers;
                }, function (error) {
                    console.error(error);
                });
        }

        sc.showSpeaker = function(speaker, event) {
            singleSpeaker = speaker;
            $mdDialog.show({
                controller: 'SpeakerDialogController',
                templateUrl: 'app/components/speakers/speakerdialog.html',
                parent: angular.element(document.body),
                targetEvent: event,

            });
        };

}]);

speakersModule.controller('SpeakerDialogController',
    ['$mdDialog', function($mdDialog) {
    var sdc = this;
    sdc.speaker = singleSpeaker;

    sdc.close = function () {
        $mdDialog.hide();
    };
}]);