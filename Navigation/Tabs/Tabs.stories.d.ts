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
    component: import('../../../node_modules/react').ForwardRefExoticComponent<import('./Tabs.types').TabsProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    title: string;
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
    argTypes: {
        variant: {
            options: string[];
            control: {
                type: "radio";
            };
        };
    };
};
export default meta;
