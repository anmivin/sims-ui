import { ThemeName } from "./theme.types";
import * as React from "react";

interface VariantContextProps {
  currentVariant: ThemeName;
  changeVariant: (variant: ThemeName) => void;
}

export const VariantContext = React.createContext({} as VariantContextProps);
const SimsVariantProvider = ({ children }: { children: React.ReactNode }) => {
  const [variant, setVariant] = React.useState(ThemeName.modern);
  return (
    <VariantContext.Provider value={{ currentVariant: variant, changeVariant: setVariant }}>
      {children}
    </VariantContext.Provider>
  );
};
export default SimsVariantProvider;
