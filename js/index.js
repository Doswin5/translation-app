// DOM SELECTIONS
const fromText = document.querySelector('.text-from')
const toText = document.querySelector('.text-to')
const exchangeIcon = document.querySelector('.fa-exchange-alt')
const selectTag = document.querySelectorAll('select')
const translateBtn = document.querySelector('.translateBtn')
const icons = document.querySelectorAll('.translate i')

// LOOPING THROUGH THE SELECT_TAG ARRAY
selectTag.forEach((tag, index) => {
  // LOOPING THROUGH THE COUNTRY CODES ARRAY
  for (const country_code in countries) {
    // SELECTING ENGLISH BY DEFAULT AS FROM LANGUAGE AND HINDI AS TO LANGUAGE
    let selected
    if(index == 0 && country_code == 'en-GB') {
      selected = 'selected'
    } else if (index == 1 && country_code == 'hi-IN') {
      selected = 'selected'
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
    // ADDING OPTION INSIDE SELECT_TAG
    tag.insertAdjacentHTML('beforeend', option)
  }
})

icons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    if(e.target.classList.contains("fa-copy")) {
      if(e.target.id == 'from') {
        navigator.clipboard.writeText(fromText.value)
        alert('Copied!')
      } else {
        navigator.clipboard.writeText(toText.value)
        alert('Copied!')
      }
    } else {
      let utterance
      if (e.target.id == 'from') {
        utterance = new SpeechSynthesisUtterance(fromText.value)
        utterance.lang = selectTag[0].value
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value)
        utterance.lang = selectTag[1].value
      }
      speechSynthesis.speak(utterance)
    }
  })
})

exchangeIcon.addEventListener('click', () => {
  let tempText = fromText.value
  let tempLang = selectTag[0].value
  fromText.value = toText.value
  selectTag[0].value = selectTag[1].value
  toText.value = tempText
  selectTag[1].value = tempLang
})

translateBtn.addEventListener('click', () => {
  console.log("Button Clicked");
  let text = fromText.value
  let translateFrom = selectTag[0].value
  let translateTo = selectTag[1].value
  if(!text){
    return;
  }
  toText.setAttribute('placeholder', 'Translating...')
  
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {console.log(data)
    toText.value = data.responseData.translatedText
    toText.setAttribute('placeholder', 'Translating...')
  })
})