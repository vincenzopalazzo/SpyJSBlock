
//configuration
let config = {
    main: {
        'bgcolor':'#ffbd39',
        'color':'#212121',
        'icon':'<i class=\'material-icons\'>add</i>',
        onClick: function(){
            
        }
    },
    links:[
       {
            'bgcolor':'#212121',
            'color':'#ffbd39',
            'icon':'<i class=\'material-icons\'>restore</i>',
            'title' : 'Resume',
            onClick: function(){
                resumeRenderd();
            }
        },{
            'bgcolor':'#212121',
            'color':'#ffbd39',
            'icon':'<i class=\'material-icons\'>stop</i>',
            'target':'_blank',
            'title' : 'Stop',
            onClick: function(){
                stopRenderd();
            }
        }
    ]
}

$(document).ready(function(){
    rbt_display($('.rbt_wrapper'),config,(menu) => {
        menu.slideDown( 'slow' );
    });
});