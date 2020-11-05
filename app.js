var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=O6sG5pyNjsFIvrYYPvnSofVHYOmQjNKNH5Dmj3eOISo";

var filter='&q='+ document.getElementById('search').value +'&page=' +document.getElementById('page').value

console.log("https://trefle.io/api/v1/plants" + apiToken + filter)

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants/search" + apiToken + filter,
    });    
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
function getdata(){
 filter='&q='+ document.getElementById('search').value +'&page=' +document.getElementById('page').value
 corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      const data=JSON.parse(request.responseText).data
      let html=''
      data.forEach((item) => { 
          html=html+ `<div id= "treeitem" class="img-border">
                        <img src="${item.image_url}" id="treephoto" alt="treeimage" class="img-xyz ">
                        <hr />
                        <div id = "treeinfo" class="text-inner-img">
                          <p> ${item.id} </p>
                          <p> ${item.common_name} </p>
                          <p> ${item.scientific_name} </p> 
                          <p> ${item.year} </p>
                        </div>
                      </div> `}
      )
      
      document.getElementById('plants').innerHTML = (html=='') ? "<h1>No Data Fetched</h1>" : html
     }
    )
);
}


//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
getdata()



