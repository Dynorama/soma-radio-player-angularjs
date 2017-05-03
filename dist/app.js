(function() {
    angular.module('SomaPlayer', []);

    angular.module('SomaPlayer')
        .service('SomaPlayerService', SomaPlayerService);
        .component('somaPlayer', SomaPlayerComponent).
        .run(function () {
          console.log(SomaPlayerService);
        })

    function SomaPlayerComponent() {
        return {
            controller: SomaPlayerController,
            controllerAs: 'vm',
            template: `<div>vm.hello</div>`
        };
    }

    class SomaPlayerController {
        constructor(SomaPlayerService) {
            'ngInject';
            this.SomaPlayerService = SomaPlayerService;
            thsi.hello = "world";
        }
        $onInit() {
            console.log(this.SomaPlayerService.log());
        }
    }

    class SomaPlayerService {
        constructor() {}
        log() {
            console.log('Hello World!');
        }
    }
})(angular);
