# Native Bindings

Native bindings in Qilletni allow for the use of Java code in a normal program to add functionality either computationally expensive or otherwise impossible in the language itself. Currently, bindings use native methods (which are the things actually bound to Java methods) and the `java` type which may hold a reference to a Java object, accessible through a native method.

See the following resources for more information regarding native bindings:

- [Native Methods](/native_binding/native_methods) to see how native methods are set up and work
- [Native Bind Factories](/native_binding/native_bind_factories) to see how custom objects can be injected into native method's classes
- [Usage Examples](/native_binding/usage_examples) for more advanced examples of how native binding works, including property accessing and invoking Qilletni methods from a Java method

These pages will assume you have a project set up with native bindings enabled. See the [Project Structure](project_structure/#project-with-native-bindings) section on this for setting it up.