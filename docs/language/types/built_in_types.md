# Built-in types

Qilletni comes with following primary types to get started with in its standard library:

- Numbers (`int`, `double`)
- Strings (`string`)
- Booleans (`boolean`)
- Lists (`type[]`)
- Maps (`Map`)
- Optional (`Optional`)
- Songs (`song`)
- Albums (`album`)
- Playlists (`collection`)
- Artists (`Artist`)
- Weights (`weights`)

## Numbers

Numbers in Qilletni are relatively rudimentary. There are two types, `int` and `double`. `int`s can go from ``-2^31` to `2^31 - 1`, whereas `double`s are floating points, and follow the IEEE 754 standard for 64-bit floating point numbers.

`int`s and `double`s may be converted to one another, via the syntax below.

```qilletni
double d = 3.14

int i = int(d)
print(i)  // Prints "3"

double d2 = double(i)
print(d2)  // Prints "3.0"
```

If math operations go between both `int`s and `double`s, generally they will return as a `double`. Exclusions for this are addition, subtraction, and integer division.

## Strings

Strings are immutable sequences of characters. They may be formatted via

```qilletni
"Number: %d  Float (3 decimal places): %.3f  String: %s".format([123, 3.14159, "hello"])
// Outputs:
//   Number: 123  Float (3 decimal places): 3.142  String: hello
```

The `format` method takes in an array of expressions to format with the string. For simplicity, formatting follows Java's implementation, outlined [here](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html).

The same can be done with `printf`:

```qilletni
printf("Hello %s!", ["World"])  // Prints "Hello World!"
```

Which is a formatting variation of the `print` command. Strings may also be escaped with a backslash:
```qilletni
print("Hello \"World!\"")  // Prints 'Hello "World!"'
```

## Lists

Lists are ordered collections of either built-in types or entity instances, that may be manipulated. They may ether be created explicitly with a type or have its type assumed implicitly.

```qilletni
string[] strs1 = ["a", "b", "c"]  // Implicit type
string[] strs2 = string["d", "e", "f"]  // Explicit type

any[] strs3 = ["g", "h", "i"]  // Implicitly a string[]
any[] strs4 = string["j", "k", "l"]  // Explicitly a string[]

print(strs1 is string[])
print(strs2 is string[])
print(strs3 is string[])
print(strs4 is string[])

strs1 = [1, 2, 3]  // Errors!
//      ^ Even through the original list was defined with an implcit type, the variable retains its set type forever

any[] ints = [1, 2, 3]  // Implicit type
strs3 = [1, 2, 3]

print(ints is int[])  // true
print(strs3 is int[])  // true
print(strs3 is string[])  // false  strs3 was any any[] but is not an int[]

string[] uhOh = string[1, "b", 3.0]  // Errors!
//              ^ Cannot force all of these types to be strings
```

### Implicit subtypes

Every list has a **subtype**. A list's subtype may either be defined explicitly in the list expression, or implicitly in the expression. As per normal variables, once a **variable** is defined with a type, it may not change. The below example shows a list variable being created with a defined type `string[]` but then assigned to a  list with an implicitly defined type. This list variable is forever a `string[]`.

```qilletni
string[] strs1 = ["a", "b", "c"]  // Implicit type

strs1 = [1, 2, 3]  // Errors!
//      ^ Even through the original list was defined with an implcit type, the variable retains its set type forever
```

If a list is created with an implicit type and not all types are the same in the list, it is assumed an `any[]`, as shown below.

```qilletni
any[] mixed = [1, "b", 3.0]
```

An `any` list may also be created with a consistent type. This means the actual containing list has a type, but the variable could be reassigned to a list with another type. This is done through a type assumption of its contents upon creation.

```qilletni
any[] consistent = [1, 2, 3]
print(consistent is int[])  // true

consistent = ["a", "b", "c"]
print(consistent is string[])  // true

