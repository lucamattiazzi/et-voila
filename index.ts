type Callback = (element?: Node, error?: Error) => any
type Remove = () => void

export function waitForIt(selector: string, callback: Callback, timeout?: number): Remove {
  const observer = new MutationObserver(records => {
    for (const record of records) {
      const { addedNodes } = record
      if (!addedNodes || addedNodes.length === 0) continue
      for (const node of Array.from(addedNodes)) {
        const parent = node.parentElement
        if (!parent) continue
        if (!parent.querySelector(selector)) continue
        callback(node)
      }
    }
  })
  observer.observe(document.body, { childList: true, attributes: true, subtree: true })
  if (timeout) {
    setTimeout(() => {
      observer.disconnect()
      callback(null, new Error('Timeout'))
    }, timeout)
  }
  const remove: Remove = () => observer.disconnect()
  return remove
}