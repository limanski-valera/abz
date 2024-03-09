import { API_POSITIONS_URL } from '@/helpers/helpers'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGeneralStore } from './general'

export const usePositionsStore = defineStore('positions', () => {
  const positionsList = ref([])

  const generalStore = useGeneralStore()

  function loadPositionsList() {
    generalStore.startLoading()

    axios
      .get(API_POSITIONS_URL)
      .then((response) => {
        if (response.status === 200) {
          positionsList.value = response.data.positions
        }
      })
      .catch((error) => {
        generalStore.throwErrorMessage(error.response.message)
      })
      .finally(() => {
        generalStore.endLoading()
      })
  }
  return { positionsList, loadPositionsList }
})
