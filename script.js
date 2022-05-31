import { Toast } from "./Toast/toast.js";

Toast.init();

let showToastBtn = document.getElementById("show-toast-button");

showToastBtn.addEventListener("click", () => {
  Toast.show("error toast", "error", "top-center", 5);
});
