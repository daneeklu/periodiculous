import ptable from './ptable'

export default {
  randomQuestion: function () {
    let e = ptable[Math.floor(Math.random() * ptable.length)]
    return {
      answer: e.letter,
      question: `What is the symbol for ${e.name}?`,
      answers: ['H', 'Pb', 'C', 'P']
    }
  }
}
