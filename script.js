document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery');

    // Function to fetch artwork details from the Met API
    async function fetchArtworks() {
        try {
            // Fetch list of artwork object IDs
            const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=art&hasImages=true');
            const data = await response.json();

            // Take the first 10 results to display
            const objectIds = data.objectIDs.slice(0, 10);

            // Fetch details of each artwork and add to the gallery
            for (let objectId of objectIds) {
                const artworkResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
                const artworkData = await artworkResponse.json();

                // Ensure there's a valid image to display
                if (!artworkData.primaryImageSmall || artworkData.primaryImageSmall.trim() === "") {
                    continue; // Skip if there's no valid image
                }

                // Create gallery item
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';

                // Create image element
                const img = document.createElement('img');
                img.src = artworkData.primaryImageSmall;
                img.alt = artworkData.title;

                // Create title element
                const title = document.createElement('p');
                title.textContent = artworkData.title;

                // Append image and title to gallery item
                galleryItem.appendChild(img);
                galleryItem.appendChild(title);

                // Append gallery item to gallery container
                galleryContainer.appendChild(galleryItem);
            }
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
    }

    // Fetch and display artworks
    fetchArtworks();
});

