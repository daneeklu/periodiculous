import ko from 'knockout'
import ut from './util'
import question from './question'




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
  this.visibleQuestion = ko.observable(false)

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

  let resetTransition = () => {
    updateQuestion()
    this.visibleQuestion(true)
  }

  this.showMenu = () => {
    if (this.visibleResult()) {
      this.visibleResult(false)
      ut.listenOnce(resultScreen, 'transitionend', () => {
        this.visibleMenu(true)
      })
    } else {
      this.visibleMenu(true)
      this.visibleGameInfo(false)
    }
  }

  let showResults = () => {
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

    this.visibleQuestion(false)

    if (gameOver) {
      this.visibleGameInfo(false)
      ut.listenOnce(cont, 'transitionend', showResults)
    } else {
      //Next question
      ut.listenOnce(cont, 'transitionend', resetTransition)
    }
  }

  this.startGame = () => {

    initGame()
    this.visibleMenu(false)
    //Show the first question
    ut.listenOnce(menuCont, 'transitionend', () => {
      this.visibleGameInfo(true)
      resetTransition()
    })
  }

}
