// Copyright (c) 2018-2019 Vincenzo Palazzo vicenzopalazzodev@gmail.com
// Distributed under the Apache License Version 2.0 software license,
// see https://www.apache.org/licenses/LICENSE-2.0.txt

'use strict';

let graphBuilder = undefined;

const commands = new Map([
    ['benckmark-graphtx-json', 'benckmark-graphtx-json'],
    ['graph-transaction', 'graph-transaction'],
    ['id-wallet', 'id-wallet'],
    ['stop-renderer', 'stop-renderer'],
    ['resume-renderer', 'resume-renderer']
]);

function mainApp(operation) {
    console.debug('Main with operation is: '  + operation);
    let commandsChoise = commands.get(operation);
    if(commandsChoise == undefined){
        throw Error('The command ' + operation + ' not supported');
    }
    if(commandsChoise === 'benckmark-graphtx-json'){
        let builderChar = new ChartBuilder('benchmark-chart', 'benchmark-conf.json', 'benckmark-graphtx-json', 'bar', ['GraphTX', 'JSON']);
        builderChar.intChart();
    }else if(commandsChoise === 'graph-transaction'){
        mmdShowToast('Take a Coffe ☕');
        graphBuilder = new BuildGraph('graph-container', 'tx', 0);
        graphBuilder.buildGraph();
    }else if(commandsChoise === 'id-wallet'){
        mmdShowToast('Take a Coffe ☕');
        graphBuilder = new BuildGraph('graph-container', 'id-wallet', 0);
        graphBuilder.buildGraph();
    }else if(commandsChoise === 'stop-renderer'){
        graphBuilder.renderStop();
    }
}


//Gloafting button configuration
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
                if(graphBuilder === undefined){
                    mmdShowToast('You must have created the Graph....');
                    throw Error('Graph builder undefined');
                }
                graphBuilder.renderRestore();
            }
        },{
            'bgcolor':'#212121',
            'color':'#ffbd39',
            'icon':'<i class=\'material-icons\'>stop</i>',
            'target':'_blank',
            'title' : 'Stop',
            onClick: function(){
                if(graphBuilder === undefined){
                    mmdShowToast('You must have created the Graph....');
                    throw Error('Graph builder undefined');
                }
                graphBuilder.renderStop();
            }
        }
    ]
}

$(document).ready(function(){
    rbt_display($('.rbt_wrapper'),config,(menu) => {
        menu.slideDown( 'slow' );
    });
});
