# My Account

This is the `vtex.io` app responsible for managing the customer's personal data such as his addresses and credit cards.

## Setup

After cloning this repository, run `vtex link` to add it to your workspace. In your main app, add `vtex.my-account: 1.x` to your dependencies.

## Extension points

This app provides a few extension points in order to allow stores to customize their customer's experience as needed. They are as follows:

### Routes

This extension point's ID is 'my-account/routes'. You must use it to register new routes under `my-account` so they can point to your own components. You should use `react-router` for that.

**Usage:** Your component must render one or more `<Route>` components describing your routes and components. Refer to `react-router` for more information on how to use that component. Be sure not to override the root path (`/`) or unexpected behavior might happen.

**Example**

```js
const MyRoutes = () => {
  return <Route path="/miles" component={MyMileage} />
}
```

### Menu links

These extension points add new links to the main sidebar. There are two of them: `my-account/menu-links-before` and `my-account/menu-links-after`. As one might suspect, the first one adds links before my-account's own links and the other one adds them after those.

**Usage:** These extension points shall not render any React component. They take a `render` prop, which is a function they should call with a specific argument. Such argument is a list of objects containing a `name` property and a `path` property. The `name` property is the text to be displayed for the link; if using `i18n` utilities, you must translate the text before passing it. The `path` property is the URL the link leads to. Keep in mind that you must register your routes using the `routes` extension point in order for them to work here (unless you plan on adding an absolute path to some other website).

**Example**

```js
const ExtendedLinks = ({ render }) => {
  return render([
    {
      name: 'My orders',
      path: '/orders',
    },
    {
      name: 'My subscriptions',
      path: '/subscriptions',
    },
  ])
}
```

### Display personal info

Inside the Profile page, right above the `edit` button, there is another extension point, with ID `my-account/profile/display`. This one is intended for stores that collect custom data from their customers (such as their hair color or their pet's name). This extension point allows your component to display such information without breaking the page layout.

**Usage:** Just as when extendind the menu links, here your component shall not render anything. You will simply call the `render` prop again with the appropriate data and it will be displayed together with the user's default information. This time, you should pass in an array of objects containing `label` and `value` props. `label` is the name of the field you which to display (such as `Hair color`) and `value` is the value for such field (such as `brown`). Again, you must run any necessary preprocessing in your data by yourself before displaying, such as masking or localizing your texts. Also, it is up to you to fetch the data from wherever it is.

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

**Usage:** Your component may render form components, texts or anything else as desired. We recommend sticking to VTEX's Styleguide or your own design guidelines to avoid breaking the style from the rest of the form. You also receive two props, `registerValidator` and `registerSubmitter`. As their names suggest, you must use them to register your validation and submission functions with the main component. You should use `componentDidMount` to do that. This way, when the user hits 'Submit', your validation function will be called. We then expect you to validate all of your fields and display messages to the user if necessary. If something is invalid, your function should return `false` in order to halt the submission process, and return `true` otherwise. When all validation is passed, the form enters submission state. It will now send the default profile information to VTEX's databases and call your submit function so you can do the same. Do not run any other logic besides submitting, since the app will return to the display page and anything you do will probably not be seen by the user in time.

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
