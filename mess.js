(function(fn) {

    window[fn] = function(msg, timeout, theme, speed, num) {

        // default config
        var obj, config, infobox, defaults = {
            position : 'top',
            theme : 'light',
            timeout : 2500,
            speed : 250
        };

        // init static config
        if ( typeof window[fn].config == 'undefined') {
            window[fn].config = defaults;
        }

        // update static config
        if ( typeof msg == 'object') {
            window[fn].config = $.extend(window[fn].config, msg);
            return window[fn].config;
        }

        config = window[fn].config;

        // set timeot
        if (timeout == undefined) {
            timeout = config.timeout;
        }

        // set speed
        if (speed == undefined) {
            speed = config.speed;
        }

        // set theme
        if (theme == undefined) {
            theme = config.theme;
        }

        // set count
        if (window[fn].count == undefined) {
            window[fn].count = 0;
        }

        infobox = $('.mess_box.mess_' + config.position);

        // infobox initialize
        if (!infobox.length) {

            $('body').append('<div class="mess_box mess_' + config.position + '"></div>');

            infobox = $('.mess_box.mess_' + config.position);
            infobox.slideUp(0);
            infobox.css({
                visibility : 'visible'
            }).stop().slideDown(0);
        }

        if (num == undefined) {

            num = ++window[fn].count;
            infobox.append('<div class="mess_item ' + num + ' mess_' + theme + '"></div>');
            obj = $('.mess_item.' + num);

        } else {

            obj = $('.mess_item.' + num);
            obj.removeClass();
            obj.addClass('mess_item ' + num + ' mess_' + theme);

        }

        // put message to item and store the item number
        obj.html(msg);
        obj.mess_count = num;

        // close item
        obj.close = function() {
            $(this).stop().slideUp(speed, function() {
                $(this).remove();
            });
        };

        // update item function
        obj[fn] = function(msg, timeout, theme, speed) {
            window[fn](msg, timeout, theme, speed, this.mess_count);
        };

        // click event
        obj.on('click', function() {
            $('.mess_item.' + num).stop().slideUp(speed, function() {
                $(this).remove();
            });
        });

        if (obj.mess_tio) {
            clearTimeout(obj.mess_tio);
        }

        // set item close timeout and function
        if (timeout !== false) {
            obj.mess_tio = setTimeout(function() {
                $('.mess_item.' + num).stop().slideUp(speed, function() {
                    $(this).remove();
                });
            }, timeout);
        }

        return obj;

    };

})('mess');
