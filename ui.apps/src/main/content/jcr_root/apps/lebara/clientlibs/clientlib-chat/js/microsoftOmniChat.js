var deferJquery = function (method) {
  if (window.jQuery) method();
  else
    setTimeout(function () {
      deferJquery(method);
    }, 50);
};

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
  $("#bubble-chat-btn").addClass("hidden").removeClass("active");
}

function activateChat() {
  localStorage.removeItem("liveChatIsMinimized");
  chatIsMinimized = false;
  hideChatBubble();
  $("#Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window.web_chat_panel").css(
    "display",
    "block"
  );
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
    $("#bubble-chat-btn").removeClass("hidden");
    chatIsMinimized = true;
    localStorage.setItem("liveChatIsMinimized", "");
  }
});

window.addEventListener("lcw:ready", function handleLivechatReadyEvent() {
  $("#Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window.web_chat_panel").css(
    "display",
    "none"
  );
  window.isChatLoaded = true;
  if (isChatStarted()) {
    $("#bubble-chat-btn").removeClass("hidden").addClass("active");
  }
});

window.addEventListener("lcw:startChat", function handleLivechatStartedEvent() {
  activateChat();
});

window.addEventListener(
  "lcw:chatRetrieved",
  function handleLivechatRetrievedEvent() {
    if (chatIsMinimized) {
      $("#bubble-chat-btn").removeClass("hidden");
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
  if ($("#bubble-chat-btn").is(":visible")) {
    $("#bubble-chat-btn").addClass("active");

    var message = "New message has received!";
    var alertMessage = $(
      "<div class='global-alerts'>" +
        "<div class='alert'>" +
        message +
        "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>&times;</button>" +
        "</div></div>"
    );

    $("body").append(alertMessage);
    alertMessage.fadeIn(500);
    window.setTimeout(function () {
      alertMessage.fadeOut(500, function () {
        alertMessage.remove();
      });
    }, 1000);
  }
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

deferJquery(function () {
  $(document).ready(function () {
    $("#bubble-chat-btn").on("click", function () {
      if (chatIsMinimized) {
        startChat();
      } else if (
        $("#Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window.web_chat_panel")
          .length
      ) {
        activateChat();
      }
    });
  });
});