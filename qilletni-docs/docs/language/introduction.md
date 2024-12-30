# Introduction to Qilletni

This page is a brief introduction to Qilletni, with some samples of its main features. To get begin programming in Qilletni, check out the [Getting Started](quickstart/getting_started.md) guide.

## Hello World

When a file is ran or imported, all top-level code is executed in order. This makes simple programs like a Hello World application very easy:

```qilletni
print("Hello, World!")
```

## Variables

All variables are assigned a type upon initialization. The concept of a null or empty variable does not exist, so a variable must have a value assigned to it initially, except when declaring an [entity](#entity) (this is more of a late-assignment, and still does not provide value-less variables). Variables are relatively weakly typed, and if initialized with a non-`any` type, it must adhere to that type.

```qilletni
int i = 10
double d = 1.23
string s = "foo bar"
song mySong = "Spiral" by "Feyn Entity"
album myAlbum = "Requiem" album by "Last Falling Rose"
string[] names = ["Bob", "Tim"]
any[] stuff = ["a string", 42]
```

Some types have unfamiliar syntax than other languages. See the [built-in types](types/built_in_types.md) page to see how to define them and how they work.

## Control flow statements

Qilletni supports basic control flow statements, such as:

```qilletni
if (age >= 18) {
    print("Is an adult")
} else {
    print("Is a minor")
}

for (name : names) {
    print(name);
}

for (i..10) { // Prints 0-9
    print(i)
}

for (i..infinity) { // Prints from 0 to infinity until exited
    print(i)
}

for (i != 0) {
    i = getNumber()
}
```

## Functions

Functions are defined without input/return types, typically specified in docs (see [Documenting Code](documenting_code.md)).

```qilletni
fun fibonacci(n) {
    if (n == 0 || n == 1) {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

int result = fibonacci(10)
```

If a method doesn't return anything but is expected to, an error occurs during runtime. If you may not want to return a value, see the [Optional](types/built_in_types.md/#optional) type. Functions may also be overridden with a different number of arguments.

## Comments

Comments usually start with `//`

```qilletni
// This is a comment

/**
 * This is a documentation comment
 */
```

For more information on documentation comments and their standard format, see [Documenting Code](documenting_code.md).

## Imports

Importing libraries or files may be done through a normal `import` or an aliased import.

```qilletni
import "spotify:play_redirect.ql"

import "spotify:recommendations.ql" as recommendation
```

Unaliased imports put the contents of the imported file in the same scope as the file importing it. Aliased imports make the scope of the imported file accessible through the alias given. In the above example, everything in `recommendations.ql` is accessible via `recommendation.recommendationMethod()`.

## Entities

Entities are equivalent to objects/classes in many other programming languages. They have defined properties holding data with functions in it.

```qilletni
entity Person {
    string name
    int age
    int armCount = 2

    Person(name, age)

    static fun createChild(name) {
        return new Person(name, 0)
    }

    // Instance function: uses the entity's own properties
    fun introduce() {
        printf("Hi, I'm %s and I'm %d years old! I have %d arms.", [name, age, armCount]))
    }
}
```

Static functions are not reliant on an instance of an entity, so the above may be invoked like `Person.createChild("name")`.

Constructors of entities do not contain a body, so initialization logic should rely on a static factory method. Parameters of a constructor should include all uninitialized parameters, as Qilletni requires all values to have a value.
