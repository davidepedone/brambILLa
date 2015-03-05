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

( function ( $ ) {

    $.fn.randomize = function ( childElem ) {
        return this.each( function () {
            var $this = $( this );
            var elems = $this.children( childElem );

            elems.sort( function () {
                return ( Math.round( Math.random() ) - 0.5 );
            } );

            $this.detach( childElem );

            for ( var i = 0; i < elems.length; i++ )
                $this.append( elems[ i ] );

        } );
    }

} )( jQuery );

( function ( $ ) {
    var billa,
        billaImage,
        canvas,
        ill,
        life = 3,
        level = 1,
        msg = {
            winner: "COMPLIMENTI<br>HAI VINTO!!!<br><br>grazie per avermi<br>salvato la vita",
            level: "<br>LIVELLO<br><br>",
            drug: "<br>Proprio quello<br>che ci voleva<br><br>",
            seek: "<br>AHI, AHI !!!<br>Oggi non sto bene ragazzi...",
            error: "OH NO!!!<br><br>Stai tentando<br>di uccidermi?",
            intro: "Ciao!<br>Mi chiamo Brambilla<br>e sono un po' sfortunato...<br>potresti aiutarmi?",
            credit: "Davide Pedone<br>Claudio Pennati<br><br>Special Guest<br>Riccardo Brambilla",
            lose: "OH NO!!!<br>Addio mondo crudele!"
        };

    function getIll( cb ) {
        $.getJSON( '/api/get', function ( resp ) {
            ill = resp.id;
            var cookie = $.cookie( 'brambILLa' );
            var value = cookie ? cookie + '|' + ill : ill;
            $.cookie( 'brambILLa', value );
            showText( false, function () {
                showText( resp.desc, 4000, cb );
            } );
        } );
    };

    function checkDrug( drug ) {
        $.getJSON( '/api/check/' + ill + '/' + drug, function ( resp ) {
            if ( resp.result ) {
                billa.animation = true;
                $( '#overlay' ).css( {
                    'display': 'block',
                    'background': 'transparent'
                } );
                showText( msg.drug + resp.result, 2000, false );
                level += 1;
                setTimeout( reset, 5000 );
            } else {
                life -= 1;
                $( '#life ul li:eq(' + ( 2 - life ) + ')' ).addClass( 'lost' );
                if ( !life ) {
                    $.removeCookie('brambILLa');
                    billaImage.src = "/static/images/brambilla/brambilla-death-sprite.png";
                    billa.death = true;
                    billa.animation = true;
                    $( '#overlay' ).css( {
                        'display': 'block',
                        'background': 'transparent'
                    } );
                    showText( msg.lose, 5000, function () {
                        location.reload();
                    } );
                } else {
                    mostraToxic();
                    showText( msg.error );
                }
            }
        } )
    };

    function showText( text, delay, cb ) {
        text = text || msg.seek;
        if ( !cb ) {
            cb = delay;
            delay = 2000;
        }
        $( '#overlay' ).css( 'display', 'block' );
        $( '#text' ).html( text );
        $( '#text' ).fadeIn( 500 ).delay( delay ).fadeOut( 500, function () {
            $( '#overlay' ).css( 'display', 'none' );
            $( this ).html( '' );
            if ( $.isFunction( cb ) ) cb();
        } );
    };

    function mostraToxic() {
        $( '#toxic' ).fadeIn( 500 ).delay( 2000 ).fadeOut( 500 );
    };

    function reset() {
        if ( level == 13 ) {
            $( '#life ul li' ).removeClass( 'lost' );
            $.removeCookie('brambILLa');
            showText( msg.winner, 5000, function () {
                showText( msg.credit, 5000, function () {
                    location.reload();
                } );
            } );
        } else {
            billa.animation = false;
            $( '#overlay' ).removeAttr( 'style' );
            $( "#drugs" ).randomize( ".drug" );
            showText( msg.level + level, 2000, function () {
                getIll();
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
        that.death = options.death;

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
                        if ( that.death ) {
                            that.animation = false;
                        } else {
                            frameIndex = 0;
                        }
                    }
                }
            } else {
                if ( !that.death ) {
                    frameIndex = 0;
                }
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
        animation: false,
        death: false
    } );

    $( document ).on( 'dragstart', ".drug", function ( e ) {
        var id = $( e.target ).parent().attr( 'id' );
        e.originalEvent.dataTransfer.setData( "drug", id );
    } );

    $( "#brambillaCanvas" ).on( 'dragover', function ( e ) {
        e.preventDefault();
    } );

    $( "#brambillaCanvas" ).on( 'drop', function ( e ) {
        e.preventDefault();
        var drug = e.originalEvent.dataTransfer.getData( "drug" );
        // visualizza punto di domanda in grafica
        checkDrug( drug );
    } );

    billaImage.addEventListener( "load", gameLoop );
    billaImage.src = "/static/images/brambilla/brambilla-sprite.png";

    showText( msg.intro, function () {
        getIll();
    } );

} )( jQuery );