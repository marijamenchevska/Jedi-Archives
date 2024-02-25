export class Loader {
    static show() {
        document.getElementById("spinner").style.visibility = "visible";
    }

    static hide() {
        document.getElementById("spinner").style.visibility = "hidden";
    }
}