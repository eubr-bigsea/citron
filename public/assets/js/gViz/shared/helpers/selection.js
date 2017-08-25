// https://github.com/wbkd/d3-extended
d3.selection.prototype.moveToFront = function() { return this.each(function() { return this.parentNode.appendChild(this); }); };

// Find closest parent with selector (http://stackoverflow.com/questions/18375761/does-d3-have-api-which-similar-with-jquery-closestselector)
d3.selection.prototype.closest = function(selector){
  var closestMatch = undefined;
  var matchArr = [];
  this.each(function(){
    var elm = this;
    while(typeof elm.parentNode.matches === "function" && !closestMatch){
      elm = elm.parentNode;
      if(elm.matches(selector)){
        closestMatch = elm;
        matchArr.push(closestMatch);
      }
    }
    closestMatch = undefined;
  });
  return d3.selectAll(matchArr);
}
