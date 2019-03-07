export enum Interaction {
  ACTIVE = 'active',
  FOCUSED = 'focused',
}

export enum State {
  CHECKED = 'checked',
  SELECTED = 'selected',
  DISABLED = 'disabled',
}

export namespace Interaction {
  export function parse(interaction: string): Interaction | undefined {
    return Interaction[interaction.toUpperCase()];
  }
}

export namespace State {
  export function parse(state: string): State | undefined {
    return State[state.toUpperCase()];
  }
}

export type ThemeType = any;
export type StyleType = any;
export type ThemedStyleType = any;
export type StyleSheetType = any;

export interface ModalComponentCloseProps {
  [key: string]: any;
  onRequestClose: () => void;
}
