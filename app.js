import images from "./ImageData/imagedata.js";

const img_list = document.querySelector(".list-container");
const img_disp = document.querySelector(".display-image");
const disp_caption = document.querySelector(".displayed-caption");
const greet = document.querySelector(".greet-toon");

let current_img = 0;
let total_images = 0;

// Toggling the highlight class of given id container
function toggleHighlight(id) {
  const elmt = document.getElementById(id);
  elmt.classList.toggle("highlight");
}

// Displaying the WebApp heading based on the current time
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
  const appHeading = document.querySelector(".heading");
  appHeading.innerText = heading;
})();

// Calculating the string caption width in pixels
function getTextWidth(text, font) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const { width } = context.measureText(text);
  return width;
}

// Handling the dynamic overflow in the caption labels
function handleOverflow(index, caption) {
  let outer_box = document.querySelector(".img-descr-container");
  const box_width = outer_box.clientWidth;

  let curr_box = document.getElementById(index.toString());
  curr_box = curr_box.lastElementChild.lastElementChild;

  const font = window.getComputedStyle(curr_box).font;
  let width = getTextWidth(caption, font);

  if (width <= box_width) return caption;
  let r = caption.length - 1;
  let l = 0;
  let mid = 0;
  while (l <= r) {
    mid = (l + r) / 2;
    const temp = caption.slice(0, mid) + "..." + caption.slice(-mid);
    width = getTextWidth(temp, font);
    if (width > box_width) {
      r = mid - 1;
    } else l = mid + 1;
  }

  caption = caption.slice(0, r) + "..." + caption.slice(-r + 1);
  return caption;
}

// Creating side bar content for the images data
function contentMaker(index, img) {
  const content = `
        <div class="img-icon-container">
            <img class="img-icon" src=${img.previewImage} alt="Icon can't be loaded">
        </div>
        <div class="img-descr-container">
            <span class="img-descr" id="descr-${index}">${img.title}</span>
        </div>
    `;
  return content;
}

// Displaying the current Image in the view bar
function displayImage() {
  const img_content = `
        <img class="displayed-image" src=${images[current_img].previewImage} alt=${images[current_img].title}>
    `;
  const caption = `${images[current_img].title}`;
  img_disp.innerHTML = img_content;
  disp_caption.innerHTML = caption;
}

// Display first image on loading
displayImage();

// Loading sidebar image list and adding the event listeners
images.forEach((img, index) => {
  const new_div = document.createElement("div");
  new_div.classList.add("list-item");
  new_div.setAttribute("id", index);
  const content = contentMaker(index, img);
  new_div.innerHTML = content;

  if (index === 0) {
    new_div.classList.add("highlight");
  }
  new_div.addEventListener("click", function (event) {
    toggleHighlight(current_img);
    current_img = +new_div.getAttribute("id");
    toggleHighlight(current_img);
    displayImage();
  });
  img_list.append(new_div);
  total_images += 1;
});

// Truncating the label string of the sidebar
images.forEach((img, index) => {
  let curr_descr = document.getElementById(`descr-${index}`);
  const caption = handleOverflow(index, img.title);
  curr_descr.innerHTML = `
    <span class="img-descr" id="descr-${index}">${caption}</span>
    `;
});

// Event Listener for updating the editable caption with side bar content
disp_caption.addEventListener("input", function (event) {
  let target = document.getElementById(`descr-${current_img}`);
  target.innerText = handleOverflow(current_img, this.innerText);

  const edited_content = document.querySelector(".displayed-caption");
  images[current_img].title = edited_content.innerText;
});

// Event Listener for the key presses
window.addEventListener("keydown", function (event) {
  if (event.key == "ArrowUp") {
    toggleHighlight(current_img);
    current_img = (current_img + total_images - 1) % total_images;
    toggleHighlight(current_img);
  } else if (event.key == "ArrowDown") {
    toggleHighlight(current_img);
    current_img = (current_img + 1) % total_images;
    toggleHighlight(current_img);
  }
  displayImage();
});

// toggling the greet button class
function toggleGreetMsg(elmt) {
  elmt.classList.toggle("greet-message");
  elmt.classList.toggle("greet-message-display");
}

// Greet Button event handler
greet.addEventListener("mouseover", function (event) {
  const msg = document.querySelector(".greet-message");
  toggleGreetMsg(msg);
});

greet.addEventListener("mouseout", function () {
  const msg = document.querySelector(".greet-message-display");
  toggleGreetMsg(msg);
});

window.addEventListener("resize", function () {
  images.forEach((img, index) => {
    const curr_descr = document.getElementById(`descr-${index}`);
    const caption = handleOverflow(index, img.title);
    curr_descr.innerText = caption;
  });
});
