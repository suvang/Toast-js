let successBtn = document.getElementById("show-toast-button");

const Toast = {
  counter: 0,
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      let containerBottom = document.createElement("div");
      containerBottom.className = "container-bottom";
      document.body.prepend(containerBottom);

      let containerTop = document.createElement("div");
      containerTop.className = "container-top";
      document.body.prepend(containerTop);
    });
  },

  show(message, type, position) {
    let containerTop = document.querySelector(".container-top");
    let containerBottom = document.querySelector(".container-bottom");
    let timeRemaining = document.createElement("div");
    let toast = document.createElement("div");
    let cross = document.createElement("div");
    let container;
    let seconds = 5;
    let removeInterval = null;
    let hideTimeout = null;

    toast.className = "toast";

    cross.className = "cross";
    cross.textContent = "X";

    if (position.includes("top")) {
      containerTop.appendChild(toast);
      container = containerTop;
    } else {
      containerBottom.appendChild(toast);
      container = containerBottom;
    }

    timeRemaining.textContent = `${seconds}`;
    timeRemaining.className = "time-remaining";

    const render = function (sec) {
      timeRemaining.textContent = `${sec}`;
    };

    if (seconds === 0) {
      clearInterval(removeInterval);
    }

    removeInterval = setInterval(function () {
      seconds--;
      render(seconds);
    }, 1000);

    toast.style = "";
    toast.textContent = message;
    toast.className = "toast toast--visible";
    toast.id = ++this.counter;
    toast.dataset.position = position;

    toast.appendChild(timeRemaining);
    toast.appendChild(cross);

    cross.addEventListener("click", removeToast);

    let toasts = document.querySelectorAll(".toast");

    if (position) {
      let topOrBottom = position.substring(0, position.indexOf("-"));
      let placement = position.substring(position.indexOf("-") + 1);

      toasts.forEach((toast) => {
        if (toast.dataset.position === position) {
          if (topOrBottom === "top") {
            toast.style.marginTop = "20px";
          } else {
            toast.style.marginBottom = "20px";
          }
        }
      });

      container.style[topOrBottom] = "20px";

      switch (placement) {
        case "center":
          container.style.left = "50%";
          container.style.transform = "translate(-50%)";
          break;

        case "left":
          container.style.left = "20px";
          break;

        case "right":
          container.style.right = "20px";
          break;

        default:
          break;
      }
    }

    if (type) {
      toast.classList.add(`toast--${type}`);
    }

    const deleteId = document.getElementById(this.counter);

    function removeToast() {
      deleteId.classList.add("hidden");
      deleteId.addEventListener("transitionend", () => {
        deleteId.remove();
      });
    }

    clearTimeout(hideTimeout);

    hideTimeout = setTimeout(() => {
      removeToast();
    }, 5000);
  },
};

Toast.init();

successBtn.addEventListener("click", () => {
  Toast.show("success toast", "success", "bottom-center");
});
