// Load the quotes from the JSON file on window load
window.onload = function() {
    loadQuotes();
};

// Fetch and load the quotes from the JSON file
function loadQuotes() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(data => {
            window.quotes = data;
            generateQuote(); // Automatically generate a quote when quotes are loaded
        })
        .catch(error => console.error('Error loading quotes:', error));
}

// Generate a random quote
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * window.quotes.length);
    const randomQuote = window.quotes[randomIndex];

    const quoteText = randomQuote.Quote;
    const authorText = "St. " + randomQuote.Author;

    createShareableImage(quoteText, authorText);
}

// Create the image with the quote and author
function createShareableImage(quoteText, authorText) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const backgroundImage = new Image();
    backgroundImage.src = 'parchment.jpg';

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 450;

    backgroundImage.onload = function() {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Adjust the font size based on quote length
        let fontSize = 36;
        if (quoteText.length > 200) {
            fontSize = 24; // Make font smaller for long quotes
        } else if (quoteText.length > 150) {
            fontSize = 28;
        } else if (quoteText.length > 100) {
            fontSize = 32;
        }

        // Set font for title
        context.font = 'bold 36px Georgia';
        context.fillStyle = '#000';
        context.textAlign = 'center';

        // Add title "Wisdom of the Saints"
        context.fillText("Wisdom of the Saints", canvas.width / 2, 80);

        // Set font for quote and adjust font size if needed
        context.font = `${fontSize}px Georgia`;
        wrapText(context, quoteText, canvas.width / 2, 160, 500, fontSize + 10);

        // Add author text
        context.font = 'italic 24px Georgia';
        context.fillText(authorText, canvas.width / 2, canvas.height - 80);

        // Convert canvas to image
        const imgData = canvas.toDataURL('image/jpeg');

        // Create image element and display it
        const imgElement = document.createElement('img');
        imgElement.src = imgData;
        imgElement.alt = 'Saint Quote';
        imgElement.style.marginTop = '20px';

        // Clear the previous image and append the new image
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = ''; // Clear previous image if any
        imageContainer.appendChild(imgElement);

        // Update download link
        const downloadLink = document.getElementById('download-instagram');
        downloadLink.href = imgData;
        downloadLink.download = 'saint-quote.jpg';
        downloadLink.textContent = 'Download for Instagram';

        // Update social media share buttons
        updateShareButtons(quoteText, authorText);
    };
}

// Helper function to wrap text to avoid overlap and adjust line height
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

// Update share buttons with the current quote and author
function updateShareButtons(quote, author) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${quote} - ${author}`);

    // Facebook share button
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${url}`;
    document.getElementById('share-facebook').href = facebookLink;

    // Twitter share button
    const twitterLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    document.getElementById('share-twitter').href = twitterLink;
}

// Generate a quote on button click
document.getElementById('generate-button').addEventListener('click', function() {
    generateQuote();
});
