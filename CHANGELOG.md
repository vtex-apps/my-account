# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Crowdin file

## [1.20.0] - 2021-04-08

### Added

- **authentication.showMyAuthentication** app setting.

## [1.19.1] - 2021-04-07

### Fixed

- Geolocation field cleaning condition.

## [1.19.0] - 2021-03-17

### Added

- Prop `blockDocument` to Enables or disables editing the document field in My account.

## [1.18.0] - 2021-03-10

### Changed

- Migrate to `node@6`.
- Update node server configs.

## [1.17.1] - 2020-10-06

### Fixed

- Pass **receiverName** on create new address.

## [1.17.0] - 2020-07-23

### Changed

- To CSS Handles.

## [1.16.0] - 2020-07-03

### Added

- Corporate section data css handles.
- Data entry custom css handles.

## [1.15.0] - 2020-06-24

### Added

- Custom css Handles to profile section.

## [1.14.2] - 2020-06-24

### Changed

- Hide back button on profile.

## [1.14.1] - 2020-05-20

### Fixed

- Address Edition.
- Address listing cache.

## [1.14.0] - 2020-05-13

### Changed

- Passing the newly created addressId to the return url.

## [1.13.5] - 2020-04-16

### Fixed

- String comparing at password error message.

## [1.13.4] - 2020-04-16

### Fixed

- Password error message.

## [1.13.3] - 2020-04-14

### Fixed

- Logout.

## [1.13.2] - 2020-04-08

### Fixed

- Address edit message.

## [1.13.1] - 2020-04-02

### Fixed

- Newsletter opt in update cache by refetching query.

## [1.13.0] - 2020-02-18

### Added

- Newsletter opt in.

## [1.12.0] - 2020-02-04

### Changed

- Migrate messages to `store-messages`.

## [1.11.5] - 2020-01-28

### Removed

- Profile picture upload.

## [1.11.4] - 2020-01-03

### Changed

- Use docs builder.

## [1.11.3] - 2020-01-02

### Fixed

- Save profile changes button message.

## [1.11.2] - 2019-12-23

### Fixed

- Show profile picture preview.
- Update picture after upload.

## [1.11.1] - 2019-11-27

### Fixed

- Expose Site Editor schema properly.

## [1.11.0] - 2019-11-13

### Added

- **de** translation.

### Removed

- **addresses** from settings.

## [1.10.5] - 2019-11-18

### Fixed

- Invisible postal code invalidation when editing an address.

## [1.10.4] - 2019-10-23

### Fixed

- SSR rendering.

## [1.10.3] - 2019-10-02

### Fixed

- Use `window.vtex` instead of only `vtex`.

## [1.10.2] - 2019-09-30

### Fixed

- Profile photo plus sign button size.

## [1.10.1] - 2019-09-19

### Fixed

- Address editing when using geolocation.
- Country change not affecting the address form rules.

## [1.10.0] - 2019-09-17

### Added

- **appSettings** query.
- **cards.showMyCards** app setting.

## [1.8.15] - 2019-09-03 [YANKED]

### Fixed

- Release 1.9.0 didn't caught the changes from version 1.8.14.

## [1.9.0] - 2019-09-12 [YANKED]

### Added

- Event `accountView` and `passwordReset` on Pixel.

## [1.8.14] - 2019-09-03

### Fixed

- Prevent saved `country` from saved addresses from being overwritten when editing.

## [0.28.0] - 2019-08-22

### Changed

- Using `messages` builder v1.

## [1.8.13] - 2019-08-12

### Changed

- Get changes made at version `v0.27.14`.

## [0.27.14] - 2019-08-12

### Added

- Log on Splunk if the URL that points to My Account is `/account/orders`.
- Log whenever some error occurs so we can create some deployment analysis process.

## [1.8.12] - 2019-07-31

### Changed

- Get changes made at version `v0.27.13`.

## [0.27.13] - 2019-07-31

### Fixed

- Rendering on IE11 by bumping `query-string` version to 5.x.

## [1.8.11] - 2019-07-30

## [1.8.10] - 2019-07-29

### Changed

- Get changes made at version `v0.27.12`.

## [0.27.12] - 2019-07-30

### Fixed

- Remove unused get base HTML tag.

## [1.8.10] - 2019-07-29

### Changed

- Get changes made at version `v0.27.11`.

## [0.27.11] - 2019-07-29

### Fixed

- Use "Logout" in button translation instead of "Leave".

## [1.8.9] - 2019-07-16

### Changed

- Get changes made at version `v0.27.10`.

## [0.27.10] - 2019-07-16

