# Welcome to Qilletni

Qilletni is a powerful **Domain-Specific Language (DSL)** designed for **playlist management**, **music curation**, and seamless integration with services like **Spotify** and **Java** libraries. Whether you're a music enthusiast or a developer seeking advanced automation, Qilletni provides a flexible and expressive syntax to handle all your playlisting needs.

---

## Get Started

Jump right into Qilletni with our [Getting Started Guide](quickstart/getting_started.md), where you’ll learn how to:

- Install Qilletni.
- Write your first program.
- Run `.ql` scripts to create and manage playlists.

```qilletni
// Weight the songs in your playlist
weights myWeights =
    | 20% "Song A" by "Artist A"  // 20% of the time, play "Song A"
    | 10% "Song B" by "Artist B"
    | 5x  "Song C" by "Artist C"  // Play "Song C" 5 times more often

// Get your playlist & assign weights to it
collection myCollection = "My Playlist" collection by "username" weights[myWeights]

// Play 10 songs from your playlist
play myCollection limit[10]
```

[Start Now →](quickstart/getting_started.md)

---

## Key Features

- **Spotify Integration**: Effortlessly interact with Spotify for playlist creation, recommendations, and song management.
- **Weight-Based Music Selection**: Use weighted collections for advanced playlisting.
- **Seamless Java Bindings**: Leverage Java libraries for enhanced functionality.
- **Rich Standard Library**: Includes tools for collections, metadata, HTTP utilities, and more.

[Learn More →](key_features.md)

---

## Tutorials and Examples

Expand your Qilletni knowledge with hands-on tutorials and examples:

- **[Beginner Tutorials](tutorials/beginner.md)**: Create playlists, use weights, and play songs.
- **[Advanced Examples](examples.md)**: Integrate metadata matching, rolling histories, and custom logic.

[Explore Tutorials →](tutorials.md)

---

## Reference Documentation

Dive deep into the Qilletni language and its libraries:

- **[Language Reference](language_reference.md)**: Syntax, entities, functions, and control flow.
- **[API Reference](api_reference.md)**: Detailed documentation of all entities, methods, and libraries.

[View API Docs →](api_reference.md)

---

## Why Qilletni?

Qilletni empowers developers and music enthusiasts to:

1. Automate playlist creation with custom logic.
2. Integrate seamlessly with Spotify's APIs and Java libraries.
3. Leverage a concise and expressive syntax tailored for music curation.

Ready to dive in? Start with our [Getting Started Guide](quickstart/getting_started.md).

---

## Community and Contributions

- **Report Bugs**: Help us improve by reporting issues.
- **Contribute**: Add to the standard library or suggest new features.

[Join the Community →](contributing.md)

---

## Example Program

Here’s a sneak peek of what Qilletni can do:

The following program takes a Spotify playlist, plays 2 songs from it, and then 3 recommended songs with high energy and low popularity. All songs are added to a new playlist on your account.

```qilletni
import "spotify:recommendations.ql"
import "spotify:play_redirect.ql"
import "spotify:playlist_tools.ql"
import "std:types/collections/stack.ql"

// Songs to play more frequently
weights powerRotation =
    | 85% ["Wants I Need" by "156/Silence",
            "Anti-Saviour" by "Voluntary Victim",
            "Millstone" by "ROSARY"]
    | 15% ["Heavy Rain" by "Konami Kode",
            "Decay" by "Elwood Stray",
            "All or Nothing" by "Foundations"]

// 30% of the time, choose from powerRotation
weights myWeights =
   |~ 30% powerRotation

// A spotify playlist to play songs from, with weights
collection mySongs = "My Playlist #59" collection by "rubbaboy" weights[myWeights]

// Redirect the "play" keyword to add played songs to a list, instead of playing them
song[] songList = []
redirectPlayToList(songList)

// Recommend Spotify songs
Recommender recommender = new Recommender()
        ..seedTracks = ["Truth Serum" by "Gutter King", 
                        "Wayside" by "AEONS"]
        ..targetEnergy = 1.0     // High energy
        ..targetPopularity = 10  // Low popularity

// Recommend 30 songs, add them to a stack
song[] recs = recommender.recommend(30)
Stack recommendations = Stack.fromList(recs)

// Play 2 shuffled songs from mySongs playlist, then 3 recommendations
for (recommendations.size() >= 3) {
    play mySongs limit[2]

    for (i..3) {
        play recommendations.pop()
    }
}

// Create a new playlist in Spotify
Date date = Date.now()
collection myNewPlaylist = createPlaylist("Qilletni generated on %d/%d".format([date.getMonth(), date.getDay()]))

// Add the songs to the new playlist
addToPlaylist(myNewPlaylist, songList)
print("Created a playlist with %s songs".format([songList.size()]))
```

Explore more examples in our [Examples Section →](examples.md)
