document.addEventListener("setCodeMirror", function (a) {
    a = a.detail;
    document.getElementsByClassName("CodeMirror")[0].CodeMirror.setValue(a)
});
var cm_wait = setInterval(function () {
    document.getElementsByClassName("CodeMirror").length && (clearInterval(cm_wait), retCodeMirror())
});
document.addEventListener("getCodeMirror", function (a) {
    retCodeMirror()
});
function retCodeMirror() {
    var a = document.getElementsByClassName("CodeMirror")[0].CodeMirror.getValue();
    document.dispatchEvent(new CustomEvent("retCodeMirror", {
            detail: a
        }))
};
