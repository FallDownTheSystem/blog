---
title: Modern JS - Frontend Frameworks
---

<route>
{
	meta: {
		title: "Frontend Frameworks",
		description: "An introduction to frontend JavaScript frameworks through the increasingly popular framework Vue.",
		order: 50,
	}
}
</route>


<Title :title="$route.meta.title" :description="$route.meta.description" />

In the previous articles, we explored new language features and looked at the tools used for modern JavaScript development. So let's tie it all together by looking at how we can use frontend frameworks to build web applications.

::: c note "What is a framework?"
A software framework is an abstraction in which the framework provides a scaffold, where the user can implement their own application-specific logic. Frameworks usually provide some functionality that it takes care of, so that the user can focus on developing the application-specific features. Frameworks provide a standard, reusable, and extendable way to build and deploy applications.

The main difference to a normal library is that in a framework, the control is inverted. A framework calls the user's code, rather than the user calling code provided by a library.
:::

## Introducing Vue

> [Vue](https://v3.vuejs.org/) (pronounced /vjuː/, like view) is a progressive **framework** for building user interfaces.

It should be noted that this article is not a tutorial for Vue; the documentation for Vue does a better job at that than I ever could. Instead, I want to talk about the features of frontend JavaScript frameworks in more generic terms, but it helps to use Vue as a concrete example.

Vue is called a **progressive** framework, because Vue is designed to be incrementally adoptable. So, how do you incrementally adopt Vue?

First off, you can start by adding Vue to a single page if you want, without any build tools, making it easy to add Vue to existing projects. By not requiring any build tools, you can enhance parts of your application without committing to building your entire application with Vue.

Secondly, the core library is focused on the view layer, meaning Vue handles things like templating and rendering of the DOM, but you can extend the functionality by adding official or third-party libraries to Vue as plugins. Official libraries include routing (Vue Router) and state management (Vuex).

Lastly, you can use modern build tools and Vue's [Single File Component (SFC)](https://v3.vuejs.org/guide/single-file-component.html) format — along with the aforementioned libraries, to build robust single-page applications (SPAs).

## Features of frontend frameworks

I'm going to introduce you to typical features and concepts in frontend JavaScript frameworks. Even though we're using Vue as an example here, similar concepts are found in almost every framework.

### Templating

Vue has a template syntax that might seem familiar to you if you've used any server-side templating frameworks before. The template, in this case, simply means our HTML, the DOM.

The template syntax allows us to:
- Embed JavaScript expressions into the template
- Render (or not render) elements conditionally
- Iterate over data and render elements in loops
- Bind expressions to element properties
- Attach event listeners to events on elements

All of this is happens reactively, meaning changes to our data is automatically reflected and re-rendered in the DOM. Let's look at examples of all of these and then talk more about reactivity.

::: c note Note
All of these examples are using the Vue SFC format, so they're not actually showing the part where the entire vue application gets mounted, etc.
:::

Here's a very basic example of declaratively rendering an expression. For expressions to be interpolated, they need to be inside curly brackets.

```vue
<template>
	<div>
		Rendering an expression: {{ greeting }}
		<br />
		Expressions don't have to be variables:
		{{ 'Another' + ' expression' }}
	</div>
</template>

<script>
export default {
	data() {
		return {
			greeting: 'Hello, world!'
		};
	}
};
</script>
```

Result:

:::: c aside
::: c tag Expressions

:::
::::

Note that the variables we can use in the template must be declared within our Vue instance.

We can use `v-if`, `v-if-else`, and `v-else` to conditionally render elements. There's also a `v-show`, which works the same same `v-if`, but rather than completely removing the element from the DOM, `v-show` simply hides the element (`display: none`).

I've removed some styling from the example, for the sake of brevity.

:::: c info "The template tag"
The `<template>` tag in the above example is not Vue-specific syntax.

::: c tag more

The template element is a mechanism for holding HTML that is not rendered immediately when a page is loaded but can be instantiated later using JavaScript.

We use the template tag with the Vue SFC syntax, but we can also use template tags within our templates. For example, we can use a template tag with `v-if`, if we wanted to conditionally render some element(s), without including the wrapping element in the rendered DOM.

[MDN: Template tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
:::

::::

```vue
<template>
	<div>
		<span v-if="showMessage">Now you see me</span>
		<b v-else>Now you don't</b>
		<button type="button" @click="showMessage = !showMessage">
			Toggle
		</button>
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

Result:

:::: c aside
::: c tag Conditionals

:::
::::

As you can see, the `span` gets hidden when we toggle the `showMessage` variable, and the `b` tag is shown instead.

We've also introduced another concept here, which is handling events with the `@click="handler"` syntax. You can ignore that for now, as we'll explain it shortly.

We can also use loops with `v-for`, which allows us to render elements in an iterable. `v-for` will render the element it is on, and everything inside it.

```vue
<template>
	<div>
		<div v-for="name in names" class="border">
			<span>My name is: </span>
			<span class="text-green-300">{{ name }}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			names: ['John', 'Jane', 'Lisa', 'Mike']
		};
	}
};
</script>
```

Result:

:::: c aside
::: c tag Loops

:::
::::

We can see the border around the elements, so it's not just the elements inside that are being rendered, but also the wrapping `<div>`. Vue also allows us to iterate over `Object`s, without having to explicitly create an iterable out of them, just as a convenience.

So far, we've seen expressions directly in the template. We can also bind expressions into the properties (attributes) of elements.

Here's an example of binding a variable to the `placeholder` attribute of an input:

```vue
<template>
	<div class="flex">
		<input type="text" :placeholder="placeholderText" />
		<button type="button" @click="placeholderText += '!'">
			Change text
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			placeholderText: 'Dynamic text!'
		};
	}
};
</script>
```

Result:

:::: c aside
::: c tag Attributes

:::
::::

We're binding an expression into the `placeholder` attribute by adding `:` at the start of the attribute. This is a shorthand syntax for `v-bind:placeholder`.

We've already seen the `@click` event listener in a few of the examples. The `@event-name` syntax is also a shorthand. The full syntax is `v-on:event-name`.

Click obviously isn't the only event we can bind to. Let's look at an example where we attach an event listener to an input's `input` event.

```vue
<template>
	<div>
		<input type="text" @input="onChange" />
		<span>{{ val }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			val: ''
		};
	},
	methods: {
		onChange(event) {
			this.val = event.target.value;
		}
	}
};
</script>
```

Result:

:::: c aside
::: c tag Events

:::
::::

We've also used a method as the event handler here, instead of inlining our expression. Methods are available for us to use in our templates just as the variables we define in our `data`.

What if we wanted to change `val` from somewhere else, and have it become to text input's value? Well, we would only have to bind it as the value attribute of the `<input>`. Let's look at an example with and without the value attribute binding.


:::::: c tag slides aside wide
::::: c code-panel slide

:::: c mt-4
Without `value` binding.
::: c tag EventsReverse
:::

When we reverse the text, our `<input>`'s value doesn't change. That's because we're only updating the value when we edit the `<input>` element, but the value isn't bound to the value attribute of the input.
::::

```vue {3}
<template>
	<div>
		<input @input="onChange" />
		<span>{{ val }}</span>
		<button type="button" @click="reverse(val)">
			Reverse text
		</button>
	</div>
