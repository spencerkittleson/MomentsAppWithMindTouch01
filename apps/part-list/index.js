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
      clientIdentifier: "part-list-app",
      clientSecret: "part-list-app-secret"
    });
    this.shellSdk.on(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, () => {
      this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.ON_CONTINUE, {
        output: null
      });
    });
    this.eName("requirePart").forEach(ele =>
      ele.addEventListener("change", () => {
        this.allChecked();
      })
    );
  }
  allChecked() {
    var checkBoxes = Array.from(this.eName("requirePart"));
    var allComplete = true;
    for (let i = 0; i < checkBoxes.length; i++) {
      const checkBox = checkBoxes[i];
      if (!checkBox.checked) {
        allComplete = false;
        break;
      }
    }
    this.shellSdk.emit(SHELL_EVENTS.Version1.FLOWS.CAN_CONTINUE, allComplete);
  }
  eId(id) {
    return document.getElementById(id);
  }
  eName(name) {
    return Array.from(document.getElementsByName(name));
  }
  eSelector(selector) {
    return document.querySelector(selector);
  }
}

// Entry point to app
App.init();
