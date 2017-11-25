export default class Project {
  constructor(id, title, total, activationRule, completeAction) {
    this.id = id;
    this.title = title;
    this.total = total;
    this.rules = activationRule;
    this.completeAction = completeAction;
  }

  isActive(state) {
    return this.rules ? this.rules.call(this, state) : true;
  }
  complete() {
    return this.completeAction ? this.completeAction.call(this) : false;
  }
}
