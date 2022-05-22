import images from "./ImageData/imagedata.js";

const img_list = document.querySelector(".list-container");
const img_disp = document.querySelector(".display_image");
const disp_caption = document.querySelector(".displayed-caption");
var default_img = 0;
var total_images = 0;


// function for handling the overflow
function checkOverflow(caption){
    if(caption.length>30){
        console.log(caption.substring(0,9) + "..." + caption.substring());
        return caption.substring(0,12) + "..." + caption.substring(caption.length-15);
    }
    return caption;
}



/**
 * creating side bar content
 * @param {image object} img 
 * @returns string content
 */
function content_maker(img){
    const content = `
        <div class="img-icon-container">
            <img class="img-icon" src=${img["previewImage"]} alt="Icon can't be loaded">
        </div>
        <div class="img-descr-container">
            <span class="img-descr">${checkOverflow(img["title"])}</span>
        </div>
    `;
    return content;
}


/**
 * For Displaying the selected image
 */
function display_image(){
    const img_content = `
        <img class="displayed-image" src=${images[default_img]["previewImage"]} alt=${images[default_img]["title"]}>
    `;
    const caption = `${images[default_img]["title"]}`;
    img_disp.innerHTML = img_content;
    disp_caption.innerHTML = caption;
}
display_image();


/**
 * loading the sidebar for images list
 */
images.forEach((item,index)=>{
    const new_div = document.createElement("div");
    new_div.classList.add("list-item");
    new_div.setAttribute("id",index.toString());
    const content = content_maker(item);
    new_div.innerHTML = content;
    if(index==0){
        new_div.classList.add("highlight");
    }
    new_div.addEventListener("click",function(event){
        document.getElementById(default_img.toString()).classList.toggle('highlight');
        default_img = index;
        document.getElementById(default_img.toString()).classList.toggle('highlight');
        display_image();
    });
    img_list.append(new_div);
    total_images += 1;
});


// Event Listener for updating the editable caption with side bar content
disp_caption.addEventListener('input',function(event){
    let target = document.getElementById(default_img.toString());
    target = target.querySelector(".img-descr-container .img-descr");
    target.innerHTML = checkOverflow(this.innerHTML);
})


/**
 * Eventlistener for the keypresses
 */
window.addEventListener("keydown",function(event){
    // console.log(event);
    //toggling the highlight and changing the image based on the keypress
    if(event.key === "ArrowUp"){
        let img_elmt = document.getElementById(default_img.toString());
        img_elmt.classList.toggle("highlight");
        default_img = ((default_img-1)%total_images+total_images)%total_images;
        img_elmt = document.getElementById(default_img.toString());
        img_elmt.classList.toggle("highlight");
        display_image();
    }
    else if(event.key === "ArrowDown"){
        let img_elmt = document.getElementById(default_img.toString());
        img_elmt.classList.toggle("highlight");
        default_img = (default_img+1)%total_images;
        img_elmt = document.getElementById(default_img.toString());
        img_elmt.classList.toggle("highlight");
        display_image();
    }
})


// Greet Button event handler 
const greet = document.getElementsByClassName("greet-toon")[0];
greet.addEventListener("mouseover",function(event){
    console.log(event);
})
