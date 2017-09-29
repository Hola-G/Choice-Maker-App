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
    $(".options_section").append(`<div class="option_container">
      <p><input name="option_name" class="option_name" placeholder="Enter option"></input>
      <p><input name="option_desc" class="option_desc" placeholder="Enter description"></input></p>
    </div>`)
  });


  $("#createpoll").on("click", function(event) {
    event.preventDefault();

    var optionNames = [];
    var optionDescs = [];
    var optionsObjectsArray = [];

    $('.option_container').each(function() {
      optionsObjectsArray.push({
        option_name: $(this).find('.option_name').val(),
        option_desc: $(this).find('.option_desc').val()
      });
    })


    console.log(optionsObjectsArray);





    var poll_title = $(".poll_title").val();
    var email = $(".email").val();
    var options = optionsObjectsArray;

    $.ajax({
      method: 'POST',
      url: '/test',
      data: {
       poll_title: poll_title,
       email: email,
       options: options
      }
    })
  })

});
