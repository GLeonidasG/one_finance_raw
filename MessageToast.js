
const SUCCESS_TOAST_CLASS = "rounded-1 me-2 p-2 bg-success";
const ERROR_TOAST_CLASS = "rounded-1 me-2 p-2 bg-danger";
class MessageToast {
  constructor() {
    this.toastElement = document.getElementById("liveToast");
    this.toast = bootstrap.Toast.getOrCreateInstance(this.toastElement);
  }

  mountSuccessToast(message) {
    document.getElementById("toastMessage").innerHTML = message;
    document.getElementById("toastIcon").setAttribute("class", SUCCESS_TOAST_CLASS);
    document.getElementById("toastTitle").innerHTML = "Success";
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

