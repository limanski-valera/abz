// REGEXP
export const PHONE_REGEXP = /[^0-9\-\+()]/g
const EMAIL_REGEXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

// API ENDPOINTS
export const API_POSITIONS_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
export const API_USERS_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users'
export const API_TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

export const formattedPhoneNumber = (phoneNumber) => {
  let newNumber = phoneNumber.replace(/\D/g, '')
  if (newNumber[0] == 3) {
    newNumber = newNumber.substr(1)
  }
  if (newNumber[0] == 8) {
    newNumber = newNumber.substr(1)
  }

  return newNumber
    ? newNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `+38 ($1) $2 $3 $4`)
    : newNumber
}

export const isValidEmail = (val) => EMAIL_REGEXP.test(val)

export const isValidPhonePart = (val) => !PHONE_REGEXP.test(val)
