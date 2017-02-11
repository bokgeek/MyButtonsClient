export interface ButtonModel {
    label: string;
    description: string;
    action: string;
    type: ButtonTypes;
    color?: ButtonColors;
}

export type ButtonTypes = 'Link' | 'API' | 'App';

export const enum ButtonColors {
    Blue,
    Red,
    Green,
    Orange
}
