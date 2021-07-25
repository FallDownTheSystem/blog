---
title: Examples - Blog Template
name: Examples
description: Examples of markdown syntax, custom components and styles.
date: '2021-07-21'
---

<Title :title="frontmatter.name" :description="frontmatter.description" :published="frontmatter.date" />

The big title you see above is a `<Title>` component. It can take three props are arguments, `title`, `description` and `published`.
You can omit `description` or `published` if you don't want them. Usually you'll want to refer to the front matter values in them, rather than having to type them twice.

Here's what a regular `h1` looks like instead:

# {{ frontmatter.name }}

Since we're heavily relying on the [Tailwind CSS Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography) I'm going to use their example here.

Before that, here's a <span class="highlight">fun little class provided in the template that will highlight text, and the highlight grows</span> as you hover it. This class is defined in the `src/styles/main.css` file.

<p className="lead">
  Until now, trying to style an article, document, or blog post with Tailwind has been a tedious
  task that required a keen eye for typography and a lot of complex custom CSS.
</p>

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?

We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
	<h1>Garlic bread with cheese: What the science tells us</h1>
	<p>
		For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an
		iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.
	</p>
	<p>But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.</p>
	<!-- ... -->
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1. We want everything to look good out of the box.
2. Really just the first reason, that's the whole point of the plugin.
3. Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<figure>
  <img
    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
    alt=""
  />
  <figcaption>
    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
    classical Latin literature from 45 BC, making it over 2000 years old.
  </figcaption>
</figure>

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
	purge: [],
	theme: {
		extend: {}
	},
	variants: {},
	plugins: []
};
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1. **Nested lists are rarely a good idea.**
   - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
   - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
   - Nesting tons of folders in your source code is also not helpful.
2. **Since we need to have more items, here's another one.**
   - I'm not sure if we'll bother styling more than two levels deep.
   - Two is already too much, three is guaranteed to be a bad idea.
   - If you nest four levels deep you belong in prison.
3. **Two items isn't really a list, three is good though.**
   - Again please don't nest lists if you want people to actually read your content.
   - Nobody wants to look at this.
   - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

Oh and here's a checklist

- [x] checked
- [ ] not checked
- [x] checked 2
- [ ] not checked 2

Okay, now that we're done with that, I'm going to show a bunch of examples that rely on the custom features of this template.

## Code blocks

Here are a few examples of code blocks and syntax highlighting.

```js
const date1 = new Date(2012, 11, 20, 3, 0, 0);
date1.toLocaleString('fi-FI');
// "20.12.2012 klo 3.00.00"

const number1 = 123456.789;
number1.toLocaleString('de-DE');
// "123.456,789"

const array1 = [4, 7, 10];
array1.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
// "4,00 €,7,00 €,10,00 €"
```

```vue
<template>
	<div>
		<span v-if="showMessage">Now you see me</span>
		<b v-else>Now you don't</b>
		<button type="button" @click="showMessage = !showMessage">Toggle button</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMessage: true
		};
	}
};
</script>
```

If the block is too small for the code to be fully visible, an invisible horizontal scrollbar is added, and the text on the sides is faded out as an indicator.

### Line numbers

We can add line numbers to a code block just by adding `ln` after the language name, e.g. `js ln`

```js ln
const date1 = new Date(2012, 11, 20, 3, 0, 0);
date1.toLocaleString('fi-FI');
// "20.12.2012 klo 3.00.00"

const number1 = 123456.789;
number1.toLocaleString('de-DE');
// "123.456,789"

const array1 = [4, 7, 10];
array1.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
// "4,00 €,7,00 €,10,00 €"
```

### Highlight lines

In the same style, we can add highlighted lines by providing a list of line numbers separated by commas inside of curly braces, e.g. `js ln {3,5}`

