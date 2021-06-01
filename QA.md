1. Explain the output of the following code and why

```jsx
setTimeout(function() {
	console.log("1");
}, 100);  

console.log("2");
```

2
1

setTimeout delay by 100 ms  


2. Explain the output of the following code and why

```jsx
function foo(d) {
	if(d < 10) {
		foo(d+1);
	}
	console.log(d);
}

foo(0);
```

10
9
8
7
6
5
4
3
2
1
0


first time d < 10, call itself plus one (enter a recursion) until it reach 10 before it could run into the console.log

3. If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```jsx
function foo(d) {
	d = d || 5;
	console.log(d);
}
```

If pass {}, [] those non-Null/false/undefined value to foo, it will not assign the default value 5

4. Explain the output of the following code and why

```jsx
function foo(a) {
	return function(b) {
		return a + b;
	}
}

const bar = foo(1);

console.log(bar(2))
```

1. a = 1
2. b = 2
3. a + b (1 + 2) = 3

5. Explain how the following function would be used

```jsx
function double(a, done) {
	setTimeout(function() {
		done(a * 2);
	}, 100);
}
```

a is init value, done is a callback, and delay execute by 100 ms, and your callback get double the value 100ms later.
