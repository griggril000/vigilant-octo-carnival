// Get the elements from the document
let foodTable = document.getElementById("food-table");
let foodInput = document.getElementById("food-input");
let dateInput = document.getElementById("date-input");
let addButton = document.getElementById("add-button");

// Define a function to set a cookie with a name, value, and expiration date
function setCookie(name, value, days) {
    // Create a date object for the expiration date
    let date = new Date();
    // Set the date to the current date plus the number of days
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    // Convert the date to a string in UTC format
    let expires = "expires=" + date.toUTCString();
    // Create the cookie string with the name, value, and expiration date
    let cookie = name + "=" + value + ";" + expires + ";path=/";
    // Set the cookie in the document
    document.cookie = cookie;
}

// Define a function to get a cookie value by its name
function getCookie(name) {
    // Get the cookie string from the document
    let cookie = document.cookie;
    // Split the cookie string by semicolons into an array of key-value pairs
    let pairs = cookie.split(";");
    // Loop through the pairs array
    for (let i = 0; i < pairs.length; i++) {
        // Trim any whitespace from the pair
        let pair = pairs[i].trim();
        // Check if the pair starts with the name followed by an equal sign
        if (pair.indexOf(name + "=") == 0) {
            // Return the value of the pair by slicing it from the equal sign to the end
            return pair.slice(name.length + 1);
        }
    }
    // Return an empty string if no matching pair is found
    return "";
}

// Define a function to load the food items from the cookies and display them in the table
function loadFoodItems() {
    // Get the food items string from the cookies by its name "foodItems"
    let foodItems = getCookie("foodItems");
    // Check if the food items string is not empty
    if (foodItems) {
        // Parse the food items string into an array of objects
        let items = JSON.parse(foodItems);
        // Loop through the items array
        for (let i = 0; i < items.length; i++) {
            // Get the food and date properties of the current item
            let food = items[i].food;
            let date = items[i].date;

            // Create a new table row element
            let row = document.createElement("tr");

            // Create three table cell elements for the food, date, and status
            let foodCell = document.createElement("td");
            let dateCell = document.createElement("td");
            let statusCell = document.createElement("td");

            // Set the text content of the cells to the food and date values
            foodCell.textContent = food;
            dateCell.textContent = date;

            // Calculate the number of days until the expiration date
            let today = new Date();
            let expirationDate = new Date(date);
            let daysLeft = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));

            // Set the status cell text and color based on the days left
            if (daysLeft > 7) {
                statusCell.textContent = "Good";
                statusCell.style.color = "green";
            } else if (daysLeft > 0) {
                statusCell.textContent = "Soon";
                statusCell.style.color = "orange";
            } else {
                statusCell.textContent = "Expired";
                statusCell.style.color = "red";
            }

            // Append the cells to the row
            row.appendChild(foodCell);
            row.appendChild(dateCell);
            row.appendChild(statusCell);

            // Append the row to the table
            foodTable.appendChild(row);
        }
    }
}

// Define a function to save the food items from the table to the cookies
function saveFoodItems() {
    // Create an empty array to store the food items
    let items = [];
    // Get all the table rows from the table except the first one (the header)
    let rows = foodTable.querySelectorAll("tr:not(:first-child)");
    // Loop through the rows array
    for (let i = 0; i < rows.length; i++) {
        // Get the current row element
        let row = rows[i];
        // Get the food and date cells from the row
        let foodCell = row.querySelector("td:first-child");
        let dateCell = row.querySelector("td:nth-child(2)");
        // Get the text content of the cells
        let food = foodCell.textContent;
        let date = dateCell.textContent;
        // Create an object with the food and date properties
        let item = { food: food, date: date };
        // Push the item object to the items array
        items.push(item);
    }
    // Convert the items array into a string using JSON.stringify
    let foodItems = JSON.stringify(items);
    // Set the cookie with the name "foodItems", the value of the food items string, and an expiration date of 30 days
    setCookie("foodItems", foodItems, 30);
}

// Add a click event listener to the add button
addButton.addEventListener("click", function () {
    // Get the values from the input fields
    let food = foodInput.value;
    let date = dateInput.value;

    // Check if the input fields are not empty
    if (food && date) {
        // Create a new table row element
        let row = document.createElement("tr");

        // Create three table cell elements for the food, date, and status
        let foodCell = document.createElement("td");
        let dateCell = document.createElement("td");
        let statusCell = document.createElement("td");

        // Set the text content of the cells to the input values
        foodCell.textContent = food;
        dateCell.textContent = date;

        // Calculate the number of days until the expiration date
        let today = new Date();
        let expirationDate = new Date(date);
        let daysLeft = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));

        // Set the status cell text and color based on the days left
        if (daysLeft > 7) {
            statusCell.textContent = "Good";
            statusCell.style.color = "green";
        } else if (daysLeft > 0) {
            statusCell.textContent = "Soon";
            statusCell.style.color = "orange";
        } else {
            statusCell.textContent = "Expired";
            statusCell.style.color = "red";
        }

        // Append the cells to the row
        row.appendChild(foodCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);

        // Append the row to the table
        foodTable.appendChild(row);

        // Clear the input fields
        foodInput.value = "";
        dateInput.value = "";

        // Save the food items to the cookies
        saveFoodItems();
    }
});

// Load the food items from the cookies when the page loads
window.onload = loadFoodItems;