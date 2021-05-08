import {
  IActionBarItem,
  ControlType,
  Alignment,
  Action,
  IActionBarItemEventArgs,
} from "../interfaces/action-bar-item.interface";

export namespace ActionBarHelper {
  export function adminActionBarItems() {
    const actionBarItems = [
      {
        id: "1",
        name: "Delete",
        iconClass: "icon icon-icons-medium-delete",
        controlType: ControlType.DangerButton,
        shouldDisplayName: true,
        controlAlignment: Alignment.Right,
        iconAlignment: Alignment.Center,
        action: {
          click: Action.Delete,
        },
      },
    ];
    return actionBarItems;
  }
}
