const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories)
}
const loadAllPets = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data =await res.json()
    displayPets(data.pets)
}

const displayPets = (data) =>{
    const petContainers = document.getElementById('all-pets');
    data.forEach(pet=>{
        const div = document.createElement('div');
        div.classList.add('flex', 'flex-col', 'gap-2','p-4','border','rounded-xl','font-bold');
        div.innerHTML= `
        <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}" alt="">
        <h3 class="text-xl">${pet.pet_name}</h3>
        <p class="text-sm text-gray-700">Breed: ${pet.breed? pet.breed: 'Not Available'}</p>
        <p class="text-sm text-gray-700">Birth: ${pet.date_of_birth? pet.date_of_birth: 'Not Found'}</p>
        <p class="text-sm text-gray-700">Gender: ${pet.gender? pet.gender: 'Unknown'}</p>
        <p class="text-sm text-gray-700">Price: ${pet.price? pet.price : 'Not Fixed'}</p>
        `
        petContainers.appendChild(div);
    })
}

const displayCategories = (data) => {
    const categoryContainer = document.getElementById('pet-categories');
    data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn category-btn bg-white flex item-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
                <img class="w-10" src="${category.category_icon}" alt="">
                <p class="text-xl font-bold">${category.category}</p>
        </button>
        `
        categoryContainer.appendChild(div);
    })
}
loadCategories();
loadAllPets();