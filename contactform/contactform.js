jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function () {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    let array = str.split('&')
    console.log(array);
    let message = {
      "name": "",
      "email": "",
      "subject": "",
      "message": ""
    }
    array.forEach(element => {
      switch (element.split('=')[0]) {
        case "name":
          message.name = element.split('=')[1].replace('%20', '_')
          break;
        case "email":
          message.email = element.split('=')[1].replace('%40', '@')
          break;
        case "subject":
          message.subject = element.split('=')[1].split('%20').join(' ')
          break;
        case "message":
          message.message = element.split('=')[1].split('%20').join(' ')
          break;
        default:
          console.log("value not defined");
          break;
      }
    });
    console.log(message);

    // var settings = {
    //   "url": "https://portfolio-221y.onrender.com/api/v1/message/save/",
    //   "method": "POST",
    //   "timeout": 0,
    //   "headers": {
    //     "Content-Type": "application/json"
    //   },
    //   "data": JSON.stringify(message),
    // };

    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    //   if (response == "Sended successfully") {
    //     $("#sendmessage").addClass("show");
    //     $("#errormessage").removeClass("show");
    //     $('.contactForm').find("input, textarea").val("");
    //   } else {
    //     $("#sendmessage").removeClass("show");
    //     $("#errormessage").addClass("show");
    //     $('#errormessage').html(response);
    //   }
    // });


    $("#sendmessage").addClass("show");
    $("#errormessage").removeClass("show");
    $('.contactForm').find("input, textarea").val("");

    return false;
  });

});
