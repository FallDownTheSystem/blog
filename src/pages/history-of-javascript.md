---
title: Modern JS - History of JavaScript
---

<route>
{
	meta: {
		title: "The History of JavaScript",
		description: "A look into the origins of JavaScript and how the ECMAScript specification was born.",
		order: 10,
	}
}
</route>

<Title :title="$route.meta.title" :description="$route.meta.description" />


This article isn't actually about the history of JavaScript. I mean, it is, and it isn't. Really the goal of this article is to explain what I mean by *Modern* JavaScript. To achieve the goal, we're going to have to go through some of JavaScript's history. By understanding JavaScript's history, I hope you'll come to see why there's a divide between the *old*, frequently criticized, and even hated JavaScript and *Modern*, shockingly (😲) popular JavaScript.

::: c note "Intended Audience"
This and the following articles are written with the assumption that you're at least slightly familiar with JavaScript. A basic understanding of the language and its standing on the web is going to be helpful.
:::

## The Origins of JavaScript

In 1995 Netscape hired Brendan Eich to develop something they called *[Scheme](https://en.wikipedia.org/wiki/Scheme_(programming_language)) for the web*; a client-side scripting language to enable dynamic behavior on the web. This language started out as *Mocha* but would be later known as JavaScript. At the same time, Netscape had plans to support another language, [Java](https://en.wikipedia.org/wiki/Java_(programming_language)). To position themselves as the official browser for the anticipated Java platform, they collaborated with Sun Microsystems to embed Java into Netscape's browser.

The partnership led to Mocha being renamed to LiveScript and shortly after to JavaScript. But JavaScript had little to do with Java, except that the syntax was partially inspired by Java rather than Scheme. The name change was purely marketing to ride the wave of hype surround Java at the time. Netscape's vision of JavaScript wasn't clear. There was an internal struggle between wanting the language to resemble Scheme and to be a companion scripting language for Java. This meant that there was no clear direction for JavaScript's design; in the end, JavaScript ended up resembling neither Scheme nor Java.

All of this was happening fast. Really fast. The first version of JavaScript (Mocha) was developed in just ten days. The indecisive direction of the language's design and the rush to develop the language led to some questionable design decisions* that have caused many people to dislike JavaScript.

<p>
<sub>
* Lack of an integer type, aggressive type coercion, lack of classes, and unfamiliar prototypical inheritance, to name a few.
</sub>
</p>

## The ECMA Specification

In 1995 Microsoft released their new browser, [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer). Quickly after the release, Microsoft reverse-engineered Netscape's JavaScript implementation and created their own variation, called [JScript](https://en.wikipedia.org/wiki/JScript).

Although JScript was based on JavaScript, their implementations differed, sometimes in a non-compatible way. This, along with other browser-specific feature differences, lead to a lot of browser interoperability issues. But that wouldn't be the case for long, in theory at least.

In 1996 Netscape submitted JavaScript to [ECMA International](https://en.wikipedia.org/wiki/Ecma_International) (originally the European Computer Manufacturers Association) to create a language specification that all browsers could adhere to. In 1997 the first ECMAScript language specification, ECMA-262, was created.

::: c info "Naming convention"
- The standards specification document is called ECMA-262.
- The language specification is called ECMAScript.
- The standards were previously referred to by their edition number, e.g., ECMAScript 5 or just ES5 for short.
- Nowadays, a new edition of the specification is released annually, and the name includes the year, e.g., ECMAScript 2015 (ES2015), which is the 6th edition of ECMAScript (ES6).
:::

ECMAScript 2 was released in 1998, a year after the original specification. The second edition only included editorial changes so that the specification conformed to the ISO/IEC 16262 international standard, which is the same standard but published under ISO/IEC.

The third edition of ECMAScript was released a year after the second edition in 1999 and included the first actual changes to the language. ECMAScript 3 added regular expressions, better string handling, new control statements, try/catch exception handling, tighter definition of errors, formatting for numeric output, and other enhancements.

The proposed ECMAScript 4 specification included major changes to the language, some of which the stakeholders couldn't find common ground on. Long story short, the 4th edition of the specification would end up being abandoned.

A new version of the specification wouldn't be published until 2009, ten years after the last version. To appease all the stakeholders, ECMAScript 5 was a far less ambitious version focused on compatibility, originally named ECMAScript 3.1 and later renamed to the 5th edition of ECMAScript.

::: c info "ECMAScript 5"
- Adds "strict mode," a subset intended to provide more thorough error checking and avoid error-prone constructs. 
- Clarifies many ambiguities in the 3rd edition specification
- Accommodates behavior of real-world implementations that differed consistently from that specification. 
- Adds some new features, such as getters and setters, library support for JSON, and more complete reflection on object properties.
:::

One reason for the long delay between the 4th and the 5th edition was that by the early 2000s, Internet Explorer (IE) had gained a 95% market share, making JScript the de facto standard. With Internet Explorer's domination of the market share, they didn't need to collaborate on the ECMAScript specification. Not until new browsers managed to take significant market share back from Internet Explorer. Notably, Netscape's successor, Mozilla Firefox, released in 2004, and Google's Chrome released in 2008.

It would be another 6 years between ES5 and ES6. The 6th Edition of ECMAScript, later renamed to ECMAScript 2015, contained many proposed features from ES4. The complete list of new features is extensive, and we'll go through a lot of them in the following article, which lists the key features from all ECMAScript specifications since ECMAScript 2015. This is the start of what I refer to as *modern* JavaScript.

::: c note "Read more"
This is just a glimpse into JavaScript's history. If you're interested in learning [more](https://www.springboard.com/blog/history-of-javascript/) there [are](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/) better [articles](https://medium.com/@_benaston/lesson-1a-the-history-of-javascript-8c1ce3bffb17) for [that](https://auth0.com/blog/a-brief-history-of-javascript/).
:::

## JavaScript innovations

Before moving on to modern JavaScript, I'd like to point out a few key innovations in the world of JavaScript that have had a massive impact on what JavaScript is today. First one of them being [JSON](https://en.wikipedia.org/wiki/JSON) and the second one [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)).

### JavaScript Object Notation

> JSON is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language.

JSON was developed in the early 2000s by Douglas Crockford and has since taken over the world wide web. XML used to be the de facto standard in open data exchange, but JSON has since become the more popular choice. With JSON's simplicity and direct relation to JavaScript, I think it's clear to see why.


::: c two-col wide

```json
{
	"firstName": "John",
	"lastName": "Smith",
	"isAlive": true,
	"age": 27,
	"address": {
		"streetAddress": "21 2nd Street",
		"city": "New York",
		"state": "NY",
		"postalCode": "10021-3100"
	},
	"phoneNumbers": [
		{
			"type": "home",
			"number": "212 555-1234"
		},
		{
			"type": "office",
			"number": "646 555-4567"
		}
	],
	"children": [],
	"spouse": null
}
```

```xml
<root>
	<firstName>John</firstName>
	<lastName>Smith</lastName>
	<isAlive>true</isAlive>
	<age>27</age>
	<address>
		<city>New York</city>
		<postalCode>10021-3100</postalCode>
		<state>NY</state>
		<streetAddress>21 2nd Street</streetAddress>
	</address>
	<phoneNumbers>
		<element>
			<number>212 555-1234</number>
			<type>home</type>
		</element>
		<element>
			<number>646 555-4567</number>
			<type>office</type>
		</element>
	</phoneNumbers>
	<children />
	<spouse null="true" />
</root>
```
:::

<p>
<sup>
Comparing JSON to XML
</sup>
</p>

We're not here to talk about JSON or XML, but I figured they were worth mentioning, considering our next chapter.

### Asynchronous JavaScript and XML

In 2005, Jesse James Garrett released a white paper in which he coined the term AJAX and described a set of techniques on the client-side to asynchronously (dynamically) change the page's content. Even though the term is called Asynchronous JavaScript and **XML**, the concept remains the same for JSON.

AJAX was a revolutionary way to develop web applications, and many libraries were built around the concept of AJAX. Looking at an XMLHTTPRequest, it's clear to see why more straightforward APIs were developed around the concept.

```js
// Initialize the HTTP request.
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.example.org/example.txt');

// Track the state changes of the request.
xhr.onreadystatechange = function () {
	var DONE = 4; // readyState 4 means the request is done.
	var OK = 200; // status 200 is a successful return.
	if (xhr.readyState === DONE) {
		if (xhr.status === OK) {
			// 'This is the output.'
			console.log(xhr.responseText); 
		} else {
			// An error occurred during the request.
			console.log('Error: ' + xhr.status); 
		}
	}
};

// Send the request to http://www.example.org/example.txt
xhr.send();
```

One such library was jQuery. Although jQuery wasn't built around AJAX, jQuery's support for AJAX and its easy-to-use API for modifying the DOM made it a perfect library for creating more dynamic web **applications**.

## Coping with Internet Explorer

The effects of Internet Explorer's long reign in the 2000s lingered well into the 2010s, and the results of IE's dominance can still be seen today, even after its market share has dropped to below 5% globally.

The number of web applications and users, especially business users still on Internet Explorer, has meant that developers have had to support the outdated browser for decades. This may not have been such a big deal, except that the latest version of Internet Explorer, IE 11, only implements ES5. That means that all features released since ES5 can not be used 😢.

### jQuery

> jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and **AJAX**.

jQuery is an immensely popular JavaScript library (used in almost 80% of the top 10 million most popular websites in **2020** 🤯). jQuery was developed in 2006 and is still in active development. Naturally, the next question is, why? Why is jQuery so popular, even a decade and a half later its initial release.

Some of the key factors that made jQuery such an appealing library were that
- jQuery made it easy to do tedious things such as DOM manipulation, animations, and AJAX.
- jQuery provided an API that worked on most browsers, making cross-browser compatibility much more effortless.
- JavaScript has no standard library, and jQuery provided solutions to common challenges.

Above we saw how verbose an XMLHTTPRequest can be. Here's the same request done with jQuery:

```js
$.get("http://www.example.org/example.txt", function(data) {
	console.log(data);
}).fail(function(xhr) {
	console.log('Error: ' + xhr.status); 
});
```

For the most part, jQuery lets developers use existing JavaScript features with these kinds of cleaner APIs. But what about newer features? Features released in ES6 that couldn't be used in Internet Explorer? Well, jQuery doesn't solve that problem.

### Polyfills

[Polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) is a "shim for a browser API", meaning code that implements a feature on browsers that do not support the feature. Polyfills are a way to use newer features in older browsers, with some limitations.

A polyfill works by taking an existing API and implementing the same interface, but in a way that is supported by the old browser. A polyfill only adds the polyfilled implementation if the feature isn't already supported by the browser. This way, new features can be supported without overriding the existing implementation on compatible browsers. But polyfills can't implement all features; for example, polyfills can't add new syntax to the language.

So what if we want to use the latest syntax?

### Transpilers

A transpiler is a source-to-source compiler. In our case, we're interested in a transpiler that takes JavaScript code and turns it back into JavaScript code, but with syntax constructs supported by older browsers. This way, we can use new syntax and compile it into something that more senior browser support.

The major downside is that this requires an additional step, a build step. We're going to talk more about build tools and modern JavaScript development in the 4th article.

The most popular JavaScript compiler is [Babel](https://babeljs.io/). Here's an example of how the Nullish Coalescing operator `??` gets compiled into browser-compatible JavaScript.

```js
element.index ?? -1;

// Gets compiled into
var _element$index;
(_element$index = element.index) != null ? _element$index : -1;
```

## Summary

JavaScript's rushed initial design and unfortunate design choices, combined with cross-browser incompatibility issues and the fact that you can't break the web (backward compatibility), have led to JavaScript being disliked by many. Yet, the language has persevered.

In the 2020 [Stack Overflow's developer survey](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved), 58.3% of developers reported that they are developing with the language and are interested in continuing to develop with it. This is pretty middle of the pack but far from being dreaded or hated.

Even more surprisingly, TypeScript, a statically typed superset of JavaScript that is transpiled into JavaScript, was *"loved"* by 67.1% of developers. The second most high ranking.

JavaScript isn't without its flaws, but things have gotten better with the annual releases since ES2015 and with modern tools that help us build and manage more complex web applications.