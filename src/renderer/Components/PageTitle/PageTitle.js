module.exports = {
  template: `<div class="columns">
    <div class="column">
      <h1 class="title">{{ $ctrl.page }}</h1>
    </div>
    <div class="column">
      <back-button></back-button>
    </div>
    </div>`,
  bindings: {
    page: '@'
  }
}