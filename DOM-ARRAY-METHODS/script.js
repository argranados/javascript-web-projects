const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaresBtn = document.getElementById('show-millionares');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('http://randomuser.me/api');
    const data = await res.json();

    console.log(data);

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    // console.log(newUser);
    addData(newUser);
}

// Double everyones money
function sortByRichest() {
    data.sort((a,b) => b.money -a.money);

    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000)

    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    // updateDOM();
    // console.log(formatMoney(wealth))
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>
        ${formatMoney(
            wealth
        )
        }</strong><h3>`;
        main.appendChild(wealthEl);
}

// Double everyones money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2};
    });

    updateDOM();
    
}

// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}    

// update DOM
function updateDOM(providedData = data) {
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>
        ${formatMoney(
            item.money
        )
        }`;
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaresBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
    

