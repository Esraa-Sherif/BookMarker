var siteName = document.getElementById("siteName");
var siteLink= document.getElementById("siteLink");
var submitBtn = document.getElementById("submit");
var tableData = document.getElementById("tableData");
var siteSearch = document.getElementById("siteSearch")
var linkAlert =document.getElementById("url-alert");
var nameAlert =document.getElementById("name-alert");
var exist =document.getElementById("exist");

var allbookmarks; // declaration

var mood = "submit";
var temp ;
if(localStorage.getItem("allbookmarks") !== null){
    allbookmarks =JSON.parse( localStorage.getItem("allbookmarks"))
    display()
}else{
    allbookmarks=[]
}


submitBtn.addEventListener("click", function(){
    if(mood === "submit"){
        if(linkValidation() === true & nameValidation() === true){
            var book = {
                name:siteName.value,
                url:siteLink.value
            }
        
            allbookmarks.push(book);
        }
       
    }else if (mood === "update"){
       update()
        mood = "submit"
        submitBtn.innerHTML = mood

    }
   
    display()
    setStorage()
    clearInputs()

    console.log(allbookmarks);
})

// search 
siteSearch.addEventListener("input", function (){
    var term = siteSearch.value;
    var table = ''
    for(var i =0; i < allbookmarks.length; i++ ){
        if(allbookmarks[i].name.toLowerCase().includes(term)){
            console.log("found", i);
            table +=`
            <tr>
            <td>${allbookmarks[i].name.toLowerCase().replaceAll(term, `<span class="bg-warning">${term}</span>`)}</td>
            <td><a target="_blank" href="${allbookmarks[i].url}">Visit</a></td>
            <td> <a class="update" onclick="updateInput(${i})">Update</a></td>
            <td> <a class="delete" onclick="deleteInput(${i})">Delete</a></td>
        </tr>
            `
        }
    }
    tableData.innerHTML = table;

})

// display function
function display(){
    var cartona=""

    for(var i =0; i<allbookmarks.length ; i++){
        cartona +=`
        <tr>
                        <td>${allbookmarks[i].name}</td>
                        <td><a target="_blank" href="${allbookmarks[i].url}">Visit</a></td>
                        <td> <a class="update" onclick="updateInput(${i})">Update</a></td>
                        <td> <a class="delete" onclick="deleteInput(${i})">Delete</a></td>
                    </tr>
        
        `
    
    }
    tableData.innerHTML = cartona;


}

// clear inputs function
function clearInputs(){
    siteName.value = "";
    siteLink.value = "";

}

// set to local storage function
function setStorage(){
    localStorage.setItem("allbookmarks", JSON.stringify(allbookmarks))
}

// update inputs function
function updateInput(index){
    console.log("updated", index);
    siteName.value =allbookmarks[index].name;
    siteLink.value =allbookmarks[index].url;
    mood = "update";
    submitBtn.innerHTML= mood;
    temp = index;


}

// update function

function update(){
    console.log(temp);
    allbookmarks[temp].name = siteName.value;
    allbookmarks[temp].url = siteLink.value;
}

//delete input function 
function deleteInput(index){
    console.log(index);
    allbookmarks.splice(index,1)
    console.log(allbookmarks);
    display()
    setStorage()
    

}

// link validation

function linkValidation(){
    if(siteLink.value === ""){
    linkAlert.classList.remove("d-none")
        return false;
    }else{
        linkAlert.classList.add("d-none")

        return true;
    }
}

// name validation

function nameValidation(){
    if(siteName.value === ""){
    nameAlert.classList.remove("d-none")
    exist.classList.add("d-none");

        return false;
    }else{
        // exist name
        var isExist = true;
        for(var i =0; i<allbookmarks.length ; i++){
            if(allbookmarks[i].name ===siteName.value ){
                isExist = false;
                break;
            }
        }

        if(isExist === false){
            exist.classList.remove("d-none");
            return false
        }else{
            exist.classList.add("d-none");

        }




        nameAlert.classList.add("d-none")
        exist.classList.add("d-none");
        return true;
    }
}