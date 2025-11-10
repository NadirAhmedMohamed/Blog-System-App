let APIURL = "https://68a16d5d6f8c17b8f5d9ce08.mockapi.io/posts/posts";

getposts();

//addPost function
function addpost(postInfo){
    
    //$$$$$$$$
    showspinner();
    
   return fetch(APIURL,{
    method: "POST",
    headers : {
       "Content-Type": "application/json"
    },
    body: JSON.stringify(postInfo)
}
).finally(()=>{
    hideSpinner();
    
            Swal.fire({
                icon: 'success',
                title: 'successfully added !',
                text: 'post added successfully.',
                confirmButtonText: 'OK',     confirmButtonColor:    '#1E3A8A'
            })
})
}

let createForm = document.querySelector(".create");


createForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let newpost = {
        title: document.querySelector(".create .prod-name").value,
        content: document.querySelector(".create .content").value,
        price: document.querySelector(".create .price").value
        ,
        createdAt: new Date().toISOString() 
    }
    
    addpost(newpost).then( res => res.json()).then(()=>{
        let titleInput = document.querySelector(".create .prod-name").value = "";
let contentInput = document.querySelector(".create .content").value = "";
let priceInput = document.querySelector(".create .price").value = "";
        getposts();
});
})
//addPost function 
    
// getposts function 
 function getposts(){
    
    let tbody = document.querySelector(".posts");
tbody.innerHTML = "";

fetch(APIURL
  ).then( res => 
 res.json()
  ).then( data => {

    data.forEach( post => {
      
let tr = document.createElement("tr");
let id = document.createElement("td");
let title = document.createElement("td");
let content = document.createElement("td");
let date = document.createElement("td");
let price = document.createElement("td");
let buttons = document.createElement("td");

let edit = document.createElement("button");
edit.className = "edit-btn";
edit.innerHTML= "Edit";
edit.setAttribute("data-id",post.id);

let del = document.createElement("button");
del.className = "delete";
del.innerHTML= "Delete";
del.setAttribute("data-id",post.id)

// connect EventListener here, becuase it's created Dynamically 

//edit btn
edit.addEventListener("click", () => {
showEditModal(post);
});
//edit btn

// delete btn
del.addEventListener("click",()=>{
 showDeleteModel(post);
    })
//delete btn 


buttons.appendChild(edit);
buttons.appendChild(del);

id.appendChild(document.createTextNode(post.id));

title.appendChild(document.createTextNode(post.title));


content.appendChild(document.createTextNode(post.content));
price.appendChild(document.createTextNode(post.price + "$"));
date.appendChild(document.createTextNode(post.createdAt));



tr.appendChild(id);
tr.appendChild(title);
tr.appendChild(content);
tr.appendChild(price);
tr.appendChild(date);
tr.appendChild(buttons);


tbody.appendChild(tr);
    })
    });
}  
// getposts function

//edit btn
function showEditModal(post) {
    let wrapper = document.createElement("div");
    
    //style
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.flexDirection = "column";
    //style
    
    let editTitle = document.createElement("input");
    editTitle.className = "swal2-input";
    editTitle.setAttribute("id", "edit-title");
    editTitle.setAttribute("placeholder", "Title");
    editTitle.value = post.title;
    
    let editContent = document.createElement("textarea");
    
    editContent.className = "swal2-textarea";
    editContent.setAttribute("id", "edit-content");
    editContent.setAttribute("placeholder", "Content");
    editContent.value = post.content;
    
    wrapper.appendChild(editTitle);
    wrapper.appendChild(editContent);
    
    Swal.fire({
        title: 'Edit Post',
        html: wrapper,
        focusConfirm: false,
        showCancelButton: true,
          confirmButtonColor: '#1E3A8A', confirmButtonText: 'Save',
        preConfirm: () => {
            return {
                title: document.getElementById('edit-title').value,
                content: document.getElementById('edit-content').value,
                updatedAt: new Date().toISOString()
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            
         //$$$$$$$$$
         showspinner();
            fetch(APIURL + "/" + post.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.value)
            }).then(() => {
        getposts();
        
                Swal.fire(      'Updated!', 'Post has been updated.', 'success',
                );
            }).finally(hideSpinner)
        }
    });
}
//edit btn

//delete btn
function showDeleteModel(post){
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#901E3E',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
}).then((result) => {
    if (result.isConfirmed) {
        
        //$$$$$$$
        showspinner();
        
        fetch(APIURL + "/" + post.id, {
            method: "DELETE"
        }).then(() => {
            getposts();
            
            Swal.fire(
                'Deleted!',
                'The post has been deleted.',
            'success'
            );
        }).finally(hideSpinner)
    }
});
}
//delete btn

//show spinner
function showspinner() {
    document.querySelector(".spinner").style.display = "block";
    document.querySelector(".wrapper").style.display = "block";
}
//show sppiner

//hide spinner
function hideSpinner() {
    document.querySelector(".spinner").style.display = "none";
    document.querySelector(".wrapper").style.display = "none";
}
//hide sppiner



