async function getAllArticles() {
    var url = "http://13.53.206.90:3000/articles/"
    var response = await fetch(url, {headers: {"Accept": "application/json"} })
    var data = await response.json()
    var div = ""
    console.log(data)

    for(var i = 0; i < data.length; i++) {
        var title = data[i]["title"]
        var published = data[i]["published"]
        var body = data[i]["body"]
        var articleID = data[i]["id"]
        div += "<h2>" + title + "</h2>" + "<h4>Published: " + published + "</h4>" +  "<p>" + body + "</p>" + "</br><button onclick=" + "deleteArticle(" + articleID + ")" + ">Delete article</button> </br></br>"
    }

document.getElementById("articles").innerHTML = div 

}

async function getArticleByID() {
    var articleID = document.getElementById("articleID").value
    var url = "http://13.53.206.90:3000/articles/" + articleID
    var response = await fetch(url, {headers: {"Accept": "application/json"} })
    
    try {
        var data = await response.json()
        var div = ""
        console.log(data)
        var title = data.title
        var published = data.published
        var body = data.body
        div += "<h2>" + title + "</h2>" + "<h4>Published: " + published + "</h4>" +  "<p>" + body + "</p>"
        document.getElementById("articles").innerHTML = div 
    } catch {
        document.getElementById("articles").innerHTML = "The ID supplied does not exist. Please try search by another ID"
    }
    
}

async function createArticle() {
    var url = "http://13.53.206.90:3000/articles"
    var newArticleTitle = document.getElementById("newArticleTitle").value
    var newArticleBody = document.getElementById("newArticleBody").value
    var newArticleCheckbox = document.getElementById("newArticlePublished")
    var newArticlePublished = false

    if (newArticleCheckbox.checked == true) {
        var newArticlePublished = true
    } else {
        var newArticlePublished = false
    }

    var data = {
        title: newArticleTitle,
        body: newArticleBody,
        published: newArticlePublished
    }

    var response = await fetch(url, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    var result = await response.json()
   
    console.log(result)


document.getElementById("articles").innerHTML = "New article created. Check the home page to see it" 

}

async function deleteArticle(idFromArticle) {
    var idToDelete = idFromArticle
    var url = "http://13.53.206.90:3000/articles/" + idToDelete

    
    var response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json"
        }
    })
    location.reload()


}

async function editArticle() {
    var idToEdit = document.getElementById("editArticleID").value
    var editArticleTitle = document.getElementById("editArticleTitle").value
    var editArticleBody = document.getElementById("editArticleBody").value
    var editArticleCheckbox = document.getElementById("editArticlePublished")
    var editArticlePublished = false

    if (editArticleCheckbox.checked == true) {
        var editArticlePublished = true
    } else {
        var editArticlePublished = false
    }

    var url = "http://13.53.206.90:3000/articles/" + idToEdit

    try {
        var data = {
            title: editArticleTitle,
            body: editArticleBody,
            published: editArticlePublished
        }
        
        var response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
           
        console.log("Edited successfully")
        location.reload()
    } catch {
        console.log("ID out of range")
    }
    

}