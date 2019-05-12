function autoExpandTextArea() {
  if (event.target.clientHeight < event.target.scrollHeight && event.target.rows < 5) {
    const chat = document.querySelector("#chat-bubble-area");
    chatHeight = parseInt(window.getComputedStyle(chat).height);
    chatHeight -= 20;
    chat.style.height = chatHeight;
    event.target.rows += 1;
  }
}

function displayName() {
  const name = document.getElementById("nameInput").value;
  document.getElementById("name").innerHTML = name;
}

function addMessage(type) {
  if (type == "sent") {
    var className = "chat-bubble-right";
  } else if (type == "recieved") {
    var className = "chat-bubble-left";
  }

  let message = document.getElementById("message");
  let time = document.getElementById("time");

  if (message.value == "" || !message.value.replace(/\s/g, '').length) {
    message.setCustomValidity("A valid message is needed.");
    message.reportValidity();
    message.addEventListener('input', function() { removeInvalid(message) }, { once: "true" });
    return false;
  }

  if (time.value == "") {
    time.setCustomValidity("A valid time is needed.");
    time.reportValidity();
    time.addEventListener('input', function() { removeInvalid(time) }, { once: "true" });
    return false;
  }

  message.setCustomValidity("");
  time.setCustomValidity("");

  message = message.value;
  time = new moment(time.value, "HH:mm");
  time = time.format("h:mm A");

  const chatBubbleArea = document.getElementById("chat-bubble-area");
  chatBubbleArea.insertAdjacentHTML('beforeend',
    '<div class="chat-bubble-container">\
      <div class="chat-bubble ' + className + '">\
        <p class="chat">'+ message +
        '</p> <span class="time">' + time + '</span>\
      </div>\
      <div class="edit ' + className + '">\
        <button class="button" onclick="deleteNode(this)"><img src="assets/icons/trash.svg" alt="delete"></button><br />\
        <button class="button" id="edit" onclick="editNode(this)"><img src="assets/icons/pencil.svg" alt="edit"></button>\
        <button class="button" id="save" onclick="saveNode(this)"><img src="assets/icons/check.svg" alt="save"></button>\
      </div>\
    </div>'
  );
  document.getElementById("message").value = "";
  chatBubbleArea.scrollTop = chatBubbleArea.scrollHeight;
}

function removeInvalid(field) {
  field.setCustomValidity("");
}

function addDateDivider() {
  let date = document.getElementById("date");

  if (date.value == "") {
    date.setCustomValidity("A valid date is needed.");
    date.reportValidity();
    date.addEventListener('input', function() { removeInvalid(date) }, { once: "true" });
    return false;
  }

  date = new moment(date.value);
  date = date.format("dddd, D MMMM YYYY");

  const chatBubbleArea = document.getElementById("chat-bubble-area");
  chatBubbleArea.insertAdjacentHTML('beforeend',
    '<div class="date">' + date + 
      '<div class="edit">\
        <button class="button" id="delete" onclick="deleteNode(this)"><img src="assets/icons/trash.svg" alt="delete"></button>\
        <button class="button" id="edit" onclick="editNode(this)"><img src="assets/icons/pencil.svg" alt="edit"></button>\
        <button class="button" id="save" onclick="saveNode(this)"><img src="assets/icons/check.svg" alt="save"></button>\
      </div>\
    </div>'
  );
  chatBubbleArea.scrollTop = chatBubbleArea.scrollHeight;
}

function timeNow() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  if (h < 10)
    h = '0' + h;
  if (m < 10)
    m = '0' + m;
  document.getElementById("time").setCustomValidity("");
  document.getElementById("time").value = h + ':' + m;
}

function deleteNode(button) {
  button.parentNode.parentNode.remove();
}

function editNode(button) {
  var parent = button.parentNode.parentNode.className;
  button.parentNode.parentNode.contentEditable = "true";
  button.style.display = "none";
  if (parent == "date") {
    var display = "inline-block"
  } else if (parent == "chat-bubble-container") {
    var display = "block"
  }
  button.parentNode.style.display = display;
  button.parentNode.querySelector("#save").style.display = display;
}

function saveNode(button) {
  var parent = button.parentNode.parentNode.className;
  button.parentNode.parentNode.contentEditable = "false";
  button.removeAttribute("style");
  button.parentNode.removeAttribute("style");
  button.parentNode.querySelector("#edit").removeAttribute("style");
}

function genImage() {
  var elem = document.getElementById("gen-image");
  if (elem.style.display == "flex") {
    document.getElementById("image").innerHTML = "";
  }

  document.getElementById("gen-image").style.display = "flex";

  // Find distance to scroll to
  var distance = 0;
  do {
      distance += elem.offsetTop;
      elem = elem.offsetParent;
  } while (elem);
  distance = distance < 0 ? 0 : distance;

  html2canvas(document.querySelector("#chat-area"), {scale:1}).then(canvas => {
    var img = canvas.toDataURL("image/png");
    var elem = document.createElement('img');
    elem.setAttribute(
      'src', img
    );
    document.querySelector("#image").appendChild(elem);
    window.scrollTo({
      top: distance,
      behavior: 'smooth'
    });
  });
}