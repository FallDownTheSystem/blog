---
title: Modern JS - Moving on from jQuery
---

<route>
{
	meta: {
		title: "Moving on from jQuery",
		description: "A case for how modern JavaScript has outgrown the need for jQuery.",
		order: 30,
	}
}
</route>

<Title :title="$route.meta.title" :description="$route.meta.description" />

We shortly mentioned jQuery in the first article about the history of JavaScript. Now I'd like to dedicate an entire article to jQuery, and for a good reason, seeing as jQuery has been one of the most popular JavaScript libraries for well over a decade.

Let's start with a recap of what jQuery is:

> [jQuery](https://jquery.com/) is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

jQuery was started in 2006, almost 15 years ago, and it's still in active development. However, the usage has been declining in favor of modern JavaScript frameworks.

According to [W3Techs](https://w3techs.com/technologies/details/js-jquery):
> jQuery is used by 95.7% of all the websites whose JavaScript library we know. This is 77.8% of all websites.

What I find curious is that 50% of jQuery usage is still using version 1 of jQuery. For reference, the current version is 3.6. That means that a lot of sites are using a jQuery version from 2016 or earlier. That might very well be because jQuery is more likely to be found in legacy projects.

This article aims to show you how we can use modern JavaScript features and Web APIs to replace the functionality of jQuery. We'll look at how to manipulate the DOM, update CSS, handle events, add animations, and make AJAX requests without jQuery.

::: c note Credit
The following examples are based mainly on these two fantastic articles by [Tobias Ahlin](https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/) and [Flavio Copes](https://flaviocopes.com/jquery/). Both of them have a lot of great articles that I highly recommend for you to check out.
:::

## Replacing jQuery

Next, let's look at examples of how we can achieve the most common use cases of jQuery with vanilla JavaScript.

> ***[Vanilla JavaScript?](http://vanilla-js.com/)***

What I mean by vanilla JavaScript is *just* JavaScript, i.e., JavaScript without a library. jQuery is also JavaScript, but it's easier to make the distinction by talking as if jQuery was its own language.

### Selecting elements

jQuery makes it very easy to select DOM elements, something that for a long time was cumbersome in JavaScript. Previously the way to get a specific element in JavaScript was to use the `getElement*` methods, such as `getElementById` or `getElementsByClassName`. But thanks to the Selectors API, released in 2013, we can easily query DOM elements using the CSS selector syntax.

```js
// Select all instances with jQuery
$(".button");
// Select the first instance
$(".button").first();

// Select all instances with JavaScript
document.querySelectorAll(".button");
// Select the first instance
document.querySelector(".button");
```

One of the nice things with jQuery is that the built-in methods will run against all elements in a query.

```js
$(".button").hide();
// or with custom logic
$(".button").each((index, element) => doSomething(element));
```

With vanilla JavaScript, a query returns an [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) or a [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), depending on if you use `querySelector` or `querySelectorAll`.

Note that `Element`s are derived from `Node`s. And what `querySelector` usually returns is an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).

<svg viewBox="-50 0 600 70" preserveAspectRatio="xMinYMin meet">
	<a xlink:href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget" target="_top">
		<rect x="1" y="1" width="110" height="50" class="fill-current text-gray-800"></rect>
		<text
			x="56"
			y="27"
			font-size="14px"
			class="fill-current text-gray-100"
			text-anchor="middle"
			alignment-baseline="middle"
		>
			EventTarget
		</text>
	</a>
	<polyline points="111,25  121,20  121,30  111,25" class="stroke-current text-gray-400" fill="none"></polyline>
	<line x1="121" y1="25" x2="151" y2="25" class="stroke-current text-gray-400"></line>
	<a xlink:href="https://developer.mozilla.org/en-US/docs/Web/API/Node" target="_top">
		<rect x="151" y="1" width="75" height="50" class="fill-current text-gray-800"></rect>
		<text
			x="188.5"
			y="27"
			font-size="14px"
			class="fill-current text-gray-100"
			text-anchor="middle"
			alignment-baseline="middle"
		>
			Node
		</text>
	</a>
	<polyline points="226,25  236,20  236,30  226,25" class="stroke-current text-gray-400" fill="none"></polyline>
	<line x1="236" y1="25" x2="266" y2="25" class="stroke-current text-gray-400"></line>
	<a xlink:href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_top">
		<rect x="266" y="1" width="75" height="50" class="fill-current text-gray-800"></rect>
		<text
			x="303.5"
			y="27"
			font-size="14px"
			class="fill-current text-gray-100"
			text-anchor="middle"
			alignment-baseline="middle"
		>
			Element
		</text>
	</a>
	<polyline points="341,25  351,20  351,30  341,25" class="stroke-current text-gray-400" fill="none"></polyline>
	<line x1="351" y1="25" x2="381" y2="25" class="stroke-current text-gray-400"></line>
	<a xlink:href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement" target="_top">
		<rect x="381" y="1" width="110" height="50" class="fill-current text-gray-800"></rect>
		<text
			x="436"
			y="27"
			font-size="14px"
			class="fill-current text-gray-100"
			text-anchor="middle"
			alignment-baseline="middle"
		>
			HTMLElement
		</text>
	</a>
</svg>

We can iterate over a `NodeList` with the built-in method `NodeList.forEach()`, or we can turn the `NodeList` into an `Array`, either with `Array.from()` or with the spread operator `...`, which allows us to use all array methods.

```js
document.querySelectorAll(".button").forEach(x => doSomething(x));

// Turning the returned NodeList into an Array
Array.from(document.querySelectorAll(".button")).map(x => mapSomething(x));
// or by using the spread operator, since NodeList is an iterable
[...document.querySelectorAll(".button")].find(x => x.innerText === "test");
```

We don't have to query all the way from the `document` object every time. We can also query from a specific element and its children directly.
With jQuery, we can use the `find` method, where was with vanilla JavaScript, we can query an element directly, exactly how we would query from the `document`.

```js
// Select the first instance of .button within .container in jQuery
let container = $(".container");
container.find(".button");

// The same in vanilla JS
let container = document.querySelector(".container");
container.querySelector(".button");
```

[MDN: Locating DOM elements using selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

### Waiting for the DOM to be loaded

A common use case is to wait for the DOM to be loaded before executing any script. In jQuery, this is done with the `ready` method; with vanilla JavaScript, we can use the `DOMContentLoaded` event.

```js
$(document).ready(() => {
	//...
})

document.addEventListener("DOMContentLoaded", () => {
	//...
})
```

### Modifying styles

In jQuery, we can access and modify an element's styles with the `css` method. In vanilla JavaScript, we would use the `style` property.

```js
// With jQuery, we can access the CSS properties
// the same as we would write them in CSS declarations
$(".container").css("background-color", "#000");

// With JavaScript, we have to use camelCase
document.querySelector(".container").style.backgroundColor = "#000";
```

We can also set multiple styles at once, although it's a little trickier in vanilla JavaScript.

```js
// With jQuery, we can pass multiple styles at once in an object
$(".container").css({
	"color": "white",
	"background-color": "black"
});

// With vanilla JS, we can set each style property separately
let container = document.querySelector(".container");
container.style.color = "white";
container.style.backgroundColor = "black";

// Or we can set all styles at once (but override any existing styles)
container.style.cssText = "color: white; background-color: black";

// Or we can use Object.assign
Object.assign(container.style, {
	color: "white",
	backgroundColor: "black"
});
```

::: c note Note
We can't assign an object directly to the style property since it's read-only.

[`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) works because it doesn't replace the object; it replaces the enumerable own properties of the object.
:::

### Hiding/showing elements

jQuery has a couple [built-in helper methods](https://api.jquery.com/category/effects/) to set the styles of common CSS properties. Most notably, `hide`, `show`, and `toggle`.

These methods will set the display property of the selected element. For example:

```js
$(".target").hide();
// Sets the display property to "none"
// Equivalent to .css("display", "none")
$(".target").show();
// Sets the display property back to what it was initially, 
// Equivalent to .css("display", "block")
// assuming the display property was "block" initially

$(".target").toggle(); // In this case hides the element
// Works the same as hide and show, except it toggles between the two
$(".target").toggle(); // And shows it again
```

With JavaScript, you'd have to keep track of the initial display property yourself and set the display property as we saw before.

### Modifying classes

The API for dealing with classes is very similar in vanilla JavaScript and jQuery. jQuery has dedicated methods, as per usual, and JavaScript's `ClassList` has matching methods.

```js
let navItem = $(".nav-item");
navItem.addClass("active");
navItem.removeClass("active");
navItem.toggleClass("active");

let navItem = document.querySelector(".nav-item");
navItem.classList.add("active");
navItem.classList.remove("active");
navItem.classList.toggle("active");
```

Here's how to check whether an element contains a specific class:

```js
$(".nav-item").hasClass("active") // true/false

document.querySelector(".nav-item").classList.contains("active")
```

### Creating and inserting elements

So far, we've only been modifying elements. What about creating new ones and inserting them into the DOM?

For that JavaScript has a method called [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement), that takes a tagName as an argument.

Creating an element on its own doesn't do much. Usually, we want to also add the new element to the DOM.

Here's an example of how to do that with jQuery and with vanilla JavaScript:

```js
// Create a div and set its inner text in one line
let newElement = $("<div/>").text("Some text");
// then append it inside another element
$(".container").append(newElement);
```

We can also append any HTML as a string directly into an element with jQuery:
```js
$("body").append(`
	<div>
		Hello <span style="font-weight: bold">world!</span>
	</div>`
);
```

Here's how creating and inserting elements used to be done in JavaScript:

```js
// and the same with vanilla JavaScript
let newElement = document.createElement("div").textContent = "Some text";

// then append the new element to another element
document.querySelector(".container").appendElement(element);

// To turn a string into HTML, set the innerHTML property of an element
let div = document.createElement('div');
div.innerHTML = `Hello <span style="font-weight: bold">world!</span>`;
document.querySelector("body").appendChild(div);
```

And how we can do it now:

```js
// Appending HTML as a string directly into an element
document.querySelector(".container").append(`<div>Some text</div>`);
```
The [`append`](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) method works much like jQuery's append. We can append either `Node` objects or [strings](https://developer.mozilla.org/en-US/docs/Web/API/DOMString).

::: c info Note
We can also prepend elements with the [`prepend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend) method, meaning add them to the start of a container, rather than the end. The prepend method is available both in vanilla JavaScript and jQuery, but it should be noted that there is no `prependChild` method.
:::

### Removing elements
Now that we know how to create and insert elements into the DOM, what about removing them?

```js
$('.target').remove();
document.querySelector('.target').remove();
```
Yup, that's it.

### Traversing the DOM tree

We can't always target the exact element we want. Sometimes we want a sibling or a parent of an element, and we have to traverse the DOM tree to get to it.

```js
let box = $(".box");
box.next();
box.prev();
box.parent();
box.children();

let box = document.querySelector(".box");
box.nextElementSibling;
box.previousElementSibling;
box.parentElement;
box.childNodes;
```

### Handling events

jQuery has built-in methods for different types of event listeners, e.g., `click`, `input`, or `keyup` and a generic `on` method that can handle any event type. JavaScript, on the other hand, has the `addEventListener` method.

```js
// With jQuery
$(".button").click(function(e) { /* handle click event */ });
$(".button").input(function(e) { /* handle input event */ });
$(document).keyup(function(e) { /* handle key up event */ });

// Without jQuery
document.querySelector(".button").addEventListener("click", (e) => {
	/* handle click event */ 
});
document.querySelector(".button").addEventListener("input", (e) => {
	/* handle input event */
});
document.addEventListener("keyup", (e) => {
	/* handle key up event */
});
```

For dynamically added elements, we can delegate the event listening to an element higher up in the DOM tree, e.g., a container or the document itself.

jQuery makes this easy with the `on` method, which can target child elements that trigger the event handler.

```js
$('#dataTable tbody').on("click", "tr", function(event) {
	// Handle the event when a table row is clicked
});
```

In JavaScript, we have to recreate this logic manually:
```js
document.querySelector('#dataTable tbody')
.addEventListener('click', function(event) {
	if (event.target && event.target.tagName == 'TR') {
		// Handle the event when a table row is clicked
	}
});
```

Creating and triggering your own events is simple enough:

```js
$(document).trigger("myEvent");
$(".box").trigger("myEvent");

document.dispatchEvent(new Event("myEvent"));
document.querySelector(".box").dispatchEvent(new Event("myEvent"));
```

### Making network requests

jQuery's `ajax` method has been one of its main attractions, but with the addition of the fetch API, making network requests is in vanilla JavaScript is much easier now.

::: c two-col wide

```js
$.ajax({
	url: "data.json"
}).done(function(data) {
	// Handle data
}).fail(function() {
	// Handle error
});
```
```js
fetch("data.json")
.then(response => response.json())
.then(data => {
	// Handle data
}).catch(error => {
	// Handle error
});
```
:::
::: c info Note
The initial response from the fetch call is an HTTP response, not the actual JSON. To extract the JSON body content from the response, we use the `json()` method.
:::

### Adding animations

Lastly, let's look at animations. jQuery provides us with a few helper methods to use a few simple built-in animations, but jQuery is far from an animation library.

```js
$(selector).fadeIn(speed, callback);
$(selector).slideDown(speed, callback);
```
The optional speed parameter specifies the duration of the effect. It can take the following values: `"slow"`, `"fast"`, or milliseconds.
The optional callback parameter is a function to be executed after the animation completes.

We can also animate different CSS properties with the `animate` method:

```js
$("div").animate(
	{ left: '250px', opacity: 0.5 }, // CSS properties to animate
	200, // Duration in milliseconds
	'swing', // One of the built-in easing functions
	function() { /* Callback after the animation completes */ }
);
```
In the meanwhile, creating animations with CSS has become much easier, so in most cases we don't even need JavaScript. We can trigger animations on pseudo-classes like `:hover` or `:active`, or we could use JavaScript to toggle a class that triggers the animation.

```html
<p class="target">Hover over me for a few seconds</p>
```
```css
.target {
	font-size: 14px;
	transition: font-size 1s ease-in-out 0.3s, opacity 4s;
}

.target:hover {
	font-size: 28px;
	cursor: pointer;
	opacity: 0.1;
	color: red;
}
```
Result:

::: c aside
<p class="target">Hover over me for a few seconds</p>

<style>
.target {
	font-size: 14px;
	transition: font-size 1s ease-in-out 0.3s, opacity 4s;
}

.target:hover {
	font-size: 28px;
	cursor: pointer;
	opacity: 0.1;
	color: red;
}
</style>
:::

The [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) property is short hand for the following properties:
- [`transition-property`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)
- [`transition-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)
- [`transition-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)
- [`transition-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)

We defined two transition properties with different timings: `font-size` and `opacity`. That's why we can see the font size change much faster, and the opacity keeps changing even after the font size has fully transitioned.

Because we didn't define the color as a transition property, it changes to red immediately on hover.

For more complex animations, we can use [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) with [keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)

```css
p {
	animation-duration: 3s;
	animation-name: slidein;
}

@keyframes slidein {
	from {
		margin-left: 100%;
		width: 300%;
	}

	75% {
		font-size: 300%;
		margin-left: 25%;
		width: 150%;
	}

	to {
		margin-left: 0%;
		width: 100%;
	}
}
```

CSS animations are much like CSS transition, except
- You can define reusable animations with a name
- The animation can have multiple steps (keyframes)
- You can control how many times the animation should loop (or infinitely)

The good news is that you don't usually have to create these animations from scratch; there are libraries like [Animate.css](https://animate.style/) and [Animista](https://animista.net/) that provide you with copy & paste CSS animations.

And if those aren't enough, you can create even more complex animations with JavaScript. One way to smoothly and efficiently animate in JavaScript is to create a [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) loop. Or you could use a library like [Anime.js](https://animejs.com/) or [GSAP](https://greensock.com/gsap/).

## Do we need jQuery?

Arguably jQuery's API is still more consistent and easier to use than learning how to do everything jQuery offers in vanilla JS, but that comes with a cost. A cost that I don't think is justifiable.

Here are a few reasons for not including jQuery in your project:

- It's an additional dependency that has to be maintained
- It adds another way to do things we can already do
- It increases application complexity; requires more cognitive capacity
- It increases application size (jQuery is 88kB minified, 30.4kB gzipped)
- Even though jQuery isn't *slow*, it is slower than plain JavaScript

> Does this mean I shouldn't use or lean jQuery, or that jQuery sucks?

No. jQuery is a fantastic library, but for the most part, JavaScript has outgrown its usefulness. Considering the prevalence of jQuery to this date, you're likely to encounter it in existing projects, so you might have to learn it anyway. But, if you're starting a new project, you probably don't need jQuery.

I find that jQuery sits in this valley, where if a project is small and simple, you don't need jQuery, and if it's large or complex, you don't want jQuery; there are better tools or *frameworks* to help us build large-scale applications.

In the following two articles, we're going to talk about modern JavaScript *application* development. We'll look at the build tools and ecosystems for JavaScript and what JavaScript frameworks can offer us.