let foodContainer = document.getElementById("food-container"),
    foodInput = document.getElementById("food-input"),
    dateInput = document.getElementById("date-input"),
    addButton = document.getElementById("add-button");
function setCookie(e, t, o) {
    let n = new Date();
    n.setTime(n.getTime() + 864e5 * o);
    let l = "expires=" + n.toUTCString();
    document.cookie = e + "=" + t + ";" + l + ";path=/";
}
function getCookie(e) {
    let t = document.cookie.split(";");
    for (let o = 0; o < t.length; o++) {
        let n = t[o].trim();
        if (0 == n.indexOf(e + "=")) return n.slice(e.length + 1);
    }
    return "";
}
function loadFoodItems() {
    let e = getCookie("foodItems");
    if (e) {
        let t = JSON.parse(e);
        for (let o = 0; o < t.length; o++) {
            let n = t[o].food,
                l = t[o].date,
                d = document.createElement("div"),
                r = document.createElement("div"),
                i = document.createElement("div"),
                a = document.createElement("p"),
                c = document.createElement("p"),
                p = document.createElement("p");
            d.className = "card";
            r.className = "card-header";
            i.className = "card-body";
            a.textContent = n;
            c.textContent = l;
            let s = new Date(),
                u = Math.ceil((new Date(l) - s) / 864e5);
            u > 7
                ? ((p.textContent = "Good"), (p.style.color = "green"))
                : u > 0
                    ? ((p.textContent = "Soon"), (p.style.color = "orange"))
                    : ((p.textContent = "Expired"), (p.style.color = "red"));
            p.className = "status";
            r.appendChild(a);
            i.appendChild(c);
            i.appendChild(p);
            d.appendChild(r);
            d.appendChild(i);
            foodContainer.appendChild(d);
        }
    }
}
function saveFoodItems() {
    let e = [],
        t = foodContainer.querySelectorAll(".card");
    for (let o = 0; o < t.length; o++) {
        let n = t[o],
            l = n.querySelector(".card-header p"),
            d = n.querySelector(".card-body p:first-child"),
            r,
            i = { food: l.textContent, date: d.textContent };
        e.push(i);
    }
    setCookie("foodItems", JSON.stringify(e), 30);
}
addButton.addEventListener("click", function () {
    let e = foodInput.value,
        t = dateInput.value;
    if (e && t) {
        let o = document.createElement("div"),
            n = document.createElement("div"),
            l = document.createElement("div"),
            d = document.createElement("p"),
            r = document.createElement("p"),
            i = document.createElement("p");
        o.className = "card";
        n.className = "card-header";
        l.className = "card-body";
        d.textContent = e;
        r.textContent = t;
        let a = new Date(),
            c = Math.ceil((new Date(t) - a) / 864e5);
        c > 7
            ? ((i.textContent = "Good"), (i.style.color = "green"))
            : c > 0
                ? ((i.textContent = "Soon"), (i.style.color = "orange"))
                : ((i.textContent = "Expired"), (i.style.color = "red"));
        i.className = "status";
        n.appendChild(d);
        l.appendChild(r);
        l.appendChild(i);
        o.appendChild(n);
        o.appendChild(l);
        foodContainer.appendChild(o);
        foodInput.value = "";
        dateInput.value = "";
        saveFoodItems();
    }
}),
    (window.onload = loadFoodItems);
