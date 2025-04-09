# Documenting Code

Qilletni supports its own style of documentation for functions, entities, and fields. This is markdown-based, with some additional structure. Unlike actual signatures, documentation can provide information regarding parameter or return types.

The following is an example of documenation from the `Map` entity in the standard library. To see how it is rendered, see the [Qilletni Docs for the entity](https://docs.qilletni.dev/library/std/entity/Map).

```qilletni
/**
 * A [@java java.util.HashMap] wrapper that may store keys and values of any type.
 */
entity Map {

    /**
     * The internal [@java java.util.HashMap] object, storing the map's state.
     * @type @java java.util.HashMap
     */
    java _map = _emptyJavaMap()
    
    /**
     * Creates a new map from a list of key-value pairs.
     *
     * @param[@type list] list A list of key-value pairs
     * @returns[@type core.Map] A new map with the given key-value pairs
     */
    static fun fromList(list) {
        Map map = new Map()
        int i = 0
        for (i < list.size()) {
            map.put(list[i++], list[i++])
        }
        
        return map
    }
}
```

## Documentation Structure

### Type Referencing

In all text areas, Qilletni supports basic markdown support (no HTML). To reference a Qilletni type, the following syntax may be used:

```
[@type library.EntityName]
[@type std.Map]
```

This is as simple as the library name and the entity name, which will turn into a link to the [https://docs.qilletni.dev/](https://docs.qilletni.dev/) documentation page for the entity.

As Qilletni may interface with Java closely, Java types may be referenced too, with the following format:

```
[@java java.util.HashMap]
```

This will produce a link to the official Javadocs of the class. These type references may be used in a text area, such as:

```qilletni
/**
 * You may reference a [@type std.Map] which is a wrapper around a [@java java.util.HashMap].
 */
```

### Parameter/Return Type

Parameters and return types may be referenced in a similar format. Neither are required, but recommended. This may be done by adding parameters at the end of the documentation block prefixed by `@param` and then a `@returns`. After that, a type may be provided (but is not required), the name of the parameter (if not a return), and then a description. 

The following formats are used to reference types after a `@param` or `@returns`:

| Format                       | Example                             | When to use                                                  |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `[@type native-type]`        | `[@type string]`                    | When referencing native types/placeholders: `int`, `double`, `string`, `boolean`, `collection`, `song`, `album`, `list`, `java`, `function` |
| `[@type library.EntityName]` | `[@type std.Artist]`                | When referencing any Entity                                  |
| `[@type @java class.path]`   | `[@type @java java.time.LocalDate]` | When referencing an official Java type                       |

If referencing a Java type, the format of `[@type @java ..]`

The following examples are valid documentation:

```qilletni
/**
 * @param[@type list] list                            A list of *key* and *value* pairs
 * @param[@type std.Artist] myArtist                  The artist to follow
 * @param[@type @java java.time.LocalDate] localDate  The [@java java.time.LocalDate] to manipulate
 * @param value                                       The value to process
 * @returns[@type lastfm.Page] The page to return
 */
```

### Field Type Documenting

Fields can be documented as well, specifically in entities. A normal documentation block can be used, however with the `any` or `java` types, some ambiguity may want to be cleared up in docs. The following format, similar to parameter types, may be used to reference a Qilletni or Java field type:

```qilletni
/**
 * The internal [@java java.time.LocalDate] object to store the date info.
 * @type @java java.time.LocalDate
 */
java _date

/**
 * The [@type string] to set.
 * @type string
 */
any value
```

This type must appear at the end of the documentation string.