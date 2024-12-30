# Getting Started with Qilletni

Welcome to **Qilletni**, a Domain-Specific Language (DSL) designed for advanced playlist management, music curation, and seamless integration with Spotify and Java libraries.

---

### 1. Introduction

Qilletni simplifies the creation and manipulation of playlists and music data, allowing you to automate tasks, integrate with external libraries, and leverage a rich standard library.  
If you’d like a broader overview of Qilletni, see the [Home](../index.md) page for more details.

---

### 2. Installation

#### 2.1 Prerequisites
- **Java Runtime**: Ensure you have Java 20 (or higher) installed
- **Spotify Account**: For Spotify integration, a Spotify account is required. Some features may require a premium account

#### 2.2 Install Qilletni

// TODO

---

### 3. Hello World (Your First Program)

Let’s create a simple "Hello, World!" program:

1. **Initialize a project** Create a project directory, and then run the command

```bash
qilletni init qilletni_demo/
```

It will ask you for a project name, and the author's name. In this case, we'll give it the name `qilletni_demo`. It will also ask for an optional native binding class name, which may be left blank for now.

This will create a file tree of the following structure:

```txt
qilletni_demo/
└── qilletni-src/
    ├── qilletni_demo.ql
    └── qilletni_info.yml
```

The file created, `qilletni_demo.ql`, is the start of your source code. Right now, it only contains:

```qilletni
print("Hello, World!")
```

A more in-depth explanation of the project structure, and other project types, can be found in the [Project Structure](../project_structure.md) guide.

2. **Run** the program via command line:

```bash
qilletni qilletni-src/qilletni_demo.ql
```

   If everything is set up correctly, you should see:

```
Hello, World!
```


[//]: # (## 4. Key Language Concepts &#40;Quick Overview&#41;)

[//]: # ()
[//]: # (### 4.1 Imports)

[//]: # (Bring functionality into your scripts. For example:)

[//]: # (```qilletni)

[//]: # (import "spotify:recommendations.ql")

[//]: # (import "std:types/collections/queue.ql")

[//]: # (```)

[//]: # ()
[//]: # (### 4.2 Entities)

[//]: # (Entities are like classes or objects:)

[//]: # (```qilletni)

[//]: # (entity Artist {)

[//]: # (    string _id)

[//]: # (    string _name)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (### 4.3 Functions)

[//]: # (Define custom behavior:)

[//]: # (```qilletni)

[//]: # (fun greet&#40;name&#41; {)

[//]: # (    print&#40;"Hello, " + name + "!"&#41;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (### 4.4 Variables & Data Types)

[//]: # (- **Basic types**: `string`, `int`, `boolean`, etc.)

[//]: # (- **Special Qilletni types**: `song`, `collection`, `weights`)

[//]: # (- **Example**:)

[//]: # (  ```qilletni)

[//]: # (  int x = 42)

[//]: # (  string msg = "Qilletni DSL")

[//]: # (  ```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 5. Optional: Quick Spotify Example)

[//]: # ()
[//]: # (If you have Spotify credentials and want to experiment:)

[//]: # ()
[//]: # (```qilletni)

[//]: # (import "spotify:play_redirect.ql")

[//]: # ()
[//]: # (collection myFavs = "My Favorite Playlist" collection by "myUsername")

[//]: # (play myFavs limit[5]  // Plays 5 tracks from "My Favorite Playlist")

[//]: # (```)

[//]: # ()
[//]: # (You may need to configure your API tokens in your environment or config file to enable these calls.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 6. Basic Debugging & Logging)

[//]: # ()
[//]: # (1. **Use `print&#40;&#41;`**:)

[//]: # (   ```qilletni)

[//]: # (   print&#40;"Debug message..."&#41;)

[//]: # (   ```)

[//]: # (2. **Common Errors**:)

[//]: # (    - **Missing Entity**: If an entity or function is not defined.)

[//]: # (    - **Invalid Type**: Passing a `song` to a function expecting `int`.)

[//]: # (    - **Spotify Auth Errors**: If your credentials are incorrect or missing.)

[//]: # ()
[//]: # (---)

<br>

---

## 7. Next Steps

Congratulations on running your first Qilletni script! Below are a few places to continue:

- **[Language Reference](../language_reference.md)**: Explore Qilletni’s syntax, statements, and more.
- **[Tutorials](tutorials.md)**: Step-by-step guides for playlist creation, weighting, advanced recommendations, etc.
- **[Libraries & Modules](libraries.md)**: Learn about standard libraries like `collections`, `metadata`, and the Spotify modules.
- **[Examples](../examples.md)**: Browse real-world `.ql` scripts showcasing Qilletni features.

---

## 8. FAQ / Common Issues

1. **Java Version Mismatch**
    - Make sure you have at least Java 8. Older versions may not be supported.
2. **Command Not Found**
    - Ensure the `qilletni` command or script is in your PATH or specify the full path to it.
3. **Spotify Credentials**
    - Confirm that your environment is set to recognize your Spotify API keys if you’re using Spotify-related modules.

---

That’s it! You’re ready to start exploring the power of Qilletni. If you have any questions or run into issues, visit our [FAQ](faq.md) or open a discussion on our [GitHub repository](https://github.com/YourOrg/qilletni/discussions).
