# My Account

[<i class="fa-brands fa-github"></i> Source code](https://github.com/vtex-apps/my-account)

My Account allows customers to manage their personal information, passwords, addresses, orders, and credit cards in a VTEX store, so you can offer a complete customer area. It's a canonical app built in all VTEX stores and serves as a hub of apps, meaning that it's the entry point for all apps that want to be available for the store's customers.

Orders and credit cards are the responsibility of two other apps that come by default with My Account: `vtex.my-orders-app` and `vtex.my-cards`.

To extend My Account, we recommend that you **create your own VTEX IO app** that declares `vtex.my-account` as a dependency and uses the extension points described in the [Extending My Account](https://developers.vtex.com/docs/guides/vtex-io-extending-my-account) guide. Don't fork or modify the `vtex.my-account` app. For an example, see the [`my-account-extension-example`](https://github.com/vtex-apps/my-account/tree/master/my-account-extension-example) app in the app repository.

> ⚠️ VTEX doesn't offer support for a customized My Account page.

## Installation

My Account comes installed by default in all VTEX stores, so you don't need to install it.

## Configuration

### Configuring the app in the VTEX Admin

1. In the VTEX Admin, go to `https://{accountName}.myvtex.com/admin/apps/vtex.my-account@1.x/setup/`.
2. Adjust the settings according to your needs.

The following table describes the available settings, defined in the `settingsSchema` of the app:

| Section        | Setting                                          | Property               | Type      | Default value | Description                                                                                                                                         |
| -------------- | ------------------------------------------------ | ---------------------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile        | **Show non-binary genders when editing profile** | `showGenders`          | `boolean` | `false`       | Displays non-binary gender options in the profile edit form.                                                                                        |
| Cards          | **Visible**                                      | `showMyCards`          | `boolean` | `true`        | Shows or hides the **Cards** link in the My Account menu.                                                                                           |
| Orders         | **Visible**                                      | `showMyOrders`         | `boolean` | `true`        | Shows or hides the **Orders** link in the My Account menu.                                                                                          |
| Addresses      | **Visible**                                      | `showMyAddresses`      | `boolean` | `true`        | Shows or hides the **Addresses** link in the My Account menu.                                                                                       |
| Authentication | **Visible**                                      | `showMyAuthentication` | `boolean` | `true`        | Shows or hides the **Authentication** link in the My Account menu. For more information, see [My Authentication](https://developers.vtex.com/docs/guides/vtex-my-authentication). |

### Configuring the `my-account` block in your store theme

You can set props in the `my-account` block of your store theme. You don't need to create an extension app or change the code of `vtex.my-account` or `vtex.profile-form` to use them.

1. In your store theme, declare the `my-account` block with the props you want to use. For example:

   ```json
   "my-account": {
     "props": { "blockDocument": true },
     "blocks": []
   }
   ```

2. Check the following table for the available props:

| Prop name       | Type      | Description                                                                                                        | Default value |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | ------------- |
| `blockDocument` | `boolean` | Disables editing the document field in the My Account profile form when the customer already has a document saved. | `undefined`   |

> ℹ️ The document field, such as CPF (the Brazilian individual taxpayer registry number), is only blocked when the customer already has a document saved. If the document is empty, the field remains editable so customers can complete it.

My Account passes the `blockDocument` prop to the `ProfileContainer` component of the [`vtex.profile-form`](https://github.com/vtex-apps/profile-form) app, which disables the field.

## Customization

This app provides extension points so that apps can customize the store experience as needed. For instructions on how to use them, see [Extending My Account](https://developers.vtex.com/docs/guides/vtex-io-extending-my-account).

### CSS handles

To apply CSS customizations to this and other blocks, follow the instructions in [Using CSS Handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS handles                |
| -------------------------- |
| `addressBox`               |
| `addressCreate`            |
| `addressEdit`              |
| `addressList`              |
| `boxContainer`             |
| `boxContainerBody`         |
| `boxContainerFooter`       |
| `businessPhoneContainer`   |
| `businessPhoneSubContainer`|
| `corporateDocument`        |
| `corporateName`            |
| `css`                      |
| `dataEntryChildren`        |
| `dataEntryLabel`           |
| `dateOfBirthSubContainer`  |
| `documentsSubContainer`    |
| `emailContainer`           |
| `firstNameSubContainer`    |
| `genderContainer`          |
| `genderSubContainer`       |
| `lastNameSubContainer`     |
| `menu`                     |
| `menuLink`                 |
| `menuLinks`                |
| `nameContainer`            |
| `newAddressButton`         |
| `newsletterBoxContainer`   |
| `newsletterContainerMessage`|
| `newsletterContainerTitle` |
| `passwordBox`              |
| `phoneNumberContainer`     |
| `phoneNumberSubContainer`  |
| `profile`                  |
| `profileBoxContainer`      |
| `profileEdit`              |
| `profileFormBoxContainer`  |
| `shimmer`                  |
| `stateRegistration`        |
| `tradeName`                |
| `userGreeting`             |
| `userImage`                |
| `userInfo`                 |
| `userName`                 |

## Contributors

Thanks to the following contributors:

- Gustavo Silva ([@akafts](https://github.com/akafts)), during a winter internship in 2018 at VTEX
- Felipe Sales ([@salesfelipe](https://github.com/salesfelipe))

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome.
