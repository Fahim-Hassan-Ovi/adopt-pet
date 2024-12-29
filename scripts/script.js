const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories)
}
const displayCategories = (data) => {

    const categoryContainer = document.getElementById('pet-categories');
    data.forEach(category => {
        console.log(category)
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