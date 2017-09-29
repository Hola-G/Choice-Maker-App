$(() => {


/////////////////////// poll

  $(".submitoptions").on("click", function(event) {
    event.preventDefault();

    var orderArray = [];
    $("li").each(function() {
      orderArray.push($(this).attr("rel"));
    });
    console.log(orderArray);
    //orderArray now returns the order submitted!!!!!
    //use rel not id in html
    $.ajax({
      method: 'POST',
      url: '/poll',
      data: {
       options: orderArray
      },
      success() {
        $(window).attr('location','/thankyou')
      }
    })
  });

//////////////////////// createpoll

  $(".creatediv").on("click", function(event) {
    event.preventDefault();
    $(".options_section").append(`<<div class="option_container">
      <p><input name="option_name" class="option_name form-control" placeholder="Enter option"></input>
      <p><textarea name="option_desc" class="option_desc form-control" placeholder="Enter description (optional)"></textarea></p>
      </div>`)
  });


  $("form").on("submit", function(event) {
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

    var poll_title = $(".poll_title").val();
    var email = $(".email").val();
    var options = optionsObjectsArray;

    $.ajax({
      method: 'POST',
      url: '/createpoll',
      data: {
       poll_title: poll_title,
       email: email,
       options: options
      },
      success(data) {
        console.log("Success!", data)
        window.location.href = '/results/' + data.poll_id;
      },
      error(data) {
        console.log("Error")
      }
    })
  })

});


//////////////////////// results













