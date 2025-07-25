let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav a");

// Smooth scrolling and page linking
navLinks.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute("href").substring(1); // Get target section ID
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
    }
  });
});

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(section => {
    let offset = section.offsetTop - 150; // Adjust for fixed nav or similar
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active"); // Remove active class from all links
      });
      document.querySelector("nav a[href='#" + id + "']").classList.add("active"); // Highlight the current link
    }
  });
};

const url = 'data.json'; // Path to your JSON file

// Function to filter destinations
function filterDest(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        button.classList.toggle("active", value.toUpperCase() === button.innerText.toUpperCase());
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        if (value === "all" || element.classList.contains(value)) {
            element.classList.remove("hide");
        } else {
            element.classList.add("hide");
        }
    });
}

// Function to create cards for all destinations
function createCards(destList) {
    document.getElementById("countries").innerHTML = ""; // Clear previous cards
    for (let i of destList) {
        let card = document.createElement("div");
        card.classList.add("card", i.continent, "hide");

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        let image = document.createElement("img");
        image.setAttribute("src", i.image);
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);

        let container = document.createElement("div");
        container.classList.add("container");

        let name = document.createElement("h5");
        name.classList.add("name");
        name.innerText = i.Name.toUpperCase();
        container.appendChild(name);

        let continent = document.createElement("h6");
        continent.classList.add("continent");
        continent.innerText = i.continent;
        container.appendChild(continent);

        // Display price
        let price = document.createElement("p");
        price.classList.add("price");
        price.innerText = i.price; // Display price
        container.appendChild(price);

        // Explore More link
        if (i.fileLocation) {
            let exploreLink = document.createElement("a");
            exploreLink.classList.add("explore-more");
            exploreLink.innerText = "Explore More";
            exploreLink.href = i.fileLocation; // Set the link to the individual page
            container.appendChild(exploreLink);
        }

        card.appendChild(container);
        document.getElementById("countries").appendChild(card);
    }
}

// Function to display all cards initially
function displayAllCards(destinations) {
    createCards(destinations);
    filterDest("all");
}

fetch(url)
    .then(response => response.json())
    .then(products => {
        let destinations = products.allDest;

        // Create initial cards
        displayAllCards(destinations);

        // Price filter functionality
        document.getElementById("price-low-to-high").addEventListener("click", function() {
            destinations.sort((a, b) => parseInt(a.price.replace(/[$,]/g, "")) - parseInt(b.price.replace(/[$,]/g, "")));
            displayAllCards(destinations); // Update cards after sorting
        });

        document.getElementById("price-high-to-low").addEventListener("click", function() {
            destinations.sort((a, b) => parseInt(b.price.replace(/[$,]/g, "")) - parseInt(a.price.replace(/[$,]/g, "")));
            displayAllCards(destinations); // Update cards after sorting
        });

        // Autocomplete and live search function
        document.getElementById("search-input").addEventListener("input", function () {
            let searchInput = this.value.toUpperCase();
            let suggestions = [];

            document.getElementById("suggestions").innerHTML = ""; // Clear previous suggestions

            // Filter and show suggestions based on input
            if (searchInput) {
                destinations.forEach((destination) => {
                    if (
                        destination.Name.toUpperCase().includes(searchInput) ||
                        destination.continent.toUpperCase().includes(searchInput)
                    ) {
                        suggestions.push(destination.Name + " (" + destination.continent + ")");
                    }
                });

                // Show suggestions
                suggestions.forEach((suggestion) => {
                    let suggestionItem = document.createElement("div");
                    suggestionItem.classList.add("suggestion-item");
                    suggestionItem.innerText = suggestion;

                    suggestionItem.addEventListener("click", function () {
                        document.getElementById("search-input").value = suggestion.split(" ")[0]; // Set input to clicked suggestion
                        document.getElementById("suggestions").innerHTML = ""; // Clear suggestions
                        liveSearch(); // Perform search based on selected suggestion
                    });

                    document.getElementById("suggestions").appendChild(suggestionItem);
                });
            }

            // Perform live search on input
            liveSearch();
        });

        // Function to perform live search and filter cards as user types
        function liveSearch() {
            let searchInput = document.getElementById("search-input").value.toUpperCase();
            let cards = document.querySelectorAll(".card");

            cards.forEach((card) => {
                let name = card.querySelector(".name").innerText.toUpperCase();
                let continent = card.querySelector(".continent").innerText.toUpperCase();

                if (name.includes(searchInput) || continent.includes(searchInput)) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        }

        // Update event listener for search input
        document.getElementById("search-input").addEventListener("input", liveSearch);

        // Search button functionality
        document.getElementById("search").addEventListener("click", function () {
            document.getElementById("suggestions").innerHTML = ""; // Clear suggestions when search button is clicked
            liveSearch(); // Perform search on button click
        });
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });

// Make sure filterDest is called on page load
window.onload = () => {
    filterDest("all");
};
