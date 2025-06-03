import { TitleVariant, TextVariant } from './Text.types';
export declare const ActionsData: {};
declare const meta: {
    component: import('../../../node_modules/react').ForwardRefExoticComponent<import('./Text.types').TextProps & import('../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
    title: string;
    argTypes: {
        type: {
            options: (TextVariant | TitleVariant)[];
            control: {
                type: "radio";
            };
        };
        variant: {
            options: string[];
            control: {
                type: "radio";
            };
        };
        children: {
            control: "text";
        };
        noWrap: {
            control: {
                type: "check";
            };
        };
    };
    args: {};
};
export default meta;