</template>
```
:::::

::::: c code-panel slide

:::: c mt-4
With `value` binding.
::: c tag EventsReverseBound
:::
By binding the `value` attribute of the input, we're essentially creating a two-way binding of the data. The `input` event changes the value, and changing the value updates the input.
::::

```vue {3}
<template>
	<div>
		<input @input="onChange" :value="val" />
		<span>{{ val }}</span>
		<button type="button" @click="reverse(val)">
			Reverse text
		</button>
	</div>
</template>
```


:::::

::::: c code-panel slide

:::: c mt-4
With `v-model` binding.
::: c tag EventsReverseTwoWay
:::
This pattern is so common that most frameworks have a built-in way to do this type of two-way data binding easily. In Vue, this is the `v-model` directive.
::::

```vue {3}
<template>
	<div>
		<input v-model="val" />
		<span>{{ val }}</span>
		<button type="button" @click="reverse(val)">
			Reverse text
		</button>
	</div>
</template>
```
:::::

::::::

The above examples all have this same `<script>` section, which I've left out:

```vue
<script>
export default {
	data() {
		return {
			val: ''
		};
	},
	methods: {
		onChange(event) {
			this.val = event.target.value;
		},
		reverse(value) {
			this.val = value.split('').reverse().join('');
		}
	}
};
</script>
```

::: c note Note
Since we can bind to any HTML attribute, we can also bind to the `class` and `style` attributes, in order to dynamically change the style of our elements. This is a very common use-case, so Vue has some syntax to make it easier to change the class and style properties, withing having to completely change the `class` or `style` values to change a single class or property.

Check out the Vue documentation to learn more.
:::


That covers the basics of templating. Most frontend frameworks will have something similar to this, but with slightly different syntax.

### Reactivity

We've seen how changing the data in Vue automatically updates the DOM. The idea of the DOM being synced with the state or the `data` is the basis of most frontend frameworks. It's much easier to maintain your application's state when there is a single source of truth, and you don't need to sync the data and the DOM yourself — which, as we've seen in earlier articles, can be very tedious.

Let's explore how this reactivity works and introduce some new concepts we can use with the help of reactivity.

Vue tracks changes through [Proxy](/new-es-features#proxy) **objects**. Proxies only work on objects, which is why Vue can't just detect changes on any variable. The reactive state has to be declared inside Vue's `data` object. Whenever a change is detected, vue will trigger an update on the DOM. Change's to the DOM aren't done directly in the DOM because updating the DOM is an expensive operation, instead Vue uses a Virtual DOM, a JavaScript representation of the real DOM, to calculate all the required changes and update only what needs to be updated, all at once.

Reactivity allows us to do more than just update the DOM whenever a change is detected. We can also setup watchers or *computed properties*, that will trigger an update whenever a change in our reactive data is detected.

In other frameworks, these might be called effects or reactive declarations. The basic idea is to calculate another property's value, whenever a reactive value it references is changed. The difference between a method and a computed propery is that the computed property is cached and only calculated if the underlying reactive value changes, whereas a method would be called every time the DOM is updated. But, unlike methods, computed properties cannot take in any arguments.

Let's look at a computed property in action:

```vue
<template>
	<div class="flex flex-col">
		<span>Animals: {{ animals }}</span>
		There are {{ catCount }} cats
	</div>
	<button @click="animals.push('Cat')">Add a cat</button>
