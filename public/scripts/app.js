$(() => {

  $(".submitoptions").on("click", function(event) {
    event.preventDefault();

    var orderArray = $("li").each(function(i) {
      $(this).attr('id');
    });
    console.log(orderArray);

  });

});
