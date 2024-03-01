# `@brincat/vue`

ALPHA. Staged for pre-release.

Package is not for release and currently close-source. This software has no license granted for usage, sharing, merging, modification, publishing or distribution.

You must not install this package unless you have been granted explicit permission by the owner and author.

## Setup

### Development

### Testing

### Production
Builds deployables.

```sh
npx lerna run build --scope=@brincat/vue
```

### Publish
```sh
npm login
# npm whoami

npm publish --access public
# Note: you will be prompted to authenticate before being allowed to publish.
```

## Usage

```vue
<script setup>
  import Foobar, { foo } from '@brincat/vue'

  console.log('Testing ', foo())
</script>

<template>
  <Foobar class="text-2xl" />
</template>
```
