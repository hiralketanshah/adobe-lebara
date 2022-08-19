var getUrlParameters = function () {
  var parameters = {};
  var pageUrl = decodeURIComponent(window.location.search.substring(1));
  if (pageUrl.length > 0) {
    var urlVariables = pageUrl.split("&");
    urlVariables.forEach(function (item) {
      item = item.split("=");
      var propName = item[0];
      var propVal = item[1];
      parameters[propName] = propVal;
    });
    return parameters;
  }
};

var getChatSubWindowStatus = function () {
  var hideChat = false;
  var params = getUrlParameters();

  if (params !== undefined) {
    hideChat = params["chatbot"] === "true" ? true : false;
  }
  return hideChat;
};

var chatForceMinimise = getChatSubWindowStatus();

if (chatForceMinimise) {
  localStorage.setItem("liveChatIsMinimized", "");
}
var chatIsMinimized = localStorage.hasOwnProperty("liveChatIsMinimized");

function hideChatBubble() {
  var bubbleChat = document.getElementById('bubble-chat-btn');

  bubbleChat.classList.add("hidden");
  bubbleChat.classList.remove("active");
}

function activateChat() {
  localStorage.removeItem("liveChatIsMinimized");
  chatIsMinimized = false;
  hideChatBubble();
  var omniWidget = document.querySelector("#Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window.web_chat_panel");
  omniWidget.style.display = 'block';
}

function startChat() {
  Microsoft.Omnichannel.LiveChatWidget.SDK.setContextProvider(contextProvider);
  Microsoft.Omnichannel.LiveChatWidget.SDK.startChat();
}

function contextProvider() {
  return {
    Site: { value: "en-nl", isDisplayable: true },
  };
}

function isChatStarted() {
  return localStorage.getItem("isChatStarted") === "true";
}

window.addEventListener("lcw:onMinimize", function handleWidgetMinimizeEvent() {
  if (isChatStarted()) {
    document.getElementById('bubble-chat-btn').classList.remove('hidden');
    chatIsMinimized = true;
    localStorage.setItem("liveChatIsMinimized", "");
  }
});

window.addEventListener("lcw:ready", function handleLivechatReadyEvent() {
  var omniWidget = document.querySelector("#Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window.web_chat_panel");
  omniWidget.style.display = 'none';

  window.isChatLoaded = true;
  if (isChatStarted()) {
    var chat = document.getElementById('bubble-chat-btn');
    chat.classList.add("active");
    chat.classList.remove("hidden");
  }
});

window.addEventListener("lcw:startChat", function handleLivechatStartedEvent() {
  activateChat();
});

window.addEventListener(
  "lcw:chatRetrieved",
  function handleLivechatRetrievedEvent() {
    if (chatIsMinimized) {
      document.getElementById('bubble-chat-btn').classList.remove('hidden');
    } else {
      activateChat();
    }
  }
);

window.addEventListener(
  "lcw:error",
  function handleLivechatErrorEvent(errorEvent) {
    console.error(errorEvent);
  }
);

window.addEventListener("lcw:onMessageReceived", function (payload) {
    document.getElementById('bubble-chat-btn').classList.add('active');

  var message = "New message has received!";
  

  var globalAlert = document.createElement('div');
  globalAlert.classList.add('global-alerts');
  globalAlert.setAttribute('id', 'global-alert');

  var alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = message;

  var btn = document.createElement('button');
  btn.classList.add('close');
  btn.setAttribute('aria-hidden', 'true');
  btn.setAttribute('data-dismiss', 'alert');
  btn.setAttribute('type', 'button');
  btn.innerHTML = '&times';

  alert.appendChild(btn);
  globalAlert.appendChild(alert);
  document.body.appendChild(globalAlert);
  
  window.setTimeout(function () { 
    document.getElementById('global-alert').remove();
  }, 3100)
});

function switchWidgetBtnStatus(status) {
  localStorage.setItem("isChatStarted", status);
}

window.addEventListener(
  "lcw:chatQueued",
  function handleLivechatStartedEvent() {
    switchWidgetBtnStatus(true);
  }
);

window.addEventListener("lcw:onClose", function handleLivechatClosedEvent() {
  switchWidgetBtnStatus(false);
});


document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('bubble-chat-btn').onclick = function () {
    if (chatIsMinimized) {
      startChat();
    } else if (
      document.querySelector("#Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window.web_chat_panel").length
    ) {
      activateChat();
    }
  };
});