</template>

<script>
export default {
	data() {
		return {
			animals: ['Cat', 'Dog', 'Bird', 'Cat', 'Lizard']
		};
	},
	computed: {
		catCount() {
			return this.animals.filter(x => x === 'Cat').length;
		}
	}
};
</script>
```

Result:

:::: c aside
::: c tag ComputedProperty

:::
::::

Vue also has another, more generic, way of watching for changes in reactive data, called `watchers`. The concept is similar to computed properties, except you can define any custom logic to run when a value is changed, rather than just calculating a different value.

### Lifecycles

We can declaratively render our data in the DOM, we can watch for changes to our reactive data, but when does Vue actually update our DOM?

Whenever a Vue component is created, it goes through a series of initialization steps.

::: c aside wide

<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1388">
  <g fill="none" fill-rule="evenodd">
    <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#848484">
      <tspan x="231.593" y="1303">* Template compilation is performed ahead-of-time if using</tspan> <tspan x="270.756" y="1321.5">a build step, e.g., with single-file components.</tspan>
    </text>
    <g transform="translate(72 1056)">
      <path d="M160 18v14l-14-7 14-7zm180 6v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3z" fill="#DB5B62" fill-rule="nonzero"/>
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="47" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62">
        <tspan x="25.749" y="30">beforeUnmount</tspan>
      </text>
    </g>
    <path stroke="#9AA9B2" stroke-width="2" fill="#9AA9B2" stroke-linecap="square" stroke-dasharray="1,6" d="M413 947v40"/>
    <path d="M414 1104v2h6l-7 14-7-14h6v-2h2zm0-7v3h-2v-3h2zm0-7v3h-2v-3h2zm0-7v3h-2v-3h2zm0-7v3h-2v-3h2zm0-7v3h-2v-3h2zm0-7v3h-2v-3h2zm0-7v3h-2v-3h2z" fill="#9AA9B2" fill-rule="nonzero"/>
    <text font-family="Inter, Roboto, sans-serif" font-size="14" transform="translate(355 947)">
      <tspan x="39.766" y="60" fill="#8E9EA9">when </tspan> <tspan x="3.973" y="77" fill="#8E9EA9">app.</tspan> <tspan x="32.221" y="77" fill="#DB5B62">unmount</tspan> <tspan x="90.703" y="77" fill="#8E9EA9">() is </tspan> <tspan x="38.21" y="94" fill="#8E9EA9">called</tspan>
    </text>
    <g transform="translate(72 238)">
      <path d="M160.676 17.036l-.037 14L146.657 24l14.019-6.964zm176.231 6.459l2 .005 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 1 .003 1 .002-.005 2-1-.002-1-.003-1-.003.005-2zm-7-.018l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.006-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.006-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.006-2z" fill="#DB5B62" fill-rule="nonzero"/>
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="47" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62">
        <tspan x="32.642" y="30">beforeCreate</tspan>
      </text>
    </g>
    <g transform="translate(282 64)">
      <path d="M132 65v35h6l-7 14-7-14h6V65h2z" fill="#9AA9B2" fill-rule="nonzero"/>
      <rect stroke="#2F679A" fill="#3E6B94" x="-.5" y="-.5" width="259" height="66" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14">
        <tspan x="37.555" y="28" fill="#FFF">app = Vue.</tspan> <tspan x="109.156" y="28" fill="#FFB196">createApp</tspan> <tspan x="178.976" y="28" fill="#FFF">(</tspan> <tspan x="184.638" y="28" fill="#39DD95">options</tspan> <tspan x="234.783" y="28" fill="#FFF">)</tspan> <tspan x="87.311" y="46.5" fill="#FFF">app.</tspan> <tspan x="116.559" y="46.5" fill="#FFB196">mount</tspan> <tspan x="159.469" y="46.5" fill="#FFF">(</tspan> <tspan x="164.131" y="46.5" fill="#39DD95">el</tspan> <tspan x="176.027" y="46.5" fill="#FFF">)</tspan>
      </text>
    </g>
    <path d="M272 467v53h6l-7 14-7-14h6v-53h2zM554 467v53h6l-7 14-7-14h6v-53h2z" fill="#9AA9B2" fill-rule="nonzero"/>
    <path d="M553.025 467.004h-282" stroke="#9AA9B2" stroke-width="2" fill="#9AA9B2" stroke-linecap="square"/>
    <g fill="#9AA9B2">
      <path stroke="#9AA9B2" stroke-width="2" stroke-linecap="square" d="M271 636v-43M553 635v-42"/>
      <path d="M413 706l7-14h-6v-55h-2v55h-6l7 14z" fill-rule="nonzero"/>
      <path stroke="#9AA9B2" stroke-width="2" stroke-linecap="square" d="M553 637H271"/>
    </g>
    <g transform="translate(169 535)">
      <rect stroke="#23AC70" fill="#3AB881" x="-.5" y="-.5" width="207" height="58" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14">
        <tspan x="49.695" y="23.918" fill="#FFF">Compile template</tspan> <tspan x="39.568" y="42.418" fill="#FFF">into render function </tspan> <tspan x="171.312" y="42.418" fill="#F6DA72">*</tspan>
      </text>
    </g>
    <g transform="translate(451 535)">
      <rect stroke="#23AC70" fill="#3AB881" x="-.5" y="-.5" width="207" height="58" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14">
        <tspan x="29.016" y="23.918" fill="#FFF">Compile el’s innerHTML</tspan> <tspan x="62.727" y="42.418" fill="#FFF">as template </tspan> <tspan x="140.989" y="42.418" fill="#F6DA72">*</tspan>
      </text>
    </g>
    <path d="M413 415.433L509.057 467 413 518.567 316.943 467 413 415.433z" stroke="#F2781E" fill="#FF8228"/>
    <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#FFF" transform="translate(318 416)">
      <tspan x="82.052" y="37.727">Has</tspan> <tspan x="38.08" y="56.227">“template” option?</tspan>
    </text>
    <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#8E9EA9" transform="translate(169 416)">
      <tspan x="61.662" y="69">YES</tspan>
    </text>
    <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#8E9EA9" transform="translate(169 416)">
      <tspan x="405.5" y="69">NO</tspan>
    </text>
    <g transform="translate(72 354)">
      <path d="M160 17v14l-14-7 14-7zm180 6v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3z" fill="#DB5B62" fill-rule="nonzero"/>
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="47" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62">
        <tspan x="50.652" y="30">created</tspan>
      </text>
    </g>
    <g transform="translate(72 640)">
      <path d="M160.676 18.036l-.037 14L146.657 25l14.019-6.964zm176.231 6.459l2 .005 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .003-.005 2-1-.003-1-.003-1-.002.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.005-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.005-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.005-2zm-7-.019l1 .003 1 .003 1 .002-.005 2-1-.002-1-.003-1-.003.005-2zm-7-.018l1 .003 2 .005-.005 2-2-.005-1-.003.005-2zm-7-.018l1 .003 1 .002 1 .003-.005 2-1-.003-1-.002-1-.003.006-2zm-7-.018l2 .005 1 .003-.005 2-1-.003-2-.005.006-2zm-7-.018l1 .002 1 .003 1 .002-.005 2-1-.002-1-.003-1-.002.006-2z" fill="#DB5B62" fill-rule="nonzero"/>
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="47" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62">
        <tspan x="34.697" y="30">beforeMount</tspan>
      </text>
    </g>
    <g transform="translate(72 780)">
      <path d="M160 18v14l-14-7 14-7zm180 6v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3z" fill="#DB5B62" fill-rule="nonzero"/>
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="47" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62">
        <tspan x="46.759" y="30">mounted</tspan>
      </text>
    </g>
    <g transform="translate(72 1150)">
      <path d="M160 18v6h1v2h-1v6l-14-7 14-7zm127 6v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3zm-7 0v2h-3v-2h3z" fill="#DB5B62" fill-rule="nonzero"/>
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="47" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62">
        <tspan x="38.973" y="30">unmounted</tspan>
      </text>
    </g>
    <g>
      <g transform="translate(599 749)">
        <path d="M2.23 85.505l1.294 1.525-.763.647-1.525 1.293-1.294-1.525.763-.647 1.525-1.293zm5.339-4.528l1.293 1.525-.762.647-.763.647-.763.647-1.293-1.526 1.525-1.293.763-.647zm5.339-4.527l1.293 1.525-1.525 1.293-.763.647-1.293-1.525.762-.647.763-.647.763-.646zm5.338-4.528l1.294 1.525-.763.647-.763.647-.762.647-1.294-1.526.763-.646 1.525-1.294zm5.339-4.528l1.293 1.526-.762.647-.763.646-.763.647-1.293-1.525.763-.647.762-.647.763-.647zm5.339-4.527l1.293 1.525-.763.647-.762.647-.763.647-1.293-1.526.762-.647.763-.646.763-.647zM48 48l-6.15 14.394-9.055-10.678L48 48zM34.262 58.34l1.294 1.525-.763.646-1.525 1.294-1.294-1.525.763-.647.763-.647.762-.647z" fill="#DB5B62" fill-rule="nonzero"/>
        <rect stroke="#DB5B62" stroke-width="2" x="21" y="1" width="144.127" height="46.184" rx="8"/>
        <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62">
          <tspan x="51.101" y="28.678">beforeUpdate</tspan>
        </text>
      </g>
      <path d="M642.86 988.602L649 1003l-15.203-3.726 9.062-10.672zm-8.378.759l.763.647.762.647.762.648-1.294 1.524-.763-.647-.762-.647-.762-.648 1.294-1.524zm-5.335-4.53l.762.646.762.648.762.647-1.294 1.524-.762-.647-.763-.647-.762-.647 1.295-1.525zm-5.336-4.532l.762.648.762.647.762.647-1.294 1.525-1.525-1.295-.762-.647 1.295-1.525zm-5.336-4.53l.762.647.762.647.763.647-1.295 1.525-.762-.647-1.525-1.295 1.295-1.525zm-5.336-4.531l.762.647.762.647.763.647-1.295 1.525-.762-.647-1.525-1.295 1.295-1.524zm-5.336-4.531l.762.647 1.525 1.295-1.295 1.524-.762-.647-.762-.647-.763-.648 1.295-1.524zm-5.336-4.531l.762.647.763.648.762.647-1.295 1.524-.762-.647-.762-.647-.762-.647 1.294-1.525z" fill="#DB5B62" fill-rule="nonzero"/>
      <path d="M756.536 1004c1.933 0 3.683.784 4.95 2.05a6.978 6.978 0 012.05 4.95h0v35.184a6.978 6.978 0 01-2.05 4.95 6.978 6.978 0 01-4.95 2.05h0H627a6.978 6.978 0 01-4.95-2.05 6.978 6.978 0 01-2.05-4.95h0V1011c0-1.933.784-3.683 2.05-4.95A6.978 6.978 0 01627 1004h0z" stroke="#DB5B62" stroke-width="2"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#DB5B62" transform="translate(602 963)">
        <tspan x="65.132" y="70">updated</tspan>
      </text>
      <path d="M576.785 819c6.682 3.957 12.71 8.832 18.01 14.411l-.703-.736a83.825 83.825 0 0111.52 14.047c10.695 15.46 15.754 34.304 15.367 53.281.07 17.046-4.313 34.254-13.882 49.473-7.685 12.222-17.717 22.1-29.152 29.418l-1.07.675-.693.426a94.715 94.715 0 01-15.257 7.538l-.975.373-.28.103a95.235 95.235 0 01-27.074 5.78l-.258.015-.363.024-.956.051-.709.032a95.312 95.312 0 01-33.803-4.646 94.877 94.877 0 01-15.537-6.65l-.258-.141a70.875 70.875 0 01-.93-.51l-.99-.557-.191-.112a94.409 94.409 0 01-17.315-12.745 94.131 94.131 0 01-14.775-17.444 93.788 93.788 0 01-8.463-16.035l-.38-.935-.112-.289a93.703 93.703 0 01-6.539-32.83 93.654 93.654 0 013.885-28.58l.39-1.275a93.671 93.671 0 016.442-15.556l.227-.428c.14-.265.281-.529.424-.792 6.422-11.869 15.501-22.55 27.089-31.1l.812-.593 2.62-1.936" stroke="#8999A4" stroke-width="2" stroke-dasharray="4"/>
      <g transform="translate(519 863)">
        <rect stroke="#23AC70" fill="#3AB881" x="20.5" y="-.5" width="139.833" height="78" rx="8"/>
        <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#FFF">
          <tspan x="53.006" y="25.333">Virtual DOM</tspan> <tspan x="54.424" y="43.833">re-rendered</tspan> <tspan x="60.252" y="62.333">and patch</tspan>
        </text>
      </g>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#8E9EA9" transform="translate(431 749)">
        <tspan x="62.197" y="58">when data </tspan> <tspan x="71.535" y="75">changes</tspan>
      </text>
    </g>
    <g transform="translate(316 179)">
      <path d="M98 57v46h6l-7 14-7-14h6V57h2z" fill="#9AA9B2" fill-rule="nonzero"/>
      <rect stroke="#23AC70" fill="#3AB881" x="-.5" y="-.5" width="192" height="58" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#FFF">
        <tspan x="87.162" y="24">Init </tspan> <tspan x="42.421" y="42.5">events &amp; lifecycle</tspan>
      </text>
    </g>
    <g transform="translate(316 297)">
      <path d="M98 57v47h6l-7 14-7-14h6V57h2z" fill="#9AA9B2" fill-rule="nonzero"/>
      <rect stroke="#23AC70" fill="#3AB881" x="-.5" y="-.5" width="192" height="58" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#FFF">
        <tspan x="87.162" y="24">Init </tspan> <tspan x="31.142" y="42.5">injections &amp; reactivity </tspan>
      </text>
    </g>
    <g transform="translate(317 707)">
      <path d="M96.494 56.399l.01 1 .81 75.583 6-.064-6.85 14.074-7.15-13.924 6-.064-.81-75.584-.01-1 2-.021z" fill="#9AA9B2" fill-rule="nonzero"/>
      <rect stroke="#23AC70" fill="#3AB881" x="-.5" y="-.5" width="192" height="58" rx="8"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#FFF">
        <tspan x="36.456" y="24">Create app.$el and</tspan> <tspan x="52.148" y="42.5">append it to el</tspan>
      </text>
    </g>
    <g transform="translate(367 855)">
      <circle stroke="#DC424C" fill="#DB5860" cx="46" cy="46" r="46.5"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#FFF">
        <tspan x="18.759" y="51">Mounted</tspan>
      </text>
    </g>
    <g transform="translate(360 1121)">
      <circle stroke="#DC424C" fill="#DB5860" cx="53" cy="53" r="53.5"/>
      <text font-family="Inter, Roboto, sans-serif" font-size="14" fill="#FFF">
        <tspan x="17.311" y="58">Unmounted</tspan>
      </text>
    </g>
  </g>
</svg>

[vuejs.org: Lifecycle diagram](https://v3.vuejs.org/guide/instance.html#lifecycle-diagram)
:::

We can hook into these lifecycle methods and run our own code at any point during a component's lifecycle.

### Components

We've mentioned components quite a few times, but haven't really talked about what a component is.

A vue application is always wrapped in an element, what you could call a root component or a root instance. We can create other components to use inside our root component, and we can use the same component more than once. You can think of components just like you would other HTML elements, they can be nested and used to construct a tree like structure, just like the DOM.

::: c aside
<img src="/src/assets/components.png" />
:::

The big difference between HTML elements and Vue components is that components can contain more than one element, and they can have data (state) and methods associated with them.

What's interesting is how data flows between components. The general idea is that you pass data down as properties, from parent component to a child component, and you use events to send data back up. Meaning a child component will emit an event, with data assiocated with the event, and the parent will listen for that event, and have an event handler. These don't have to be the built-in events, you can create your own custom events.

Let's look at an example of a nested component, where we pass down data in as a property (prop) and send something back up as an event.

If we have a root component with some news article components like this:

```vue
<template>
	<div>
		<NewsArticle
			v-for="article in articles"
			:title="article.title"
			@article-saved="onSaved($event, article)"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [
				{ title: 'The first news article' },
				{ title: 'The second news article' },
				{ title: 'The third news article' }
			]
		};
	},
	methods: {
		onSaved(event, article) {
			article.title = event.newTitle;
		}
	}
};
</script>
```

And a news article component like this:

```vue
<template>
	<div>
		<h2 class="!mb-4">{{ title }}</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna.
		</p>
		<button @click="saveArticle">
			<span>{{ savedText }} ♥</span>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		title: String
	},
	data() {
		return {
			read: false
		};
	},
	methods: {
		saveArticle() {
			if (!this.read) {
				this.$emit(
					'article-saved',
					{ newTitle: this.title + ' (read)' }
				);
			}
			this.read = true;
		}
	},
	computed: {
		savedText() {
			return this.read ? 'Saved' : 'Save';
		}
	}
};
</script>
```

Result:

:::: c aside
::: c tag ComponentBasics

:::
::::

Few things to note:
- We can't modify the `title` property inside the `NewsArticle` component directly, because props are read-only.
- The `NewsArticle` component is re-used for each article, and they all have their own internal data, as well as the prop we pass in.
- When we click the `Save` button, the component emits an event, that is handled by the parent.

In a simple example like this, handling the applications state is still easy, but what if we had a ton of nested components, and we needed to move data to a deeply nested child, or from one component to a sibling component?

In these types of cases it might be better to move our data away from the component itself, and into a global *"store"*, that we can then import into our components, without having to pass the data between components.

### State management

In a complex application, managing state can become cumbersome. That's why most frontend frameworks have libraries that help us manage the application's state.

There's a popular state management architecture pattern called Flux. Even Vue's state management library, Vuex, uses a Flux-like implementation.

With Vue 3 it's easy enough to create your own global reactive store where you can store data and methods, or you can reach to Vuex if you need more structure, for example when working in a large team.

Here's a simple example of a Vuex store:

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

This diagram illustrates the Vuex pattern pretty well:

::: c aside
<img src="/src/assets/vuex.png">
:::

Let's unpack this picture.

**State**

> Vuex uses a single state tree - that is, this single object contains all your application level state and serves as the "single source of truth." This also means usually you will have only one store for each application. A single state tree makes it straightforward to locate a specific piece of state, and allows us to easily take snapshots of the current app state for debugging purposes.

Even though the state is a single object, it can still be split into sub modules.

**Getters**

> Vuex allows us to define "getters" in the store. You can think of them as computed properties for stores.

Just like computed properties, getters are automatically updated whenever your state changes.

**Mutations**

> The only way to actually change state in a Vuex store is by committing a mutation.

Mutations are functions that allow you to mutate your state. The idea is that you shouldn't mutate your state directly, instead using mutations to make changes predicatable and trackable.

**Actions**

> Actions are similar to mutations, the differences being that:
> - Instead of mutating the state, actions commit mutations.
> - Actions can contain arbitrary asynchronous operations.

Actions can commit multiple mutations. A mutation is supposed to be a pure function, where as an action can contain side effects.

Newer state management libraries (including future versions of Vuex) have started to drop the idea of seperating mutations as actions, as most of the time they're the same and they add unnessary boilerplate code.


::: c note Devtools
By always using a mutations to modify our data, we can track the changes in our state. This allows us to use [Devtools](https://devtools.vuejs.org/) (a browser extension), to visualize and debug changes in the state.
:::

Keep in mind that a state management library can add a lot of boilerplate code to your project, so you probably shouldn't use one unless you really need to.

For more information, read the [Vuex](https://vuex.vuejs.org/#what-is-a-state-management-pattern) documentation.

### Routing

So far we've been dealing with only one or two components. Technically we could create the illusion of changing pages by using the conditional directives, `v-if` or `v-show`, in order to hide parts of the page, or the entire page, and show a completely different view to the user.

That's essetially what the vue-router library helps us do, but in a more easily manageable way.

Here's an example:

```html
<div id="app">
	<h1>Hello App!</h1>
	<p>
		<router-link to="/">Go to Home</router-link>
		<router-link to="/about">Go to About</router-link>
	</p>

	<router-view></router-view>
