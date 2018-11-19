# My Account

My account is a canonical app that any VTEX store can use. This app is responsible for managing the customer's personal data such as his addresses and credit cards.

## Setup

Add the dependency in your `manifest.json`

```json
"dependencies": {
  "vtex.my-account": "x.x"
}
```

Add the app as a template in your `templates` on `pages.json`.

```json
"account": {
  "component": "vtex.render-runtime/LayoutContainer",
  "props": {
    "elements": [
      "account"
    ]
  },
  "extensions": {
    "account": {
      "component": "vtex.my-account/index"
    }
  }
}
```

Also, you can clone this project, and execute `vtex link` in your workspace.

## Extension points

This app provides a few extension points in order to allow stores to customize their customer's experience as needed. You can increment this app with more pages with custom navigation using `react-router-dom`.
To do so you gonna need two components, `ExtensionLinks` and `ExtensionRouter`.

### Your pages.json config

As a native app, the `my-accounts` can be inserted through two different extension-points, depending on the platform version. This will reflect also when extending this app.

On the old portal platform:

```json
{
  "extensions": {
    "my-account-portal/routes/{YOUR_APP}": {
      "component": "ExtensionRouter"
    },
    "my-account-portal/{LINKS_POSITION}/{YOUR_APP}": {
      "component": "ExtensionLinks"
    }
  }
}
```

On the dreamstore platform:

```json
{
  "extensions": {
    "store/account/account/routes/{YOUR_APP}": {
      "component": "ExtensionRouter"
    },
    "store/account/account/{LINKS_POSITION}/{YOUR_APP}": {
      "component": "ExtensionLinks"
    }
  }
}
```

**PS:** `LINKS_POSITION` can be either:

```js
'menu-links-after' || 'menu-links-before'
```

Depending on if you want to add your custom links before or after the `my-account` default ones.

### ExtensionLinks

**Usage** Basically a list of tuples(name, path), thats what is going to appear on the side-bar to the left.

**Example**

```jsx
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

const ExtensionLinks = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({ id: 'mycards.link' }),
      path: '/cards',
    },
  ])
}

ExtensionLinks.propTypes = {
  render: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(ExtensionLinks)
```

### ExtensionRouter

**Usage** Routes from `react-router-dom` that are the actual pages of your app.

**Example**

```jsx
import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import MyCards from './pages/MyCards'
import NewCard from './pages/NewCard'

const ExtensionRouter = () => (
  <Fragment>
    <Route path="/cards" exact component={MyCards} />
    <Route path="/cards/new" component={NewCard} />
  </Fragment>
)

export default ExtensionRouter
```

### Display personal info

Inside the Profile page, right above the `edit` button, there is another extension point, with ID `my-account-portal/profile/display` or `store/account/account/profile/display`. This one is intended for stores that collect custom data from their customers (such as their hair color or their pet's name). This extension point allows your component to display such information without breaking the page layout.

**Usage:** Your component shall not render anything: you will simply call the `render` prop with the appropriate data and it will be displayed together with the user's default information. You should pass in an array of objects containing `label` and `value` props. `label` is the name of the field you which to display (such as `Hair color`) and `value` is the value for such field (such as `brown`). Keep in mind that you must run any necessary preprocessing in your data by yourself before displaying, such as masking or localizing your texts. Also, it is up to you to fetch the data from wherever it is.

**Example**

```js
const BeautyData = ({ render }) => {
  return render([
    {
      label: 'Hair color',
      value: 'Red',
    },
    {
      label: 'Skin color',
      value: 'White',
    },
  ])
}
```

### Edit personal info

If you are going to display tailored data inside your customer's profile, you probably want to edit that info too. The last extension point, `my-account/profile/input`, lets you do that. It will place whatever content you want inside the profile editing form, right above the 'toggle business fields' button, and also use functions provided by you to validate and submit that content.

**Usage:** Your component may render form components, texts or anything else as desired. We recommend sticking to VTEX's Styleguide or your own design guidelines to avoid breaking the style from the rest of the form. You also receive two props, `registerValidator` and `registerSubmitter`. As their names suggest, you must use them to register your validation and submission functions with the main component. You should use `componentDidMount` to do that. This way, when the user hits 'Submit', your validation function will be called. We then expect you to validate all of your fields and display messages to the user if necessary. If something is invalid, your function should return `false` in order to halt the submission process, and return `true` otherwise. The function may either return the boolean value directly or a `Promise` which will resolve to the appropriate boolean value. When all validation is passed, the form enters submission state. It will now send the default profile information to VTEX's databases and call your submit function so you can do the same. Do not place user interaction or anything related inside that function besides submitting, since the app will return to the display page as soon as all the submitter functions finish executing and anything you display will probably not be noticed by the user.

**Example**

```js
class FavColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      error: null,
    }
  }

  componentDidMount() {
    this.props.registerValidator(this.validate)
    this.props.registerSubmitter(this.submit)
  }

  onChange = e => {
    this.setState({ color: e.target.value })
  }

  validate = () => {
    const { color } = this.state
    this.setState({ error: null })
    if (color !== 'yellow') {
      this.setState({ error: 'Your favorite color must be yellow.' })
      return false
    }
    return true
  }

  submit = () => {
    console.log('Success! Your information is saved.')
  }

  render() {
    const { error, color } = this.state
    return (
      <div className="mb8">
        <Input
          name="color"
          label="Favorite Color"
          value={color}
          errorMessage={error}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
```

## Author

Gustavo Silva (@akafts) during a Winter Internship at VTEX :)

Ft: Felipe Sales (@salesfelipe)