consistent = any[1, 2, 3]
print(consistent is int[])     // false
print(consistent is string[])  // false
```

The end of the above example demonstrates that `any` is also a type, and a list can be created with that as its subtype. This means any value could be added to the list in the future, despite it currently containing only one type. No type assumptions are made in an `any[]` definition.

### Explicit subtypes

Explicit subtypes are fairly straightforward. They are useful when you are passing in parameters to a function, where you want a strict type on the list, or perhaps an empty list where no type assumptions can be made. 

```qilletni
fun handleList(list) {
	if (list is string[]) {
		print("String list")
	} else if (list is int[]) {
		print("Int list")
	} else {
		print("Unknown list")
	}
}

handleList(string["a", "b", "c"])  // Prints "String list"
handleList(int[1, 2, 3])  // Prints "Int list"
handleList(int[])  // Prints "Int list"
handleList([])  // Prints "Unknown list"  - No explicit subtype
```

### Subtype transformations

Sometimes when a list is created, it may have ambiguous types that should actually be all the same. An example of this is if a list of song IDs (strings) are present in a `song[]`. The Qilletni feature of subtype transformations allow the system to attempt to convert the string to the real type.

```qilletni
song[] songs = song["0PmoG29VeyZEEWuSJyfizZ", "https://open.spotify.com/track/58z4qdwM0zpWJEGfjSptR7?si=1d6a32c7f04b4c98", "6BVH6nyMBj601mSaUbbqKc"]
print(songs)
// ^ Prints: [song("Deception" by "Glae"), song("Feel the Pressure" by "DRAIN"), song("Where Light Divides the Holler" by "Knocked Loose")]
```

This feature only works with expressions that would normally be able to be assigned to their type, such as an ID or URL string. This only works with lists of an explicit type, so the following would **NOT** work:

```qilletni
song[] songs = ["0PmoG29VeyZEEWuSJyfizZ", "6BVH6nyMBj601mSaUbbqKc"]  // Errors! This assigns a string[] to a song[]
```

The following table shows the supported type transformations.

| From Type | To Type      | Description of input    |
| --------- | ------------ | ----------------------- |
| `string`  | `song`       | ID or URL of the song   |
| `string`  | `album`      | ID or URL of album      |
| `string`  | `collection` | ID or URL of collection |
| `int`     | `double`     | Any int                 |

## Maps

Maps are a normal Qilletni entity, acting as a wrapper of Java's HashMap. They may be created with `new Map()` or `Map.fromList()` which takes in a list of even size and pairs items together. They may store anything.

```qilletni
Map map = new Map()
map.put("a", 1)
map.put("b", 2)
print(map.get("a"))  // Prints: "1"
```

## Optional

Because Qilletni doesn't support the concept of an empty/null value, Optionals are used to ensure the programmer is always aware of when a value isn't present. They typically should only be used for return values.

The Optional entity defines the following static methods to create an Optional:

```qilletni
Optional a = Optional.fromEmpty()
Optional b = Optional.fromValue("Hello")
```

An Optional can have its empty status checked with `hasValue()` and have its value inspected with `getValue()`. The latter will exit the program and throw an error if no value is found in the optional.

```qilletni
Optional a = Optional.fromEmpty()

printf("Value: %b", [a.hasValue()])  // Prints "false"

any aValue = a.getValue()  // Errors! No value is found
```

## Music Types

Qilletni's whole purpose is dealing with music, so certain functions are baked into the language to assist with that.

All music data is handled by the currently active [Service Provider](/service_providers.md). A service provider assumes there is an ID present for each song, album, collection, and artist. The individual service provider has the ability to parse URLs to extract the relevant ID present. For examples, assume whenever you see an ID, a URL may also be passed in.

If the internal [package config](/package_configs.md) property `eagerLoad` is `true`, the music type will be immediately queried, and will error out if invalid. If the property is not found or `false`, it will be queried whenever the first method that references a property of the type is invoked. See the following example where `eagerLoad` is `false`:

```qilletni
song mySong = "Haunted" by "Burdened Hearts"  // Song is not loaded yet, no API calls have been made

