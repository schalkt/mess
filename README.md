mess
====

Tiny Javascript Message System (jQuery based)

Usage:

[code]

	mess('Hello, world!');

	// config
	mess({
	    position : 'bottom',
	    theme : 'white',
	    timeout : 1500,
	    speed : 500
	});
	
	// override timeout
	mess('Hello, world!', 5000);
		
	// get the message object to a variable 
	var loadmsg = mess('Uploading...', false);

    // simulate upload finished
    setTimeout(function() {
        
        // update message object
        loadmsg.mess('Upload finished', 2500, 'darkwhite');
        
    }, 5000);	
	
[/code]