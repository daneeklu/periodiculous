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

//Listen to an event only once
function listenOnce(el, t, callback) {

  let hideListener = function (e) {
		e.target.removeEventListener(e.type, hideListener);
    return callback(e)
  }
  el.addEventListener(t, hideListener)

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

  this.visibleMenu = ko.observable(true)
  this.visibleResult = ko.observable(false)
  this.visibleGameInfo = ko.observable(false)
  this.visibleCorrect = ko.observable(false)
  this.visibleWrong = ko.observable(false)

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

  this.showMenu = () => {
    this.visibleResult(false)
    this.visibleMenu(true)
    this.visibleGameInfo(false)
  }

  let showResults = () => {
    cont.classList.add('hidden')
    this.visibleResult(true)
    this.visibleGameInfo(false)
  }

  updateQuestion()

  this.nextQuestion = (answer) => {
    let gameOver = this.time() <= 0

    //Was the answer correct?
    if (this.answer() == answer) {
      this.score(this.score() + 1)
      this.time(this.time() + 3)

      this.visibleCorrect(true)
      setTimeout(() => {
        this.visibleCorrect(false)
      }, 2000)

    } else {
      this.time(this.time() - 5)
      this.correctAnswer(`Correct answer: ${this.answer()}`)

      this.visibleWrong(true)
      setTimeout(() => {
        this.visibleWrong(false)
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
    this.visibleMenu(false)
    //Show the first question
    listenOnce(menuCont, 'transitionend', () => {
      this.visibleGameInfo(true)
      resetTransition()
    })
  }

}


ko.bindingHandlers.fadeVisible = {
  init: function(e, val) {
    let v = ko.unwrap(val())
    if (!v) {
      e.classList.add('hidden', 'tHidden', 'transitioned')
    }
  },
  update: function(e, val) {
    let v = ko.unwrap(val())
    if (!v ) {
      //Only add the transition listener if the element is not hidden
      if (!e.classList.contains('hidden')) {
        e.classList.add('tHidden', 'transitioned')
        listenOnce(e, 'transitionend', function() {
          e.classList.add('hidden')
        })
      }
    } else {
      e.classList.remove('hidden')
      e.offsetHeight //flush graphical update
      //Wait by turning on opacity until after hidden is removed
      e.classList.remove('tHidden')
    }
  }
}
