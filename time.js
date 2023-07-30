let instance;

var Singleton = function(){
  if(!instance) {
    instance = {}
    return instance
  }
 return instance
};
var obj1 = new Singleton();
var obj2 = new Singleton();
console.log( obj1 === obj2); // => true
console.log( obj1.test = 1);
console.log( obj2.test); // => 1
