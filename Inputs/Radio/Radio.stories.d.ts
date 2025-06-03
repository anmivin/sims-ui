export declare const ActionsData: {
    options: ({
        label: string;
        value: number;
        disabled?: undefined;
    } | {
        label: string;
        value: number;
        disabled: boolean;
    })[];
};
declare const meta: {
    component: <T>(props: import('./Radio.types').RadioGroupProps<T>) => import("react/jsx-runtime").JSX.Element;
    title: string;
    argTypes: {
        variant: {
            options: string[];
            control: {
                type: "radio";
            };
        };
    };
    args: {
        options: ({
            label: string;
            value: number;
            disabled?: undefined;
        } | {
            label: string;
            value: number;
            disabled: boolean;
        })[];
    };
};
export default meta;
