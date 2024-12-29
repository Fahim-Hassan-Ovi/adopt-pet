const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories)
}
const loadAllPets = async () => {
    loadingSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    setTimeout(() => {
        storesPetData = data.pets;
        displayPets(data.pets);
        loadingSpinner(false)
    }, 2000)
}
const loadPetsByCategory = async (category) => {
    // Remove active class if exists
    removeActiveClasses();
    // Show active class
    addActiveClasses(category);
    // spinner call
    loadingSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json()
    setTimeout(() => {
        storesPetData = data.data;
        displayPets(data.data);
        loadingSpinner(false)
    }, 2000)
}
const loadPetDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json()
  displayPetDetails(data.petData);
}

const displayPetDetails = e =>{
    const modalBody = document.getElementById('modal-content');
    modalBody.innerHTML= `
    <img class="w-full h-60 rounded-xl object-cover" src="${e.image}" alt="">
    <h2 class="text-xl font-bold my-2">${e.pet_name}</h2>
    <div class="flex items-start gap-6">
        <div>
            <p class="text-gray-400 text-sm"><i class="fa-solid fa-table-cells"></i>Breed: ${e.breed ? e.breed : 'Not Available'}</p>

            <p class="text-gray-400 text-sm"><i class="fa-regular fa-calendar"></i>Birth: ${e.date_of_birth ? e.date_of_birth : 'Not Found'}</p>

            <p class="text-gray-400 text-sm"><i class="fa-solid fa-mercury"></i>Gender: ${e.gender ? e.gender : 'Unknown'}</p>

        </div>
        <div>
            <p class="text-gray-400 text-sm"><i class="fa-solid fa-dollar-sign"></i>Price: ${e.price ? '$' + e.price :'Not Fixed'}</p>

            <p class="text-gray-400 text-sm"><i class="fa-solid fa-syringe"></i>Vaccinated status: ${e.vaccinated_status? e.vaccinated_status :'Not Done'}</p>

        </div>
    </div>
    <hr class="my-2">

    <h2 class="text-md font-semibold">Details Information</h2>
    <p class="text-gray-400 text-sm">Breed: ${e.pet_details? e.pet_details : 'Not Available'}</p>
    `
    customModal.showModal();
}

const displayPets = (data) => {
    const petContainers = document.getElementById('all-pets');
    if (data.length === 0) {
        petContainers.classList.remove('grid')
        petContainers.innerHTML= `
        <div class="flex flex-col gap-4 justify-center items-center bg-[#13131308] py-9 px-8 rounded-xl">
            <img src="images/error.webp" alt="">
            <h2 class="text-3xl font-bold">No Information Available</h2>
            <p class="text-gray-400 text-xl">Sorry, we donn't have any pet in this category. We are very sorry for our limitation. If you need this category pet, please contact with us. </p>
        </div>
        `
        return
    }
    else {
        petContainers.classList.add('grid')
    }
    data.forEach(pet => {
        const div = document.createElement('div');
        div.classList.add('flex', 'flex-col', 'gap-2', 'p-4', 'border', 'rounded-xl', 'font-bold');
        div.innerHTML = `
        <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}" alt="">
        <h3 class="text-xl">${pet.pet_name}</h3>
        <p class="text-sm text-gray-700">Breed: ${pet.breed ? pet.breed : 'Not Available'}</p>
        <p class="text-sm text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Found'}</p>
        <p class="text-sm text-gray-700">Gender: ${pet.gender ? pet.gender : 'Unknown'}</p>
        <p class="text-sm text-gray-700">Price: ${pet.price ? "$" + pet.price : 'Not Fixed'}</p>
        <hr class="my-2">
        <div class="flex justify-between items-center px-2">
            <button onclick="like('${pet.image}')" class="btn bg-white text-primary rounded-lg py-1 px-4"><i class="fa-regular fa-thumbs-up"></i></button>
            <button onclick="adoptModal(this)" class="btn bg-white text-primary rounded-lg py-1 px-4">Adopt</button>
            <button onclick="loadPetDetails('${pet.petId}')" class="btn bg-white text-primary rounded-lg py-1 px-4">Details</button>

        </div>
        `
        petContainers.appendChild(div);
    })
}

const displayCategories = (data) => {
    const categoryContainer = document.getElementById('pet-categories');
    data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex item-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
                <img class="w-10" src="${category.category_icon}" alt="">
                <p class="text-xl font-bold">${category.category}</p>
        </button>
        `
        categoryContainer.appendChild(div);
    })
}

// adopt button functionality
const adoptModal = event => {
    let count = 3;
    const countContainer = document.getElementById('countdown-container');
    countContainer.innerText = count;
    countdownModal.showModal();
    const interval = setInterval(() => {
        count--;
        if (count !== 0) countContainer.innerText = count;
        if (count < 1) {
            clearInterval(interval);
            countdownModal.close();
            event.textContent = 'Adopted'
            event.disabled = 'true';
        }
    }, 1000)
}

loadCategories();
loadAllPets();
loadPetsByCategory();