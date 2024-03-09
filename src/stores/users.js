import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useGeneralStore } from './general'
import { API_TOKEN_URL, API_USERS_URL } from '@/helpers/helpers'

export const useUsersStore = defineStore('users', () => {
  const usersData = ref(null)

  // Getters
  const getUsersList = computed(() => usersData?.value?.users)
  const getSortedUsersListByUserRegistrationTimestamp = computed(() =>
    getUsersList?.value?.length
      ? getUsersList.value.sort(
          (prevUser, nextUser) => nextUser.registration_timestamp - prevUser.registration_timestamp
        )
      : []
  )
  const isLastPageDownload = computed(() => {
    if (usersData.value?.page) {
      return usersData.value.page === usersData.value.total_pages
    } else return false
  })

  // GeneralStore
  const generalStore = useGeneralStore()

  function loadUsersData(pageCount) {
    generalStore.startLoading()

    let url
    if (pageCount) {
      url = `${API_USERS_URL}?page=${pageCount}&count=6`
    } else {
      url = usersData?.value?.links?.next_url
        ? usersData?.value?.links?.next_url
        : `${API_USERS_URL}?page=1&count=6`
    }
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          usersData.value = response.data
        }
      })
      .catch((error) => {
        generalStore.throwErrorMessage(error.response?.message)
      })
      .finally(() => generalStore.endLoading())
  }

  function addNewUser(formData) {
    generalStore.startLoading()
    return new Promise((resolve, reject) => {
      axios
        .get(API_TOKEN_URL)
        .then((response) => {
          const token = response.data.token
          axios({
            method: 'post',
            url: API_USERS_URL,
            headers: { Token: token },
            data: formData
          })
            .then((res) => {
              resolve(res)
            })
            .catch((error) => {
              generalStore.throwErrorMessage(error.response?.data?.message)
              reject(error.response?.data?.fails ? error.response?.data?.fails : [])
            })
        })
        .catch((error) => {
          generalStore.throwErrorMessage(error.response?.data?.message)
          reject(error)
        })
        .finally(() => {
          generalStore.endLoading()
        })
    })
  }
  return {
    usersData,
    getUsersList,
    loadUsersData,
    isLastPageDownload,
    addNewUser,
    getSortedUsersListByUserRegistrationTimestamp
  }
})
