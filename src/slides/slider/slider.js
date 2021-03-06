bso.slide.slider = function(config, sectionType){
               
    var clone = bso.clone(document.querySelector('[data-slide=slider]'));
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);     
    clone.querySelector('.question').innerHTML = config.question;
         
    var leftAnswer = clone.querySelector('.left');
    leftAnswer.innerHTML = config.left;

    var rightAnswer = clone.querySelector('.right');
    rightAnswer.innerHTML = config.right;
    
    var position;
    var grip = clone.querySelector('.grip');
    var track = clone.querySelector('.track');
    
    var dragstart = function(evt){          
        position = {
            left: parseInt(window.getComputedStyle(grip).getPropertyValue('left').replace('px', '')),
            client: bso.getClientX(evt)
        }
        document.addEventListener('mouseup', dragend);
        document.addEventListener('mousemove', dragmove);    
        document.addEventListener('touchend', dragend);
        document.addEventListener('touchmove', dragmove);        
        grip.setAttribute('class', 'grip active');
    };
        
    var dragend = function(){
        document.removeEventListener('mousemove', dragmove);        
        document.removeEventListener('mouseup', dragend);
        document.removeEventListener('touchmove', dragmove);        
        document.removeEventListener('touchend', dragend);        
        grip.setAttribute('class', 'grip'); 
        this.complete = true;
        this.emit('complete');
    }.bind(this);
    
    var dragmove = function(evt){
        var clientX = bso.getClientX(evt);      
        var newLeft = position.left + clientX - position.client;
        
        if (newLeft < -10){
            newLeft = -10;
        } else if (newLeft > 280){
            newLeft = 280;
        }
        
        grip.style.left = newLeft + 'px';        
        position.left = newLeft;
        position.client = clientX;
    }
    
    grip.addEventListener('mousedown', dragstart);
    grip.addEventListener('touchstart', dragstart);
    
    track.addEventListener('click', function(evt){        
        grip.style.left = evt.clientX - track.getBoundingClientRect().left - grip.getBoundingClientRect().width/2 + 'px';       
        this.complete = true;
        this.emit('complete');        
    }.bind(this))
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;
    
    bso.evented(this);    
}
