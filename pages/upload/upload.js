

export function processLargeJsonFile(file) {
    const reader = new FileReader();
    
    reader.onload = function (event) {
      // Parse the JSON string to an object
      const jsonData = JSON.parse(event.target.result);
    
      const dictMostSong = {};
      const dictMostArt = {};

      // Assuming jsonData is an array, loop through each item
      jsonData.forEach((item, index) => {
        const trackName = jsonData[index].master_metadata_track_name;
        const artistName = jsonData[index].master_metadata_album_artist_name;

        if (!dictMostArt[artistName]) {
            dictMostArt[artistName] = jsonData[index].ms_played;  
          }
        else dictMostArt[artistName] += jsonData[index].ms_played;

        

        
        if (!dictMostSong[trackName]) {
          dictMostSong[trackName] = jsonData[index].ms_played;  
            }
        else dictMostSong[trackName] += jsonData[index].ms_played; 
        
       
      });
     
      
    console.log(dictMostArt);
    console.log("Top 10 most played songs: ");
    const top10 = top10played(dictMostSong);
    for (let i = 0; i < top10.length; i++) {
        console.log(top10[i] , dictMostSong[top10[i]]/60000);
       }
    
    console.log("Top 5 most played artists: ");
    const top5 = top5artists(dictMostArt);
    for (let i = 0; i < top5.length; i++) {
        console.log(top5[i] , dictMostArt[top5[i]]/60000);
       }






    };
    
    reader.readAsText(file);
  }
  

  function top10played(dictMostSong) {
    const tempDict = { ...dictMostSong }; // Create a shallow copy of the dictionary
    const top10keys = [];

    for (let i = 0; i < 10 && Object.keys(tempDict).length > 0; i++) {
        const maxKey = Object.keys(tempDict).reduce((maxKey, currentKey) => {
            return tempDict[currentKey] > tempDict[maxKey] ? currentKey : maxKey;
        }, Object.keys(tempDict)[0]);

        top10keys.push(maxKey);
        delete tempDict[maxKey]; 
    }

    return top10keys;
}

function top5artists(dictMostArt){
    const tempDict = { ...dictMostArt }; // Create a shallow copy of the dictionary
    const top5keys = [];

    for (let i = 0; i < 5 && Object.keys(tempDict).length > 0; i++) {
        const maxKey = Object.keys(tempDict).reduce((maxKey, currentKey) => {
            return tempDict[currentKey] > tempDict[maxKey] ? currentKey : maxKey;
        }, Object.keys(tempDict)[0]);

        top5keys.push(maxKey);
        delete tempDict[maxKey]; 
    }

    return top5keys;
}

function top5albums(){}

  