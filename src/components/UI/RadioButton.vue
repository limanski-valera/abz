<template>
  <div class="item">
    <input type="radio" class="item__input" :id="id" :value="id" v-model="model" />
    <label :for="id" class="item__label"><span class="item__circle"></span>{{ label }}</label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: Number || String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped>
.item {
  &__input {
    display: none;
    &:checked + .item__label .item__circle {
      border-color: var(--color-secondary);
      &::before {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  &__circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: relative;
    border: 1px solid #d0cfcf;
    transition: border-color 0.3s;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.3s;
      background-color: var(--color-secondary);
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
  &__label {
    cursor: pointer;
    display: flex;
    gap: 12px;
    align-items: center;
  }
}
</style>
