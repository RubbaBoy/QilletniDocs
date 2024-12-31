/**
 * Render a playlist dynamically in the given container with a shared legend.
 * @param {string} containerId - The ID of the container element.
 * @param {Object} songColors - A map of song names to their colors.
 * @param {Array} displayOrder - An array specifying the order of songs to display.
 * @param {string} title - The title for the playlist.
 */
function renderPlaylist(containerId, songColors, displayOrder, title) {
    const playlistElement = document.getElementById(containerId);

    if (!playlistElement) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Clear any existing content
    playlistElement.innerHTML = "";

    // Add the title
    const playlistTitle = document.createElement("div");
    playlistTitle.className = "playlist-title";
    playlistTitle.textContent = title;
    playlistElement.appendChild(playlistTitle);

    // Create the playlist rows
    const playlistRows = document.createElement("div");
    playlistRows.className = "playlist-rows";

    displayOrder.forEach(song => {
        const color = songColors[song] || "#000"; // Default to black if color not found
        const songElement = document.createElement("div");
        songElement.className = "song";
        songElement.style.backgroundColor = color;

        playlistRows.appendChild(songElement);
    });

    // Append the rows to the playlist
    playlistElement.appendChild(playlistRows);
}
