// Copyright (c) 2018-2019 Vincenzo Palazzo vicenzopalazzodev@gmail.com
// Distributed under the Apache License Version 2.0 software license,
// see https://www.apache.org/licenses/LICENSE-2.0.txt

'use strict';

const PATH_RES = "resources/";

const TYPE_OF_GRAPH = [
    "tx",
    "id-wallet"
];

class BuildGraph{

    constructor(idContainer, typeOfGraph, indexBlk){
        self = this;
        self.typeOfGraph = typeOfGraph;
        self.indexBlk = indexBlk;
        self.container = document.getElementById(idContainer);
        self.graph = Viva.Graph.graph();
        this.nodeColor = 0x009ee8;
        this.nodeSize = 12;
    }

    //The console.log build a graph lower
    async buildGraph(){
        self.configureGraph();

        self.dao = new DAOLocalFile();
        if(self.typeOfGraph === TYPE_OF_GRAPH[0]){
            console.debug('************* GRAPH of Transactions *************');
            let actualIndex = self.indexBlk;
            let pathInput = self.getNameFile(PATH_RES + 'tx/', '_tx.txt', actualIndex);
            console.debug('Name file: ', pathInput);
            while(pathInput != null){
                await self.parseringTheFile(pathInput, '|-|')
                actualIndex++;
                pathInput = self.getNameFile(PATH_RES + 'tx/', '_tx.txt', actualIndex);
                if(actualIndex == 3){break;} //TODO TMP
                console.log('Name file: ', pathInput);
            }
        }else if(self.typeOfGraph === TYPE_OF_GRAPH[1]){
            console.debug('************* GRAPH of ID Wallet *************');
            let actualIndex = self.indexBlk;
            let pathInput = self.getNameFile(PATH_RES + 'pubKey/', '_idw.txt', actualIndex);
            console.debug('Name file: ', pathInput);
            while(pathInput != null){
                await self.parseringTheFile(pathInput, '|-|')
                actualIndex++;
                pathInput =  self.getNameFile(PATH_RES + 'pubkey/', '_idw.txt', actualIndex);
                if(actualIndex == 10){break;} //TODO TMP
                console.log('Name file: ', pathInput);
            }
        }
    }

    //This method get the information for parsing file not compressed
    async parseringTheFile(pathInput, stringToken){
        let fileBlkPromisse = self.dao.loadFileText(pathInput);
        await fileBlkPromisse.then(function(fileBlkData) {
                   // console.debug('File content: ', fileBlkData);
                    let lines = fileBlkData.split('\n');
                    let simpleRenderer = 0;
                    lines.forEach(line => {
                       if(simpleRenderer === 50000){ return; }
                        simpleRenderer++;
                        let token = line.split(stringToken);
                        let toNode = token[0];
                        //console.debug('To node with id: ', toNode);
                        let fromNode = token[token.length - 1];
                        //console.debug('From node with id: ', fromNode);
                        self.graph.beginUpdate();

                        self.graph.addNode(toNode);
                        self.graph.addNode(fromNode);
                        //console.debug('Information node is: ', token.slice(1, token.length - 1));
                        self.graph.addLink(toNode, fromNode, token.slice(1, token.length - 1));
                        
                        self.graph.endUpdate();
                    });
                   // actualIndex++;
                    //pathInput = self.getNameFile(PATH_RES + 'tx/', '_tx.txt', actualIndex);
                }).catch(ex => console.error(ex));
    }

    configureGraph(){
        self.graphics = Viva.Graph.View.webglGraphics();

        self.layout = Viva.Graph.Layout.forceDirected(self.graph);

        self.renderer = Viva.Graph.View.renderer(self.graph,{
            layout     : self.layout,
            graphics   : self.graphics,
            container  : self.container,
            renderLinks : true
        });

        let events = Viva.Graph.webglInputEvents(self.graphics, self.graph);

        events.dblClick(function (node) {
            mcxDialog.confirm('The node is is: ' + node.id,{
            animationType: 'zoom',
            width: 550,
            height: 200,
            titleStyle: {
                color: '#ffbd39',
                background: '#212121'
            },
            buttonStyle: [{
                            color: '#ffbd39',
                            border: '1px solid #323232',
                            backgroundColor: '#323232'
                        },{
                            color: '#FFFFFF',
                            border: '1px solid #323232',
                            backgroundColor: '#323232'
                        }
            ],
            title: 'Info node',
            btn: ['Find on Blockstream', 'Close'],
            btnClick: function(index){
                if(index === 0){
                    if(self.typeOfGraph === TYPE_OF_GRAPH[0]){
                        window.open(' https://blockstream.info/tx/' + node.id);
                    }else if(self.typeOfGraph === TYPE_OF_GRAPH[1]){
                        window.open(' https://blockstream.info/address/' + node.id);
                    }
                    
                }
            }
            });
        });

        self.renderer.run();
    }

    renderStop(){
        self.renderer.pause();
    }

    renderRestore(){
        self.renderer.resume();
    }


    getNameFile(pathInput, exstension, numberBlock) {
        if(numberBlock < 10){
          return pathInput + 'blk0000' + String(numberBlock) + exstension;
        }else if(numberBlock < 100){
          return pathInput + 'blk000' + String(numberBlock) + exstension;
        }else if (numberBlock < 1000){
          return pathInput + 'blk00' + String(numberBlock) + exstension;
        }else if (numberBlock < 10000){
          return pathInput + 'blk0' + String(numberBlock) + exstension;
        }else if (numberBlock < 100000) {
          return pathInput + 'blk0' + String(numberBlock) + exstension;
        }
        return null;
      }
}