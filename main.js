console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

const getAllChars = () => {
  clearCharacters()
  axios.get(`${baseURL}/characters`)
  .then(response => {
    console.log(response.data)
    response.data.map(character => createCharacterCard(character))
  })
  .catch(error => console.log(error))
}

const getOneChar = (evt) => {
  clearCharacters()
  
  axios.get(`${baseURL}/character/${evt.target.id}`) 
    .then(res => createCharacterCard(res.data))
    .catch(err => console.log(err))
}

const getOldChars = (evt) => {
  evt.preventDefault()
  clearCharacters()
  axios.get(`${baseURL}/character?age=${ageInput.value}`)
  .then(res =>res.data.map(oldChar => createCharacterCard(oldChar)))
  .catch(err => console.log(err))
}

const createNewChar = (evt) => {
  evt.preventDefault()
  clearCharacters()

  let newLikes = [...newLikesText.value.split(',')]

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes.value
  
  
  }
axios.post(`${baseURL}/character`, body)
  .then(res => res.data.map(char => createCharacterCard(char)))
  .catch(err => console.log(err))

newFirstInput.value = ''
newLastInput.value = ''
newGenderDropDown.value = ''
newAgeInput.value = ''
newLikesText.value = ''
  
}



function clearCharacters() {
  charContainer.innerHTML = ``
}

getAllBtn.addEventListener('click',getAllChars)

for(let i = 0 ; i < charBtns.length ; i++) {
  charBtns[i].addEventListener('click',getOneChar)
}

ageForm.addEventListener('submit',getOldChars)

createForm.addEventListener('submit',createNewChar)