// fetch, load and show categories on html
/* 
1. created loadCategories function, used fetch to access the data. 
2. created another function named displayCategories to display the category section. 
3. We called this displayCategory function inside the loadCategory function
4. inside the displayCategory function we looped through each category by forEach method, we created a container variable, created a button element, added classes to it, provided with innerHtml and then appended it with the container.
5.Use classList.add() when adding a class to an element to avoid unintentionally overwriting existing classes.
Avoid classList = 'class-name', as it replaces the entire class list of the element.
6.appendChild() accepts a single Node object (like a div, button, etc.) and adds it as the last child of a specified parent. append() can accept multiple Node objects and even plain strings, allowing you to append text and elements at the same time.

*/


function getTimeString(timeInSeconds) {
    const hour = parseInt(timeInSeconds / 3600);
    const remainingSeconds = timeInSeconds % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${hour} hour ${minutes} minutes and ${seconds} seconds ago`
}

const demoCategory = {
    "category_id": "1001",
    "category": "Music"
}

// create load categories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log("Error: ", error));
}

// create display categories
const displayCategories = (categories) => {
    // console.log(data);
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach(element => {
        console.log(element);
        /* const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = element.category;
        categoriesContainer.append(button);
        button.onclick = alert('hello') */
        // another way
        const btnContainer = document.createElement('div');
        btnContainer.innerHTML = `
        <button id = "btn-${element.category_id}" onClick = "loadCategoryVideos(${element.category_id})" class = "btn category-btn">
        ${element.category}
        </button>
        `
        categoriesContainer.append(btnContainer)
    });
}


const loadVideos = (searchText) => {
    // fetch('https://openapi.programming-hero.com/api/phero-tube/videos') - this is for initial value, but if we want to implement the serach project, we will do the following
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)

        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log('The error is: ', error))
}

// remove active class 
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    // console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
}
// create category videos onclick
const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // sobar active class remove kore dibo
            removeActiveClass();

            // idr active class add korbo
            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(activeBtn);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch(error => console.log('The error is: ', error))
}

const loadDetails =async (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res =  await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
}

const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");
  
    detailContainer.innerHTML = `
     <img src=${video.thumbnail} />
     <p>${video.description}</p>
    `;
  
    // way-1
    // document.getElementById("showModalData").click();
    //way-2
    document.getElementById("customModal").showModal();
  };
  

/* const cardDemo = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "",
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
console.log(cardDemo.others.posted_date); */

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-section');
    videoContainer.innerHTML = ""; //this clears all the videos except the relevant category
    // console.log(videos);

    // showing the error page
    if (videos.length === 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class = "min-h-[200px] flex flex-col gap-5 justify-center items-center">
            <img src = "./assets/Icon.png"/>
            <h2 class="text-center text-xl font-bold">No content here in this category</h2>
        </div>
        `;
        return;
    } else {
        videoContainer.classList.add('grid');
    }
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList.add('card-compact');
        card.innerHTML = `
        <figure class = "h-[200px] relative">
            <img src="${video.thumbnail}"
            alt="video thumbnail" 
            class = "h-full w-full object-cover rounded-md" />
            ${video.others.posted_date?.length === 0
                ? ""
                : `<span class = "absolute right-2 bottom-2 text-xs bg-black text-slate-400 rounded-md p-1">${getTimeString(video.others.posted_date)}</span>`
            }
        </figure>
        <div class="py-2 px-0 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="author's picture">
            </div>
            <div>
                <h2 class="font-bold text-xl">${video.title}</h2>
                <div class="flex gap-2 items-center">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified === true
                ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="verified badge"></img>'
                : ""}
            </div>
            <p class="text-gray-500">${video.others.views}</p>
            <p><button onClick = "loadDetails('${video.video_id}')" class = "btn btn-sm btn-error">Details</button></p>
            </div>
        </div>`
        videoContainer.append(card);
    })

}

// search
document.getElementById("search-input").addEventListener('keyup', (e) =>{
    // console.log(e.target.value); //this gives us the search value
    loadVideos(e.target.value)

})


loadVideos();
loadCategories();


// try the sort feature on the basis of views. use splice to remove the 'k' and then sort them using array.sort() method.