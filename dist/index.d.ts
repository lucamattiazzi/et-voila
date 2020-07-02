declare type Callback = (element?: Node, error?: Error) => any;
declare type Remove = () => void;
export declare function waitForIt(selector: string, callback: Callback, repeatable?: boolean, timeout?: number): Remove;
export declare function waitForItOnce(selector: string, timeout?: number): Promise<Node>;
export {};
