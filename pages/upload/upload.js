export function processLargeJsonFile(file) {
    const reader = new FileReader();
    
    reader.onload = function (event) {
      // Parse the JSON string to an object
      const jsonData = JSON.parse(event.target.result);
    
      const dict = {};

      // Assuming jsonData is an array, loop through each item
      jsonData.forEach((item, index) => {
        if ( jsonData[index].ms_played > 60000 ) {
            const trackName = jsonData[index].master_metadata_track_name;
            if (!dict[trackName]) {
                dict[trackName] = 1;  
            }
            dict[trackName] += 1; 
        }
       
      });
     
      console.log(Object.keys(jsonData)[0]); // num items
      console.log(jsonData[0]); // first item
      
      console.log(dict); // dictionary of track names and play counts


      const maxKey = Object.keys(dict).reduce((maxKey, currentKey) => {
        return dict[currentKey] > dict[maxKey] ? currentKey : maxKey;
      }, Object.keys(dict)[0]);
      
      console.log(maxKey, dict[maxKey]); 

    };
    
    reader.readAsText(file);
  }
  