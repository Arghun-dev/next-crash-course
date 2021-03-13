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

what's really happening here, is that this code, this function is being executed both on the server obviously for server side rendering and on the client as well. with `_document.tsx` what's happening is that things really execute just on the `server`.

`_document.tsx` although it returns a react component, although agreed that it returns a reacy component, but it actually forming the page structure, the overall page structure. so that means it is only rendered on the `server` to create those `html` and `head` and those custom next.js scripts and hooking everything in nicely, but it would not execute any javascript which is available inside this page.

```js
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

## Styled JSX

```js
const App = () => {
  const variable = Math.random() > 5 ? 'red' : 'blue'
  return (
    <div>
      <h1 className='title'>Heading</h1>
      
      <style jsx>
        {`
          .title {
            color: red;
            background-color: ${variable}
          }
        `}
      </style>
    </div>
  )
}
```

## Global Styles

app.tsx

```js
import './global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
```

We can give our Next.js app global styles, inside `_app.tsx` file we can give global styles, we create a file `global.css` and import it inside, `_app.tsx` and use it.

## CSS Modules

in here, we're gonna exmplain how you can import and use component styles in your pages, for example you wanna create and import Nav.css to your `Nav.tsx` file, you should do this just like this, if you want your file to be available only to a particular component:

you should add `module` to your css file. => `Nav.module.css`

```js
import styles from './Nav.module.css'
```

## Sass Modules

How to use `Sass` inside Next.js?

Next.js Supports Sass natively, you just need to **rename** the **css** to **scss**, and install `sass` package.


## File Structure

in here, I'm gonna tell you how to organize your pages.

for example you're gonna create `page1`, go to `pages` folder and create a folder called `page1` and inside that create a file called `index.tsx`, when you do that, what's going to happen, is that your page contents are still accessible on your `domain.com/page1`, but now all the contents, all the relevant contents, in our case it would be just `.tsx` file and the `styles` file, would be available inside this `page1` only.

pages => page1 => { index.tsx, styles.module.scss }

**index.tsx**

```js
import styles from './styles.module.scss'

export default function Page1() {
  return (
    <h1 className={styles.red}>Heading</h1>
  )
}
```

**styles.module.scss**

```js
.red {
  color: red;
}
```

So, this is all we need, now we have a nice little page with us, which has the `view` and the `logic` and the `styles` part separated


## API Section Introduction

so, when you create the next app, you should have observed that we have `api` folder as well inside `pages` folder, so what it means? and why is that different?

the `api` folder is special in the sense that the files you create, the typescript or javascript files you create in this folder, should not export a react component, what do I mean by that?

`pages/api/random-number.ts`

```js
import { NextApiRequest, NextApiResponse } from 'next';

export default function(req: NextApiRequest, res: NextApiResponse) {
  // it should NOT be a react component
  
  res.json({ status: 'ok' })
  or
  res.json({ num: Math.floor(Math.random() * 10) })
}
```

in this file we should not return a react component, because for react components we have `pages`. but for the files inside api folder, this is basically a rest api endpoint, which you can use to return, responses like `json response`, so what I'm gonna do, is I'm gonna get 2 parameters here, the first one is going to `NextApiRequest` type and the second one is `NextApiResponse` type.
 And the thing you have to remember, is that you should export a singlr function from a single file. and this endpoint here => `random-number.ts` is automatically available => `http://localhost:3000/api/random-number`
 
and now if I return `status: 'ok'` from this endpoint, and then if I visit, `http://localhost:3000/api/random-number` I will get the json status: ok or `random-numbers`

Yeah, that's how you're going to create a very simple api with `next.js`, it could have a lot of uses, for example if you're usng jwt authentication in `next.js` you can use an api endpoint, you can deploy these individual functions as lambda functions as well.


## Simple JWT Auth Example

`$. npm install jsonwebtoken`

`$. npm i @types/jsonwebtoken --save-dev`

`pages/login/index.tsx`

```js
import { useState } from 'react'
import jwt from 'jwt'

export default function Login() {

  const [username, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('You are not logged in')

  async function submitForm() {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then((t) => t.json())
    
    const token = res.token
    
    if (token) {
      const json = jwt.decode(token) as { [key: string]: string }
      setMessage(`Welcome ${json.username} and you are ${json.admin ? 'an admin' : 'not an admin'}`)
    } else {
      setMessage('Something went wrong')
    }
  }

  return (
    <div>
      <h1>{message}</h1>
      <form>
        <input 
          type="text" 
          name="username" 
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input 
          type="password" 
          name="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" onClick={submitForm} />
      </form>
    </div>
  )
}
```

`pages/api/login.ts`

```js
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const KEY = 'asdahsdkjashdsadkjsahdkjhasd'

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 404
    res.end('Error')
    return
  }
  
  const { username, password } = req.body
  
  res.json({
    token: jwt.sign(
      {
        username,
        admin: username === 'admin' && password === 'admin'
      },
      KEY
    )
  })
}
```
so, this way we are just creating a signed json token which we are returning using an api. 


