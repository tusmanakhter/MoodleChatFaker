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

  let message = document.getElementById("message");
  let time = document.getElementById("time");

  if (message.value == "" || !message.value.replace(/\s/g, '').length) {
    message.setCustomValidity("A valid message is needed.");
    message.reportValidity();
    return false;
  }

  if (time.value == "") {
    time.setCustomValidity("A valid time is needed.");
    time.reportValidity();
    return false;
  }

  message = message.value;
  time = new moment(time.value, "HH:mm")
  time = time.format("h:mm A")

  const chatBubbleArea = document.getElementById("chat-bubble-area");
  chatBubbleArea.insertAdjacentHTML('beforeend',
    '<div class="chat-bubble-container">\
      <div class="chat-bubble ' + className + '">\
        <p class="chat">'
          + message +
        '</p> <span class="time">' + time + '</span>\
      </div>\
    </div>'
  );
  document.getElementById("message").value = "";
  chatBubbleArea.scrollTop = chatBubbleArea.scrollHeight;
}

function addDateDivider() {
  let date = document.getElementById("date");

  if (date.value == "") {
    date.setCustomValidity("A valid date is needed.");
    date.reportValidity();
    return false;
  }

  date = new moment(date.value);
  date = date.format("dddd, D MMMM YYYY");

  const chatBubbleArea = document.getElementById("chat-bubble-area");
  chatBubbleArea.insertAdjacentHTML('beforeend',
    '<div class="date">' + date + '</div>'
  )
  chatBubbleArea.scrollTop = chatBubbleArea.scrollHeight;
}

function timeNow() {
  var d = new Date(),
  h = d.getHours(),
  m = d.getMinutes();
  if (h < 10)
    h = '0' + h;
  if (m < 10)
    m = '0' + m;
  document.getElementById("time").setCustomValidity("");
  document.getElementById("time").value = h + ':' + m;
}