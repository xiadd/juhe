require('../css/editor.css')

var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('cm-textarea'), {
  mode:  "markdown",
});
