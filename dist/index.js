"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCallback(variable) {
    return variable && typeof variable === 'function';
}
function waitForItCb(selector, callback, timeout) {
    const observer = new MutationObserver(records => {
        for (const record of records) {
            const { addedNodes } = record;
            if (!addedNodes || addedNodes.length === 0)
                continue;
            for (const node of Array.from(addedNodes)) {
                const parent = node.parentElement;
                if (!parent)
                    continue;
                if (!parent.querySelector(selector))
                    continue;
                callback(node);
            }
        }
    });
    observer.observe(document.body, { childList: true, attributes: true, subtree: true });
    if (timeout) {
        setTimeout(() => {
            observer.disconnect();
            callback(null, new Error('Timeout'));
        }, timeout);
    }
    const remove = () => observer.disconnect();
    return remove;
}
function waitForItPromise(selector, timeout) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(records => {
            for (const record of records) {
                const { addedNodes } = record;
                if (!addedNodes || addedNodes.length === 0)
                    continue;
                for (const node of Array.from(addedNodes)) {
                    const parent = node.parentElement;
                    if (!parent)
                        continue;
                    if (!parent.querySelector(selector))
                        continue;
                    resolve(node);
                }
            }
        });
        observer.observe(document.body, { childList: true, attributes: true, subtree: true });
        if (timeout) {
            setTimeout(() => {
                observer.disconnect();
                reject();
            }, timeout);
        }
    });
}
function waitForIt(selector, callback, timeout) {
    if (isCallback(callback))
        return waitForItCb(selector, callback, timeout);
    return waitForItPromise(selector, callback);
}
exports.waitForIt = waitForIt;
//# sourceMappingURL=index.js.map