### Added

- GeolocationInput to be rendered based on geolocation flag.

## [1.8.8] - 2019-07-16

### Changed

- Get changes made at version `v0.27.9`.

## [0.27.9] - 2019-07-16

### Fixed

- GeolocationInput to automatically appear when store configurations are settled.

## [1.8.7] - 2019-07-11

### Changed

- Get changes made at version `v0.27.8`.

## [0.27.8] - 2019-07-11

### Fixed

- Toast content not being correctly localized.

## [1.8.6] - 2019-07-10

### Changed

- Get changes made at version `v0.27.7`.

## [0.27.7] - 2019-07-10

### Fixed

- Typos in props being passed to **FormattedMessage** component and `intl.formatMessage` function.

## [0.27.6] - 2019-07-06

### Fixed

- Edge case for when there is no base tag in AppRouter.

## [1.8.5] - 2019-07-05

### Changed

- Get changes made at version `v0.27.5`.

## [0.27.5] - 2019-07-06

### Added

- HTML base tag handling in AppRouter.

## [1.8.4] - 2019-06-17

### Changed

- Get changes made at version `v0.27.4`.

## [0.27.4] - 2019-06-17

### Fixed

- intl.formatMessage to FormattedMessage.

## [1.8.3] - 2019-06-07

### Changed

- Get changes made at version `v0.27.3`.

## [0.27.3] - 2019-06-07

### Fixed

- Fix `country` fallback on add new address.

## [1.8.2] - 2019-05-20

### Changed

- Get changes made at version `v0.27.2`.

## [0.27.2] - 2019-05-20

### Fixed

- Logout modal title french translation.

## [1.8.1] - 2019-05-08

### Changed

- Get changes made at version `v0.27.1`.

## [0.27.1] - 2019-05-08

### Fixed

- Logout button using anchor tag to keep compatibility with current customisations.

## [1.8.0] - 2019-05-07

### Changed

- Get changes made at version `v0.27.0`.

## [0.27.0] - 2019-05-07

### Fixed

- FormattedMessage to intl.formatMessage to keep customization.

### Changed

- Manage password feature.

## [1.7.2] - 2019-05-02

### Fixed

- Logout button

## [1.7.1] - 2019-04-26

### Added

- Allow any app to plugged in into `my-account` abstract interfaces.

## [1.7.0] - 2019-04-26

### Added

- Support to CSS override.

## [1.6.1] - 2019-04-25

### Changed

- Get changes made at version `v0.26.1`.

## [0.26.1] - 2019-04-25

### Changed

- Loaders to be consistent with the new api of the `SkeletonPiece` component.

## [1.6.0] - 2019-04-24

### Changed

- Get changes made at version `v0.26.0`.

## [1.5.0] - 2019-04-16

### Changed

- Support plugins architecture in `my-account-pages` and `my-account-links`

## [0.26.0] - 2019-04-22

### Added

- `logout` feature.

## [1.4.5] - 2019-04-08

### Changed

- Get changes made at version `v0.25.2`.

## [0.25.2] - 2019-04-08

### Fixed

- The word 'contrasenya' to 'contrassenya'.

## [1.4.4] - 2019-03-22

### Fixed

- `render-runtime` import.

## [1.4.3] - 2019-03-21

### Changed

- Get changes made at version `v0.25.1`.

## [0.25.1] - 2019-03-21

### Changed

- Instead of using `import react-router-dom` changed to `import vtex.my-account-commons`.

## [1.4.2] - 2019-03-15

### Fix

- Delete node/ directory

## [1.4.1] - 2019-03-15

### Changed

- Get changes made at version `v0.25.0`.

## [0.25.0] - 2019-03-15

### Changed

- Returning to the `returnUrl` if it is present on the url.

## [1.4.0] - 2019-03-13

### Changed

- Get changes made at version `v0.24.0`.

## [0.24.0] - 2019-03-13

### Added

- Italian translation.

## [1.3.2] - 2019-02-26

### Changed

- Add changes from versions `v0.23.2` and `v0.23.1`

## [0.23.2] - 2019-02-26

### Fixed

- Profile last name field alignment

## [0.23.1] - 2019-02-25

### Fixed

- Add missing required prop, resulting in a error in address form

## [1.3.1] - 2019-02-19

### Changed

- Get changes made between versions `v0.20.0` and `v0.23.0`.

## [1.3.0] - 2019-01-22

## [1.2.0] - 2019-01-22

## [1.1.0] - 2019-01-18

### Changed

- Update React builder to 3.x.
- Bump vtex.styleguide to 9.x.

