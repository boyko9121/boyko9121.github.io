// //2//////////
// function Square(width, height) {
//   this.getArea = function() {
//     return width * height;
//   }
// }
//
// var square = new Square(100, 200);
//
// console.log(square.getArea());
// ////////////////////////////////////////


////3////////////////////////////////////////
// function Square(width, height) {
//   this.getArea = function() {
//     return width * height;
//   }
// }
//
// function Circle(radius) {
//   Square.apply(this, arguments);
//   var r = radius;
//
//   this.getCircle = function() {
//     return 3.14 * radius * radius;
//   }
//
// }
//
//
// var circle = new Circle(10, 10);
// console.log(circle.getArea());
//
// var circle2 = new Circle(10);
// console.log(circle2.getCircle());
//////////////////////////////////////////
//
// ////4////////////////////////////////////////

function Area() {
  var __figures = [];
  this.__totalRadius = 0;
  this.AddFigure = function(figure, square) {
      this.__totalRadius += parseInt(square);
      __figures.push(figure);
    },
    this.getFigure = function() {
      return __figures;
    },
    this.clear = function() {
      __figures = [];
      this.__totalRadius = 0;
    }
  Object.defineProperty(this, 'size', {
    get: function() {
      return this.__totalRadius;
    }
  });
}

var area = new Area();
area.AddFigure("Circle", 200);
console.log(area.getFigure());
console.log(area.size);
//area.clear();
// ////////////////////////////////////////////
