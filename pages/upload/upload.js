export function processLargeJsonFile(file) {
    const reader = new FileReader();
    
    reader.onload = function (event) {
      // Parse the JSON string to an object
      const jsonData = JSON.parse(event.target.result);
      var num = 0;
      // Assuming jsonData is an array, loop through each item
      jsonData.forEach((item, index) => {
        num +=1;
      });
      console.log('Number of items:', num);
    };
    
    reader.readAsText(file);
  }
  