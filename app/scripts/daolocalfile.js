// Copyright (c) 2018-2019 Vincenzo Palazzo vicenzopalazzodev@gmail.com
// Distributed under the Apache License Version 2.0 software license,
// see https://www.apache.org/licenses/LICENSE-2.0.txt

'use strict';

class DAOLocalFile{

    constructor(path){
        this.path = path;
    }

    loadFile(path){
        this.configurationData;
        return fetch(path)
                .then(response => response.json())
                    .then(function(data){
                       // console.debug('Response to path: ' + path);
                       // console.debug(data);
                        return data;
                    })
                    .catch(ex => console.error(ex));
    }

    loadFileText(path){
        this.configurationData;
        return fetch(path)
                .then(response => response.text())
                    .then(function(data){
                       // console.debug('Response to path: ' + path);
                        //console.debug(data);
                        return data;
                    })
                    .catch(ex => console.error(ex));
    }
}