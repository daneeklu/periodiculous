import ko from 'knockout'
import question from './question'

export default function AppViewModel() {
  const self = this
  let cont = document.getElementById('container')
  cont.classList.remove('tLeft')

  let baseModel = {
    question: '',
    answer: '',
    answers: [],
    score: 0,
    time: 30
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

    container.classList.add('tRight')
    container.addEventListener('transitionend', resetTransition)
  }
}
