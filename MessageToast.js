
const SUCCESS_TOAST_CLASS = "rounded-1 me-2 p-2 bg-success";
const ERROR_TOAST_CLASS = "rounded-1 me-2 p-2 bg-danger";
const WARNING_TOAST_CLASS = "rounded-1 me-2 p-2 bg-warning";
const INFO_TOAST_CLASS = "rounded-1 me-2 p-2 bg-info";
class MessageToast {
  constructor() {
    this.toastElement = document.getElementById("liveToast");
    this.toast = bootstrap.Toast.getOrCreateInstance(this.toastElement);
  }

  mountInfoToast(message) {
    document.getElementById("toastMessage").innerHTML = message;
    document.getElementById("toastIcon").setAttribute("class", INFO_TOAST_CLASS);
    document.getElementById("toastTitle").innerHTML = "Info";
    return this;
  }

  mountSuccessToast(message) {
    document.getElementById("toastMessage").innerHTML = message;
    document.getElementById("toastIcon").setAttribute("class", SUCCESS_TOAST_CLASS);
    document.getElementById("toastTitle").innerHTML = "Success";
    return this;
  }

  mountWarningToast(message) {
    document.getElementById("toastMessage").innerHTML = message;
    document.getElementById("toastIcon").setAttribute("class", WARNING_TOAST_CLASS);
    document.getElementById("toastTitle").innerHTML = "Warning";
    return this;
  }

  mountErrorToast(message) {
    document.getElementById("toastMessage").innerHTML = message;
    document.getElementById("toastIcon").setAttribute("class", ERROR_TOAST_CLASS);
    document.getElementById("toastTitle").innerHTML = "Error";
    return this;
  }

  showToast() {
    this.toast.show();
  }

}

