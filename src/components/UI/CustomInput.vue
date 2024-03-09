<template>
  <div
    class="input-wrapper"
    :class="{
      error: hasError || isError
    }"
  >
    <input
      :type="type"
      class="input"
      v-model="inputValue"
      :required="required"
      :placeholder="label"
      @blur="onInputBlur"
      @input="onInput"
    />
    <span class="label">{{ label }}</span>
    <div class="text">
      <span class="error" v-if="hasError || isError">{{ errorText }}</span>
      <span class="helper" v-else-if="helperText">{{ helperText }}</span>
    </div>
  </div>
</template>

<script setup>
import { PHONE_REGEXP, isValidEmail, isValidPhonePart } from '@/helpers/helpers'
import { computed, ref } from 'vue'

const props = defineProps({
  label: {
    type: String || undefined,
    default: ''
  },
  name: {
    type: String || undefined,
    required: true
  },
  type: {
    type: String || undefined,
    default: 'text'
  },
  helperText: {
    type: String || undefined,
    default: ''
  },
  errorText: {
    type: String || undefined,
    default: 'Error'
  },
  modelValue: {
    required: true
  },
  required: {
    type: Boolean || undefined,
    default: false
  },
  validateCallback: {
    type: Function
  },
  isError: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const hasError = ref(false)

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    if (props.type === 'tel' && !isValidPhonePart(newVal)) return
    else emit('update:modelValue', newVal)
  }
})

const defaultValidateCallback = (val) => val

function onInputBlur(e) {
  const val = e.target.value
  let result = true
  if (props.validateCallback) {
    result = props.validateCallback(val)
  } else if (props.type === 'email') {
    result = isValidEmail(val)
  } else {
    if (props.required) {
      result = defaultValidateCallback(val)
    }
  }

  hasError.value = !result
}

// If this input for phone-number
function onInput(e) {
  hasError.value = false
  if (props.type === 'tel') {
    e.target.value = e.target.value?.replace(PHONE_REGEXP, '')
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}
.label {
  position: absolute;
  top: 50%;
  left: 16px;
  color: #7e7e7e;
  pointer-events: none;
  transform: translate(0, -50%);
  z-index: 2;
  padding: 0 4px;
  background-color: var(--color-background);
  line-height: 1;
  transition:
    top 0.3s,
    font-size 0.3s;
  .error & {
    color: var(--color-error);
    font-size: 12px;
    top: 0;
  }
}
.input {
  border: 1px solid #d0cfcf;
  padding: 0 16px;
  width: 100%;
  color: var(--color-text);
  height: 54px;
  background-color: transparent;
  border-radius: 4px !important;
  &::placeholder {
    visibility: hidden;
  }
  transition:
    border-color 0.3s,
    border-width 0.3s;
  .error & {
    border-color: var(--color-error);
    border-width: 2px;
  }
  &:focus {
    outline: none;
  }
  &:focus + .label {
    font-size: 12px;
    top: 0;
  }
  &:focus + .label + .text .helper {
    opacity: 1;
  }
  &:not(:placeholder-shown) + .label {
    font-size: 12px;
    top: 0;
  }
}
.error {
  color: var(--color-error);
}
.helper {
  opacity: 0;
  transition: opacity 0.3s;
}
.text {
  position: absolute;
  top: calc(100% + 4px);
  font-size: 12px;
  color: #7e7e7e;
  line-height: 1;
  left: 16px;
}
</style>
