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
    this.shellSdk.on(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, () => {
      this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, {
        output: null
      });
    });
  }
  canContinue() {
    this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.CAN_CONTINUE, true);
  }
  eId(id) {
    return document.getElementById(id);
  }
}

// Entry point to app
App.init();
