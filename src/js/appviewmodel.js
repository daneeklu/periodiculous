import ko from 'knockout'
import question from './question'

export default function AppViewModel() {
  const self = this
  let cont = document.getElementById('container')

  let baseModel = {
    question: '', //current question text
    answer: '', //current answer
    answers: [], //list of possible answers
    score: 0, //current score
    time: 30 //time left for question
  }

  for (let k in baseModel) {
    this[k] = ko.observable(baseModel[k])
  }

  this.timeWidth = ko.computed(() => {
    var w = this.time()*10
    return `${w}px` ;
  })
  setInterval(() => {
    this.time(this.time() - 1)
  }, 1000)

  let updateQuestion = () => {
    let q = question.randomQuestion()
    this.question(q.question)
    this.answers(q.answers)
    this.answer(q.answer)
    this.time(30)
  }

  let resetTransition = function() {
    updateQuestion()
    cont.className = 'tLeft'; // remove tRight & transitioned
    cont.offsetHeight // flush changes
    cont.className = 'transitioned'
    cont.removeEventListener('transitionend', resetTransition)
  }

  updateQuestion()

  this.nextQuestion = (answer) => {
    if (this.answer() == answer) {
      this.score(this.score()+this.time())
    }

    cont.classList.add('tRight')
    cont.addEventListener('transitionend', resetTransition)
  }

  this.startGame = () => {
    let menuCont = document.getElementById('menucontainer')
    menuCont.className = 'tHidden transitioned'
    //Show the first question
    menuCont.addEventListener('transitionend', () => {
      menuCont.className = 'hidden'
      cont.classList.remove('tLeft')
    })
  }

}
