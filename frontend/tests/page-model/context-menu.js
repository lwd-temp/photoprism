import { Selector, t } from "testcafe";

export default class Page {
  constructor() {}

  //open context menu -- context menu
  async openContextMenu() {
    if (!(await Selector(".action-clear").visible)) {
      await t.click(Selector("button.action-menu"));
    }
  }

  //check context menu count -- context menu
  async checkContextMenuCount(count) {
    const Count = await Selector("span.count-clipboard", { timeout: 5000 });
    await t.expect(Count.textContent).eql(count);
  }

  //check context menu action availability (all)
  //TODO Use foreach
  async checkContextMenuActionAvailability(action, visible) {
    await this.openContextMenu();
    if (visible) {
      await t.expect(Selector("#t-clipboard button.action-" + action).visible).ok();
    } else {
      await t.expect(Selector("#t-clipboard button.action-" + action).visible).notOk();
    }
  }

  //trigger context menu action (edit/delete/share/archive/restore.....)
  async triggerContextMenuAction(action, albumName, albumType) {
    await this.openContextMenu();
    await t.click(Selector("#t-clipboard button.action-" + action));
    if (action === "delete") {
      await t.click(Selector("button.action-confirm"));
    }
    if ((action === "album") | (action === "clone")) {
      await t.typeText(Selector(".input-album input"), name, { replace: true }).pressKey("enter");
    }
  }

  //clear selection -- context menu
  async clearSelection() {
    await this.openContextMenu();
    await t.click(Selector(".action-clear"));
  }
}
