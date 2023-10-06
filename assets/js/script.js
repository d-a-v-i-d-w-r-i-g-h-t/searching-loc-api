var searchQuery=document.querySelector("#search-query");
var button=document.querySelector(".btn");
var resultCont=document.querySelector("#search-results");
var searchFormat=document.querySelector("#search-format");

button.addEventListener("click",function(event){
    event.preventDefault();
    // console.log("works");
    var searchInput=searchQuery.value;
    var formatInput=searchFormat.value;

    
    // console.log(formatInput);
    // console.log(searchInput);
    if (formatInput){
        var apiUrl="https://www.loc.gov/"+formatInput+"/?q=" + searchInput + "&fo=json";
    }
    else{
        var apiUrl="https://www.loc.gov/search/?q=" + searchInput + "&fo=json";
    }

    fetch(apiUrl)
    .then(function (response){
        if (response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                console.log(data.results);

                displayResults(data.results);
                


            })
        }
    })
})


function displayResults(data){
    for (let i = 0; i < data.length; i++) {

        var resultDiv=document.createElement("div");
        var resultTitle=document.createElement("h3");
        var resultDate=document.createElement("p");
        var resultSubjects=document.createElement("p");
        var resultDesc=document.createElement("p");
        resultTitle.textContent=data[i].title;
        resultDate.textContent="Date: " +data[i].date;
        resultSubjects.textContent="Subject " + data[i].subject;
        resultDesc.textContent="Description " + data[i].description;

        resultDiv.appendChild(resultTitle);
        resultDiv.appendChild(resultDate);
        resultDiv.appendChild(resultSubjects);
        resultDiv.appendChild(resultDesc);

        resultCont.appendChild(resultDiv);
    }

    searchQuery.value="";
    searchFormat.value="";




}