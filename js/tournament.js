(function ($) {
    "use strict";

    const saveInput = () => {
        localStorage.setItem('players', $('#draw-result').html())
    }

    function saveFn(data, userData) {
        let json = JSON.stringify(data)
        saveValue("rounds", json)
    }

    const saveValue = (key, value) => {
        localStorage.setItem(key, value)
    }

    const playersTemplate = (players) => {
        let player_names = ''
        if (players != '') {
            for (let i = 0; i < players; i++) {
                let val = localStorage.getItem(`player-${i}`)
                player_names += `<div class="col-3 mb-2"><input class="form-control players" id="player-${i}" value="${val != null ? val : ""}" readonly="${val != null ? true : false}"></div>`
            }
        }
        $('#draw-result').html(player_names)
        $('#player-number').val(players)
        saveInput()
    }

    let player_numbers = window.localStorage.getItem('player_numbers')

    if (player_numbers != null) {
        playersTemplate(player_numbers)
        let rounds = localStorage.getItem('rounds')
        if (rounds != null) {
            let container = $('#draw-players')
            container.bracket({
                teamWidth: 100,
                scoreWidth: 100,
                // matchMargin: 100,
                // roundMargin: 100,
                init: JSON.parse(rounds),
                save: saveFn,
            })
            $('#draw').prop('disabled', true)
        } else {
            $('#draw').prop('disabled', false)
        }

    }

    // Preloader
    $(window).on('load', function () {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function () {
                $(this).remove();
            });
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 90) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    /*--/ Star ScrollTop /--*/
    $('.scrolltop-mf').on("click", function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    // submit player numbers
    $('#submit-player').on("click", () => {
        player_numbers = $('#player-number').val()
        if (player_numbers === "") {
            swal.fire("Please enter player numbers")
            return
        }
        window.localStorage.setItem('player_numbers', player_numbers)
        playersTemplate(player_numbers)
    })

    $('#clear-player').on("click", () => {
        let clear_num = $('#player-number').val()
        player_numbers = ""
        window.localStorage.removeItem('player_numbers')
        for (let i = 0; i < clear_num; i++) {
            window.localStorage.removeItem(`player-${i}`)
        }
        playersTemplate(player_numbers)
        $('#draw-players').html()
        localStorage.removeItem('rounds')
    })

    $('.players').on("blur", (e) => {
        $(e.target).prop('readonly', true)
        let val = $(e.target).val()
        let id = $(e.target).attr('id')
        saveValue(id, val)
        saveInput()
    });

    $('.players').on("click", (e) => {
        $(e.target).prop('readonly', false)
        let val = $(e.target).val()
        let id = $(e.target).attr('id')
        saveValue(id, val)
        saveInput()
    });

    $('#draw').on("click", (e) => {
        let numbers = $('#player-number').val()
        let players = []
        for (let i = 0; i < numbers; i++) {
            let val = $(`#player-${i}`).val()
            if (val == "") {
                swal.fire('A player is missing')
                return
            }
            players.push(val)
        }
        let rounds = []
        let loop = players.length / 2
        for (let i = 0; i < loop; i++) {
            rounds.push(players.splice(0, 2))
        }

        var saveData = {
            // teams: [
            //     ["Team 1", "Team 2"],
            //     ["Team 3", "Team 4"],
            //     ["Team 5", "Team 6"],
            //     ["Team 7", "Forfeit"],
            // ],
            teams: rounds,
            results: [
                //     [      /* WINNER BRACKET */
                //     [[null, null], [null, null]], /* first and second matches of the first round */
                //     /* second round */
                // ]
            ]
        }

        /* Called whenever bracket is modified
         *
         * data:     changed bracket object in format given to init
         * userData: optional data given when bracket is created.
         */

        let container = $('#draw-players')
        container.bracket({
            teamWidth: 100,
            scoreWidth: 100,
            // matchMargin: 100,
            // roundMargin: 100,
            init: saveData,
            save: saveFn,
        })

    })

})(jQuery);

