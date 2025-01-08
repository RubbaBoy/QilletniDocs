# Playlist


<!-- Playlist Container -->
<div id="playlist-container" class="playlist"></div>

<script>
    window.onload = function() {
        // Define the song-color mapping and display order
        const songColors = {
            "Song 1": "#f44336", // Red
            "Song 2": "#2196f3", // Blue
            "Song 3": "#4caf50", // Green
            "Song 4": "#ffeb3b", // Yellow
            "Song 5": "#795548", // Brown
            "Song 6": "#9c27b0", // Purple
        };
    
        const displayOrder = ["Song 3", "Song 1", "Song 6", "Song 4", "Song 2"];
    
        renderPlaylist("playlist-container", songColors, displayOrder);
    };
</script>
