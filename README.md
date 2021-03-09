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
