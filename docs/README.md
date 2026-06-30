# My Account - StoreV2 version

> Notice: React: 3.x | Store: 0.x

[Portal](https://github.com/vtex-apps/my-account/tree/master 'Portal version')

## Intro

MyAccount is a canonical app built in all VTEX stores. This app serves as a hub of apps, meaning that it is the entry point for all apps that want to be available for the store's customers.

The app is responsible for handling customer's personal data such as: profile info, passwords, addresses, orders and credit cards. Orders and credit cards are responsibilities of other two apps that come per default with the MyAccount, respectively, these apps are: `vtex.my-orders-app` and `vtex.my-cards`.

## Features

This app provides a few extension points in order to allow apps to customize stores' experience as needed.

### Adding a new page to My Account

First, make sure you have the store-builder as a dependency in you `manifest.json`:

```diff
    "builders": {
      "messages": "1.x",
      "react": "3.x",
+     "store": "0.x"
    },
```

Now, create the file `store/interfaces.json` and define some interfaces:

```json
{
  "my-account-link.my-app-link": {
    "component": "MyAppLink"
  },
  "my-account-page.my-app-page": {
    "component": "MyAppPage"
  }
}
```

If you want to block the editing of the document in the my account form, use the props `blockDocument`

```json
"my-account": {
    "props": { "blockDocument": true },
    "blocks": [
    ]
  }
```

| Prop name       | Type      | Description                                                 | Default value |
| --------------- | --------- | ----------------------------------------------------------- | ------------- |
| `blockDocument` | `boolean` | Enables or disables editing the document field in MyAccount | `undefined`   |

---

**Usage:** To block the document field, follow these steps:

1. In the index.tsx in /react file, the `blockDocument` property is received from the main store. Pass this property on to AppRouter

```js
<Wrapper>
  <div className="vtex-account helvetica flex justify-around">
    <AppRouter blockDocument={this.props.blockDocument} />
  </div>
</Wrapper>
```

2. Pass the property to the `ProfileEdit` component

```js
   component: ComponentClass<void, unknown> | FC

  }) => {
    return <Route exact key={path} path={path} component={component}/>
  }
  public render() {
    const routes = [
      { path: '/addresses', component: Addresses },
      { path: '/addresses/new', component: AddressCreate },
      { path: '/addresses/edit/:id', component: AddressEdit },
      { path: '/profile', component: Profile },
      { path: '/profile/edit', component: ()=><ProfileEdit blockDocument={this.props.blockDocument}/> },
    ]
```

3. In the `ProfileEdit` component, pass the property to the`ProfileFormBox` component

```js
  const { profile, handleError, blockDocument } = this.props
    return (
      <ProfileFormBox
        profile={profile}
        onDataSave={this.handleGoBack}
        onError={handleError}
        blockDocument={blockDocument}
      />
    )
  }
```

4. In the `ProfileFormBox` component, pass the property to the`ProfileContainer` component.
   Just remembering that this component is imported from the **vtex.profile-form** app

```js
    <ProfileContainer
      defaultProfile={profile}
      onSubmit={this.handleSubmit}
      shouldShowExtendedGenders={showGenders}
      blockDocument={blockDocument}
    >
```

5. Follow the steps below in the app ** vtex.profile-form **

The names `my-app-link`, `my-app-page`, `MyAppLink` and `MyAppPage` may be whatever it makes more sense for you app.

Lastly, create a `store/plugins.json` file like so:

```json
{
  "my-account-menu > my-account-link": "my-account-link.my-app-link",
  "my-account-pages > my-account-page": "my-account-page.my-app-page"
}
```

#### Creating a `my-account-page` component

Now create a new file in the root of the "react" folder with the name "MyAppPage.js".

```js
import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
// Your component pages
import UserSupport from './components/UserSupport'
import UserPoints from './components/UserPoints'

const MyAppPage = () => (
  <Fragment>
    {/* This `path` will be added at the end of the URL */}
    <Route path="/support" exact component={UserSupport} />
    <Route path="/points" exact component={UserPoints} />
  </Fragment>
)

export default MyAppPage
```

In this example you will have two new pages `/account/#/support` and `/account/#/points`, rendering the UserSupport and UserPoints components respectively.

#### Creating a `my-account-link` component

This component will receive a prop called `render`. You **must** call it with an array of items. Each item can be either:

1. An object with `name` and `path` properties — the default menu link style will be applied.
2. A React element — it will be rendered as-is, allowing full visual customization.

You can mix both shapes in the same array.

**Example 1: default style (backwards compatible)**

```jsx
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

const MyAppLink = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({ id: 'userPoints.link' }),
      path: '/points',
    },
    {
      name: intl.formatMessage({ id: 'userSupport.link' }),
      path: '/support',
    },
  ])
}

MyAppLink.propTypes = {
  render: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(MyAppLink)
```

**Example 2: fully styled link (since v1.31.0)**

```jsx
import React from 'react'
import { Link } from 'vtex.render-runtime'

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    {/* ... */}
  </svg>
)

const StyledLink = ({ href, children }) => (
  <Link
    to={href}
    className="flex items-center gap-2 py-3 text-sm hover-opacity-70"
    style={{ color: '#0B0D0D' }}
  >
    <HeartIcon />
    {children}
  </Link>
)

const MyAppLink = ({ render }) => {
  return render([
    <StyledLink key="favorites" href="/wishlist">
      Favoritos
    </StyledLink>,
  ])
}

export default MyAppLink
```

In Example 2, the `my-account` menu will render your `<StyledLink>` as-is, without wrapping it in the default `MenuLink` component. You can apply your own typography, colors, icons, and hover states freely.

The `showMyCards`, `showMyOrders`, `showMyAddresses`, and `showMyAuthentication` app settings still filter default links (by `path` match), but they do **not** apply to custom React elements — your plugin is responsible for filtering them if needed.

### Defining the default home page of My Account

After [creating a new page](#adding-a-new-page-to-my-acccount), you can define the default path that will be rendered when the user opens the URL `/account/`.

1. Open the Site Editor admin (`/admin/cms/site-editor`).
2. Navigate to the My Account page
3. Click on the "My Account - Home" extension point on the Site Editor's menu
4. Fill the field "My Account's default path" to the new path

Following the previous examples, we could fill it with "/points", to open the UserPoints page.

### Display personal info

Inside the Profile page, right above the `edit` button, there is another extension point. This one is intended for stores that collect custom data from their customers (such as their hair color or their pet's name). This extension point allows your component to display such information without breaking the page layout.

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
import React, { Component } from 'react'
import { Input } from 'vtex.styleguide'

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

export default FavColor
```

### Fully replacing the my-account layout

The extension points above are the preferred way to customize My Account in most cases, since they preserve the default shell (menu, routing, breadcrumbs) while letting you add or tweak individual pieces.

However, some stores need a **completely custom my-account experience** — different menu, different routing, different typography, rendered inside a fully branded shell. Until now, that required either forking this app or working around the `vtex.store@2.x:store.account` interface requirement (which mandates that `store.account` contains a block implementing `vtex.my-account@1.x:my-account`).

Starting from version `1.31.0`, the `my-account` block supports `children` composition. When children are provided, they **fully replace** the default `<Menu />` + `<AppRouter />` layout, while still satisfying the interface requirement so the builder doesn't error out.

**When no children are passed, the default layout renders as before — this change is fully backwards compatible.**

#### Usage

In your store-theme, declare a custom block that implements your layout and pass it as a child of `my-account`:

```jsonc
// store/interfaces.json
{
  "my-custom-account": {
    "component": "MyCustomAccount"
  }
}
```

```jsonc
// store/blocks.jsonc
{
  "store.account": {
    "blocks": ["my-account"],
    "parent": {
      "challenge": "challenge.profile"
    }
  },

  "my-account": {
    "children": ["my-custom-account"]
  }
}
```

```tsx
// react/MyCustomAccount.tsx
import React from 'react'

const MyCustomAccount: React.FC = () => {
  return (
    <div className="my-custom-account">
      {/* your fully custom layout: sidebar, routing, pages, etc. */}
    </div>
  )
}

export default MyCustomAccount
```

Accessing `/account` will now render `MyCustomAccount` inside `MyAccountWrapper` (which still takes care of the default pixel tracking), bypassing the built-in menu, hash router, and all default pages.

You are responsible for implementing your own navigation, routing (if any), and data fetching inside the custom component. The `my-account-pages`, `my-account-menu`, `profile-display-container`, and `profile-input-container` extension points are **not** rendered when children are used — if you need plugin support in your custom layout, you can still use `<ExtensionPoint id="..." />` from `vtex.render-runtime` inside your component.

## Author

Gustavo Silva (@akafts) during a Winter Internship of 2018 at VTEX :)

Ft: Felipe Sales (@salesfelipe)
