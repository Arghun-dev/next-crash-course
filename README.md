# next-crash-course

Installation

`$. npx create-next-app appName`

Next.js is a wrapper to React, which enables React code to pre-render and render on the server.

## Initialization of Next.js

1. `Pre-rendering:` Statically generated and server rendered, React applications have never been easier.
2. `Static Exporting:` No need to learn a new framework. Exporting a static site with Next.js is as easy as a single command.
3. `Zero Configuration:` Automatic code splitting, file system, base Routing, hot code reloading, and universal rendering.
4. `Fully Extensible:` Complete Control over Babel and Webpack. Customizable Server, routing and next plugins.
5. `Ready for production:` Optimized for a smaller build size, faster dev compilation, and dozens of other frameworks.
6. `css in js:` Next.js comes with **styled-jsx** included, but it also works with every css in js solutions.

I converted all of my files to `.ts` once you do this, you immediately notice that we do not have `tsconfig`, But the thing is **Next.js** can automatically, take care of that, how awesome is that, so I'm gonna create a file called `tsconfig.json` and I'm gonna let it empty, it would be handled with `Next.js` we don't have to mess around with it initially at least.

Then I'm going to install some packages, which would enable us the `types` support, and all the nice features of `typescript`.

`$. npm i typescript @types/node @types/react --save-dev`

why `--save-dev`, because these are dev dependencies, and we don't need them on the production.

now if you look at your codes, you will notice so many errors, but don't worry, once you fill up `tsconfig.json` file, the errors will fade off. to do that:

run:
`$. npm run dev`

this will go to the package.json and it will see and run `next dev`, and `next dev` is magic => it is going to take care of so initialization, and compiling your `typescript` and `hot reloading` of code and `fast refresh` and all that good stuff out of the box.

so if you run `$. npm run dev`, you will see that, it says **We detected Typescript in your project and created a tsconfig.json file for you.**

That was initialization of Next.js with typescript

`------------------------------------------------------------------------------------------------------------------------------------`

## File Structure Explanation

`puclic:` what you put in this file, it's going to be accessible on your `root` domain.
`pages:` this is where our source code would live.
`styles:` You can have your styles in this folder, or you can copy and paste your `styles` files into `pages` folder.

Now we have **2 folder:** `public` and `pages`, and the second one is `puclic` which public folder includes `static files`, and the `pages` folder for your source code


## Pages in Next.js

what happens with `pages` is that whatever file, `Next.js` finds ends with `.js .jsx .ts .tsx` inside `pages` folder, it would create a `path` of that.

And next.js will render all the files defined inside `pages` folder on the `server`. and this has multiple benefits, in terms of `seo` and `performance`, but the most notable benefit you can see is the client now, when the `pages` loaded, is never waiting for any sort of javascript to execute, for displaying the content, which increases performance a lot for the client side.

And notice that any file defined inside `pages` folder should return a `react component` and it should export as `default export`.


## _document.tsx

create a file called `_document.tsx` inside `pages` folder

in this file, you can add additional `meta tags` and other other properties into your html file.

```js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```


## _app.tsx

this `_app.tsx` is actually responsible for rendering all of your `pages`, And How it do this?

`Next.js`is actually passing 2 things here, the first one is `Component` and second one is `pageProps`

what's really happening here, is that this code, this function is being executed both on the server obviously for server side rendering and on the client as well. with `_document.tsx` what's happening is that things really execute just on the `server`

```js
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

You will see an `index.js` file which is our `HomePage` 

And you will see a `styles` folder which includes your styles. If you're gonna define styles for your components you should do this just like below:

for example I'm going to define styles for a component called `Nav`

`Nav.module.css`

and then you can import it just like this and use it inside your component

```js
import navStyles from '../styles/NavStyles.module.css'

const Nav = () => {
  return (
    <nav className={navStyles.container}>
      .
      .
      .
    </nav>
  )
}

export default Nav;
```

in Next.js you don't have to bring in third party library and you don't have to define your own Routes, you simply put your pages inside `pages` folder. And all pages are `React` components.

So, let's say I wanna have `about` page, I'm creating a React component called `About.js` inside `pages` folder.

About.js

```js
const About = () => {
  return <div>About</div>
}

export default About;
```

now if we go to `/about` route we will see the `About` page 


### Head

`$. import Head from 'next/head'`

this is used when we wanna have `custom titles`, or `meta tags`, maybe `keywords` or `description`

**index.js**

```js
import Head from 'next/head'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Web Dev Newz</title>
        <meta name='keywords' content='web development, programming' />
      </Head>
      
      <h1>Welcome to Next</h1>
    </div>
  )
}
```


**About.js**

```js
import Head from 'next/head';

const About = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      
      <h1>This is About Page</h1>
    </div>
  )
}

export default About;
```

**_app.js**

this wraps around all of your page component, it's a function, it takes a `Compoenent` which is your page component and it takes `pageProps`.

And if you wanna create components which is not pages, create a folder called `components` and inside that you can make your components.


### Styles Jsx

```js
import Head from 'react/head'

const Home = () => {
  const x = 5;
  return (
    <div>
      <Head>
        <title>HomePage</title>
        <meta name='keywords' content='webDev, programming' />
      </Head>
      
      <h1 className='title'>WebDev Newz</h1>
      
      <style jsx>
        {`
          .title: ${x > 5 ? 'red' : 'blue'}
        `}
      </style>
    </div>
  )
}
```


### Custom Document

If you look at the source code, you can see our head tag, body tag and ..., But we don't have that anywhere in our file structure though by default, and bunch of script tags, including webpack and so on, and if you wanna access to them, like so if you wanna add, a `lang` attribute to the `html` tag, what you can do, is to create a `Custom Document`, and I'm going to bring this documentation page over.

A custom Document is commonly used to augment your application's <html> and <body> tags. This is necessary because Next.js pages skip the definition of the surrounding document's markup.
  
To override the default Document, create the file ./pages/_document.js and extend the Document class as shown below:

```js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

The code above is the default Document added by Next.js. Feel free to remove the getInitialProps or render function from MyDocument if you don't need to change them.


### Data Fetching

We have some special functions that we can use to fetch data and pass it in to our page as `props`, so we're going to go to `index.js` component.

there are `3` separate methods that we can use, to fetch data, 

1. `getStaticProps` which is going to allow us to fetch it `build time`
2. `getServerSideProps` where we would fetch the data on every request which is a little slower obviously.
3. `getStaticPaths` to dynamically generate paths, based on the data we're fetching


Here, we're gonna use `getStaticProps`, after that I'm going to show you, how we can create our own api routes, in the `api` folder

**index.js**

```js
import Head from 'next/head'

const Home = ({ articles }) => {
  return (
    <div>
      <Head>
        <title>WebDev News</title>
        <meta name='keywords' content='web developing bootcamp' />
      </Head>
      
      <h1>Welcome to Next</h1>
      {articles.map(article => <h1>{article.title}</h1>)}
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json()
  
  return {
    props: {
      articles
    }
  }
}
```


### Nested Routing

for example I have a Route, which shows a list of articles in this `Route`, and If I click in each article, it will open it's article in a specific `Route`.

create a folder called `article` inside `pages` folder and then create a folder called `[id]` inside `article` folder and then create file called `index.js` inside `[id]` folder.

and it's gonna be a react component

**pages/article/[id]/index.js**

```js
import {useRouter} from 'next/router'

const article = () => {
  const router = useRouter()
  const { id } = router.query
  
  return (
    <div>
      This is article {id}
    </div>
  )
}

export default article
```