```js ln {3,5}
const date1 = new Date(2012, 11, 20, 3, 0, 0);
date1.toLocaleString('fi-FI');
// "20.12.2012 klo 3.00.00"

const number1 = 123456.789;
number1.toLocaleString('de-DE');
// "123.456,789"

const array1 = [4, 7, 10];
array1.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
// "4,00 €,7,00 €,10,00 €"
```

Or a range of lines with a dash `js ln {3-5,7-9}`

```js ln {3-5,7-9}
const date1 = new Date(2012, 11, 20, 3, 0, 0);
date1.toLocaleString('fi-FI');
// "20.12.2012 klo 3.00.00"

const number1 = 123456.789;
number1.toLocaleString('de-DE');
// "123.456,789"

const array1 = [4, 7, 10];
array1.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
// "4,00 €,7,00 €,10,00 €"
```

## Markdown containers

Start a custom container with `:::`

Supported values are after that are:
`tip|note|info|warn|danger "Optional title"`
`more` (Hide's text behind a Read more button)
`tag <html tag|vue component> <v-pre> <classes>`

With the tag container, you can define which HTML tag or Vue component the container should be rendered as, then optionally v-pre to disable vue from interpolating anything inside the container and anything after that is added to the class list of the container.

For example:

```md
::: note "Hello"
This is a note alert.
:::
```

::: note "Hello"
This is a note alert.
:::

::: info
This is an info alert. The optional title is omitted, making the type of the alert component into the title.
:::

::: tip "Hello"
This is a tip alert.
:::

::: warn "Hello"
This is a warn alert.
:::

::: danger "Hello"
This is a danger alert.
:::

For nested containers add a colon for each level, e.g.

```md
:::: tag div aside
I'm inside a container with the class 'aside'
::: tag div v-pre border border-blue-500
I'm in a nested container with a blue border and v-pre
which prevents this from being interpolated {{frontmatter.title}}
:::
::::
```

:::: tag div aside
I'm inside a container with the class 'aside'
::: tag div v-pre border border-blue-500
I'm in a nested container with a blue border and v-pre
which prevents this from being interpolated {{frontmatter.title}}
:::
::::

Try removing the `v-pre` and see what happens.

Besides the few keywords, everything you write after `::: tag <tag>` is added to the container as a class. But you can also define which tag the container element should use.

`::: tag span` for example will make the container a `span`, instead of the default `div`. These can also be Vue components.

Of course we can also just wrap the content with HTML elements ourselves.

```html
<div class="aside">This is wrapped in a div with the class 'aside'</div>
```

<div class="aside">This is wrapped in a div with the class 'aside'</div>

## Read more

The More component lets you hide text until a user clicks on a button to show it. This is useful if you want to include additional information in a tip or a note, but don't want to to be overly long, in case the reader isn't interested.

::: more
This is a simple more component
:::

Here's how you could use it in a note
:::: note "This is a note"
I want to explain something here, but it's kind of long.

::: more
But clearly you were interested, since you clicked read more.
:::
::::

## Slides

The Slides component lets you create a "slide show" presentation with a few simple steps.

You can use custom containers for this, or use the `<Slides>` component yourself.

Every element inside with the class `slide` will be a slide.

```md
:::: tag slides aside
::: tag div slide
This is a simple example of a slide or "slide show".
:::
::: tag div slide
Each slide has its own content,
:::
::: tag div slide
When you're on the last slide, you can't go forward anymore.
:::
::::
```

:::: tag slides aside
::: tag div slide
This is a simple example of a slide or "slide show".
:::
::: tag div slide
Each slide has its own content,
:::
::: tag div slide
When you're on the last slide, you can't go forward anymore.
:::
::::

## Layouts

Let's look at some examples of different types of layouts. These are all just classes defined in the `src/styles/main.css` file.

### Wide

Sometimes we want to break out of the narrow content area. For this we have the class `wide`. Now, if you have content that needs to go beyond the regular width, you'll see this:

<div class="wide aside">
This is a div with the class 'wide' and 'aside', but the content wants to be much wider than the regular width of the content area. But it does have a cap, so eventually the content will wrap.
</div>

### Two columns

Sometimes we want to display something side to side. For this we have the class `two-col`. Often you'll want to pair this with the `wide` class as the content is rarely so narrow that it will fit without the wide layout. The `wide` class will also only take the space it requires, so you don't have to worry about your content becoming too wide.

::: tag div two-col wide

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

### Code panel

This is the same as a `two-col` layout, but rather than having equal sized column, with `code-panel` the right side will dominate the space and take up the space it requires.

Here's an example of a code panel layout in conjunction with a `slides` component.

::::: tag slides wide aside
:::: tag div slide code-panel
::: tag

> What's the exported function?

Exported functions are basically just JavaScript wrappers for the underlying WebAssembly functions. When you call them, the arguments are passed to the function inside your wasm module, the function is invoked, and the result is converted and passed back to JavaScript.
:::

```js {3}
WebAssembly.instantiateStreaming(fetch('simple.wasm'), importObj).then(obj => {
	// Call an exported function:
	obj.instance.exports.exported_func();

	// or access the buffer contents of an exported memory:
	var i32 = new Uint32Array(obj.instance.exports.memory.buffer);

	// or access the elements of an exported table:
	var table = obj.instance.exports.table;
	console.log(table.get(0)());
});
```

::::
:::: tag div slide code-panel
::: tag

> What's the exported memory buffer?

The wasm module's memory buffer is an array of raw bytes. In JavaScript, a `WebAssembly.Memory` instance can be thought of as a resizable `ArrayBuffer`. A memory created by JavaScript or WebAssembly code will be accessible and mutable from JavaScript and WebAssembly.

:::

```js {6}
WebAssembly.instantiateStreaming(fetch('simple.wasm'), importObj).then(obj => {
	// Call an exported function:
	obj.instance.exports.exported_func();

	// or access the buffer contents of an exported memory:
	var i32 = new Uint32Array(obj.instance.exports.memory.buffer);

	// or access the elements of an exported table:
	var table = obj.instance.exports.table;
	console.log(table.get(0)());
});
```

::::
:::: tag div slide code-panel
::: tag

> What's the exported table?

A `WebAssembly.Table` is a resizable typed array of (function) references that can be accessed by both JavaScript and WebAssembly code.

While `Memory` provides a resizable typed array of raw bytes, it is unsafe for references to be stored in a `Memory`.
:::

```js {9}
WebAssembly.instantiateStreaming(fetch('simple.wasm'), importObj).then(obj => {
	// Call an exported function:
	obj.instance.exports.exported_func();

	// or access the buffer contents of an exported memory:
	var i32 = new Uint32Array(obj.instance.exports.memory.buffer);

	// or access the elements of an exported table:
	var table = obj.instance.exports.table;
	console.log(table.get(0)());
});
```

::::
:::: tag div slide code-panel
::: tag

> What's the `importObj`?

So far, we've seen **exported** functions and exported memory and table instances. The `importObject` parameter allows us to import our own functions and memory and table instances into the WebAssembly instance.
:::

```js {1}
WebAssembly.instantiateStreaming(fetch('simple.wasm'), importObj).then(obj => {
	// Call an exported function:
	obj.instance.exports.exported_func();

	// or access the buffer contents of an exported memory:
	var i32 = new Uint32Array(obj.instance.exports.memory.buffer);

	// or access the elements of an exported table:
	var table = obj.instance.exports.table;
	console.log(table.get(0)());
});
```

::::
:::::

## Custom components

I've added a few Vue components in the `src/components/examples` directory of some "news articles". These can be used here without importing them, thanks to the [Vite Plugin Components](https://github.com/antfu/vite-plugin-components), which auto imports components for us from the `src/components` directory.

We can use the component like this:

```
<ComponentBasics />
```

or with a markdown container

```md
::: tag ComponentBasics
:::
```

<ComponentBasics />

Try switching the HTML tag to the custom container, and you'll see that nothing changes.

This is all the examples. Hopefully they're enough to get you started!
