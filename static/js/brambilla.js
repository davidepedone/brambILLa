( function () {
    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if ( !window.requestAnimationFrame )
        window.requestAnimationFrame = function ( callback, element ) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
            var id = window.setTimeout( function () {
                    callback( currTime + timeToCall );
                },
                timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };

    if ( !window.cancelAnimationFrame )
        window.cancelAnimationFrame = function ( id ) {
            clearTimeout( id );
        };
}() );

( function () {

    var billa,
        billaImage,
        canvas,
        malattia,
        life = 3,
        level = 1;

    function getMalattia( cb ) {
        cb();
        /*$.getJSON( '/api/malattia', function ( resp ) {
            malattia = resp;
            cb();
        } );*/
    }

    function setMedicina( medicina, cb ) {
        /*$.getJSON( '/api/malattia/' malattia ' + '/' + medicina, function ( resp ) {
            malattia = resp;
            cb();
        } );*/
        cb( {
            result: false
        } );
    }

    function mostraFumetto( text, cb ) {
        text = text || "AHI, AHI !!!<br>Oggi non mi sento bene ..."
        $( '#overlay' ).css( 'display', 'block' );
        $( '#fumetto' ).html( text );
        $( '#fumetto' ).fadeIn( 500, cb )
    };

    function nascondiFumetto() {
        $( '#fumetto' ).fadeOut( 500, function () {
            $( '#overlay' ).css( 'display', 'none' );
            $( this ).html( '' );
        } );
    };

    function mostraToxic() {
        $( '#toxic' ).fadeIn( 500 ).delay( 2000 ).fadeOut( 500 );
    };

    function reset() {
        if ( level == 4 ) {
            $( '#life ul li' ).removeClass( 'lost' );
            mostraFumetto( 'COMPLIMENTI<br>HAI VINTO!!!', function () {
                setTimeout( function () {
                    location.reload();
                }, 5000 );
            } );
        } else {
            billa.animation = false;
            mostraFumetto( 'LIVELLO ' + level, function () {
                setTimeout( function () {
                    getMalattia( function ( data ) {
                        mostraFumetto( false, function () {
                            setTimeout( function () {
                                mostraFumetto( 'testo malattia', function () {
                                    setTimeout( nascondiFumetto, 3000 );
                                } );
                            }, 3000 );
                        } );
                    } );
                }, 2000 );
            } );
        }
    }

    function gameLoop() {

        window.requestAnimationFrame( gameLoop );

        billa.update();
        billa.render();
    }


    function sprite( options ) {

        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;
        that.animation = options.animation;

        that.update = function () {

            tickCount += 1;
            if ( that.animation ) {
                if ( tickCount > ticksPerFrame ) {

                    tickCount = 0;

                    // If the current frame index is in range
                    if ( frameIndex < numberOfFrames - 1 ) {
                        // Go to the next frame
                        frameIndex += 1;
                    } else {
                        frameIndex = 0;
                    }
                }
            } else {
                frameIndex = 0;
            }
        };

        that.render = function () {

            // Clear the canvas
            that.context.clearRect( 0, 0, that.width, that.height );

            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                0,
                0,
                that.width / numberOfFrames,
                that.height );
        };

        return that;
    }

    // Get canvas
    canvas = $( "#brambillaCanvas" ).get( 0 );
    canvas.width = 225;
    canvas.height = 400;

    // Create sprite sheet
    billaImage = new Image();

    // Create sprite
    billa = sprite( {
        context: canvas.getContext( "2d" ),
        width: 4950,
        height: 400,
        image: billaImage,
        numberOfFrames: 22,
        ticksPerFrame: 8,
        animation: false
    } );

    $( ".medicina" ).on( 'dragstart', function ( e ) {
        e.originalEvent.dataTransfer.setData( "medicina", e.target.id );
    } );

    $( "#brambillaCanvas" ).on( 'dragover', function ( e ) {
        e.preventDefault();
    } );

    $( "#brambillaCanvas" ).on( 'drop', function ( e ) {
        e.preventDefault();
        var medicina = e.originalEvent.dataTransfer.getData( "medicina" );
        // visualizza punto di domanda in grafica
        setMedicina( medicina, function ( response ) {
            // rimuovi punto di domanda
            if ( response.result ) {
                billa.animation = true;
                level += 1;
                setTimeout( reset, 5000 );
            } else {
                life -= 1;
                $( '#life ul li:eq(' + ( 2 - life ) + ')' ).addClass( 'lost' );
                if ( !life ) {
                    // uccidi billa e messaggio ricomincia
                } else {
                    mostraToxic();
                    mostraFumetto( 'OH NO!!!<br>Stai tentando<br>di uccidermi?', function () {
                        setTimeout( nascondiFumetto, 2500 );
                    } );
                }
            }
        } )
    } );

    getMalattia( function ( data ) {
        // Load sprite sheet
        billaImage.addEventListener( "load", gameLoop );
        billaImage.src = "/static/images/brambilla-sprite.png";
        mostraFumetto( "Ciao!<br>Mi chiamo Brambilla<br>e sono un po' sfortunato...<br>potresti aiutarmi?", function () {
            setTimeout( function () {
                mostraFumetto( 'testo malattia', function () {
                    setTimeout( nascondiFumetto, 3000 );
                } );
            }, 3000 );
        } );
    } );

}() );