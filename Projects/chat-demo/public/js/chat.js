const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("location", (location) => {
  console.log(location);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // disable
  $messageFormButton.setAttribute("disabled", "disbaled");
  //   const message = document.querySelector("input").value;
  // another way to implements this
  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    //   enable
    $messageFormButton.removeAttribute("disabled", "disbaled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      console.log(error);
    }

    console.log("Message Delivered!");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  $sendLocationButton.setAttribute("disabled", "disbaled");
  navigator.geolocation.getCurrentPosition((postion) => {
    $sendLocationButton.removeAttribute("disabled", "disabled");
    socket.emit(
      "sendLocation",
      {
        latitude: postion.coords.latitude,
        longitude: postion.coords.longitude,
      },
      () => {
        console.log("Location Shared!");
      }
    );
  });
});

// socket.on("countUpdated", (count) => {
//   console.log("Count has been updated!", count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("clicked!");

//   socket.emit("increment");
// });
