module.exports = ['$window', function ($window) {
  return {
    template: `<button type="button" class="button is-outlined is-pulled-right">Voltar</button>`,
    link: (scope, element) => {
      element.on('click', function () {
        $window.history.back();
      });
    }
  }
}];