</div>
```

Note how instead of using regular a tags, we use a custom component `router-link` to create links. This allows Vue Router to change the URL without reloading the page.

The `router-view` component will display the component that corresponds to the url. You can put it anywhere to adapt it to your layout. You can even have nested `router-view` components, given that your routes also have nested child components.

The JavaScript side of this example looks like this:

```js
// Define some routes
// Home and About would be components defined elsewhere and imported here
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// Create the router instance and pass the `routes` option
const router = VueRouter.createRouter({
  // We can use the hash (#) in the URL to keep track of the routes
  // Or we could use createWebHistory to use JavaScript's History
  // to keep track of the routes.
  // https://developer.mozilla.org/en-US/docs/Web/API/History
  history: VueRouter.createWebHashHistory(),
  routes,
})

// Create and mount the root instance.
const app = Vue.createApp({})
app.use(router)
app.mount('#app')
```

For more information, check out the [Vue router](https://next.router.vuejs.org/guide/) documentation.

## Frontend framework ecosystems

The Vue ecosystem is much larger than just the core library and the official libraries. There are tons of user-made libraries, components, and plugins that you can take advantage of. What I want to introduce you to are some of the development tools we can use to help us create frontend applications.

### Scaffolding tools

Most frameworks will have a tool, usually a CLI, to help bootstrap and create project scaffolding. They can also help install plugins and libraries.

Vue has the [Vue CLI](https://cli.vuejs.org/).

> Vue CLI is a full system for rapid Vue.js development, providing:
> - Interactive project scaffolding via @vue/cli.
> - Zero config rapid prototyping via @vue/cli + @vue/cli-service-global.
> - A runtime dependency (@vue/cli-service) that is:
> 	- Upgradeable;
> 	- Built on top of webpack, with sensible defaults;
> 	- Configurable via in-project config file;
> 	- Extensible via plugins
> - A rich collection of official plugins integrating the best tools in the frontend ecosystem.
> - A full graphical user interface to create and manage Vue.js projects.

React has [Create React App](https://github.com/facebook/create-react-app), a tool to setup a React project with a single command.

Other frameworks will have similar tools. What all of them have is common is that they setup a project with the required tools to
- Run a development server
- Build the project for production

### Framework Frameworks

That's right, a framework for a framework, a *meta framework*, if you will.

Almost all the popular frameworks have projects that help us create fully fledged applications with best practises, by including a lot more features than what the base frameworks/libraries include.

These frameworks generally contain built-in features like
- Pre-rendering
- Routing
- Data fetching / Content Management Systems (CMS)
- Meta tags and SEO
- A library of supported add-ons

Here are some of the more popular frameworks:

- React has [Next.js](https://nextjs.org/)
- Vue has [Nuxt.js](https://nuxtjs.org/)
- Svelte has [SvelteKit](https://kit.svelte.dev/)
- Angular has... nothing?

Angular as a framework comes with more features than most other Frameworks, hence there's not as much demand for a *meta* framework for Angular. React on the other hand isn't considered a framework on its own right, which is why it makes sense for a Framework like Next.js to exist.

## Vue vs. Other frameworks

We've mentioned quite a few different frameworks and libraries at this point. We know the basics of what Vue offers us, but what about other frameworks? React is the most popular library, why didn't we use React as an example?

React is a "JavaScript library for building user interfaces", it lacks many of the features that other frameworks provide, which is why, even though popular, I thought Vue would make a better example.

But to give you some idea of what's out there, let's go through the most popular frameworks and see how they differ from Vue.

**React**

[React](https://reactjs.org/) allows us to create declarative components that update reactively, just like Vue. The main difference is that React is all JavaScript, where as Vue seperates the template, code, and styles from each other. React may be less intuitive at first, but it's easy to get into if you're familiar with JavaScript. To make it easier to write templates with React, [JSX](https://reactjs.org/docs/introducing-jsx.html), a syntax extension to JavaScript can be used.

Here's an example of a basic React component:

```jsx
class HelloMessage extends React.Component {
	render() {
		return (
		<div>
			Hello {this.props.name}
		</div>
		);
	}
}

