export declare function getTypeByValue(value: any): any;
declare function requiredInteger(props: any, propName: any, componentName: any, location: any): RangeError | null;
declare function validator(props: any, propName: any, ...other: any[]): RangeError | null;
declare namespace validator {
    var isRequired: typeof requiredInteger;
}
declare const _default: typeof validator;
export default _default;
