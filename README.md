uber-sudoku
===========

This is a simple Sudoku game implementation, you can input number and finally establish a valid complete Sudoku.[DEMO](http://jamesman11.github.io/uber-sudoku/)

### Application structure overview:
--
* index.html   
   main html file
* lib  
  javascript libraries that are used
* stylesheets  
  css files
* js  
  all javascript logics here
* images  
  images that will be used

### Library or techniques used
--
1. **jquery**
  * fast, small library that, it basically has everything you need, and it's cross browser
2. **underscore**
  * I used underscore for some programming helpers, also its great template engines
3. **css3 media query**
  * let the presentation of content be tailored to a specific range of output devices without having to change the content itself

### Explanation of this project
--
1. First of all, I did some research on design style on uber.com. I followed the convention of uber design and tried my best to deliver it in a Uber's way. 
2. No board generator has been integrated, if I have time, I will definitely add it. Right now there is only one board. 
3. Basically, once you mouse over a certain grid, the cursor indicate that it's clickable, also I showed a hover effect for all the grid that's in the same row or same column as current mouseover grid. Once you click, an one-digit only text input show up, requesting you to put an valid number. If it's not valid, red border shows. 
4. **Restart Button** will restart the game, **Check Button** will check whether current placement is valid, **Solve Button** will provide you a valid solution.
5. This website is able to automatically scale to browser window's current size, also mobile friendly and cross browser. Tested in IE10, SAFARI, firefox and Chrome.

### Things to improve
--
If I have more time, I will definitely do the following:

1. Most importantly, try to improve the performance and the code itself. 
2. Worked on a board generator that can automatically generate new game every time.
3. Better UI, I won't say as cool as Uber, but a nice UI will always make user happy:)
4. Better sudoku solve algorithm, I'm using a brute-force method, which is very slow, but it works very well.
5. More functionalities, like some tips based on current placements, or allow users to choose different difficulty levels.
