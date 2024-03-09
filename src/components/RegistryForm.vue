<template>
  <form
    action="#"
    class="form"
    @submit.prevent="sendForm"
    :class="{
      loading: isLoading
    }"
  >
    <the-preloader v-if="isLoading"></the-preloader>
    <div class="form__inputs">
      <custom-input
        v-for="input in inputsDataList"
        :key="input.id"
        :label="input.label"
        :name="input.name"
        :error-text="input.errorText"
        :helper-text="input.helperText"
        v-model="formObj[input.model]"
        class="form__input"
        :required="input.required"
        :type="input.type"
        :is-error="!!errorArray[input.name]"
      ></custom-input>
    </div>
    <div class="form__position-selector position-selector">
      <div class="position-selector__label">Select your position</div>
      <div class="position-selector__items">
        <radio-button
          v-for="position in positionsStore.positionsList"
          :key="position.id"
          :label="position.name"
          :id="position.id"
          v-model="formObj.position_id"
        ></radio-button>
      </div>
    </div>
    <div class="form__photo-loader photo-loader">
      <label class="photo-loader__button">
        Upload
        <input type="file" accept=".jpg, .jpeg" class="photo-loader__input" @change="changePhoto" />
      </label>
      <div class="photo-loader__label">
        <span class="photo-loader__text-label">{{ photoAreaLabel }}</span>
      </div>
    </div>
    <simple-button class="form__button" :disabled="!isFormReadyToSubmit">Sign up</simple-button>
  </form>
</template>

<script setup>
import CustomInput from '@/components/UI/CustomInput.vue'
import RadioButton from '@/components/UI/RadioButton.vue'
import SimpleButton from '@/components/UI/SimpleButton.vue'
import ThePreloader from '@/components/ThePreloader.vue'
import { isValidEmail, isValidPhonePart } from '@/helpers/helpers'
import { usePositionsStore } from '@/stores/positions'
import { useUsersStore } from '@/stores/users'
import { computed, onBeforeMount, ref } from 'vue'
import { inputsDataList } from '@/data/data'

const emit = defineEmits(['success'])

// Add stores
const usersStore = useUsersStore()
const positionsStore = usePositionsStore()

// Form areas state
const formObj = ref({
  name: null,
  email: null,
  phone: null,
  position_id: null,
  photo: null
})

const isLoading = ref(false)

const errorArray = ref([])

const photoAreaLabel = computed(() =>
  formObj.value.photo ? formObj.value.photo.name : 'Upload your photo'
)

function changePhoto(e) {
  formObj.value.photo = e.target.files[0] ? e.target.files[0] : null
}

const isFormReadyToSubmit = computed(() => {
  let result = true
  for (let key in formObj.value) {
    if (!formObj.value[key]) result = false
  }

  return result && isValidEmail(formObj.value.email) && isValidPhonePart(formObj.value.phone)
})

function sendForm() {
  isLoading.value = true

  // Create new FormData
  const formData = new FormData()

  // Fill FormData
  for (const key in formObj.value) {
    formData.append(key, formObj.value[key])
  }

  usersStore
    .addNewUser(formData)
    .then(() => {
      emit('success')
      usersStore.loadUsersData(1)
    })
    .catch((error) => {
      errorArray.value = error
    })
    .finally(() => (isLoading.value = false))
}

onBeforeMount(() => {
  positionsStore.loadPositionsList()
})
</script>

<style lang="scss" scoped>
.form {
  max-width: 380px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s;
  position: relative;
  &.loading {
    opacity: 0.5;
    pointer-events: none;
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 50px;
    &:not(:last-child) {
      margin-bottom: 43px;
    }
  }
  &__input {
  }
  &__position-selector {
    &:not(:last-child) {
      margin-bottom: 47px;
    }
  }
  &__photo-loader {
    &:not(:last-child) {
      margin-bottom: 50px;
    }
  }
  &__button {
    align-self: center;
  }
}
.position-selector {
  &__label {
    &:not(:last-child) {
      margin-bottom: 11px;
    }
  }
  &__items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
  }
}
.photo-loader {
  display: flex;
  &__button {
    position: relative;
    cursor: pointer;
    padding: 14px 15px;
    border-radius: 4px 0 0 4px;
    border: 1px solid var(--color-text);
    flex: 0 0 auto;
  }
  &__input {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
  }
  &__label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border: 1px solid #d0cfcf;
    border-left: none;
    border-radius: 0 4px 4px 0;
    color: #7e7e7e;
    overflow: hidden;
  }
  &__text-label {
    display: block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
