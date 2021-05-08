export interface IActionBarItem {
    id: string;
    name: string;
    iconClass: string;
    shouldDisplayName: boolean;
    controlType: ControlType;
    iconAlignment: Alignment;
    action: any;
    controlAlignment: Alignment;
    shouldBeDisabled?: boolean;
}

export enum ControlType {
    PrimaryButton,
    SecondaryButton,
    SuccessButton,
    OutlineButton,
    BorderLessButton,
    DangerButton
}

export enum Alignment {
    Left,
    Right,
    Center,
    None
}

export enum Action {
    Back,
    Compare,
    Rename,
    Change,
    Next,
    ClearSelection,
    Cancel,
    Group,
    Duplicate,
    CreateAlternate,
    Delete,
    EditConfiguration,
    SaveConfiguration,
    ResetConfiguration,
    NavigateTo,
    NavigateToURL,
    undo,
    SaveAndClose,
    ConfigureGroup,
    ConfigureUnits,
    Save
}

export interface IActionBarItemEventArgs {
    event: any;
    action: Action;
    actionBarItem: IActionBarItem;
    additionalData?: any;
}
