## Extension Functions

Extension functions are functions that may be invoked on an object, like it was an entity that has the function defined in it. They may be applied to any type, using the `on` keyword in the following format:

```qilletni
fun printThis(str) on string {
	printf("Printing this string: ''%s;", [str])
}

"My String".printThis()  // Prints "Printing this string: 'My String'"
```

The first parameter of the function definition is the object that the function is bring invoked on. Notice that it is implicitly set, and is not included in the call to the function. Other parameters may be added after that, such as the following:

```qilletni
fun printThis(str, n) on string {
	for (i..n) {
		printf("Printing this string: ''%s;", [str])
	}
}

"My String".printThis(2)  // Prints "Printing this string: 'My String'" twice
```

Extension functions also work for entities.

```qilletni
entity Cat {
	string name
	
	Cat(name)
}

fun sayHi(cat) on Cat {
	printf("Hello, %s", [cat.name])
}

Cat cat = new Dat("Olive")
cat.sayHi()  // Prints "Hello, Olive"
```

## Native Method Extensions

Extension methods may be native methods too. The only difference in definition is they don't include the invoked on parameter, and as normal for native functions, don't include a body.

```qilletni
native fun sayHi() on Cat
```

For implementing these, see [Native Methods](/native_binding/native_functions).