print(mySong.getAlbum())  // The song is queried. Prints 'album("The Best of Times" by "Burdened Hearts")'
```

When using a title and an artist, native music types are defined by the following syntax:

```
<type> <variable name> = <title> <type> by <artist>
```

By default, the `<type>` before `by` defaults to `song`, so it may not be included. So for example, definitions may be

```qilletni
song s1 = "Impulse" by "Harroway"
song s2 = "Heavy Rain" song by "Konami Kode"
album a1 = "Nublar" album by "XO Armor"
collection c1 = "Polish RAVE" collection by "rubbaboy"
```

### Songs

The `song` type in Qilletni represents a song that may be played on a streaming service. A service provider may also count something like a podcast as a song. It is uniquely identified by an ID, identified (sometimes ambiguously) by one or more artists and a title, and has an album. A `song` may be defined by the following:

```qilletni
song s1 = "Fauna" by "Apothica"
song s2 = "2HdTQdGeProvKc35VdNfhD"
song s3 = "https://open.spotify.com/track/2HdTQdGeProvKc35VdNfhD?si=3060f8808cdd4d8c"
```

All the above songs define the same song. For a song to be added to the queue, playlist, etc. the `play` keyword is used. By default, this adds it to the queue, however it may be redirected to perform other actions, dependent on the service provider.

```qilletni
play "Dirty Floor" by "Sypha"  // Adds the song to the queue
```

An example from the spotify library to add songs to a list is:

```qilletni
// Route all played songs to this list
song[] songList = []
redirectPlayToList(songList)

play "Child's Play" by "Hara Kiri"
play "Terror" by "Dread Engine"

print(songList)  // Prints: '[song("Child's Play" by "Hara Kiri"), song("Terror" by "Dread Engine")]'
```

This may be useful if you want to batch add songs to a playlist, perform some kind of analysis on it, etc.

`play` redirects are covered more (// TODO)

### Albums

The `album` type represents an album that songs may be on, with an ID, name, and one or more artists. An album may be defined by:

```qilletni
album a1 = "Here & Now" album by "Framework"
album a2 = "7ulI5y1UiuepuQD61gcKHo"
album a3 = "https://open.spotify.com/album/7ulI5y1UiuepuQD61gcKHo?si=1Ip8PdIdTQKCtlJiXFhyIg"
```

The above album definitions all represent the same albums.

!!! info "Planned Feature"

	Fetching songs from albums is a planned feature. It is already possible from within a service provider.

### Playlists

In Qilletni, a playlist is abstracted as a `collection`. A collection is what it sounds like, a collection of songs. A collection may be more than just a playlist though, it may be dynamically created from a list of songs, or may represent some other kind of song list sourced by a service provider (a list of top songs, for instance). A collection contains some basic information regarding it, such as the ID, the creator, song count, songs, and name. A collection may be defined as the following:

```qilletni
collection c1 = "rage death kill" collection by "rubbaboy"
collection c2 = "2fupEjJ1lamW0dfAsXJag6"
collection c3 = "https://open.spotify.com/playlist/2fupEjJ1lamW0dfAsXJag6?si=45dd2429fd0a46ba"
```

The above collections all define the same playlist.

A collection may also have weights assigned to it, along with an order, in the syntax of:

```qilletni
collection c1 = "Chill Bruh Moment" by "rubbaboy" order[shuffle] weights[myWeights]
```

Where `myWeights` is a variable of type `weights`. `order` may either by "shuffle" or "sequential", defaulting to the former if unspecified. To see more information regarding weights, see [Weights](#weights).

Collections may be played in a similar way playlists are, just with an additional option.

```qilletni
play "96 crayons" by "rubbaboy" limit[10]
```

The above will play 10 shuffled songs from the given playlist. Instead of a number, the limit parameter may also be a time, such as `1h` to play 1 hour of songs (it will stop as soon as 1+ hour has been hit) or `15m` for 15 minutes of songs.

Note this may also be given a variable, as the above is simply an expression.

```qilletni
play myPlaylist limit[30m]  // Plays 30 minutes of songs
```

### Artists

Artists aren't handled as natively as other music types are, as they are an entity. The entity consists of a name and a unique ID. Below are examples of getting an artist:

```qilletni
song mySong = "Orchid Street" by "Arimea"

