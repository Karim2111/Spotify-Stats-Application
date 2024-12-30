import React from 'react';

export function processLargeJsonFile(file) {
    const reader = new FileReader();
    
    reader.onload = function (event) {
      // Parse the JSON string to an object
      const jsonData = JSON.parse(event.target.result);
    
      const dictmostplayed = {};
      

      
      jsonData.forEach(( item, index) => {
        const trackName = jsonData[index].track_name;
        

        if ( jsonData[index].ms_played > 60000 ) {
            
            if (!dictmostplayed[trackName]) {
                dictmostplayed[trackName] = 1;  
            }
            dictmostplayed[trackName] += 1; 
        }
       
      });
     
     console.log(dictmostplayed);
      
      const top10 = top10played(dictmostplayed);
      console.log(top10);
      
    
    }
    reader.readAsText(file);
};

function top10played(dictmostplayed) {
    const tempDict = { ...dictmostplayed }; // Create a shallow copy of the dictionary
    const top10keys = [];

    for (let i = 0; i < 10 && Object.keys(tempDict).length > 0; i++) {
        const maxKey = Object.keys(tempDict).reduce((maxKey, currentKey) => {
            return tempDict[currentKey] > tempDict[maxKey] ? currentKey : maxKey;
        }, Object.keys(tempDict)[0]);

        top10keys.push(maxKey);
        delete tempDict[maxKey]; // Remove the maxKey from the temporary dictionary
    }

    return top10keys;
}


function top5artists(){};

function top5albums(){};

  