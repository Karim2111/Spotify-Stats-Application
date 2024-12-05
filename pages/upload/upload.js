let dictMostSong = {};
let dictMostArt = {};
let dictMostAlbum = {};

export function processAll(files) {
  dictMostSong = {};
  dictMostArt = {};
  dictMostAlbum = {};
  const promises = Array.from(files).map(async (file) => {
    if (file.type !== 'application/json') {
      console.error(`File type not supported: ${file.type}`);
      return;
    }

    console.log(`File: ${file.name}`);
    await processLargeJsonFile(file);
  });

  Promise.all(promises).then(() => {
    print(); // Ensures print is called after all files are processed
  });
}


async function processLargeJsonFile(file) {
  return new Promise((resolve) => {
  
  const reader = new FileReader();
    
    reader.onload = function (event) {
      // Parse the JSON string to an object
      const jsonData = JSON.parse(event.target.result);
    
       

      // Assuming jsonData is an array, loop through each item
      jsonData.forEach((item, index) => {
        const trackName = jsonData[index].master_metadata_track_name;
        const artistName = jsonData[index].master_metadata_album_artist_name;
        const albumName = jsonData[index].master_metadata_album_album_name;

        if (new Date(jsonData[index].ts).getUTCFullYear() == 2024) {
          add(dictMostSong, trackName, jsonData[index].ms_played);
          add(dictMostArt, artistName, jsonData[index].ms_played);
          add(dictMostAlbum, albumName, jsonData[index].ms_played);
        }
       
      });
     
      
    
      resolve();  
    };
    
    reader.readAsText(file);
  });
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

function top5albums(dictMostAlbum){
  const tempDict = { ...dictMostAlbum }; // Create a shallow copy of the dictionary
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

function add(dict, key, value) {
  if (!dict[key]) {
      dict[key] = value;  
        }
  else dict[key] += value;

}



function print(){
  console.log("Top 10 most played songs: ");
    const top10song = top10played(dictMostSong);
    for (let i = 0; i < top10song.length; i++) {
        console.log(top10song[i] , dictMostSong[top10song[i]]/60000);
  }
    
    console.log("Top 5 most played artists: ");
    const top5art = top5artists(dictMostArt);
    for (let i = 0; i < top5art.length; i++) {
        console.log(top5art[i] , dictMostArt[top5art[i]]/60000);
    }

    console.log("Top 5 most played albums: ");
    const top5alb = top5albums(dictMostAlbum);
    for (let i = 0; i < top5alb.length; i++) {
        console.log(top5alb[i] , dictMostAlbum[top5alb[i]]/60000);
    }

    
    console.log("min played: ");
    const totalPlays = Object.values(dictMostSong).reduce((sum, value) => sum + value, 0);
    console.log(totalPlays/60000);
}