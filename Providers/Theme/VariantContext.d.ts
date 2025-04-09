import { ThemeName } from './theme.types';
import * as React from "react";
interface VariantContextProps {
    currentVariant: ThemeName;
    changeVariant: (variant: ThemeName) => void;
}
export declare const VariantContext: React.Context<VariantContextProps>;
declare const SimsVariantProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export default SimsVariantProvider;
