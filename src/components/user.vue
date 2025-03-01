<script lang="ts" setup>
import { useUser } from '../composables'

const { user } = useUser()
console.log('user', user.value)
</script>

<template>
  <Label v-if="user">
    {{ user.name }}
  </Label>
</template>