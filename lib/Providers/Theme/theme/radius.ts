export enum RadiusKeys {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export type Radius = Record<keyof typeof RadiusKeys, string>;

export const radius: Radius = {
  [RadiusKeys.sm]: '4px',
  [RadiusKeys.md]: '6px',
  [RadiusKeys.lg]: '8px',
};
