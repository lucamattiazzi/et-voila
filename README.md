# Et Voila

This small Typescript package allows you to react to the appearance of a node element that is caught by a specific css selector.
It exports both a callback and a promise based implementation using the same function, simply with overloading.

## Example

This is a simple example:

```
const { waitForIt } = require('et-voila')

const element = document.createElement('span')
element.id = 'appearable-element'

waitForIt('span#appearable-element').then((node) => {
  console.log(node)
  node.remove()
})

document.body.appendChild(element)
// node will be logged, then removed
```

While this is the promise based implementation, there is also a callback one (with the same name).

## API

### waitForIt (promise)

`(selector: string, timeout?: number) => Promise<Node>`

#### selector

Type: `string`

The css selector to identify how to recognize the expected node. When an element that can be identified by this selector appears in the DOM, this promise will resolve with the aforementioned element.

#### timeout

Type: `number` (optional)

Timeout after which the promise will fail and reject. This will also stop the listener.

### waitForIt (callback)

`(selector: string, callback: (Node, Error) => any, timeout?: number) => Remove`

#### selector

Type: `string`

The css selector to identify how to recognize the expected node.

#### callback

Type: `(Node, Error) => any`

When an element that can be identified by this selector appears in the DOM, this callback will be called with the node as first parameter.

#### timeout

Type: `number` (optional)

Timeout after which the promise will fail and reject.

#### Remove

Type: `() => any`

This returned function will stop the listener created and throw an error from within.

## License

MIT © [Yeasteregg](https://yegg.it)
