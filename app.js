import images from "./ImageData/imagedata.js";

const img_list = document.querySelector(".list-container");
const img_disp = document.querySelector(".display-image");
const disp_caption = document.querySelector(".displayed-caption");
const greet = document.getElementsByClassName("greet-toon")[0];
var current_img = 0;
var total_images = 0;

// displaying the heading based on current time
(function makeHeading(){
    let today = new Date();
    let hrs = today.getHours();
    let heading = "";
    if(hrs<12){
        heading = "Good Morning 🌤️, Welcome to my Image Viewer";
    }
    else if(hrs<18){
        heading = "Good Afternoon 🌞, Welcome to my Image Viewer";
    }
    else{
        heading = "Good Evening 🌳, Welcome to my Image Viewer";
    }
    const appHeading = document.getElementsByClassName("heading")[0];
    appHeading.innerText = heading;
})();



// Handling the overflow
function handleOverflow(caption){
    if(caption.length>30){
        return caption.substring(0,12) + "..." + caption.substring(caption.length-15);
    }
    return caption;
}



/**
 * creating side bar content
 * @param {image object} img 
 * @returns string content
 */
function contentMaker(img){
    const content = `
        <div class="img-icon-container">
            <img class="img-icon" src=${img["previewImage"]} alt="Icon can't be loaded">
        </div>
        <div class="img-descr-container">
            <span class="img-descr">${handleOverflow(img["title"])}</span>
        </div>
    `;
    return content;
}


/**
 * Displaying the selected current image
 */
function displayImage(){
    const img_content = `
        <img class="displayed-image" src=${images[current_img]["previewImage"]} alt=${images[current_img]["title"]}>
    `;
    const caption = `${images[current_img]["title"]}`;
    img_disp.innerHTML = img_content;
    disp_caption.innerHTML = caption;
}

// Display first image on loading
displayImage();


/**
 * loading the sidebar for images list
 */
images.forEach((img,index)=>{
    const new_div = document.createElement("div");
    new_div.classList.add("list-item");
    new_div.setAttribute("id",index.toString());
    const content = contentMaker(img);
    new_div.innerHTML = content;
    if(index===0){
        new_div.classList.add("highlight");
    }
    new_div.addEventListener("click",function(event){
        document.getElementById(current_img.toString()).classList.toggle('highlight');
        current_img = +new_div.getAttribute("id");
        document.getElementById(current_img.toString()).classList.toggle('highlight');
        displayImage();
    });
    img_list.append(new_div);
    total_images += 1;
});


// Event Listener for updating the editable caption with side bar content
disp_caption.addEventListener('input',function(event){
    let target = document.getElementById(current_img.toString());
    target = target.querySelector(".img-descr-container .img-descr");
    // console.log(handleOverflow(this.innerText));
    target.innerHTML = handleOverflow(this.innerText);

    let edited_content = document.getElementsByClassName("displayed-caption")[0];
    images[current_img]["title"] = edited_content.innerText;
})


/**
 * Eventlistener for the keypresses
 */
window.addEventListener("keydown",function(event){
    // console.log(event);
    //toggling the highlight and changing the image based on the keypress
    if(event.key === "ArrowUp"){
        let img_elmt = document.getElementById(current_img.toString());
        img_elmt.classList.toggle("highlight");
        current_img = ((current_img-1)%total_images+total_images)%total_images;
        img_elmt = document.getElementById(current_img.toString());
        img_elmt.classList.toggle("highlight");
        displayImage();
    }
    else if(event.key === "ArrowDown"){
        let img_elmt = document.getElementById(current_img.toString());
        img_elmt.classList.toggle("highlight");
        current_img = (current_img+1)%total_images;
        img_elmt = document.getElementById(current_img.toString());
        img_elmt.classList.toggle("highlight");
        displayImage();
    }
})


// Greet Button event handler 
greet.addEventListener("mouseover",function(event){
    let msg = document.querySelector(".greet-message");
    msg.classList.toggle("greet-message");
    msg.classList.toggle("greet-message-display");
}) 

greet.addEventListener("mouseout",function(){
    let msg = document.querySelector(".greet-message-display");
    msg.classList.toggle("greet-message");
    msg.classList.toggle("greet-message-display");
})
