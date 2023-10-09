let foodContainer = document.getElementById("food-container"),
    foodInput = document.getElementById("food-input"),
    dateInput = document.getElementById("date-input"),
    addButton = document.getElementById("add-button");

function setCookie(e, t, o) {
    let n = new Date;
    n.setTime(n.getTime() + 864e5 * o);
    let d = "expires=" + n.toLocaleDateString();
    document.cookie = e + "=" + t + ";" + d + ";path=/"
}

function getCookie(e) {
    let t = document.cookie.split(";");
    for (let o = 0; o < t.length; o++) {
        let n = t[o].trim();
        if (0 == n.indexOf(e + "=")) return n.slice(e.length + 1)
    }
    return ""
}

function loadFoodItems() {
    let e = getCookie("foodItems");
    if (e) {
        let t = JSON.parse(e);
        for (let o = 0; o < t.length; o++) {
            let n = t[o].food,
                d = t[o].date,
                l = document.createElement("div"),
                a = document.createElement("div"),
                r = document.createElement("div"),
                i = document.createElement("p"),
                c = document.createElement("p"),
                p = document.createElement("p");
            l.className = "card", a.className = "card-header", r.className = "card-body", i.textContent = n, c.textContent = new Date(d).toLocaleDateString();
            let s = new Date,
                m = Math.ceil((new Date(d) - s) / 864e5);
            m > 7 ? (p.textContent = "Good", p.style.color = "green") : m > 0 ? (p.textContent = "Expiring Soon", p.style.color = "orange") : (p.textContent = "Expired", p.style.color = "red"), p.className = "status", a.appendChild(i), r.appendChild(c), r.appendChild(p), l.appendChild(a), l.appendChild(r), foodContainer.appendChild(l)
        }
    }
}

function saveFoodItems() {
    let items = [];
    let cards = foodContainer.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let food = card.querySelector(".card-header p");
        let date = card.querySelector(".card-body p:first-child");
        let item = {
            food: food.textContent,
            date: date.textContent
        };
        items.push(item);
        // add 10 days to the product expiration date
        let newDate = new Date(date.textContent);
        newDate.setDate(newDate.getDate() + 10);
        // set the cookie with the new expiration date
        setCookie(food.textContent, date.textContent, newDate);
    }
    setCookie("foodItems", JSON.stringify(items), 30);
}

addButton.addEventListener("click", function () {
    let e = foodInput.value,
        t = dateInput.value;
    if (e && t) {
        let o = document.createElement("div"),
            n = document.createElement("div"),
            d = document.createElement("div"),
            l = document.createElement("p"),
            a = document.createElement("p"),
            r = document.createElement("p");
        o.className = "card", n.className = "card-header", d.className = "card-body", l.textContent = e, a.textContent = new Date(t).toLocaleDateString();
        let i = new Date,
            c = Math.ceil((new Date(t) - i) / 864e5);
        c > 7 ? (r.textContent = "Good", r.style.color = "green") : c > 0 ? (r.textContent = "Expiring Soon", r.style.color = "orange") : (r.textContent = "Expired", r.style.color = "red"), r.className = "status", n.appendChild(l), d.appendChild(a), d.appendChild(r), o.appendChild(n), o.appendChild(d), foodContainer.appendChild(o), foodInput.value = "", dateInput.value = "", saveFoodItems()
    }
}), window.onload = loadFoodItems;