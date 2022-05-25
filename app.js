import images from "./ImageData/imagedata.js";

const img_list = document.querySelector(".list-container");
const img_disp = document.querySelector(".display-image");
const disp_caption = document.querySelector(".displayed-caption");
const greet = document.getElementsByClassName("greet-toon")[0];

//FIXME: use let/const
var current_img = 0;
var total_images = 0;

// displaying the heading based on current time
(function makeHeading() {
  let today = new Date();
  let hrs = today.getHours();
  let heading = "";
  if (hrs < 12) {
    heading = "Good Morning 🌤️, Welcome to my Image Viewer";
  } else if (hrs < 18) {
    heading = "Good Afternoon 🌞, Welcome to my Image Viewer";
  } else {
    heading = "Good Evening 🌳, Welcome to my Image Viewer";
  }
  //TODO: get element by id
  const appHeading = document.getElementsByClassName("heading")[0];
  appHeading.innerText = heading;
})();

// functions for handling the overflow
function getTextWidth(text, font) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const { width } = context.measureText(text);
  return width;
}

function handleOverflow(index, caption) {
  let outer_box = document.querySelector(".img-descr-container");
  const box_width = outer_box.clientWidth;

  let curr_box = document.getElementById(index.toString());
  curr_box = curr_box.lastElementChild.lastElementChild;

  const font = window.getComputedStyle(curr_box).font;
  let width = getTextWidth(caption, font);

  let mid = caption.length / 2;
  while (width > box_width) {
    caption = caption.slice(0, mid) + "..." + caption.slice(-mid);
    //TODO: binary search
    mid--;
    width = getTextWidth(caption, font);
  }
  return caption;
}

/**
 * creating side bar content
 * @param {image object} img
 * @returns string content
 */
function contentMaker(img) {
  //TODO:  img.previewImage, img.title
  const content = `
        <div class="img-icon-container">
            <img class="img-icon" src=${img["previewImage"]} alt="Icon can't be loaded">
        </div>
        <div class="img-descr-container">
            <span class="img-descr">${img["title"]}</span>
        </div>
    `;
  return content;
}

/**
 * Displaying the selected current image
 */
function displayImage() {
  //TODO:  img.previewImage,
  //TODO: make image element
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
// function to get id of list item

images.forEach((img, index) => {
  const new_div = document.createElement("div");
  new_div.classList.add("list-item");
  //FIXME: id
  new_div.setAttribute("id", +index.toString());
  const content = contentMaker(img);
  new_div.innerHTML = content;

  if (index === 0) {
    new_div.classList.add("highlight");
  }
  new_div.addEventListener("click", function (event) {
    //TODO: extract function
    document
      .getElementById(current_img.toString())
      .classList.toggle("highlight");
    current_img = +new_div.getAttribute("id");
    document
      .getElementById(current_img.toString())
      .classList.toggle("highlight");
    displayImage();
  });
  img_list.append(new_div);
  total_images += 1;
});

images.forEach((img, index) => {
  let curr_descr = document.getElementById(index.toString());
  curr_descr = curr_descr.lastElementChild;
  const caption = handleOverflow(index, img["title"]);
  curr_descr.innerHTML = `
    <span class="img-descr">${caption}</span>
    `;
});

// Event Listener for updating the editable caption with side bar content
disp_caption.addEventListener("input", function (event) {
  let target = document.getElementById(current_img.toString()).lastElementChild;
  target.innerText = handleOverflow(current_img, this.innerText);

  //FIXME:
  let edited_content = document.getElementsByClassName("displayed-caption")[0];
  //FIXME: .title
  images[current_img]["title"] = edited_content.innerText;
});

/**
 * Eventlistener for the keypresses
 */
window.addEventListener("keydown", function (event) {
  //FIXME: remove
  // console.log(event);
  //toggling the highlight and changing the image based on the keypress
  if (event.key === "ArrowUp") {
    let img_elmt = document.getElementById(current_img.toString());
    img_elmt.classList.toggle("highlight");
    //FIXME:
    current_img =
      (((current_img - 1) % total_images) + total_images) % total_images;
    img_elmt = document.getElementById(current_img.toString());
    img_elmt.classList.toggle("highlight");
    displayImage();
  } else if (event.key === "ArrowDown") {
    let img_elmt = document.getElementById(current_img.toString());
    img_elmt.classList.toggle("highlight");
    current_img = (current_img + 1) % total_images;
    img_elmt = document.getElementById(current_img.toString());
    img_elmt.classList.toggle("highlight");
    //FIXME: call once
    displayImage();
  }
});

// Greet Button event handler
greet.addEventListener("mouseover", function (event) {
  //TODO: refactor
  let msg = document.querySelector(".greet-message");
  msg.classList.toggle("greet-message");
  msg.classList.toggle("greet-message-display");
});

greet.addEventListener("mouseout", function () {
  //TODO: refactor
  let msg = document.querySelector(".greet-message-display");
  msg.classList.toggle("greet-message");
  msg.classList.toggle("greet-message-display");
});
//FIXME: add on container
window.addEventListener("resize", function () {
  images.forEach((img, index) => {
    //TODO: use id
    const curr_descr = document.getElementById(
      index.toString()
    ).lastElementChild;
    const caption = handleOverflow(index, img["title"]);
    //span, change properties
    curr_descr.innerHTML = `
        <span class="img-descr">${caption}</span>
        `;
  });
});
