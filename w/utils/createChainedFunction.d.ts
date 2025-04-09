export default function createChainedFunction<Args extends any[], This>(...funcs: Array<(this: This, ...args: Args) => any>): (this: This, ...args: Args) => void;