## [1.0.0] - 2018-12-28

### Changed

- New builders are in town! Add messages and store builders.

## [0.23.0] - 2019-02-12

### Added

- Add option to opt-out from default Menu component to use a custom one
- Add option to set default page

## [0.22.0] - 2019-01-31

### Changed

- Bump `vtex.styleguide` version.
- Profile page layout.
- Profile loading page layout.

### Fixed

- Address update.

### Fixed

- `ContentWrapper`

## [0.21.0] - 2019-01-07

### Added

- Catalan translation

## [0.20.0] - 2019-01-07

### Changed

- Use `vtex.address-form` from VTEX IO instead of using it from npm

## [0.19.6] - 2018-12-26

### Changed

- Use Skeleton components provided by `vtex.my-account-commons`

## [0.19.5] - 2018-12-03

### Removed

- `vtex.my-subscriptions` dependency.

## [0.19.4] - 2018-11-30

### Added

- `vtex.my-subscriptions` to the dependencies.

## [0.19.3] - 2018-11-29

### Fixed

- Fix `geoCoordinates`

## [0.19.2] - 2018-11-29

### Fixed

- Loading layout of address creation form.
- Do not break if country rule doesn't have `document`, `tradeName`, `corporateDocument` or `stateRegistration`.

## [0.19.1] - 2018-11-21

## [0.19.0] - 2018-11-21

### Added

- Eslint/Prettier config files
- `vtex.my-cards` to the dependencies.

### Changed

- `README` documentation.

## [0.18.0] - 2018-11-19

### Removed

- `Payments` page, extracted to `vtex.my-payments-app`.

## [0.17.1] - 2018-11-13

### Changed

- Using `vtex.my-account-commons` insteadof `vtex.store-components`

## [0.17.0] - 2018-11-11

### Removed

- `MyOrders` from `pages.json`
- Extract the components: `GenericError`, `BaseLoading` and `ContentWrapper` to the `vtex.store-components` module.

## [0.16.11] - 2018-11-06

### Fixed

- typo on `ProfileEdit`

## [0.16.10] - 2018-11-05

### Fixed

- Not editing profile because the email was not being sent to the `updateProfile` mutation.

### Added

- `PageHeader` to the pages components

## [0.16.9] - 2018-10-24

### Fixed

- Recommitting the endpoint `/enabled`.

## [0.16.8] - 2018-10-23

### Added

- Css customization tokens

### Changed

- App structure

### Fixed

- Check for null in payments and addresses.

## [0.16.7] - 2018-10-18

### Added

- Verify if it should redirect to the orders page instead of profile

### Fixed

- Add `vtex.my-orders-app` to extension points

## [0.16.6] - 2018-10-17

### Fixed

- Bump to vtex.my-orders@2.x

## [0.16.5] - 2018-10-10

## [0.16.4] - 2018-09-04

## [0.16.3] - 2018-08-31

### Fixed

- PasswordBox max size

## [0.16.2] - 2018-08-31

### Fixed

- `profile-form` component call

## [0.16.1] - 2018-08-30

### Added

- Translations to `fr`, `es` and `ro`

## [0.16.0] - 2018-08-29

### Added

- Redefine password feature

### Changed

- All color-related classes to the new Styleguide tokens

## [0.15.0] - 2018-08-29

### Added

- Profile picture displaying and uploading
- Healthcheck endpoint

### Removed

- All references to adding new payments

## [0.14.0] - 2018-08-24

### Added

- Fetching payments information from API

## [0.13.1] - 2018-08-23

### Added

- Shippable countries fetching in address forms

## [0.13.0] - 2018-08-22

### Added

- Last extension point and usage instructions
- Admin settings

### Removed

- Hardcoded translations

## [0.12.0] - 2018-08-20

### Added

- Extension points
- Payment list (mocked)

## [0.11.0] - 2018-08-15

## Added

- Toasts and skeletons

## [0.10.0] - 2018-08-14

### Added

- Better error handling

## [0.9.0] - 2018-08-14

## Changed

- Extracted forms to new pages

## [0.8.0] - 2018-08-13

### Added

- `profile-form` integration

## [0.7.1] - 2018-08-10

### Fixed

- Responsiveness all over the app
- Some style changes to fit new design

## [0.7.0] - 2018-07-31

### Added

- Address adding and editing

## [0.6.0] - 2018-07-27

### Added

- Profile editing

## [0.5.0] - 2018-07-26

### Added

- Address deleting

## [0.4.0] - 2018-07-25

### Added

- Data fetching for `Personal Info` page
