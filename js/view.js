var App = App || {};

App.View = {
  // default grid from http://en.wikipedia.org/wiki/File:Sudoku-by-L2G-20050714.svg
  defaultGrid: [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
  ],
  ONE_KEY_CODE: 49,
  NINE_KEY_CODE: 57,

	// initiate a default game, if we want to make a board generator in the future, we just send the array as an argument here
  gameInit: function(){
   	this.renderBoard(this.defaultGrid);
   	this.clickEventBind();
   	this.columnHover();
   	
   	// maintain the count of empty slots for checking win status
   	this.remainSlots = 0;
   	for (var row = 0; row < App.board.length; row++){
   		for (var col = 0; col < App.board[0].length; col++){
   			if (!App.board[row][col]) this.remainSlots++;
   		}
   	}
  },
  
  // restart or rerender the board
  renderBoard: function(board){
  	var $table = _.template($('#table_template').html(), { board: board });
    var $main = $(".sudoku-table.main");
    $main.empty().append($table);
    App.board = $.extend(true, [], board);  	
  },
  
  columnHover: function(){
  	$(".sudoku-column").hover(
  		function(){
  			$(".sudoku-column[row =" + $(this).attr('row') + "]").addClass('hover');
  			$(".sudoku-column[col =" + $(this).attr('col') + "]").addClass('hover');
  		}, function(){
  			$(".sudoku-column[row =" + $(this).attr('row') + "]").removeClass('hover');
  			$(".sudoku-column[col =" + $(this).attr('col') + "]").removeClass('hover');
  		}
  	)
  },
 
 	// mouse click events binding
 	restartBtnHandler: function(){
 		App.View.gameInit();
 	},
 	
 	checkBtnHandler: function(){
 		var errors = App.Logics.checkAllValid();
  	if (_.isEmpty(errors)){
  		alert("Sudoku looks good, please continue");
  	}else{
  		alert("Duplicates found! Please resolve it!");
  	}
 	},
 	
 	columnHandler: function(event){
 			var $target = $(event.currentTarget);
  		var $span = $target.find('span');
  		var row = parseInt($target.attr('row'));
  		var col = parseInt($target.attr('col'));
  		if (!$target.hasClass('default')){ 		
  			var $input = $target.find('input');
  			$span.hide();
  			$input.show().focus();
  			
  			// If there is error in the column, once the user click, we clear the input for the user
  			if ($target.hasClass('error')) $input.val('');
  			$input.keyup(function(event){
  				var keyCode = event.keyCode;
  				if (event.keyCode >= App.View.ONE_KEY_CODE && event.keyCode <= App.View.NINE_KEY_CODE) {
  					var value = $input.val();
  					App.board[row][col] = parseInt(value);
  					App.View.remainSlots--; 					
  					// If there is duplicate, indicate error
  					if (!App.Logics.checkCurrentRowColValid(row, col, parseInt(value))) {
  						$target.addClass('error');
  					}else{
  						$target.removeClass('error');
  					};
  					
  					// If no errors exist and there are no more empty slot, it's a win
  					if (App.View.remainSlots == 0 && $('.error').length == 0){
  						alert('Congratulations! You have solved the sudoku!');
  						App.View.gameInit();
  						return;
  					}
  					$span.text(value);
  					$span.show();
  					$input.hide();
  				}else{
  					App.View.remainSlots++;
  					$input.val('');
  					$target.removeClass('error');
  				}
  			});
  		}
 	},
 	
 	solveBtnHandler: function(){
 		if (App.Logics.solve()){
 			App.View.renderBoard(App.board);
 		}else{
 			alert('No solution for this placement....:(');
 		}
 	},
 	
  clickEventBind: function(){
  	var self = this;
  	var $restart = $('#restart');
  	var $check = $('#check');
  	var $sudokuColumn = $('.sudoku-column');
  	var $solution = $('#solve');
  	$restart.unbind();
  	$check.unbind();
  	$sudokuColumn.unbind();
  	$solution.unbind();
  	$restart.click(self.restartBtnHandler);
  	$check.click(self.checkBtnHandler);
  	$sudokuColumn.click(self.columnHandler);
  	$solution.click(self.solveBtnHandler);
  }
};
