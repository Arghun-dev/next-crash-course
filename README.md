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
      <Html>
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
