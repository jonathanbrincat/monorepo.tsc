# `@brincat/react`

ALPHA. Staged for pre-release.

Package is not for release and currently close-source. This software has no license granted for usage, sharing, merging, modification, publishing or distribution.

You must not install this package unless you have been granted explicit permission by the owner and author.

## Setup

### Development

### Testing

### Production
Builds deployables.

```sh
npx lerna run build --scope=@brincat/react
```

### Publish
```sh
npm publish
```

## Usage

```javascript
import Foobar, { foo } from '@brincat/react'

export default function() {
  console.log('Testing ', foo())

  return (
    <Foobar class="text-2xl" />
  )
}
```
