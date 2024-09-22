let quotes = [];

fetch('quotes.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load quotes.");
        }
        return response.json();
    })
    .then(data => {
        quotes = data;
        console.log("Quotes loaded successfully:", quotes);
    })
    .catch(error => {
        console.error("Error loading quotes: ", error);
    });

function generateQuote() {
    if (quotes.length === 0) {
        alert("Quotes are not loaded yet, please try again later.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteData = quotes[randomIndex];
    
    // Use capitalized keys for the quote and author
    document.getElementById("quote").textContent = quoteData.Quote;
    document.getElementById("author").textContent = `- ${quoteData.Author}`;
}

function shareImage() {
    alert("Share functionality coming soon!");
}
