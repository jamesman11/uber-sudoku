var App = App || {};
App.Position = function Position(row, col){
	this.row = row;
	this.col = col;
};
App.Logics = {
  checkAllValid: function(board){
    var helper = {};
    var visited = [];
    var errorPositions = [];
    var boardRowLength = _.keys(App.board).length;
    if(boardRowLength != App.SUDOKU_LENGTH) return false;
    var boardColLength = App.board[0].length;
    if(boardColLength != App.SUDOKU_LENGTH) return false;
    
    // initiate visited array
    for (var i = 0; i < App.SUDOKU_LENGTH; i++){
    	visited[i] = new Array(App.SUDOKU_LENGTH);
    	for (var m = 0; m < App.SUDOKU_LENGTH; m++){
    		visited[i][m] = false;
    	}
    }
    //check row
    for(var row = 0; row < boardRowLength; row++){
      helper = {};
      for(var col = 0; col < boardColLength; col++){
        var curNum = App.board[row][col];
        if (curNum){
          if (_.has(helper, curNum) && !visited[row][col]) {
          	visited[row][col] = true;
          	errorPositions.push(new App.Position(row, col));
          }else {
          	helper[curNum] = 1;
          }
        }
      }
    }
    //check col
    for(var col=0;col<boardColLength;col++){
      helper = {};
      for(var row=0;row<boardRowLength;row++){
        var curNum = App.board[row][col];
        if (curNum){
          if (_.has(helper, curNum) && !visited[row][col]) {
          	visited[row][col] = true;
          	errorPositions.push(new App.Position(row, col));
          }else {
          	helper[curNum] = 1;
          }
        }
      }
    }
    //check 3*3 grid
    for(var row = 0; row < boardRowLength; row += App.SUB_SUDOKU_LENGTH) {
      for(var col = 0; col < boardColLength; col += App.SUB_SUDOKU_LENGTH) {
        helper = {};
        for(var subRow = 0; subRow < 3; ++subRow) {
          for(var subCol = 0; subCol < 3; ++subCol) {
            var curNum = App.board[row + subRow][col + subCol];
            if (curNum){
              if (_.has(helper, curNum) && !visited[row + subRow][col + subCol]) {
              	visited[row][col] = true;
              	errorPositions.push(new App.Position(row + subRow, col + subCol));
              }else {
              	helper[curNum] = 1;
              }
            }
          }
        }
      }
    }
    return errorPositions;
  },
  
  checkCurrentRowColValid: function(row, col, value){
  	for ( var r = 0; r < App.SUDOKU_LENGTH; r++){
  		if (r != row && App.board[r][col] == value) return false;
  	}
  	for ( var c = 0; c < App.SUDOKU_LENGTH; c++){
  		if (c != col && App.board[row][c] == value) return false;
  	}
  	return true;
  }
};
