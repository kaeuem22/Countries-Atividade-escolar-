const cards = {
    search(option) {
        const url = 'https://restcountries.com/v3.1/region/'

        fetch(url + option).then(response => response.json()).then(json => cards.create(json)) //o "then()" vai ser rodado só e logo depois do fetch e o "r" significa response, traz os resultados, transforma em JSON e depois podemos aplicar nos cards
    },

    directSearch() {
        const name = document.getElementById('search_bar').value
        const url = 'https://restcountries.com/v3.1/name/'

        fetch(url + name).then(response => response.json()).then(json => cards.create(json))
        return false;
    },

    create(countries) {
        const countriesArea = document.querySelector(".countries")
        countriesArea.innerHTML = ''

        countries.forEach(country => {
            countriesArea.innerHTML += `<div class="card">
            <img src="${country.flags.png}" alt="${country.name.common}">
            <div class="info">
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString('en-Us')}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital : 'none'}</p>
            </div>
            </div>`
        })// o "Capital" us um if ternario no "${}"
    }
}


const theme = {
    colorTheme: 'light', 

    change() {
        const body = document.querySelector("body")
        const icon = document.querySelector(".theme i")

        if(theme.colorTheme === 'light'){
            body.classList.remove('light-theme')
            body.classList.add('dark-theme')
            icon.classList.remove('fa-regular')
            icon.classList.add('fa-solid')
            theme.colorTheme = 'dark'
            return
        }
       
            body.classList.remove('dark-theme')
            body.classList.add('light-theme')
            icon.classList.remove('fa-solid')
            icon.classList.add('fa-regular')
            theme.colorTheme = 'light'
    }
}

const app = {
    init() {
        const select = document.querySelector('.options')
        const themeButton = document.querySelector(".theme button")
        themeButton.addEventListener('click', theme.change)

        select.addEventListener('change', () => {
            // função de pesquisa
            cards.search(select.value) // passa o valor selecionado para o "cards"
        })
    }
}

app.init()