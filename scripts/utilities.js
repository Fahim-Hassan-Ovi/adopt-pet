// Loading spinner
const loadingSpinner = (show)=>{
    const spinner = document.getElementById('loader')
   
    if(show){
        spinner.classList.remove('hidden');
        document.getElementById('all-pets').innerHTML="";
    }
    else{
        spinner.classList.add('hidden');
    }
}

// Remove active button style
const removeActiveClasses = () =>{
const allButtons = document.getElementsByClassName('category-btn');

for(btn of allButtons){
    btn.classList.remove('bg-emerald-100', 'rounded-full', 'border-primary','border-2');
    btn.classList.add('rounded-xl');
}
}

// Add active button style
const addActiveClasses = (category)=>{
const activeButton = document.getElementById(`btn-${category}`)
activeButton.classList.remove('rounded-xl');
activeButton.classList.add('bg-emerald-100', 'rounded-full', 'border-primary','border-2')
}

// handle like button
const like = (imgUrl)=>{
    const imageContainer = document.getElementById('liked-pets');
    const div = document.createElement('div');
    div.innerHTML= `
    <img class="rounded-lg" src="${imgUrl}" alt="">
    `
    imageContainer.appendChild(div);
}