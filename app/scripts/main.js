function main() {
  //Grading graph
  var graph = createGraphFromFile();

  var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength : 30,
    springCoeff : 0.0008,
    dragCoeff : 0.01,
    gravity : -1.2,
    theta : 1
  });

  var graphics = Viva.Graph.View.webglGraphics();


  var renderer = Viva.Graph.View.renderer(graph,
    {
      layout     : layout,
      graphics   : graphics,
      container: document.getElementById('graph-container'),
      renderLinks : true,
      prerender  : true,
    });

    var events = Viva.Graph.webglInputEvents(graphics, graph);

    events.click(function (node) {
        mcxDialog.confirm('The tx id of the node is: ' + node.id,{
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
              window.open('https://blockstream.info/tx/' + node.id);
            }
          }
        });
    });

  renderer.run();

}

function mainTwo() {

  //Grading graph
  var graph = createGraphIDFromFile();

  var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength : 30,
    springCoeff : 0.0008,
    dragCoeff : 0.01,
    gravity : -1.2,
    theta : 1
  });

  var graphics = Viva.Graph.View.webglGraphics();


  var renderer = Viva.Graph.View.renderer(graph,
    {
      layout     : layout,
      graphics   : graphics,
      container: document.getElementById('graph-container'),
      renderLinks : true
    });

    var events = Viva.Graph.webglInputEvents(graphics, graph);

    events.click(function (node) {
        mcxDialog.confirm('The address is: ' + node.id,{
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
              window.open(' https://blockstream.info/address/' + node.id);
            }
          }
        });
    });

  renderer.run();

}

function createGraphIDFromFile() {
  var graph = Viva.Graph.graph();

  var numbarBlock = 0;

  var nameFile = readFile('resources/pubKey/', '-idw.txt', numbarBlock);
  console.log('Name file: ' + nameFile);
  readWithParsing(nameFile, graph);
  return graph;
}

function createGraphFromFile() {
  var graph = Viva.Graph.graph();

  var numbarBlock = 32;

  var nameFile = readFile('resources/tx/', '_tx.txt', numbarBlock);
  console.log('Name file: ' + nameFile);
  readWithParsing(nameFile, graph);
  return graph;
}

function readWithParsing(pathFile, graph) {
  mmdShowToast('Take a Coffe ☕');
  let txtFile = new XMLHttpRequest();
  txtFile.open('GET', pathFile, true);
  txtFile.onreadystatechange = function(){
    if (txtFile.readyState === 4) {  // document is ready to parse.
      if (txtFile.status === 200) {  // file is found
        let lines = txtFile.responseText.split('\n');
        for(let j = 0; j < lines.length; j++){
          let elements = lines[j].split('|-|');
          console.debug('Element first: ' + elements[0]);
          graph.addNode(String(elements[0]));
          graph.addNode(String(elements[elements.length]));
          console.debug('Element last: ' + elements[elements.length - 1]);
          graph.addLink(String(elements[0]), String(elements[elements.length - 1]))
          //Only for demo Github
           if(j === 5000){
            mmdShowToast('Loaded 1000 nodes');
            mmdShowToast('Click on node for explore it');            
            return;
          }
        }
        mmdShowToast('Loaded ' + txtFile.responseText.split('\n').length * 2 + ' nodes');
        console.debug('Line read is: ' + lines);
        console.debug('End file');
      }
    }
  };
  txtFile.send(null);
  
}

function readFile(pathInput, exstension, numberBlock) {
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
  return undefined;
}
