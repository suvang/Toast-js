let successBtn = document.getElementById("show-toast-button");

document.addEventListener("DOMContentLoaded", () => {
  let containerBottom = document.createElement("div");
  containerBottom.className = "container-bottom";
  document.body.prepend(containerBottom);

  let containerTop = document.createElement("div");
  containerTop.className = "container-top";
  document.body.prepend(containerTop);
});

const Toast = {
  counter: 0,
  init(position) {
    this.containerTop = document.querySelector(".container-top");
    this.containerBottom = document.querySelector(".container-bottom");

    this.removeInterval = null;

    this.hideTimeout = null;
    this.el = document.createElement("div");
    this.el.className = "toast";

    this.cross = document.createElement("div");
    this.cross.className = "cross";
    this.cross.textContent = "X";

    if (position.includes("top")) {
      this.containerTop.appendChild(this.el);
      this.container = this.containerTop;
    } else {
      this.containerBottom.appendChild(this.el);
      this.container = this.containerBottom;
    }
  },

  show(message, type, position) {
    Toast.init(position);
    let seconds = 5;
    let timeRemaining = document.createElement("div");
    timeRemaining.textContent = `${seconds}`;
    timeRemaining.className = "time-remaining";

    const render = function (sec) {
      timeRemaining.textContent = `${sec}`;
    };

    if (seconds === 0) {
      clearInterval(this.removeInterval);
    }

    this.removeInterval = setInterval(function () {
      seconds--;
      render(seconds);
    }, 1000);

    this.el.style = "";
    this.el.textContent = message;
    this.el.className = "toast toast--visible";
    this.el.id = ++this.counter;
    this.el.dataset.position = position;

    this.el.appendChild(timeRemaining);
    this.el.appendChild(this.cross);
    this.closeBtn = document.querySelector(".cross");

    this.cross.addEventListener("click", removeToast);

    let toasts = document.querySelectorAll(".toast");

    if (position) {
      let topOrBottom = position.substring(0, position.indexOf("-"));
      let placement = position.substring(position.indexOf("-") + 1);

      toasts.forEach((toast) => {
        if (toast.dataset.position === position) {
          if (topOrBottom === "top") {
            this.el.style.marginTop = "20px";
          } else {
            this.el.style.marginBottom = "20px";
          }
        }
      });

      this.container.style[topOrBottom] = "20px";

      switch (placement) {
        case "center":
          this.container.style.left = "50%";
          this.container.style.transform = "translate(-50%)";
          break;

        case "left":
          this.container.style.left = "20px";
          break;

        case "right":
          this.container.style.right = "20px";
          break;

        default:
          break;
      }
    }

    if (type) {
      this.el.classList.add(`toast--${type}`);
    }

    const deleteId = document.getElementById(this.counter);

    function removeToast() {
      deleteId.classList.add("hidden");
      deleteId.addEventListener("transitionend", () => {
        deleteId.remove();
      });
    }

    clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      removeToast();
    }, 5000);
  },
};

successBtn.addEventListener("click", () => {
  Toast.show(`error toast`, "success", "top-center");
});
