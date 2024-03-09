import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeneralStore = defineStore('general', () => {
  const errorMessage = ref(null)
  const isLoading = ref(false)

  function startLoading() {
    errorMessage.value = null
    isLoading.value = true
  }
  function endLoading() {
    isLoading.value = false
  }
  function setErrorMessage(currentErrorMessage) {
    errorMessage.value = currentErrorMessage ? currentErrorMessage : 'Error'
  }
  function throwErrorMessage(message, messageTime = 2000) {
    setErrorMessage(message)
    setTimeout(() => {
      errorMessage.value = null
    }, messageTime)
  }

  return { errorMessage, isLoading, startLoading, endLoading, throwErrorMessage }
})
