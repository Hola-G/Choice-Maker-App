$(() => {

  $(".submitoptions").on("click", function(event) {
    event.preventDefault();

    var orderArray = [];
    $("li").each(function() {
      orderArray.push($(this).attr("rel"));
    });
    console.log(orderArray);

  });

});
