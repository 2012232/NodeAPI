const country_link = "https://animated-waddle-7xr5qrqvwr62w49-6006.app.github.dev/country";

fetch(country_link)
    .then((response) => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        const tbody = document.querySelector("#countryTable tbody");
        data.forEach(c => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${c.country_id}</td>
            <td>${c.country_name}</td>
            <td>${c.region_id}</td>
            `;
            tbody.appendChild(row);
        });

        
    })
    .catch(err=>{
        console.log(err.message);
    });
    