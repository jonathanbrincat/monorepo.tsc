# `@brincat/core`

ALPHA. Staged for pre-release.

Package is not for release and currently close-source. This software has no license granted for usage, sharing, merging, modification, publishing or distribution.

You must not install this package unless you have been granted explicit permission by the owner and author.

## Setup

### Development

### Testing

### Production
Builds deployables.

```sh
npx lerna run build --scope=@brincat/core
```

### Publish
```sh
npm publish
```

## Usage

```typescript
import CountdownTimer from '@brincat/core'

const countdownTimer = new CountdownTimer(36000000, (newTick: number) => {console.log('tick-tock :: ', newTick)})
```
