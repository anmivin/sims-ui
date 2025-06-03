export declare const ActionsData: {
    options: {
        id: string;
        label: string;
    }[];
};
declare const meta: {
    component: <Value extends import('./Autocomplete.types').ValueType>(props: import('./Autocomplete.types').AutocompleteProps<Value>) => import("react/jsx-runtime").JSX.Element;
    title: string;
    argTypes: {
        variant: {
            options: string[];
            control: {
                type: "radio";
            };
        };
        noOptionsText: {
            control: "text";
        };
    };
    args: {
        options: {
            id: string;
            label: string;
        }[];
    };
};
export default meta;
