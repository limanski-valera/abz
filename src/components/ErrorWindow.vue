<template>
  <div class="error">
    {{ error }}
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String || undefined,
    default: 'Error'
  }
})
</script>

<style lang="scss" scoped>
.error {
  padding: 20px;
  display: block;
  max-width: 350px;
  text-align: center;
  color: var(--color-error);
  border: 1px solid var(--color-error);
  background-color: var(--color-background);
  border-radius: 4px;
  margin: 0 auto;
}
</style>
