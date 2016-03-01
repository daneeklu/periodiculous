import ptable from './ptable'

export default {
  randomQuestion: function (maxIndex) {

    if (!maxIndex || !(maxIndex >= 6)) {
      maxIndex = ptable.length;
    }

    let randomElement = () => {
      return ptable[Math.floor(Math.random() * maxIndex)]
    };

    let e = randomElement();
    let ans = [e.symbol];
    var i = 1;
    while (i < 4) {
      var a = randomElement().symbol;
      if (ans.indexOf(a) < 0) {
        ans.push(a);
        i++;
      }
    }

    //Swap the real answer with one of the others (or not)
    let anspos = Math.floor(Math.random() * 4);
    let temp = ans[0]
    ans[0] = ans[anspos]
    ans[anspos] = temp

    return {
      answer: e.symbol,
      question: e.name,
      answers: ans
    }
  }
}
