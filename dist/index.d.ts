declare type Callback = (element?: Node, error?: Error) => any;
declare type Remove = () => void;
export declare function waitForIt(selector: string, timeout?: number): Promise<Node>;
export declare function waitForIt(selector: string, callback: Callback, timeout?: number): Remove;
export {};
