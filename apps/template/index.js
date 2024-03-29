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
      clientIdentifier: "template-app",
      clientSecret: "template-app-secret"
    });
    this.eId("canContinueBtn").addEventListener("click", () => {
      this.canContinue();
    });
    this.eId("cannotContinueBtn").addEventListener("click", () => {
      this.cannotContinue();
    });
    this.eId("submitData").addEventListener("click", () => {
      this.submitData();
    });
    this.shellSdk.on(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, () => {
      this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, {
        output: [
          {
            name: "textBox01",
            value: this.eId("textBox01").value
          },
          {
            name: "textBox02",
            value: this.eId("textBox02").value
          }
        ]
      });
    });
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
}

// Entry point to app
App.init();
