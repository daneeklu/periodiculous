import ko from 'knockout'
import question from './question'


function transitionHide(el, t, after) {
  el.classList.add(t)
  let listener = () => {
    after()
    el.removeEventListener('transitionend', listener)
  }
  el.addEventListener('transitionend', listener)
}


export default function AppViewModel() {
  const self = this
  let cont = document.getElementById('container')
  let menuCont = document.getElementById('menucontainer')
  let wrongMsg = document.getElementById('wrongmessage')
  let correctMsg = document.getElementById('correctmessage')
  let gameInfo = document.getElementById('gameinfo')
  let resultScreen = document.getElementById('resultscreen')

  let baseModel = {
    question: '', //current question text
    answer: '', //current answer
    answers: [], //list of possible answers
    score: 0, //current score
    time: 10, //time left for question
    correctAnswer: '' //correct answer for error message
  }

  for (let k in baseModel) {
    this[k] = ko.observable(baseModel[k])
  }

  let initGame = () => {
    this.time(baseModel.time)
    this.score(baseModel.score)
  }

  this.timeWidth = ko.computed(() => {
    var w = this.time()*10
    return `${w}px` ;
  })
  setInterval(() => {
    this.time(this.time() - 1)
  }, 1000)

  let updateQuestion = () => {
    let q
    if (this.score() < 5) {
      q = question.randomQuestion(9)
    } else {
      q = question.randomQuestion()
    }
    this.question(q.question)
    this.answers(q.answers)
    this.answer(q.answer)
  }

  let resetTransition = function() {
    updateQuestion()
    cont.className = 'tLeft'; // remove tRight & transitioned
    cont.offsetHeight // flush changes
    cont.className = 'transitioned'
    cont.removeEventListener('transitionend', resetTransition)
  }

  this.showMenu = function() {
    menuCont.className = 'transitioned'
    gameinfo.className = 'transitioned tHidden'
    resultScreen.className = 'transitioned tHidden hidden'
    cont.removeEventListener('transitionend', showMenu)
  }

  let showResults = function() {
    cont.classList.add('hidden')
    resultScreen.className = 'transitioned'
    gameinfo.className = 'transitioned tHidden'
    cont.removeEventListener('transitionend', showMenu)
  }

  updateQuestion()

  this.nextQuestion = (answer) => {
    let gameOver = this.time() <= 0

    //Was the answer correct?
    if (this.answer() == answer) {
      this.score(this.score() + 1)
      this.time(this.time() + 3)
      correctMsg.className = 'transitioned'
      setTimeout(() => {
        correctMsg.className = 'transitioned tHidden'
      }, 2000)
    } else {
      this.time(this.time() - 5)
      wrongMsg.className = 'transitioned'
      this.correctAnswer(`Correct answer: ${this.answer()}`)
      setTimeout(() => {
        wrongMsg.className = 'transitioned tHidden'
      }, 2000)
    }

    if (!gameOver) {
      //Next question
      transitionHide(cont, 'tRight', resetTransition)
    } else {
      transitionHide(cont, 'tRight', showResults)
    }

  }

  this.startGame = () => {

    initGame()
    menuCont.className = 'tHidden transitioned'
    //Show the first question
    menuCont.addEventListener('transitionend', () => {
      menuCont.className = 'hidden tHidden transitioned'
      gameinfo.className = 'transitioned'
      resetTransition()
    })
  }

}
