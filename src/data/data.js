export const inputsDataList = [
  {
    id: 1,
    label: 'Your name',
    name: 'name',
    errorText: 'Entry your name',
    helperText: 'example: Ivan',
    model: 'name',
    required: true
  },
  {
    id: 2,
    label: 'Email',
    name: 'email',
    errorText: 'Entry correct email',
    helperText: 'example@gmail.com',
    model: 'email',
    required: true,
    type: 'email'
  },
  {
    id: 3,
    label: 'Phone',
    name: 'phone',
    errorText: '+38 (XXX) XXX XX XX',
    helperText: '+38 (XXX) XXX XX XX',
    model: 'phone',
    required: true,
    type: 'tel'
  }
]