ReactDOM.render(
	<HelloMessage name="Taylor" />,
	document.getElementById('hello-example')
);
```

It should be noted that Vue also supports JSX and using render functions, very similar to React. although it's not usually the idiomatic way to use Vue.

**Angular**

[Angular](https://angular.io/) is more similar to Vue than React is. Angular also uses HTML templates for the DOM. Components, data binding, and event handling is very similar in both frameworks. The biggest difference is that Angular uses TypeScript and has to be compiled. Angular's templates are also `Class` based and more verbose than Vue's. Angular also prefers to seperate it's template, code and styles into their own files.

Angular also comes with a lot more built-in, but nothing that can't be added to Vue with additional libraries.

For the sake of comparison, here's a basic Angular application:

HTML:

```html
<hello name="{{ name }}"></hello>
<p>
  Start editing to see some magic happen :)
</p>
```

Component:
```ts
// Root
import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}

// Hello
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}

```

**Svelte**

[Svelte](https://svelte.dev/) takes a slightly different approach than the other frameworks.

> Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.

Here's a basic Svelte app:

```js
<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

Svelte requires probably the least amount of source code, but has to be compiled to be used.

## Closing words

This article was just the start of it, there are hundreds of frontend frameworks for JavaScript, but most aren't all that popular — competition and innovation are good things though.

There are also a ton of server-side templating frameworks, that we've completely ignored here — we're talking about JavaScript development after all. But just a reminder that other options exist.

What I've presented here is a subjective view of the JavaScript landscape. Each of these tools, libraries, and frameworks is a rabbit hole on it's own, and there's only so much I can cover. Not to mention the thousands upon thousands of JavaScript libraries that we didn't even mention.

It's a lot to take in, and if you're wondering where to go from here, I'll offer two paths:

If you want to get started with JavaScript frameworks, I would recommend reading the Vue documentation. Their documentation is best-in-class, and very easy to get started with.

If you prefer to learn more about the tools discussed in the previous article, I would start by

- Installing Node.js (and npm)
- Creating a new project
- Installing a few packages
- Setting up either Webpack, Rollup (or even Vite)
- And trying to create a small application (not necessarily a browser application).

Lastly, if you find any errors or take issue with anything written in these articles, [open an issue or a pull request](https://github.com/FallDownTheSystem/blog)
