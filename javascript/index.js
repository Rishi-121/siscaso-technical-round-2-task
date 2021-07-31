// Task 1: Call the API (GET method)
fetch('https://my-json-server.typicode.com/dbevin/mock/cards')
    .then(response =>
        response.json()
            .then(data => addTableRowData(data))
            .catch((err) => {
                return {
                    message: 'Unable to get the data',
                    success: false
                };
            }))
    .catch((err) => {
        return {
            message: 'Server err',
            success: false
        };
    });

// Task 2: Show the data as in the table below
function addTableRowData(rows) {
    const table = document.getElementById('table');

    for (let i = 0; i <= rows.length; i++) {
        const rowElement = document.createElement('tr');

        const index = document.createElement('td');
        const name = document.createElement('td');
        const type = document.createElement('td');
        const artist = document.createElement('td');
        const mechanics = document.createElement('td');

        index.innerHTML = i + 1;
        name.innerHTML = '<b>' + rows[i].name + '</b>' + '<br /><br />' + rows[i].text;
        type.innerHTML = toCamelCase(rows[i].type);
        artist.innerHTML = rows[i].artist;

        // Task 3: 
        // e. Iterate the field mechanics array and show it like a tags.
        rows[i].mechanics === undefined ? 'Do nothing' :
            rows[i].mechanics.map((m) => {
                m = toCamelCase(m);
                mechanics.innerHTML += '<small class="tag">' + m + '</small>'
            });

        rowElement.appendChild(index);
        rowElement.appendChild(name);
        rowElement.appendChild(type);
        rowElement.appendChild(artist);
        rowElement.appendChild(mechanics);

        table.appendChild(rowElement);

        // Task 3: 
        // a. Highlight rows based on the cardClass
        rowElement.style.backgroundColor =
            rows[i].cardClass === 'NEUTRAL' ? '#FFF7CB' : '#CBFBFF';
    }
}

function searchAlgorithm() {
    // Task 3:
    // c. Search by name & text field
    const query = document.getElementById('search').value;
    const table = document.getElementById('table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let name = rows[i].getElementsByTagName('td')[1];
        let text = rows[i].getElementsByTagName('td')[2];

        if (name || text) {
            if (name.innerHTML.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                text.innerHTML.toLowerCase().indexOf(query.toLowerCase()) !== -1) {

                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

function dropDownFiltering() {
    // Task 3:
    // d. Filter by type

    const select = document.getElementById('dropDown');

    select.addEventListener('change', (e) => {
        const table = document.getElementById('table');
        const rows = table.getElementsByTagName('tr');

        if (select.value.toLowerCase() === 'default') {
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = '';
            }
        } else {
            for (let i = 0; i < rows.length; i++) {
                let type = rows[i].getElementsByTagName('td')[2];

                if (type) {
                    if (type.innerHTML.toLowerCase() === select.value.toLowerCase()) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        }
    });

}

// function pagination() {
//     // Task 3:
//     // b. Pagination (Per page 5 records)

//     const table = document.getElementById('table');
//     const rows = table.getElementsByTagName('tr');
// }

function toCamelCase(str) {
    str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (match, index) {
        return index === 0 ? match.toUpperCase() : match.toLowerCase();
    });

    return str;
}