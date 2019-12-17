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
      clientIdentifier: "place-order-app",
      clientSecret: "place-order-app-secret"
    });
    this.eId("canContinueBtn").addEventListener("click", () => {
      this.canContinue();
    });
    this.eId("cannotContinueBtn").addEventListener("click", () => {
      this.cannotContinue();
    });
    this.shellSdk.on(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, () => {
      this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, {
        output: null
      });
    });
    this.eId("color").addEventListener("change", (ev) => {
      let el = ev.target;
      this.eId("colorDisplay").innerText = `Color: ${el.options[el.selectedIndex].value}`;
    })
  }
  canContinue() {
    this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.CAN_CONTINUE, true);
  }
  cannotContinue() {
    this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.CAN_CONTINUE, false);
  }
  eId(id) {
    return document.getElementById(id);
  }
}

// Entry point to app
App.init();