## Link Component

for example you have a page, and you wanna have a link, when you want to click it, you will redirect to that page.

```js
import Link from 'next/link'

<Link href='/page1'>
  Page1
</Link>
```


## Nested Routing

for example, I want to have a nested routing like this => `/mehul/activities`

You should have folder structure like this, which `index.tsx` is the `/mehul` page and `activities.tsx` is the `/mehul/activities` route.

![nestedRouting](https://user-images.githubusercontent.com/53907570/111020817-b43f7200-83dd-11eb-8a4d-857caf18089d.png)


## Dynamic Routing

here, we can have dynamic routing based on folder structure inside pages folder.

2 sections routing:

![DynamicRouting](https://user-images.githubusercontent.com/53907570/111022529-78f67080-83e8-11eb-9eb9-4033c099c253.png)

3 sections routing:

![3SectionsRouting](https://user-images.githubusercontent.com/53907570/111022711-b27bab80-83e9-11eb-9110-ed6f11a6f008.png)


## useRouter

```js
import { useRouter } from 'next/router'

export default function FruitName() {
  const router = useRouter()
  
  function takeMeHome() {
    router.push('/')
  }
  
  return (
    <h1>
      Hello {router.query.name} {router.query.subname}
      <button onClick={takeMeHome}>Home</button>
    </h1>
  )
}
```

this `hook` is basically, is that you can use to programatically control navigation and access these parameters and stuff like that in Next.js.

![3SectionsRouting](https://user-images.githubusercontent.com/53907570/111022711-b27bab80-83e9-11eb-9110-ed6f11a6f008.png)

`Next.js` is going to make the query object empty, if you do not have any prefetching conditions.    

so, yeah that's pretty much it for what you\re gonna need for `useRouter` that's all you're gonna need for the most part the `router.query` and dynamic pushing of the `routes` 

**But I would day try to use `Link` as much as you can, because it's good for `SEO`, it's good for `accessibility`**


## Custom 404 Page

to create a specific different `404` page, all you have to do is just go ahead, and inside directory create a `404.tsx` file that is you know just `404`, now remember this is does not mean that you can create files for different status codes as well, this `404.tsx` or `404.js` whatever you are creating depending on your project structure, this file name is actually hard coded in `Next.js`, you can not create you know `405` for example.

**404.tsx**

```js
export default function My404() {
  return <h1>404</h1>
}
```

## getStaticProps

what this function really is, to exmplain this I'm gonna create a file called `dynamic.tsx`

**dynamic.tsx**

```js
import { GetStaticProps } from "next"

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      myFavNum: 4
    }
  }
}

export default function Dynamic() {
  return <h1>Dynamic</h1>
}
```

**what `getStaticProps` does, is before your `Dynamic` function is executed, `Next.js` is going to execute `getStaticProps` in terms of `server`, so `getStaticProps` executes on `server` and `Dynamic` function is executed obviously on client as well as on server.**

And now we have access to the `props` which we have returned from `getStaticProps` in `Dynamic` function.

**Dynamic.tsx**

```js
import { GetStaticProps } from "next"

// EXECUTION ON SERVER
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      myFavNum: 4
    }
  }
}

export default function Dynamic(props) {
  return <h1>Dynamic Number - {props.myFavNum}</h1>
}
```

for the most part what you have to remember is that you can see that `getStaticProps` is actually helping you to have dynamic content on your page.

```js

import { GetStaticProps } from "next"

// EXECUTION ON SERVER
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      revalidate: 10,
      myFavNum: 4
    }
  }
}

export default function Dynamic(props) {
  return <h1>Dynamic Number - {props.myFavNum}</h1>
}
```

now, that I've added the `revalidate` prop to `props` object, things become interesting:

**Now in 10 seconds if there's a request to the server, in every 10s, if there's a request to the server, `Next.js` is going to try, it's not saying that it would, it's going to try to recreate this page, based on updated data, by that what I mean, is that it's going to run the `getStaticProps` function on the server for this page and try to update the static file which it has for this particular page, and this only works on production, and `revalidate` is useless on the localhost**


## getStaticProps revalidate parameter

`revalidate` parameter of `getStaticProps` is extremely useful in `Next.js`

`revalidate` allows you to do something amazing.

when you `build` Next.js app and push it to `production` => it's going to create a `static` export of this particular page.


## getStaticPaths

another important function which workds closely with `getStaticProps` and that is `getStaticPaths`.

```js
import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  }
}
```

there are something we should learn, before we learn `getStaticPaths`, the first thing is that, whenever you implement `getStaticProps` inside a dynamic file, you have to implement this function anyway, `getStaticPaths`, `getStaticProps` would work fine on it's own, in a standalone page. If you have a `dynamic page`, you have to use `getStaticPaths`.

`getStaticProps` runs at build time, it does not run at run time.

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
