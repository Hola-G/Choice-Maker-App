$(() => {

  $(".submitoptions").on("click", function(event) {
    event.preventDefault();

    var orderArray = [];
    $("li").each(function() {
      orderArray.push($(this).attr("rel"));
    });
    console.log(orderArray);
    //orderArray now returns the order submitted!!!!!
    //use rel not id in html
  });

////////////////////////

  $(".creatediv").on("click", function(event) {
    event.preventDefault();
    $("#makeoptions").append("<p><input name='option' placeholder='Enter option'></input>")
  });


});
