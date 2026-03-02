async function searchCountry(countryName) {

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const country = data[0];

        let borders = data[0].borders || "none";
        
        // Fetch country data
        // const data2 = await response2.json();
        // const borders = data2[0];
        // Update DOM
       
        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        <p><strong>Bordering-countries:</p>`;
        
        // Fetch bordering countries
        
        // Update bordering countries section
        const borderContainer = document.getElementById("bordering-countries");
        borderContainer.innerHTML = "";

if (country.borders) {
    for (let i = 0; i < country.borders.length; i++) {
        const code = country.borders[i];

        const response2 = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data2 = await response2.json();
        const borderCountry = data2[0];

        borderContainer.innerHTML += `
            <p>${borderCountry.name.common}</p>
            <img src="${borderCountry.flags.svg}" 
                 alt="${borderCountry.name.common} flag">
        `;
    }
} else {
    borderContainer.innerHTML = "<p>No bordering countries</p>";
}
       
    } catch (error) {
        console.error(error.message);
       document.getElementById('country-info').innerHTML = `
        <p style="color:red;">${error.message}</p>
    `;
    } finally {
        spinner.classList.add('hidden');

// Add the 'is-hidden' class to hide it
spinner.classList.add("is-hidden");
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
