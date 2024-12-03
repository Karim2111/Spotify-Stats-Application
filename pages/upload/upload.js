export function processLargeJsonFile(file) {
    const reader = new FileReader();
    
    reader.onload = function (event) {
      // Parse the JSON string to an object
      const jsonData = JSON.parse(event.target.result);
    
      const dictmostplayed = {};
      const dictmostlistened = {};

      // Assuming jsonData is an array, loop through each item
      jsonData.forEach((item, index) => {
        const trackName = jsonData[index].master_metadata_track_name;
        if (!dictmostlistened[trackName]) {
            dictmostlistened[trackName] = jsonData[index].ms_played;
        }
        dictmostlistened[trackName] += jsonData[index].ms_played;


        if ( jsonData[index].ms_played > 60000 ) {
            
            if (!dictmostplayed[trackName]) {
                dictmostplayed[trackName] = 1;  
            }
            dictmostplayed[trackName] += 1; 
        }
       
      });
     
      console.log(Object.keys(jsonData)[0]); // num items
      console.log(jsonData[0]); // first item
      
      console.log(dictmostplayed); // dictionary of track names and play counts


      const maxKey = Object.keys(dictmostplayed).reduce((maxKey, currentKey) => {
        return dictmostplayed[currentKey] > dictmostplayed[maxKey] ? currentKey : maxKey;
      }, Object.keys(dictmostplayed)[0]);

      const maxKey2 = Object.keys(dictmostlistened).reduce((maxKey, currentKey) => {
        return dictmostlistened[currentKey] > dictmostlistened[maxKey] ? currentKey : maxKey;
      }, Object.keys(dictmostlistened)[0]);
      
      console.log(maxKey, dictmostplayed[maxKey]); 
      console.log(maxKey, dictmostlistened[maxKey] / 1000); 

    };
    
    reader.readAsText(file);
  }
  