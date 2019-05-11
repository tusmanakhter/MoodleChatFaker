function autoExpandTextArea() {
    if (event.target.clientHeight < event.target.scrollHeight && event.target.rows < 5) {
      const chat = document.querySelector("#chat-bubble-area");
      chatHeight = parseInt(window.getComputedStyle(chat).height);
      chatHeight -= 20;
      chat.style.height = chatHeight;
      event.target.rows += 1
    }
}

function displayName() {
  const name = document.getElementById("nameInput").value;
  document.getElementById("name").innerHTML = name;
}

function addMessage(type) {
  if (type == "sent") {
    var className = "chat-bubble-right"
  } else if (type == "recieved") {
    var className = "chat-bubble-left"
  }

  const message = document.getElementById("message").value;
  let time = document.getElementById("time").value;
  time = new moment(time, "HH:mm")
  time = time.format("h:mm A")

  document.getElementById("chat-bubble-area").insertAdjacentHTML('beforeend',
    '<div class="chat-bubble-container">\
      <div class="' + className + '">\
        <p class="chat">'
          + message +
        '</p> <span class="time">' + time + '</span>\
      </div>\
    </div>'
  )
}

function addDateDivider() {
  let date = document.getElementById("date").value;
  date = new moment(date);
  date = date.format("dddd, D MMMM YYYY");

  document.getElementById("chat-bubble-area").insertAdjacentHTML('beforeend',
    '<div class="date">' + date + '</div>'
  )
}
