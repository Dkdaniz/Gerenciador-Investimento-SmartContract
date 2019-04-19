module.exports = [Directive];

function Directive() {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        const filepath = changeEvent.target.value;
        const filename = filepath.substring(filepath.lastIndexOf('\\')+1);
        
        const reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread = {
              content: loadEvent.target.result,
              name: filename
            };
          });
        }
        reader.readAsArrayBuffer(changeEvent.target.files[0]);
        // readAsDataURL
      });
    }
  }
}