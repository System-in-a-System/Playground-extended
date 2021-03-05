var turn = true; //true means X turn
var squares = [];

function reset(A,B,C){
 document.getElementById('A'+A).style.color="white";
 document.getElementById('A'+B).style.color="white";
 document.getElementById('A'+C).style.color="white";

 setTimeout(function(){location.reload()},2000);
}

function checkWinner(){
 for (var i=1; i<=9; i++) {
  squares[i] = document.getElementById('A'+i).innerHTML;
 }

// load audio files

let win = new Audio();

win.src = "sounds/winning.mp3";


 // check horizontal
 if (squares[1]==squares[2] && squares[2]==squares[3] && squares[1]!=""){
  alert('player ' + squares[1] +' Wins the game');
  win.play();
  reset(1,2,3);
 }
 if (squares[4]==squares[5] && squares[5]==squares[6] && squares[4]!=""){
  alert('player ' + squares[4] +' Wins the game');
  win.play();
  reset(4,5,6);
 }
 if (squares[7]==squares[8] && squares[8]==squares[9] && squares[7]!=""){
  alert('player ' + squares[7] +' Wins the game');
  win.play();
  reset(7,8,9);
 }

 //check vertical
 if (squares[1]==squares[4] && squares[4]==squares[7] && squares[1]!=""){
  alert('player ' + squares[1] +' Wins the game');
  win.play();
  reset(1,4,7);
 }
 if (squares[2]==squares[5] && squares[5]==squares[8] && squares[2]!=""){
  alert('player ' + squares[2] +' Wins the game');
  win.play();
  reset(2,5,8);
 }
 if (squares[3]==squares[6] && squares[6]==squares[9] && squares[3]!=""){
  alert('player ' + squares[3] +' Wins the game');
  win.play();
  reset(3,6,9);
 }

 //check diagonal
 if (squares[1]==squares[5] && squares[5]==squares[9] && squares[1]!=""){
  alert('player ' + squares[1] +' Wins the game');
  win.play();
  reset(1,5,9);
 }
 if (squares[3]==squares[5] && squares[5]==squares[7] && squares[3]!=""){
  alert('player ' + squares[3] +' Wins the game');
  win.play();
  reset(3,5,7);
 }

}

function insert(id){
 var S = document.getElementById(id);
 if(turn && S.innerHTML==""){
  S.innerHTML="X";
  turn = !turn;
 }else if(!turn && S.innerHTML==""){
  S.innerHTML="O";
  turn = !turn;
 }
 checkWinner();
}