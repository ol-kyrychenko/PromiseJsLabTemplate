// 1: Print " 1 C F" by using callbacks with `addStringWithCallback()`
// 2: Print " 2 C F" by using promises with `addStringWithPromise()`
// 3: Print " 3 C F" by using async/await with `addStringWithPromise()`

function addStringWithCallback (previous, current, callback) {
    setTimeout(() => {
      callback(null, previous + ' ' + current)
    }, Math.floor(Math.random() * 100));
}
  
function addStringWithPromise (previous, current) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(previous + ' ' + current)
      }, Math.floor(Math.random() * 100));
    });
}

// put your code here
