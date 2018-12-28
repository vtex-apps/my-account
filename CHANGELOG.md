# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
