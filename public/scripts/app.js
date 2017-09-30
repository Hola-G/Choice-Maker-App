$(() => {


/////////////////////// poll

  $(".submitoptions").on("click", function(event) {

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
    $(".options_section").append(`
      <div class="option_container">
        <button class="delete-option"> x </button>
        <input name="option_name" class="option_name form-control" placeholder="Enter option"></input>
        <textarea name="option_desc" class="option_desc form-control" placeholder="Enter description (optional)"></textarea>
      </div>`)
  });



  $('.options_section').on('click', '.delete-option', function(){
    $(this).closest('.option_container').remove();
  });

  $("form").on("submit", function(event) {
    event.preventDefault();

    var optionNames = [];
    var optionDescs = [];
    var optionsObjectsArray = [];

    $('.option_container').each(function() {
      let option_name = $(this).find('.option_name').val();
      let option_desc = $(this).find('.option_desc').val()
      if (option_name !== '') {
        optionsObjectsArray.push({
        option_name: option_name,
        option_desc: option_desc
      });
      }
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




/*
 *  Function to update results options with new
 *  data from AJAX GET request
 */

 function getNewVotesAndUpdate(id) {
  $.ajax({
    method: 'GET',
    url: `/results/${id}/json`,
    success(data) {
      let resultsTable = $('.results-table > tbody');
      resultsTable.empty();
      let currRow = 1;
      data.poll.options.forEach(function (o) {
        let row = $(`<tr><td>${currRow}</td><td>${o.option_name}</td><td>${o.sum}</td></tr>`);
        resultsTable.append(row);
        currRow = currRow + 1;
      });
    },
    error(data) {
      console.log("Error")
    }
  })
 }



