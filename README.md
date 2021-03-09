# next-crash-course

Installation

`$. npx create-next-app appName`

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
