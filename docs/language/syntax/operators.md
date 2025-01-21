# Operators

The following is an estimation of Qilletni's operator associativity and precedence, from highest to lowest.

| Description    | Operator                    | **Associativity** | Notes                                                        |
| -------------- | --------------------------- | ----------------- | ------------------------------------------------------------ |
| member access  | `.`                         | Left-to-right     | Accesses properties/functions                                |
| unary postfix  | `x++` `x--`                 | Left-to-right     | `x++` `x--` increments/decrements **after** returning the old value |
| unary prefix   | `!` `++x` `--x`             | Right-to-left     | `!` inverts a boolean, and `++x` and `--x` increments/decrements **before** returning the new value |
| multiplicative | `*` `/~` `/` `%`            | Right-to-left     | `/~` is floor (integer) division, `/` is floating division, `%` is modulo |
| additive       | `+` `-`                     | Left-to-right     | Handles addition/subtraction, `+` also handles string concatenation between numbers, strings, direct function calls and parentheses-wrapped expressions `( expression )` |
| range/cascade  | `..`                        | Left-to-right     | Used both in `for (i..10)` or through cascade assignment `foo..bar = 0 ..baz = 1` |
| relational     | `>` `<` `>=` `<=` `==` `!=` | Left-to-right     | Compares two expressions, returning a boolean                |
| logical AND    | `&&`                        | Left-to-right     | Checks if both sides of the keyword are true                 |
| logical OR     | `||`                        | Left-to-right     | Checks if at least one side of the keyword is true           |
| type check     | `is`                        | Left-to-right     | Checks the type of a variable                                |
| assignment     | `=` `+=` `-=`               | Right-to-left     | `=` is **not** an expression, and does not return a value    |

Most operators create an expression. The only exceptions are assignment and range/cascade. Operators that may require some additional information are outlined below. Most are used how you would expect.

## Type checking

Qilletni has relatively loose type checking, mainly in function parameters. The `as` operator is used to check what a variable is set to.

```qilletni
any a = "Hello"

printf("a = %s", [a is string]) // prints "a = true"

a = 123

printf("a = %s", [a is string]) // prints "a = false"
printf("a = %s", [a is int])    // prints "a = true"
```

The `as` operator may check if something is any native type or entity name. It may not be used to check if something is `any`, as everything is `any`.

## Cascade notation

Cascade notation is a special form of assignment used with entities. Instead of returning nothing, the operator returns the result of the expression on the left, allowing for combined assignments. Take this code, which uses traditional assignment:

```qilletni
Coord coordinate = new Coord()
coordinate.x = 1
coordinate.y = 2
coordinate.z = 3
```

The cascade operator would allow you to do:

```qilletni
Coord coordinate = new Coord()
	..x = 1
	..y = 2
	..z = 3
```

In one single expression.

## Range notation

The range operator is unique to the `for` loop. It allows the specification of when the loop should end. Loops are relatively primitive, in that with built-in syntax, they always start with 0 and go to an exclusive number. Examples of this notation are:

```qilletni
for (i..10) { // // Prints 0-9
    print(i)
}

for (i..infinity) { // Prints from 0 to infinity until exited
    print(i)
}
```

Note that `infinity` may also follow the range operator, making the loop repeat forever until it is exited out of.
