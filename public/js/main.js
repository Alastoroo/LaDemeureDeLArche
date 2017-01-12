// Carrousel demeure arche
$(document).ready(function() {


    $('.sync').each(function() {

      var $this = $(this),
          $container = $this.find('.sync-container'), // or containers if there is more than one container
          $outButton = $this.find('.out'),
          $owl = $this.find('.owl'),
          $nextButton = $this.find('.next'),
          $prevButton = $this.find('.prev'),
          $containerElements = $container.children('.element'), // all elements of container or contaienrs
          $firstContainerElements = $container.first().children(), // only the first container
          $firstContainerElementsImages = $firstContainerElements.find('img'),
          numberOfElments  =  $firstContainerElements.length, // because the number must be unified for all the containers
          numberOfContainers = $container.length,
          x = numberOfElments,
          realInterval = 3000,
          slideInterval = 1000,
          wholeInterval = realInterval+ slideInterval,
          number = 0,
          index = 0,
          clicks = false,
          callbacks = $.Callbacks(),
          callbacks2 = $.Callbacks(),
          callbacks3 = $.Callbacks();


      //edit elements for the next sliding..
      function beforeNext(){
        var y = x % numberOfElments,
            $activeElement =   $container.find('.element:eq('+ (y + 1) +')'),
            $activeElementPrev =    $container.find('.element:eq('+ y +')'),
            $selectButton =  $outButton.eq(y + 1),
            index = y + 1;
            $selectButtonPrev = $outButton.eq(y);

        if ( y == numberOfElments - 1) {
         $activeElement = $container.find('.element:eq(0)');
         $activeElementPrev = $container.find('.element:last-of-type');
         $selectButton = $outButton.eq(0);
         index = 0;
        }

        $containerElements.css('transition', 'none');
        $containerElements.css({'opacity': '1', 'z-index': '100'});
        $activeElement.css('transform', 'translateX(100%)');
        $activeElement.css('z-index', '1000');
        $activeElementPrev.css('z-index', '1000');
        $activeElementPrev.find('p, h1, h2, h3').removeClass('active');
        $selectButtonPrev.removeClass('active');
      }
      // a function for the next sliding
      function next(){

        var y = x % numberOfElments,
        $activeElement =   $container.find('.element:eq('+ (y + 1) +')'),
        $activeElementPrev =    $container.find('.element:eq('+ y +')'),
        $selectButton =  $outButton.eq(y + 1);
        index = y + 1;
        if ( y == numberOfElments - 1) {
         $activeElement = $container.find('.element:eq(0)');
         $activeElementPrev = $container.find('.element:last-of-type');
         $selectButton = $outButton.eq(0);
         index = 0;
        }
        if ( $activeElementPrev.position().left != 0 ) {
          return false;
        }

        $containerElements.css('transition', '');
        $activeElementPrev.css({'transform':'translateX(-100%)'});
        $activeElement.css({'transform': 'translateX(0)'}).addClass('active');
        $activeElement.siblings('.element').removeClass('active');
         x++;
         clearAndSet()

      }

  // edit elments for previous sliding..
      function beforePrev(){
        var y = x % numberOfElments,
            $activeElement =   $container.find('.element:eq('+ (y - 1) +')'),
            $activeElementPrev =    $container.find('.element:eq('+ y +')'),
            $selectButton =  $outButton.eq(y - 1),
            index = y - 1;
            $selectButtonPrev = $outButton.eq(y);

        $containerElements.css('transition', 'none');
        $containerElements.css({'opacity': '1', 'z-index': '100'});
        $activeElement.css('transform', 'translateX(-100%)');
        $activeElement.css('z-index', '1000');
        $activeElementPrev.css('z-index', '1000');
        $activeElementPrev.find('p, h1, h2, h3').removeClass('active');
        $selectButtonPrev.removeClass('active');

      }
      // a function for previous sliding
      function prev(){

        var y = x % numberOfElments,
        $activeElement =   $container.find('.element:eq('+ (y - 1) +')'),
        $activeElementPrev =    $container.find('.element:eq('+ y +')'),
        $selectButton =  $outButton.eq(y - 1);
        index = y - 1;
        if ( $activeElementPrev.position().left != 0 ) {
          return false;
        }

        //when owl Clicked
        $containerElements.css('transition', '');
        $activeElementPrev.css({'transform':'translateX(100%)'});
        $activeElement.css({'transform': 'translateX(0)'}).addClass('active');
        $activeElement.siblings('.element').removeClass('active');

          x--;
          clearAndSet();

      }

      function beforeOpacity() {
        var  y = x % numberOfElments,
             $activeElement =  $container.find('.element:eq('+ (index) +')'),
             $allElments = $container.find('.element'),
             $activeElementPrev =  $container.find('.element:eq('+ (y) +')'),
             $otherElements = $(this).children().not($activeElement);

          $activeElementPrev.find('p').removeClass('active');
          $outButton.eq(y).removeClass('active');
          $outButton.eq(index).addClass('active');

         $allElments.css('transition', 'none');
         $allElments.css({'z-index': '10', 'transform': 'translateX(0)'})
         $activeElement.css({ 'z-index': '100', 'opacity': '0'});
         $activeElementPrev.css({ 'z-index': '1000', 'opacity': '1'});

      }

      function opacity() {
        var  y = x % numberOfElments,
              $activeElement =  $container.find('.element:eq('+ (index) +')'),
             $allElments =  $container.find('.element'),
             $activeElementPrev =  $container.find('.element:eq('+ (y) +')'),
             $otherElements = $(this).children().not($activeElement);

         $activeElementPrev.css('transition', 'opacity ease '+ slideInterval +'ms');;
         $activeElementPrev.css({'opacity': '0'});
         $activeElement.css({'opacity': '1'})

        clearAndSet()
        x = index;
      }

      function array() {
       callbacks.fire();
     }

     function zeroInterval() {
        $outButton.eq(index).addClass('active');
      }
      function firstInterval() {
        zeroInterval();
        $container.find('.element:eq('+ index +')').find('h1, p').addClass('active');

      }
      function clearAndSet() {

        clearInterval(ww);
        ww = setInterval(array, wholeInterval);

        clearTimeout(firstTimeout);

        firstTimeout = setTimeout(firstInterval, slideInterval);
      }

      callbacks.add(beforeNext);
      callbacks.add(next);
      callbacks2.add(beforePrev);
      callbacks2.add(prev);
      callbacks3.add(beforeOpacity);
      callbacks3.add(opacity);
      var   ww = setInterval(array, wholeInterval);

     zeroInterval()
     var firstTimeout = setTimeout(firstInterval, slideInterval);
      $nextButton.click(function() {
        if ( clicks == true) {
          return false;
        }
        callbacks.fire();

        clicks = true;

        setTimeout(function() {
          clicks = false;
        }, slideInterval + 50)
      });
      $prevButton.click(function() {
        if ( clicks == true) {
          return false;
        }
        callbacks2.fire();

        clicks = true;

        setTimeout(function() {
          clicks = false;
        }, slideInterval + 50)
      });

      $outButton.hover(function() {

        var y = x % numberOfElments
            difference = (y - index),
            index = $(this).index();
        if ( index == y ) {
            return false;
        }
        callbacks3.fire()
      })

    })

})

// fin carrousel demeure
