<template>
  <button class="button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.button {
  padding: 4px 18px;
  background-color: var(--color-primary);
  border-radius: 80px;
  border: none;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  min-width: 100px;
  color: var(--color-text);
  transition:
    color 0.3s,
    background-color 0.3s;
  @media (any-hover: hover) {
    &:hover {
      background-color: var(--color-button-hover);
    }
  }
  &[disabled] {
    background-color: var(--color-button-disabled);
    color: #fff;
    cursor: default;
    pointer-events: none;
  }
  &:active {
    background-color: var(--color-button-hover);
  }
}
</style>