Artist artist = mySong.getArtist()
printf("Artist id: '%s' name: '%s'", [artist.getId(), artist.getName()])  // Prints "Artist id: '6qNHuzJVAGJ8h2D0qo6wAh' name: 'Arimea'"
```

## Weights

Weights in Qilletni are a unique way of playlist orchestration. They manipulate the way Qilletni chooses which songs to play while playing from a collection. The following is an example of a simple weight definition.

```qilletni
weights demoWeights =
	| 25% "MANGO" by "This Is Falling"
	| 25% "Reflections" by "I Sworn"
```

The above weights, when applied to a collection, make "MANGO" play 25% of the time, for every song picked from the playlist. Likewise, "Reflections" is played 25% of the time, independently to anything else. For percent multipliers, the song doesn't necessarily have to be in the collection it's applied to. If all the percent multipliers add up to 100%, the songs in the collection will be ignored.

Below is a visualization of a normal random shuffle of 20 songs through a playlist, and the same playlist with weights applied. The playlist consists of 10 songs, including "MANGO" and "Reflections".


<!-- Shared Legend -->
<div id="legend-container" class="legend"></div>

<!-- Container for Playlists -->
<div class="playlists-container">
    <div id="playlist-1" class="playlist"></div>
    <div id="playlist-2" class="playlist"></div>
</div>

<script>
    window.onload = function() {
        const songColors = {
            "MANGO": "#f44336", // Red
            "Reflections": "#2196f3", // Blue
            // "Monarch": "#9c27b0", // Purple
            // "Song 4": "#ffeb3b", // Yellow
            // "Song 5": "#795548", // Brown
            "Other": "#4caf50", // Green
        };

        const unweighted = ["Other", "Other", "Other", "Reflections", "Other", "MANGO", "Other", "Other", "Other", "Other", "Other", "Other", "MANGO", "Other", "Other", "Other", "Reflections", "Other", "Other", "Other"];
        const weighted = ["Reflections", "Other", "MANGO", "Other", "Reflections", "Other", "Reflections", "Other", "Other", "MANGO", "Other", "Reflections", "MANGO", "Other", "Other", "Other", "MANGO", "Other", "MANGO", "Reflections"];
    
            // Render the shared legend
        const legendElement = document.getElementById("legend-container");
        legendElement.innerHTML = "";
        Object.keys(songColors).forEach(song => {
            const legendItem = document.createElement("div");
            legendItem.className = "legend-item";
    
            const colorSquare = document.createElement("span");
            colorSquare.className = "color-square";
            colorSquare.style.backgroundColor = songColors[song];
    
            const songName = document.createElement("span");
            songName.className = "song-name";
            songName.textContent = song;
    
            legendItem.appendChild(colorSquare);
            legendItem.appendChild(songName);
            legendElement.appendChild(legendItem);
        });
    
        // Render the playlists
        renderPlaylist("playlist-1", songColors, unweighted, "Unweighted Shuffle");
        renderPlaylist("playlist-2", songColors, weighted, "Weighted");
    };
</script>

[//]: # (// "Reborn" is played 5x as often as it normally would, assuming it is in the playlist. In other words, imagine the collection was taken and "Reborn" was in there once. If it was originally in the collection twice, it will show up 10 times.)

[//]: # (On average, "MANGO" and "Reflections" will show up roughly half of the songs played.)