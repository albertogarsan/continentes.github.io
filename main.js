const container = document.querySelector(".container")
const region = document.querySelector("#regions")
const filtre = document.querySelector("#filtre")

let resultados;
let opcio;
let poblacioMax;

const reset = function () {
    container.innerHTML = ""

    for (const pais of resultados) {
       
        const x = pais.population * 100 / poblacioMax
        
        const name = pais.name.common
        let capital
        if (pais.capital) {
            capital = pais.capital[0]
        } else {
            capital = ""
        }
        const bandera = pais.flag
        const extensio = pais.area
        const population = pais.population

        const card = document.createElement("section")
        card.classList.add("card")

        const cardContent = `
                <h1 class="h1"><span>${bandera}</span> País: ${name}</h1>
                <p class="capital">Capital: ${capital}</p>
                <p class="population">Població: ${population} habitants</p>
                <p class="extensio">Extensio: ${extensio} km2</p>
                <svg xmlns="http://www.w3.org/2000/svg" style="border: 2px solid #107286; width="100%" height="20px" viewBox="0 0 100% 20">
                <rect width="${x}%" height="20px" fill="#2092A9" />
                </svg>
                <span>${x.toFixed(2)}%</span>
        `

        card.innerHTML = cardContent
        container.appendChild(card)
    }
}

const ordenar = function () {
    switch (opcio) {
        case "poblacioAsc":
            resultados.sort(function (a, b) {
                return a.population - b.population
            })
            break;
        case "poblacioDes":
            resultados.sort(function (b, a) {
                return a.population - b.population
            })
            break;
        case "extensioAsc":
            resultados.sort(function (a, b) {
                return a.area - b.area
            })
            break;
        case "extensioDes":
            resultados.sort(function (b, a) {
                return a.area - b.area
            })
            break;
        default:
            resultados.sort(function (a, b) {
                return a.name.common.localeCompare(b.name.common)
            })
            break;
    }
}

region.addEventListener('change', (e) => {
    const regio = e.target.value

    fetch(`https://restcountries.com/v3.1/region/${regio}`).then((resposta) => resposta.json()).then((resultats) => {
        console.log(resultats)

        resultados = resultats

        poblacioMax = resultados.sort((a,b) => {
            return b.population - a.population
        })[0].population

        ordenar()
        reset()
    })
})

filtre.addEventListener("change", (e) => {
    opcio = e.target.value
    ordenar()
    reset()
})
