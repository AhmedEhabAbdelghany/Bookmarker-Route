let container = document.getElementById("User-Inputs")
let sName = document.getElementById("Site-Name")
let urlLink = document.getElementById("Site-Url")
let btnSubmit = document.getElementById("btnSubmit")
let siteNameAlert = document.getElementById("siteNameAlert")
let siteUrlAlert = document.getElementById("siteUrlAlert")
var searchinput = document.getElementById("search")
var notFound = document.getElementById("notFound")

let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;



let bookmarkData = []

// Leh 3amlna el if deh ? 3shan law el allData el fe localStorage ba2el bnull metl3sh error eno msh 3aref e3ml lenght 3aleha 3ahan hea mb2tsh array kda b2et null
if (localStorage.getItem("allData") != null) {

    bookmarkData = JSON.parse(localStorage.getItem("allData")); // Leh 3amlna el bookmarkData btsaw el localstorage ? 3shan law an gbt mn el localstorage direct fel view wa get a3ml add tany hems7 koll el fel bookmarkData fhe3ml override 3ala el gow laken kda b2lo shof el 3andk fel localStorage wa def 3aleh el gded
    viewData(bookmarkData)
}

btnSubmit.addEventListener("click", function (event) {
    event.preventDefault()

    // Start Site Name Validation
    if (sName.value == "") {
        siteNameAlert.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Bookmark Name is Missing!</strong>.
      </div>
        `
    } else if (sName.value != "") {
        siteNameAlert.innerHTML = ``
        // End { Site Name Validation }

        // Start Website URL Validation
        if (urlLink.value == "") { // if Url is Empty
            siteUrlAlert.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Website URL is Missing!</strong>
      </div>
        `
        }
        // End if Url is Empty
        else if (urlLink.value != "") { //if Url is not Empty
            siteUrlAlert.innerHTML = ``
            if (!regexp.test(urlLink.value)) { //Condition one if Url is Not Valid
                siteUrlAlert.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Please Enter valid URL!</strong>
          </div>
            `
            }
            //End Condition one if Url is Not Valid
            else { //Condition toe if Url is Valid
                let inputValues = {
                    SiteName: sName.value,
                    SiteUrl: urlLink.value
                }

                bookmarkData.push(inputValues)
                localStorage.setItem("allData", JSON.stringify(bookmarkData))
                viewData(Bookmarks)

                console.log(bookmarkData)
            }

            //End Condition tow if Url is Valid

        }
        // End { Website URL Validation }
    }



});




function viewData(OurBookmarks) {
    if (OurBookmarks == "") {
        container.innerHTML = `<tr><td colspan="4"><img src="./images/notfound.gif" class="notfound" alt=""></td></tr>`;
    } else {
        let BookmarkInputData = ""
        for (let i = 0; i < OurBookmarks.length; i++) {
            BookmarkInputData += `
            <tr>
            <th scope="row">
                <p class="mt-2">${i + 1}</p>
            </th>
            <td>
                <p class="mt-2">${OurBookmarks[i].SiteName}</p>
            </td>
            <td>
            <a  href="${OurBookmarks[i].SiteUrl}"> <button class="Our-Btn Visit-Btn rounded-3 border-0"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a>
            </td>
            <td>
                <button onClick="DeleteBookmark(${i})" class="Our-Btn Delete-Btn rounded-3 border-0"> <a href="#"> <i class="fa-solid fa-trash-can"></i> Delete </a> </button>
            </td>
            </tr>
            
            
            `
        }
        container.innerHTML = BookmarkInputData
    }
}



function clearInput() {
    sName.value = ""
    urlLink.value = ""
}


function DeleteBookmark(index) {
    bookmarkData.splice(index, 1)
    localStorage.setItem("allData", JSON.stringify(bookmarkData))
    viewData()

}


// Function Search for a Bookmark
searchinput.addEventListener("keyup", sarching)

function sarching() {
    var searchword = searchinput.value
    var searchresult = [];
    for (var i = 0; i < bookmarkData.length; i++) {
        if (bookmarkData[i].SiteName.toLowerCase().includes(searchword.toLowerCase())) {
            searchresult.push(bookmarkData[i])
            viewData(searchresult)
            console.log(searchresult)
        } else if (searchresult.length == 0) {
            container.innerHTML = `<tr><td colspan="4"><img src="./images/notfound.gif" class="notfound w-75" alt=""></td></tr>`;
        }
    }
}
