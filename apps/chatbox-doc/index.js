import {
  SHELL_EVENTS,
  ShellSdk
} from "/node_modules/fsm-shell/release/fsm-shell-client.es.js";

export class App {
  static init() {
    return new App();
  }
  constructor() {
    this.shellSdk = ShellSdk.init(parent, "*");
    this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.REQUIRE_CONTEXT, {
      clientIdentifier: "chatbox-doc-app",
      clientSecret: "chatbox-doc-app-secret"
    });
    this.eId("canContinueBtn").addEventListener("click", () => {
      this.canContinue();
    });
    this.shellSdk.on(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, () => {
      this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, {
        output: null
      });
    });
    this.simulateChat();
  }
  canContinue() {
    this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.CAN_CONTINUE, true);
  }
  cannotContinue() {
    this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.CAN_CONTINUE, false);
  }
  submitData() {
    this.canContinue();
  }
  eId(id) {
    return document.getElementById(id);
  }
  simulateChat() {
    let chatConvo = [
      {
        type: "user",
        message:
          "Hi, I have questions about the product Billy. Can you help me?"
      },
      {
        type: "agent",
        message: "Hi Joe! Of course, what would you like to know?"
      },
      {
        type: "user",
        message:
          "Will this fit in my space at home?  8 feet height by 3 feet width?  I also want it to match the other product I bought yesterday."
      },
      {
        type: "agent",
        message:
          "Yes, the dimensions of the product are 5 feet height and 2'6\". Colors are matte blue, white, and gray"
      },
      {
        type: "user",
        message: "Great! What can of white is it?"
      },
      {
        type: "agent",
        message: "Flat white.  Do you want any more questions?"
      },
      {
        type: "user",
        message: "No, that's it."
      },
      {
        type: "agent",
        message: "Can I place an order for you?"
      },
      {
        type: "user",
        message: "Yes please."
      },
      {
        type: "agent",
        message: "Do you also want this installed for you?"
      },
      {
        type: "user",
        message: "Yes, that would be very helpful."
      },
      {
        type: "agent",
        message:
          "An order will be placed, please check your email for you confirmation. Is there anything else I can help you with today?"
      },
      {
        type: "user",
        message: "No, thank you! Bye!"
      }
    ];

    var chatBoxE = this.eId("chatbox");
    for (let i = 0; i < chatConvo.length; i++) {
      const chatConvoItem = chatConvo[i];
      setTimeout(() => {
        chatBoxE.prepend(
          this.msgE(chatConvoItem.message, chatConvoItem.type === "agent")
        );
      }, i * 1500);
    }
  }
  msgE(msg, isAgent) {
    const msgLastE = document.createElement("div");
    msgLastE.className = "message last";
    msgLastE.innerText = msg;
    const msgContainerE = document.createElement("div");
    if (isAgent) {
      msgContainerE.className = "yours messages";
    } else {
      msgContainerE.className = "mine messages";
    }
    msgContainerE.appendChild(msgLastE);
    return msgContainerE;
  }
}

// Entry point to app
App.init();
