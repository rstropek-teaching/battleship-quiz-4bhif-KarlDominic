$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.

    var isThree = false;  //because of the second 3 - space ship  
    var free = false;     //is true if the ship is placeable 

    for(var i = 5; i>1; i--){

      var key = Math.floor(Math.random()*10)+1; //determs the startpoint of the ship
      var up = key;
      var side = key;
      var isOutOfBounce = false;    //if the ship is out of bounce
      var isUpOrSide = false;       //true -> horizontal, false -> vertical
      var upHelp = key;             //help variable 
      var sideHelp = key;           //help variable

      if((Math.floor(Math.random()*10)+1)<=5){      //determs if the ship is placed vertical or horizontal
        isUpOrSide = true;
      }

      for(var k = 1; k<i; k++){     //checks if ship is placeable or not (doesn't work, dunno why)
        if(isUpOrSide == true){
          if($('td[data-r='+(up-1)+'][data-c='+side+']').hasClass('water') && 
          $('td[data-r='+(up+k)+'][data-c='+side+']').hasClass('water') && 
          $('td[data-r='+(up+k)+'][data-c='+(side+1)+']').hasClass('water') && 
          $('td[data-r='+(up+k)+'][data-c='+(side-1)+']').hasClass('water')&& 
          $('td[data-r='+(up+k+1)+'][data-c='+(side)+']').hasClass('water')&& 
          $('td[data-r='+(up+k+1)+'][data-c='+(side-1)+']').hasClass('water')&& 
          $('td[data-r='+(up+k+1)+'][data-c='+(side+1)+']').hasClass('water')){

            free = true;

          }else{
            free = false;
          }
        }else if(isUpOrSide == false){
          if($('td[data-r='+up+'][data-c='+(side-1)+']').hasClass('water') && 
          $('td[data-r='+up+'][data-c='+(side+k)+']').hasClass('water') && 
          $('td[data-r='+(up+1)+'][data-c='+(side+k)+']').hasClass('water') && 
          $('td[data-r='+(up-1)+'][data-c='+(side+k)+']').hasClass('water')&& 
          $('td[data-r='+ up+'][data-c='+(side+k+1)+']').hasClass('water')&& 
          $('td[data-r='+(up-1)+'][data-c='+(side+k+1)+']').hasClass('water')&& 
          $('td[data-r='+(up+1)+'][data-c='+(side+k+1)+']').hasClass('water')){

            free = true;
          }else{
            free = false;
          }
        }
      }

      if(free == true){
        if(isUpOrSide == true){             //places the ship horizontal
          for(var j = 0; j<i; j++){         //Places ship if ship is placeable
            $('td[data-r='+up+'][data-c='+side+']').removeClass('water').addClass('ship');
            if((upHelp+i)>10){            
              isOutOfBounce= true;      
            }
            if(isOutOfBounce==true){        //if true ship is placed upwards
              up--
            }else if(isOutOfBounce==false){    //if false ship is placed downwards
              up++;
            }
          }
        }else if(isUpOrSide==false){          //places ship vertikal
          for(var j = 0; j<i; j++){
            $('td[data-r='+up+'][data-c='+side+']').removeClass('water').addClass('ship');
            if((sideHelp+i)>10){
              isOutOfBounce= true;
            }
            if(isOutOfBounce==true){          //if true ship is placed to the left
              side--;
            }else if(isOutOfBounce==false){   //if true ship is placed to the right
              side++;
            }
          }
        }
        
      }else if(free == false){              
        i++;
      }
      if(i==3&&isThree==false){
        isThree = true;
        i++
      }
      free = false;
      isUpOrSide = false;
    }

    // Tip: The next line of code demonstrates how you can select a table cell
    // using coordinates, remove CSS classes and add CSS classes. 
    //$('td[data-r="1"][data-c="1"]').removeClass('water').addClass('ship');
    //$('td[data-r="2"][data-c="1"]').removeClass('water').addClass('ship');
    //$('td[data-r="3"][data-c="1"]').removeClass('water').addClass('ship');
  });
});