
export default {

  //Listen to an event only once
  listenOnce: function(el, t, callback) {

    let hideListener = function (e) {
  		e.target.removeEventListener(e.type, hideListener);
      return callback(e)
    }
    el.addEventListener(t, hideListener)

  }
}
