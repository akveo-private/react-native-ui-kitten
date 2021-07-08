## 5.1.1 (2021-06-15)

### :rocket: Highlights:
* Added testID prop for components (#1444) ([83c75b0](https://github.com/akveo/react-native-ui-kitten/commit/83c75b0)), closes [#1444](https://github.com/akveo/react-native-ui-kitten/issues/1444)
* Improved Autocomplete. Now no need to double-click to select item from the list  (#1423) ([af715a9](https://github.com/akveo/react-native-ui-kitten/commit/af715a9)), closes [#1423](https://github.com/akveo/react-native-ui-kitten/issues/1423)
* Documentation fixes and corrections


## 5.1.0 (2021-04-16)

### :rocket: Highlights:
* Added `onMonthChange` function to the Calendar component ([d70d978](https://github.com/akveo/react-native-ui-kitten/commit/d70d978))
* Added `ghost` appearance for ButtonGroup component (#1382) ([849fb48](https://github.com/akveo/react-native-ui-kitten/commit/849fb48)), closes [#1382](https://github.com/akveo/react-native-ui-kitten/issues/1382)
* Improved input component caption structure (#1349) ([862a12f](https://github.com/akveo/react-native-ui-kitten/commit/862a12f)), closes [#1349](https://github.com/akveo/react-native-ui-kitten/issues/1349)
* ModalService can adjust position of items if StatusBar on Android is translucent  (#1372) ([407356e](https://github.com/akveo/react-native-ui-kitten/commit/407356e)), closes [#1372](https://github.com/akveo/react-native-ui-kitten/issues/1372) [#743](https://github.com/akveo/react-native-ui-kitten/issues/743)
* ViewPager now has `swipeEnabled` prop ([c9e791f](https://github.com/akveo/react-native-ui-kitten/commit/c9e791f))

### :rocket: Features
* Update input styles when view & flex props are intersects each other (#1351) ([b9dbd58](https://github.com/akveo/react-native-ui-kitten/commit/b9dbd58)), closes [#1351](https://github.com/akveo/react-native-ui-kitten/issues/1351)

### :bug: Bug Fixes
* **Modal**: Add change orientation event with modal render (#1346) ([15fb285](https://github.com/akveo/react-native-ui-kitten/commit/15fb285)), closes [#1346](https://github.com/akveo/react-native-ui-kitten/issues/1346)
* **Datepicker**: Make `autodismiss` prop optional ([123eb2b](https://github.com/akveo/react-native-ui-kitten/commit/123eb2b))
* **Popover**: Popover now reacts to Android hardware back button press ([2a103ed](https://github.com/akveo/react-native-ui-kitten/commit/2a103ed))
* **ViewPager**: Now skips if page is null ([c49753b](https://github.com/akveo/react-native-ui-kitten/pull/1165/commits/c49753b22167e9d182db7cedc5c8825d0fe3b5b2))
* **Input**: Fixed cases when input does not detect press around the edges ([e992b66](https://github.com/akveo/react-native-ui-kitten/pull/1165/commits/e992b66fa27036bc85407a830c1cfca0708247a0))
* **Autocomplete**: Async Autocomplete does not show options initially ([2ca80e1](https://github.com/akveo/react-native-ui-kitten/pull/1165/commits/2ca80e1caffd30ddde9f2d183e34d67b01f9e514))


## 5.0.0 (2020-05-12)

### :star: Highlights

* Bug fixes and improvements [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-627381094)

### :bomb: Breaking Changes:
* refactor `styled` function to be decorator ([#1004](https://github.com/akveo/react-native-ui-kitten/issues/1004) [#024ac83](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/024ac83d4a0e35d2916e19d00edb065e2764396d))
Despite this is a breaking change, this helps us to keep the existing code base much cleaner by removing of `styledComponentName` statics. For the end user this also leads to better type definitions when using refs.

### :bug: Bug Fixes: 
- Handle stateful (hook) components within the _accessory_ and _text_ props ([#1015](https://github.com/akveo/react-native-ui-kitten/issues/1015) [#5ba8daf](https://github.com/akveo/react-native-ui-kitten/commit/5ba8daf7a1d223dedcbe34700cc177adaa88416d) by @Photonios)
- Handle invalid dispatch interactions in styled components ([#1059](https://github.com/akveo/react-native-ui-kitten/issues/1059) [#aa9704e](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/aa9704e8341af5a8ac4f7b72e6e7e534f949828b))
- Runtime crashes of several components when using latest react-native-svg versions ([#1056](https://github.com/akveo/react-native-ui-kitten/issues/1056) [#1042](https://github.com/akveo/react-native-ui-kitten/issues/1042) [#1005](https://github.com/akveo/react-native-ui-kitten/issues/1005) [#ff9ada3](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/ff9ada3403d54c6bb1a1e17a2026d1d9240cbc48))
- Modal: proper update of nested components ([#826](https://github.com/akveo/react-native-ui-kitten/issues/826) [#35f2d69](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/35f2d69d2d895cf4793d22350a85bb671ae61d82))
- Bottom Navigation: call `onSelect` even when index is not changed. ([#977](https://github.com/akveo/react-native-ui-kitten/issues/977) [#252a207](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/252a20739297ad2d6dacb7bc276189d9a609107b))
- Input: different height comparing to other components on Android ([#1006](https://github.com/akveo/react-native-ui-kitten/issues/1006) [#70e1b52](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/70e1b52efe495aa063aaab90ecd71a119913acab))
- Card: Header/Footer press feedback. ([#cc7e806](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/cc7e8061bcc06da63872c6d369df65d3c1ba8102)) 
- Autocomplete: handle `onSubmitEditing` [same way](https://github.com/akveo/react-native-ui-kitten/commit/e6e2325c175c69df08d69d5a4cc297092d216cc7) as v4 ([#1025](https://github.com/akveo/react-native-ui-kitten/issues/1025) [#820328f](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/820328f00dd80e175d1dd2fe6b35d7ea8534722a)) 
- TabView: indicator animation ([#1003](https://github.com/akveo/react-native-ui-kitten/issues/1003) [#95d0101](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/95d01015ca9b4810cc9a340802e8c8f237e7e12b))
- ViewPager: selected index changes ([#1061](https://github.com/akveo/react-native-ui-kitten/issues/1061) [#8493e99](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/8493e990f1f11e84dbd821456ef994e1cb5f44eb))
- Typescript: Remove utility-types dependency. ([#1030](https://github.com/akveo/react-native-ui-kitten/issues/1030) [#1024](https://github.com/akveo/react-native-ui-kitten/issues/1024) [#1d05a03](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/1d05a035133cbf61cb8973706d5ba317da7b677f))

### :books: Documentation:
- Improve live examples loading performance. ([#1043](https://github.com/akveo/react-native-ui-kitten/issues/1043) [#e5967b2](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/e5967b2834435b82970b8812b52d2100de0048b7))
- Note details on integrating Metro Config with 3rd party libraries ([#1070](https://github.com/akveo/react-native-ui-kitten/issues/1070) [#0d12f1b](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/0d12f1bf59cc2193a457fd4708f1ef16bed7510d)) 
- Fix **Autocomplete Async** example. ([#1033](https://github.com/akveo/react-native-ui-kitten/issues/1033) [#fe56913](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/fe56913e2cff71814f49fa19badd8c3980b9be94))
- Fix **Drawer with React Navigation** example. ([#1034](https://github.com/akveo/react-native-ui-kitten/issues/1034) [#ec8a1ab](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/ec8a1ab1f225f7224cee91c1447712c31a075848))
- Fix **Asset Icon Packages** example ([#1026](https://github.com/akveo/react-native-ui-kitten/issues/1026) [#91dd965](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/91dd9654a63e7a737cbb7a842e005dd3ff6967ea))
- Fix custom mapping usage examples ([#1009](https://github.com/akveo/react-native-ui-kitten/issues/1009) [#d120d5d](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/d120d5d690eeac78341f16254fd589e18660ef48))

### :rocket: Features:
- Avatar: add `ImageComponent` property. ([#999](https://github.com/akveo/react-native-ui-kitten/issues/999) [#ec76205](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/ec762056975ab25aa5025eb2bc60f0be75feb727) Closes #999)
- Datepicker: add `autoDismiss` property` ([#1066](https://github.com/akveo/react-native-ui-kitten/issues/1066) [#7208751](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/7208751b8839b0da7d24fc8b5875ec61a2031df0) Closes #1066)
- Metro Config: the package now includes a command line interface to compile mappings manually. This, for example, solves the case when it's needed to build an app within the CI environment. ([#9c515c4](https://github.com/akveo/react-native-ui-kitten/pull/1055/commits/9c515c40ecd70f03d16f7a7e96fe71e99cdc8920))



## 5.0.0-alpha.1 (2020-04-08)

### :star: Highlights

* Rethinking component APIs [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-610952452)
* Improve TypeScript definitions by describing Eva properties.
* React Native 0.62 support ([#974](https://github.com/akveo/react-native-ui-kitten/issues/974) [edd0121](https://github.com/akveo/react-native-ui-kitten/commit/edd0121))

### :rocket: Features

* **Documentation**: add developer-friendly documentation for each example ([38d073e](https://github.com/akveo/react-native-ui-kitten/commit/38d073e))
* **Documentation**: add more details on branding guide ([2250f03](https://github.com/akveo/react-native-ui-kitten/commit/2250f03))

### :bug: Bug Fixes

* fix(components): typography fixes ([d73d0dd](https://github.com/akveo/react-native-ui-kitten/commit/d73d0dd))

### :bomb: Breaking Changes

* **BREAKING CHANGE**: combine eva props into one ([#884](https://github.com/akveo/react-native-ui-kitten/issues/884) [ee100a5](https://github.com/akveo/react-native-ui-kitten/commit/ee100a5))
* **BREAKING CHANGE**: refactor Menu to new api ([#789](https://github.com/akveo/react-native-ui-kitten/issues/789) [205eb6d](https://github.com/akveo/react-native-ui-kitten/commit/205eb6d))
* **BREAKING CHANGE**: refactor BottomNavigation to new api ([8ab5608](https://github.com/akveo/react-native-ui-kitten/commit/8ab5608))
* **BREAKING CHANGE**: refactor Button to new api ([#564](https://github.com/akveo/react-native-ui-kitten/issues/564) [8e8c8a9](https://github.com/akveo/react-native-ui-kitten/commit/8e8c8a9))
* **BREAKING CHANGE**: refactor Card to new api ([#947](https://github.com/akveo/react-native-ui-kitten/issues/947) [9a6415a](https://github.com/akveo/react-native-ui-kitten/commit/9a6415a))
* **BREAKING CHANGE**: refactor CheckBox to new api ([3ef75e0](https://github.com/akveo/react-native-ui-kitten/commit/3ef75e0))
* **BREAKING CHANGE**: refactor Drawer to new api ([9188551](https://github.com/akveo/react-native-ui-kitten/commit/9188551))
* **BREAKING CHANGE**: refactor Input to new api ([#737](https://github.com/akveo/react-native-ui-kitten/issues/737) [#770](https://github.com/akveo/react-native-ui-kitten/issues/770) [#972](https://github.com/akveo/react-native-ui-kitten/issues/972) [4cae584](https://github.com/akveo/react-native-ui-kitten/commit/4cae584))
* **BREAKING CHANGE**: refactor List to new api ([533fa81](https://github.com/akveo/react-native-ui-kitten/commit/533fa81))
* **BREAKING CHANGE**: refactor Menu, Select and Drawer components to new api ([#789](https://github.com/akveo/react-native-ui-kitten/issues/789) [#799](https://github.com/akveo/react-native-ui-kitten/issues/799) [#936](https://github.com/akveo/react-native-ui-kitten/issues/936) [#970](https://github.com/akveo/react-native-ui-kitten/issues/970) [df95586](https://github.com/akveo/react-native-ui-kitten/commit/df95586))
* **BREAKING CHANGE**: refactor popover-based components to new api ([0526c80](https://github.com/akveo/react-native-ui-kitten/commit/0526c80))
* **BREAKING CHANGE**: refactor Radio to new api ([577241d](https://github.com/akveo/react-native-ui-kitten/commit/577241d))
* **BREAKING CHANGE**: refactor Tab to new api ([2d64770](https://github.com/akveo/react-native-ui-kitten/commit/2d64770))
* **BREAKING CHANGE**: refactor Toggle to new api ([c0b5f1e](https://github.com/akveo/react-native-ui-kitten/commit/c0b5f1e))
* **BREAKING CHANGE**: refactor TopNavigation to new api ([#777](https://github.com/akveo/react-native-ui-kitten/issues/777) [#810](https://github.com/akveo/react-native-ui-kitten/issues/810) [#863](https://github.com/akveo/react-native-ui-kitten/issues/863) [170e5bb](https://github.com/akveo/react-native-ui-kitten/commit/170e5bb))



## <small>4.4.1 (2020-02-24)</small>

### :star: Highlights

Improving performance with build-time Eva processing [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-590213844)

* Add @ui-kitten/metro-config package [#613](https://github.com/akveo/react-native-ui-kitten/issues/613) [#855](https://github.com/akveo/react-native-ui-kitten/issues/855) [12230c6](https://github.com/akveo/react-native-ui-kitten/commit/12230c6))


## 4.4.0 (2020-02-10)

### :star: Highlights

Eva Material compatibility! :tada: [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-584100452)

### :rocket: Features

* Add `onFocus` and `onBlur` props to input-based components ([#857](https://github.com/akveo/react-native-ui-kitten/issues/857)) ([422b523](https://github.com/akveo/react-native-ui-kitten/commit/422b523))
* **Datepicker**: Add `backdropStyle` prop ([#849](https://github.com/akveo/react-native-ui-kitten/issues/849))([d69cc02](https://github.com/akveo/react-native-ui-kitten/commit/d69cc02))
* **Autocomplete**: Add `placement` prop ([#845](https://github.com/akveo/react-native-ui-kitten/issues/845))([c61f63e](https://github.com/akveo/react-native-ui-kitten/commit/c61f63e))
* **Demo App**: [Kitten Tricks](https://github.com/akveo/kittenTricks) is used as a runnable framework demo ([1b987c1](https://github.com/akveo/react-native-ui-kitten/commit/1b987c1))

### :bug: Bug Fixes

* **Modal**: State update during render ([#847](https://github.com/akveo/react-native-ui-kitten/issues/847)) ([39632ea](https://github.com/akveo/react-native-ui-kitten/commit/39632ea))
* **Input**: Extra vertical padding on Android ([#609](https://github.com/akveo/react-native-ui-kitten/issues/609)) ([c27c610](https://github.com/akveo/react-native-ui-kitten/commit/c27c610))
* **Documentation**: fix example usage of theme variable ([#871](https://github.com/akveo/react-native-ui-kitten/issues/871)) [617b40d](https://github.com/akveo/react-native-ui-kitten/commit/617b40d)

## 4.4.0-beta.3 (2020-01-21)

### :star: Highlights

Rethinking useStyleSheet hook and improvements [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-576569359)

* Add ability to specify date format in Calendar and Datepicker components ([#815](https://github.com/akveo/react-native-ui-kitten/issues/815)) ([705dc97](https://github.com/akveo/react-native-ui-kitten/commit/705dc97))
* **Select**: Fix props mutation issue and update strategies ([#804](https://github.com/akveo/react-native-ui-kitten/issues/804)) ([de531b9](https://github.com/akveo/react-native-ui-kitten/commit/de531b9))
* **BREAKING CHANGE**: useStyleSheet hook was reimplemented due to not following Rules of Hooks([#831](https://github.com/akveo/react-native-ui-kitten/issues/831)) ([8b33c91](https://github.com/akveo/react-native-ui-kitten/commit/8b33c91))



## 4.4.0-beta.2 (2020-01-16)

### :star: Highlights

Bug fixes and improvements [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-575060796)

### :rocket: Features

* **Modal**: hide when unmounted ([#735](https://github.com/akveo/react-native-ui-kitten/issues/735)) ([8b2721a](https://github.com/akveo/react-native-ui-kitten/commit/8b2721a))
* Add direct manipulation methods to input components ([#801](https://github.com/akveo/react-native-ui-kitten/issues/801) [#802](https://github.com/akveo/react-native-ui-kitten/issues/802)) ([01399d7](https://github.com/akveo/react-native-ui-kitten/commit/01399d7))
* Add direct manipulation methods to modal components ([#808](https://github.com/akveo/react-native-ui-kitten/issues/808) [#813](https://github.com/akveo/react-native-ui-kitten/issues/813)) ([8b2721a](https://github.com/akveo/react-native-ui-kitten/commit/8b2721a))
* **Demo App**: [Kitten Tricks](https://github.com/akveo/kittenTricks) is used as a runnable framework demo ([1b987c1](https://github.com/akveo/react-native-ui-kitten/commit/1b987c1))

### :bug: Bug Fixes

* **Autocomplete**: Runtime crash on Android ([#800](https://github.com/akveo/react-native-ui-kitten/issues/800)) ([1aa3864](https://github.com/akveo/react-native-ui-kitten/commit/1aa3864))
* **Input**: Add ability to use placeholderTextColor property ([#828](https://github.com/akveo/react-native-ui-kitten/issues/828)) ([e10f6c7](https://github.com/akveo/react-native-ui-kitten/commit/e10f6c7))
* **Modal**: Ability to interact with modal contents on Android ([#807](https://github.com/akveo/react-native-ui-kitten/issues/807)) ([5c78095](https://github.com/akveo/react-native-ui-kitten/commit/5c78095))
* **Select**: Add vertical scroll indicator ([#794](https://github.com/akveo/react-native-ui-kitten/issues/807)) ([231ba89](https://github.com/akveo/react-native-ui-kitten/commit/231ba89))



## 4.4.0-beta.1 (2020-01-03)

### :star: Highlights

Autocomplete component and Hooks [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-570506225)

### :rocket: Features

* **Autocomplete**: new UI Kitten component ([#750](https://github.com/akveo/react-native-ui-kitten/issues/750)) ([fd63d7b](https://github.com/akveo/react-native-ui-kitten/commit/fd63d7b))
* **Styling & Theming**: add useTheme and useStyleSheet hooks ([#676](https://github.com/akveo/react-native-ui-kitten/issues/676)), ([#752](https://github.com/akveo/react-native-ui-kitten/issues/752)) ([67a8f8f](https://github.com/akveo/react-native-ui-kitten/commit/67a8f8f))


## <small>4.3.2 (2019-12-13)</small>

### :star: Highlights

Resolve webpack and calendar performance issues [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-565398953)

### :bug: Bug Fixes

* **Web**: resolve webpack build issues ([#763](https://github.com/akveo/react-native-ui-kitten/issues/763), [#729](https://github.com/akveo/react-native-ui-kitten/issues/729), [#792](https://github.com/akveo/react-native-ui-kitten/issues/792)) ([2ca7cd0](https://github.com/akveo/react-native-ui-kitten/commit/2ca7cd0))
* **Datepicker**: performance issue ([#641](https://github.com/akveo/react-native-ui-kitten/issues/641)) ([85bb1df](https://github.com/akveo/react-native-ui-kitten/commit/85bb1df))
* **Calendar**: navigation buttons in RTL mode ([#739](https://github.com/akveo/react-native-ui-kitten/issues/739)) ([85bb1df](https://github.com/akveo/react-native-ui-kitten/commit/85bb1df))


## <small>4.3.1 (2019-12-04)</small>

This is a patch release to update incorrectly built packages ([#757](https://github.com/akveo/react-native-ui-kitten/issues/757))


## 4.3.0 (2019-12-04)

### :star: Highlights

Bring consistency in component styling with Eva 1.3 unified design [#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-561593655)

### :bug: Bug Fixes

* Unify the way of styling components provided with `icon` property ([156646d](https://github.com/akveo/react-native-ui-kitten/commit/156646d))
* **Calendar**: year selection when `min` and `max` properties provided ([#688](https://github.com/akveo/react-native-ui-kitten/issues/688)) ([61e4806](https://github.com/akveo/react-native-ui-kitten/commit/61e4806))
* **Calendar**: navigation in negative timezone ([#712](https://github.com/akveo/react-native-ui-kitten/issues/712), [#713](https://github.com/akveo/react-native-ui-kitten/issues/713)) ([700a902](https://github.com/akveo/react-native-ui-kitten/commit/700a902))
* **List**: add ability to override `keyExtractor` property ([#716](https://github.com/akveo/react-native-ui-kitten/issues/716)) ([d5ee185](https://github.com/akveo/react-native-ui-kitten/commit/d5ee185))
* **Modal**: center positioning on screen resize ([#699](https://github.com/akveo/react-native-ui-kitten/issues/699)) ([301e3f4](https://github.com/akveo/react-native-ui-kitten/commit/301e3f4))

### :rocket: Features

* Synchronize with Eva 1.3 ([c958482](https://github.com/akveo/react-native-ui-kitten/commit/c958482))
* **Card**: new UI Kitten component ([f6c5899](https://github.com/akveo/react-native-ui-kitten/commit/f6c5899))
* **Datepicker**: add `placeholder` property ([#721](https://github.com/akveo/react-native-ui-kitten/issues/721)) ([d34bcd4](https://github.com/akveo/react-native-ui-kitten/commit/d34bcd4))
* **Template packages**: upgrade to react-native 0.61.5 ([3759572](https://github.com/akveo/react-native-ui-kitten/commit/3759572))
* **Documentation**: Simplify Getting Started ([a93bfed](https://github.com/akveo/react-native-ui-kitten/commit/a93bfed))

### :bomb: BREAKING CHANGES

* `react-native-svg` package is now required and included in peer dependencies
* deprecate `react-native-ui-kitten` package in order to `@ui-kitten/components`. An old package will be supported till v5

## 4.3.0-beta.1 (2019-10-17)

### :star: Highlights

Clickable examples in documentation and handling of Hover and Focus states in the web ([#517](https://github.com/akveo/react-native-ui-kitten/issues/517#issuecomment-543216191))

### :bug: Bug Fixes

* **ButtonGroup**: last button render issues ([#516](https://github.com/akveo/react-native-ui-kitten/issues/516)) ([bcbf06a](https://github.com/akveo/react-native-ui-kitten/commit/bcbf06a))
* **Calendar**: navigation when `min` and `max` properties provided ([75e42dd](https://github.com/akveo/react-native-ui-kitten/commit/75e42dd))
* **Select**: handling the initial value if passed inline ([ab0703a](https://github.com/akveo/react-native-ui-kitten/commit/ab0703a))

### :rocket: Features

* **Calendar**: add ability to override start day of week ([#682](https://github.com/akveo/react-native-ui-kitten/issues/682)) ([1d7a341](https://github.com/akveo/react-native-ui-kitten/commit/1d7a341))
* **Web**: handle `focus` and `hover` states with Eva ([84ef56b](https://github.com/akveo/react-native-ui-kitten/commit/84ef56b))
* **Documentation**: Enhanace with clickable examples ([a08e1d3](https://github.com/akveo/react-native-ui-kitten/commit/a08e1d3))
* **Documentation**: Add Eva theme variable tables ([a99cb7e](https://github.com/akveo/react-native-ui-kitten/commit/a99cb7e))


## 4.2.0 (2019-09-27)

* feat(ui): add font-family for each component that has text ([aa11e1c](https://github.com/akveo/react-native-ui-kitten/commit/aa11e1c))
* feat(ui): animation-config property to Icon component add ([060fe5d](https://github.com/akveo/react-native-ui-kitten/commit/060fe5d))
* feat(ui): calendar/datepicker components add ([a51159c](https://github.com/akveo/react-native-ui-kitten/commit/a51159c))
* feat(ui): eva 1.2 mappings and documentation adopt ([d35c244](https://github.com/akveo/react-native-ui-kitten/commit/d35c244))
* feat(ui): toggle - add text property ([327ce36](https://github.com/akveo/react-native-ui-kitten/commit/327ce36))
* feat(ui): top-navigation - control appearance ([7fe81f2](https://github.com/akveo/react-native-ui-kitten/commit/7fe81f2))
* docs(components): add top-navigation with menu example ([5e84acd](https://github.com/akveo/react-native-ui-kitten/commit/5e84acd))
* docs(components): refactor examples with js code and framework icon components ([5468776](https://github.com/akveo/react-native-ui-kitten/commit/5468776))
* docs(components): update drawer documentation ([c4ac3a8](https://github.com/akveo/react-native-ui-kitten/commit/c4ac3a8))
* docs(guides): missing app name in command example ([4de7c9f](https://github.com/akveo/react-native-ui-kitten/commit/4de7c9f))
* refactor(docs): drawer/icon/select/spinner/checkbox/layout documentation refactor ([44ea5c3](https://github.com/akveo/react-native-ui-kitten/commit/44ea5c3))
* refactor(docs): input docs expand ([e7abe28](https://github.com/akveo/react-native-ui-kitten/commit/e7abe28))
* refactor(docs): OverflowMenu example changed ([c4bbda4](https://github.com/akveo/react-native-ui-kitten/commit/c4bbda4))
* refactor(script): set env script to be executable with node ([f317e38](https://github.com/akveo/react-native-ui-kitten/commit/f317e38))
* refactor(template): update template modules to new cli config ([3bc19af](https://github.com/akveo/react-native-ui-kitten/commit/3bc19af))
* refactor(ui): drawer support component naming refactor ([113822c](https://github.com/akveo/react-native-ui-kitten/commit/113822c))
* refactor(ui): modal - backdrop style prop type declaration ([b9658a4](https://github.com/akveo/react-native-ui-kitten/commit/b9658a4))
* refactor(ui): text - allow text element in children ([a9904fc](https://github.com/akveo/react-native-ui-kitten/commit/a9904fc))
* fix(docs): bottom navigation docs-examples fix ([6bf8f4f](https://github.com/akveo/react-native-ui-kitten/commit/6bf8f4f))
* fix(ui): modal with backdrop update functionality fix ([37a0090](https://github.com/akveo/react-native-ui-kitten/commit/37a0090))
* fix(ui): select - selectedOption value change ([ae886a4](https://github.com/akveo/react-native-ui-kitten/commit/ae886a4))
* fix(ui): tab-view - tab content size ([ea2cc59](https://github.com/akveo/react-native-ui-kitten/commit/ea2cc59))
* build(common): update jest version & remove ts-jest (#629) ([66f04ca](https://github.com/akveo/react-native-ui-kitten/commit/66f04ca)), closes [#629](https://github.com/akveo/react-native-ui-kitten/issues/629)



## 4.2.0-beta.2 (2019-08-30)

* refactor(framework): install-templates functionality return ([8b3642f](https://github.com/akveo/react-native-ui-kitten/commit/8b3642f))
* refactor(ui): bottom-navigation documentation update ([144abb4](https://github.com/akveo/react-native-ui-kitten/commit/144abb4))
* refactor(ui): dropdown styles and refactor ([f488839](https://github.com/akveo/react-native-ui-kitten/commit/f488839))
* refactor(ui): export react element types ([fced535](https://github.com/akveo/react-native-ui-kitten/commit/fced535))
* refactor(ui): overflow-menu re-implement ([324995a](https://github.com/akveo/react-native-ui-kitten/commit/324995a))
* refactor(ui): spinner playground and documentation refactor ([2decd53](https://github.com/akveo/react-native-ui-kitten/commit/2decd53))
* fix(docs): landing style fix ([e88e90b](https://github.com/akveo/react-native-ui-kitten/commit/e88e90b))
* fix(ui): fix a bug with view pager where slides could go out of boundry ([1011189](https://github.com/akveo/react-native-ui-kitten/commit/1011189))
* fix(ui): modal docs fix ([9a93a70](https://github.com/akveo/react-native-ui-kitten/commit/9a93a70))
* fix(ui): sub-menu components items onPress handling fix ([573d76c](https://github.com/akveo/react-native-ui-kitten/commit/573d76c))
* fix(ui): view-pager - external state control ([e5285d7](https://github.com/akveo/react-native-ui-kitten/commit/e5285d7))
* feat(docs): overview-examples handling add ([5b7cdeb](https://github.com/akveo/react-native-ui-kitten/commit/5b7cdeb))
* feat(eva-icons): add eva-icons module ([e1a1495](https://github.com/akveo/react-native-ui-kitten/commit/e1a1495))
* feat(template): add ui-kitten template projects ([0a3ec77](https://github.com/akveo/react-native-ui-kitten/commit/0a3ec77))
* feat(ui): drawer component ([e98f3ea](https://github.com/akveo/react-native-ui-kitten/commit/e98f3ea))
* feat(ui): dropdown component ([1b2211c](https://github.com/akveo/react-native-ui-kitten/commit/1b2211c))
* feat(ui): menu component ([73abe87](https://github.com/akveo/react-native-ui-kitten/commit/73abe87))
* feat(ui): popover - autoplacement ([27eac63](https://github.com/akveo/react-native-ui-kitten/commit/27eac63))
* feat(ui): RTL support ([14bf854](https://github.com/akveo/react-native-ui-kitten/commit/14bf854))
* feat(ui): select styles namings refactor ([6eec5ca](https://github.com/akveo/react-native-ui-kitten/commit/6eec5ca))
* feat(ui): spinner component ([c80d62d](https://github.com/akveo/react-native-ui-kitten/commit/c80d62d))
* docs(ui): overview-examples add ([647f254](https://github.com/akveo/react-native-ui-kitten/commit/647f254))
* build(common): update expo to sdk 34 ([c72f7f6](https://github.com/akveo/react-native-ui-kitten/commit/c72f7f6))
* feat(ui/theme): "modal-team" missing update functionality add ([71dd6f7](https://github.com/akveo/react-native-ui-kitten/commit/71dd6f7))



## 4.1.0 (2019-07-10)

* docs(guides): fix create-screen import typo ([20134ab](https://github.com/akveo/react-native-ui-kitten/commit/20134ab))
* refactor(docs): doc-prsr version update ([241ade4](https://github.com/akveo/react-native-ui-kitten/commit/241ade4))
* refactor(ui): modal component reimplement ([97afa07](https://github.com/akveo/react-native-ui-kitten/commit/97afa07))
* refactor(ui): modal-based components API refactor ([6aea312](https://github.com/akveo/react-native-ui-kitten/commit/6aea312))
* feat(docs): expand custom-mapping guide ([54310b6](https://github.com/akveo/react-native-ui-kitten/commit/54310b6))
* feat(ui): input - icon press handler ([9e192ea](https://github.com/akveo/react-native-ui-kitten/commit/9e192ea))
* feat(ui): react-native-web adopt ([59b4cb6](https://github.com/akveo/react-native-ui-kitten/commit/59b4cb6))



## <small>4.0.5 (2019-06-28)</small>

* package: hold @eva-design/* packages on a minor version ([d0fc72a](https://github.com/akveo/react-native-ui-kitten/commit/d0fc72a))
* docs(readme): update design system link ([46156b5](https://github.com/akveo/react-native-ui-kitten/commit/46156b5))



## <small>4.0.4 (2019-06-27)</small>

* fix(docs): toggle docs fix ([84246ef](https://github.com/akveo/react-native-ui-kitten/commit/84246ef))
* fix(readme): missing tag add ([3fd790c](https://github.com/akveo/react-native-ui-kitten/commit/3fd790c))
* fix(ui): add input api methods ([f6395ed](https://github.com/akveo/react-native-ui-kitten/commit/f6395ed))
* fix(ui): checkbox - usage docs ([5234f85](https://github.com/akveo/react-native-ui-kitten/commit/5234f85))
* build(common): typescript common issues ([fb4d6ff](https://github.com/akveo/react-native-ui-kitten/commit/fb4d6ff))



## <small>4.0.3 (2019-06-21)</small>

* build: fix typescript build errors ([0d0a784](https://github.com/akveo/react-native-ui-kitten/commit/0d0a784))
* feat(ui): add custom warnings for incorrect component usage ([981d5c8](https://github.com/akveo/react-native-ui-kitten/commit/981d5c8))
* Update toggle component doc and example ([4fd7ea1](https://github.com/akveo/react-native-ui-kitten/commit/4fd7ea1))



## <small>4.0.2 (2019-06-20)</small>

* feat: add hover styles for white buttons ([caacbc2](https://github.com/akveo/react-native-ui-kitten/commit/caacbc2))
* feat(docs): add contact us link (#455) ([450ab18](https://github.com/akveo/react-native-ui-kitten/commit/450ab18)), closes [#455](https://github.com/akveo/react-native-ui-kitten/issues/455)
* feat(playground): bump expo to 33.0.6 ([a7cb55f](https://github.com/akveo/react-native-ui-kitten/commit/a7cb55f))
* docs: add algolia search (#457) ([b9872ab](https://github.com/akveo/react-native-ui-kitten/commit/b9872ab)), closes [#457](https://github.com/akveo/react-native-ui-kitten/issues/457)
* docs(dev): update DEV_DOCS.md ([6dc56c2](https://github.com/akveo/react-native-ui-kitten/commit/6dc56c2))
* docs(dev): update DEV_DOCS.md with Kitten Tricks guides ([a3772c7](https://github.com/akveo/react-native-ui-kitten/commit/a3772c7))
* docs(guides): add design system guides ([165247e](https://github.com/akveo/react-native-ui-kitten/commit/165247e))
* fix: double scroll ([ad67cee](https://github.com/akveo/react-native-ui-kitten/commit/ad67cee))
* fix: prevent header disappearing when selecting version ([6e38aff](https://github.com/akveo/react-native-ui-kitten/commit/6e38aff))
* fix: remove overflow in reviews ([37393d6](https://github.com/akveo/react-native-ui-kitten/commit/37393d6))
* fix: use capital k in kitten ([f325111](https://github.com/akveo/react-native-ui-kitten/commit/f325111))
* fix(docs): fix dev-docs Kitten Tricks reference ([91a1e60](https://github.com/akveo/react-native-ui-kitten/commit/91a1e60))
* fix(docs): fix dev-docs typos ([1c83e23](https://github.com/akveo/react-native-ui-kitten/commit/1c83e23))
* fix(docs): ie fixes ([39abc18](https://github.com/akveo/react-native-ui-kitten/commit/39abc18))
* fix(docs): make menu button clickable ([f0234bf](https://github.com/akveo/react-native-ui-kitten/commit/f0234bf))
* fix(docs): proper cross sections links (#452) ([7bd9ec5](https://github.com/akveo/react-native-ui-kitten/commit/7bd9ec5)), closes [#452](https://github.com/akveo/react-native-ui-kitten/issues/452)
* fix(docs): theme import typo ([6445a4b](https://github.com/akveo/react-native-ui-kitten/commit/6445a4b))
* fix(top-navigation): add hit-slop to actions ([ce984cf](https://github.com/akveo/react-native-ui-kitten/commit/ce984cf))
* refactor: prevent opening links in a new tab ([ff770f2](https://github.com/akveo/react-native-ui-kitten/commit/ff770f2))



## 4.0.0 (2019-06-11)

* refactor(docs): common refactor ([67e84d2](https://github.com/akveo/react-native-ui-kitten/commit/67e84d2))
* refactor(docs): hoc docs and doc-app refactor (#389) ([8718ee7](https://github.com/akveo/react-native-ui-kitten/commit/8718ee7)), closes [#389](https://github.com/akveo/react-native-ui-kitten/issues/389)
* refactor(framework): adopt to eva mappings ([b688ee8](https://github.com/akveo/react-native-ui-kitten/commit/b688ee8))
* refactor(framework): apply code style and token-groups ([b5d8ce6](https://github.com/akveo/react-native-ui-kitten/commit/b5d8ce6))
* refactor(framework): update .spec configuration files ([d0d610f](https://github.com/akveo/react-native-ui-kitten/commit/d0d610f))
* refactor(mapping): update toggle mapping ([e71ca2c](https://github.com/akveo/react-native-ui-kitten/commit/e71ca2c))
* refactor(playground): screen refactor ([621875c](https://github.com/akveo/react-native-ui-kitten/commit/621875c))
* refactor(playground): update playground to use typescript (#246) ([5c9b5d4](https://github.com/akveo/react-native-ui-kitten/commit/5c9b5d4)), closes [#246](https://github.com/akveo/react-native-ui-kitten/issues/246)
* refactor(script): travis-ci scripts ([cafe153](https://github.com/akveo/react-native-ui-kitten/commit/cafe153))
* refactor(tab-set): code style fixes ([ab640ed](https://github.com/akveo/react-native-ui-kitten/commit/ab640ed))
* refactor(tab-set): component structure separation ([90000c2](https://github.com/akveo/react-native-ui-kitten/commit/90000c2))
* refactor(tab-set): eslint warning fix ([7afecca](https://github.com/akveo/react-native-ui-kitten/commit/7afecca))
* refactor(tab-set): fix eslint warnings ([94ecf78](https://github.com/akveo/react-native-ui-kitten/commit/94ecf78))
* refactor(tab-set): merge tabSet types ([2ffcc23](https://github.com/akveo/react-native-ui-kitten/commit/2ffcc23))
* refactor(tab-set): rename rkTabView component to rkTabSet & docs update ([9c21cfb](https://github.com/akveo/react-native-ui-kitten/commit/9c21cfb))
* refactor(tab-set): update examples ([141254e](https://github.com/akveo/react-native-ui-kitten/commit/141254e))
* refactor(tab-set): update examples ([f6fe72c](https://github.com/akveo/react-native-ui-kitten/commit/f6fe72c))
* refactor(tab-set): update examples ([9e402b0](https://github.com/akveo/react-native-ui-kitten/commit/9e402b0))
* refactor(tab-set): update examples ([10e2022](https://github.com/akveo/react-native-ui-kitten/commit/10e2022))
* refactor(test): button test mapping update ([caf7a7e](https://github.com/akveo/react-native-ui-kitten/commit/caf7a7e))
* refactor(theme): adopt to eva mapping structure. Closes #266 ([47a4ed7](https://github.com/akveo/react-native-ui-kitten/commit/47a4ed7)), closes [#266](https://github.com/akveo/react-native-ui-kitten/issues/266)
* refactor(theme): optimize module imports (#225) ([2c86a03](https://github.com/akveo/react-native-ui-kitten/commit/2c86a03)), closes [#225](https://github.com/akveo/react-native-ui-kitten/issues/225)
* refactor(theme): remove unused exports ([2e9e748](https://github.com/akveo/react-native-ui-kitten/commit/2e9e748))
* refactor(theme): simplify theme mapping config (#209) ([37274c4](https://github.com/akveo/react-native-ui-kitten/commit/37274c4)), closes [#209](https://github.com/akveo/react-native-ui-kitten/issues/209)
* refactor(ui): apply checkbox mappings ([a1f1255](https://github.com/akveo/react-native-ui-kitten/commit/a1f1255))
* refactor(ui): apply input mappings ([db1161d](https://github.com/akveo/react-native-ui-kitten/commit/db1161d))
* refactor(ui): apply list mappings ([55fe0c9](https://github.com/akveo/react-native-ui-kitten/commit/55fe0c9))
* refactor(ui): apply overflow-menu mappings ([0b4388b](https://github.com/akveo/react-native-ui-kitten/commit/0b4388b))
* refactor(ui): apply popover mappings ([130aa7a](https://github.com/akveo/react-native-ui-kitten/commit/130aa7a))
* refactor(ui): apply radio mappings ([bdd4e5e](https://github.com/akveo/react-native-ui-kitten/commit/bdd4e5e))
* refactor(ui): apply tab mappings ([ef61e17](https://github.com/akveo/react-native-ui-kitten/commit/ef61e17))
* refactor(ui): apply tooltip mappings ([b6a191e](https://github.com/akveo/react-native-ui-kitten/commit/b6a191e))
* refactor(ui): apply top-navigation mappings ([2601897](https://github.com/akveo/react-native-ui-kitten/commit/2601897))
* refactor(ui): avatar - apply mappings ([7203d2b](https://github.com/akveo/react-native-ui-kitten/commit/7203d2b))
* refactor(ui): bottom-navigation - apply mappings ([228114a](https://github.com/akveo/react-native-ui-kitten/commit/228114a))
* refactor(ui): button - apply mappings ([a6f778c](https://github.com/akveo/react-native-ui-kitten/commit/a6f778c))
* refactor(ui): button - apply mappings ([c6b253f](https://github.com/akveo/react-native-ui-kitten/commit/c6b253f))
* refactor(ui): button-group layout refactor ([9b54310](https://github.com/akveo/react-native-ui-kitten/commit/9b54310))
* refactor(ui): icons integration (#292) ([fb5e93d](https://github.com/akveo/react-native-ui-kitten/commit/fb5e93d)), closes [#292](https://github.com/akveo/react-native-ui-kitten/issues/292)
* refactor(ui): modal component ([8696132](https://github.com/akveo/react-native-ui-kitten/commit/8696132))
* refactor(ui): prop type names & style ([664a823](https://github.com/akveo/react-native-ui-kitten/commit/664a823))
* refactor(ui): radio and checkbox mapping refactor ([b67c4c2](https://github.com/akveo/react-native-ui-kitten/commit/b67c4c2))
* refactor(ui): radio/checkbox hit-slopes add (#403) ([56094b6](https://github.com/akveo/react-native-ui-kitten/commit/56094b6)), closes [#403](https://github.com/akveo/react-native-ui-kitten/issues/403)
* refactor(ui): radio/checkbox size variant remove ([ecb6568](https://github.com/akveo/react-native-ui-kitten/commit/ecb6568))
* refactor(ui): tab-view enhancements (#363) ([8d8e404](https://github.com/akveo/react-native-ui-kitten/commit/8d8e404)), closes [#363](https://github.com/akveo/react-native-ui-kitten/issues/363)
* refactor(ui): toggle icon refactor (#310) ([d88b048](https://github.com/akveo/react-native-ui-kitten/commit/d88b048)), closes [#310](https://github.com/akveo/react-native-ui-kitten/issues/310)
* build(common): add theme module ([2f8df0f](https://github.com/akveo/react-native-ui-kitten/commit/2f8df0f))
* build(common): bump eva version to 1.0.0 ([281eb98](https://github.com/akveo/react-native-ui-kitten/commit/281eb98))
* build(common): setup env configurations (#394) ([361a62f](https://github.com/akveo/react-native-ui-kitten/commit/361a62f)), closes [#394](https://github.com/akveo/react-native-ui-kitten/issues/394)
* build(common): setup playground to watch eva changes ([1e0b287](https://github.com/akveo/react-native-ui-kitten/commit/1e0b287))
* build(common): ui testing integration ([7b45ad7](https://github.com/akveo/react-native-ui-kitten/commit/7b45ad7))
* build(common): update eva dependencies ([2d78525](https://github.com/akveo/react-native-ui-kitten/commit/2d78525))
* build(common): update expo to sdk-33 ([e914362](https://github.com/akveo/react-native-ui-kitten/commit/e914362))
* build(package): make package prod-compatible ([47d9c15](https://github.com/akveo/react-native-ui-kitten/commit/47d9c15))
* build(playground): expo-31 upgrade ([65cf7ef](https://github.com/akveo/react-native-ui-kitten/commit/65cf7ef))
* build(playground): expo/react-native version bump ([f1cccd6](https://github.com/akveo/react-native-ui-kitten/commit/f1cccd6))
* build(test): configure jest with typescript ([c6dc732](https://github.com/akveo/react-native-ui-kitten/commit/c6dc732))
* feat: enhancements ([3b807ac](https://github.com/akveo/react-native-ui-kitten/commit/3b807ac))
* feat(calendar): component implementation (#153) ([5daf561](https://github.com/akveo/react-native-ui-kitten/commit/5daf561)), closes [#153](https://github.com/akveo/react-native-ui-kitten/issues/153)
* feat(ci): integrates coveralls (#204) ([0e38a4f](https://github.com/akveo/react-native-ui-kitten/commit/0e38a4f)), closes [#204](https://github.com/akveo/react-native-ui-kitten/issues/204)
* feat(ci): travis ci integration (#165) ([2239e5e](https://github.com/akveo/react-native-ui-kitten/commit/2239e5e)), closes [#165](https://github.com/akveo/react-native-ui-kitten/issues/165)
* feat(common): release pipeline add ([a868b55](https://github.com/akveo/react-native-ui-kitten/commit/a868b55))
* feat(docs): add documentation images ([c53fa8c](https://github.com/akveo/react-native-ui-kitten/commit/c53fa8c))
* feat(docs): components docs and application add (#386) ([885fb81](https://github.com/akveo/react-native-ui-kitten/commit/885fb81)), closes [#386](https://github.com/akveo/react-native-ui-kitten/issues/386)
* feat(docs): docs landing add ([48c11b2](https://github.com/akveo/react-native-ui-kitten/commit/48c11b2))
* feat(docs): update dependencies and theme ([ac2662d](https://github.com/akveo/react-native-ui-kitten/commit/ac2662d))
* feat(framework): enhancements ([fb8ae55](https://github.com/akveo/react-native-ui-kitten/commit/fb8ae55))
* feat(framework): modal service (#245) ([6efa3c5](https://github.com/akveo/react-native-ui-kitten/commit/6efa3c5)), closes [#245](https://github.com/akveo/react-native-ui-kitten/issues/245)
* feat(playground): add showcase settings ([81ab976](https://github.com/akveo/react-native-ui-kitten/commit/81ab976))
* feat(playground): home screen. Closes #203 (#205) ([e6d030c](https://github.com/akveo/react-native-ui-kitten/commit/e6d030c)), closes [#203](https://github.com/akveo/react-native-ui-kitten/issues/203) [#205](https://github.com/akveo/react-native-ui-kitten/issues/205)
* feat(tab-set): add badge props ([1b0b6c2](https://github.com/akveo/react-native-ui-kitten/commit/1b0b6c2))
* feat(tab-set): add tab indicator types ([4a54318](https://github.com/akveo/react-native-ui-kitten/commit/4a54318))
* feat(tab-set): add tabBar indicator to tabView ([34d240e](https://github.com/akveo/react-native-ui-kitten/commit/34d240e))
* feat(tab-set): add tabView component documentation ([041e453](https://github.com/akveo/react-native-ui-kitten/commit/041e453))
* feat(tab-set): base implementation ([a6526fd](https://github.com/akveo/react-native-ui-kitten/commit/a6526fd))
* feat(tab-set): scrollable tabBar ([b085302](https://github.com/akveo/react-native-ui-kitten/commit/b085302))
* feat(tab-set): tab change event ([11f315d](https://github.com/akveo/react-native-ui-kitten/commit/11f315d))
* feat(tab-set): update documentation ([66d3399](https://github.com/akveo/react-native-ui-kitten/commit/66d3399))
* feat(theme): add simple implementation of provider/consumer ([a38af67](https://github.com/akveo/react-native-ui-kitten/commit/a38af67))
* feat(theme): consumer component props forward ([c14a5f1](https://github.com/akveo/react-native-ui-kitten/commit/c14a5f1))
* feat(theme): custom mapping ([f1abf83](https://github.com/akveo/react-native-ui-kitten/commit/f1abf83))
* feat(theme): eva integration (#227) ([4872a85](https://github.com/akveo/react-native-ui-kitten/commit/4872a85)), closes [#227](https://github.com/akveo/react-native-ui-kitten/issues/227)
* feat(theme): implementing ThemeProvider and withTheme ([efaf224](https://github.com/akveo/react-native-ui-kitten/commit/efaf224))
* feat(theme): referencing values (#398) ([cbe5056](https://github.com/akveo/react-native-ui-kitten/commit/cbe5056)), closes [#398](https://github.com/akveo/react-native-ui-kitten/issues/398)
* feat(theme): state mappings (#210) ([14f0cf9](https://github.com/akveo/react-native-ui-kitten/commit/14f0cf9)), closes [#210](https://github.com/akveo/react-native-ui-kitten/issues/210)
* feat(theme): style consumer dispatch actions (#221) ([cd60eb2](https://github.com/akveo/react-native-ui-kitten/commit/cd60eb2)), closes [#221](https://github.com/akveo/react-native-ui-kitten/issues/221)
* feat(theme): styled and theme components statics copy ([07d4bcf](https://github.com/akveo/react-native-ui-kitten/commit/07d4bcf))
* feat(theme): styles validation ([51cdf68](https://github.com/akveo/react-native-ui-kitten/commit/51cdf68))
* feat(theme): themed-style component (#176) ([34f560a](https://github.com/akveo/react-native-ui-kitten/commit/34f560a)), closes [#176](https://github.com/akveo/react-native-ui-kitten/issues/176)
* feat(theme): token integration (#191) ([c97fa06](https://github.com/akveo/react-native-ui-kitten/commit/c97fa06)), closes [#191](https://github.com/akveo/react-native-ui-kitten/issues/191)
* feat(ui): avatar component ([d63df29](https://github.com/akveo/react-native-ui-kitten/commit/d63df29))
* feat(ui): bottom tab navigator ([8cbe4ec](https://github.com/akveo/react-native-ui-kitten/commit/8cbe4ec))
* feat(ui): button "textStyle" property add (#377) ([2cbf39c](https://github.com/akveo/react-native-ui-kitten/commit/2cbf39c)), closes [#377](https://github.com/akveo/react-native-ui-kitten/issues/377)
* feat(ui): button component. Closes #260 (#268) ([1ea28bd](https://github.com/akveo/react-native-ui-kitten/commit/1ea28bd)), closes [#260](https://github.com/akveo/react-native-ui-kitten/issues/260) [#268](https://github.com/akveo/react-native-ui-kitten/issues/268)
* feat(ui): button group statuses ([56aa6aa](https://github.com/akveo/react-native-ui-kitten/commit/56aa6aa))
* feat(ui): button-group component. Closes #290 ([6a6a0ad](https://github.com/akveo/react-native-ui-kitten/commit/6a6a0ad)), closes [#290](https://github.com/akveo/react-native-ui-kitten/issues/290)
* feat(ui): checkbox - add text support ([6b4d0f4](https://github.com/akveo/react-native-ui-kitten/commit/6b4d0f4))
* feat(ui): checkbox component (#238) ([e8ce139](https://github.com/akveo/react-native-ui-kitten/commit/e8ce139)), closes [#238](https://github.com/akveo/react-native-ui-kitten/issues/238)
* feat(ui): checkbox indeterminate ([b1e6071](https://github.com/akveo/react-native-ui-kitten/commit/b1e6071))
* feat(ui): input component ([74fac39](https://github.com/akveo/react-native-ui-kitten/commit/74fac39))
* feat(ui): input labels (#361) ([dc89874](https://github.com/akveo/react-native-ui-kitten/commit/dc89874)), closes [#361](https://github.com/akveo/react-native-ui-kitten/issues/361)
* feat(ui): layout component. closes #240 ([553d043](https://github.com/akveo/react-native-ui-kitten/commit/553d043)), closes [#240](https://github.com/akveo/react-native-ui-kitten/issues/240)
* feat(ui): list component ([42dbbe6](https://github.com/akveo/react-native-ui-kitten/commit/42dbbe6))
* feat(ui): overflow-menu (#306) ([f396ba7](https://github.com/akveo/react-native-ui-kitten/commit/f396ba7)), closes [#306](https://github.com/akveo/react-native-ui-kitten/issues/306)
* feat(ui): popover indicator style ([50ef9fe](https://github.com/akveo/react-native-ui-kitten/commit/50ef9fe))
* feat(ui): props for inline styling add (#379) ([9e57594](https://github.com/akveo/react-native-ui-kitten/commit/9e57594)), closes [#379](https://github.com/akveo/react-native-ui-kitten/issues/379)
* feat(ui): radio - add text support ([35c35f4](https://github.com/akveo/react-native-ui-kitten/commit/35c35f4))
* feat(ui): radio group component (#237) ([bfabf75](https://github.com/akveo/react-native-ui-kitten/commit/bfabf75)), closes [#237](https://github.com/akveo/react-native-ui-kitten/issues/237)
* feat(ui): Radio. Closes #201 (#212) ([48c6cfe](https://github.com/akveo/react-native-ui-kitten/commit/48c6cfe)), closes [#201](https://github.com/akveo/react-native-ui-kitten/issues/201) [#212](https://github.com/akveo/react-native-ui-kitten/issues/212)
* feat(ui): tab-view component (#243) ([c981213](https://github.com/akveo/react-native-ui-kitten/commit/c981213)), closes [#243](https://github.com/akveo/react-native-ui-kitten/issues/243)
* feat(ui): text component ([2527260](https://github.com/akveo/react-native-ui-kitten/commit/2527260))
* feat(ui): toggle component. closes #235 ([920105b](https://github.com/akveo/react-native-ui-kitten/commit/920105b)), closes [#235](https://github.com/akveo/react-native-ui-kitten/issues/235)
* feat(ui): tooltip component. Closes #261 (#263) ([9028953](https://github.com/akveo/react-native-ui-kitten/commit/9028953)), closes [#261](https://github.com/akveo/react-native-ui-kitten/issues/261) [#263](https://github.com/akveo/react-native-ui-kitten/issues/263)
* feat(ui): top navigation bar component ([3421311](https://github.com/akveo/react-native-ui-kitten/commit/3421311))
* docs(common): add new helpful readme shields ([55065cd](https://github.com/akveo/react-native-ui-kitten/commit/55065cd))
* docs(common): fix DEV_DOCS, CODE_OF_CONDUCT, CONTRIBUTING ([870d57d](https://github.com/akveo/react-native-ui-kitten/commit/870d57d))
* docs(common): fix documentation typo at index ([053c303](https://github.com/akveo/react-native-ui-kitten/commit/053c303))
* docs(common): update readme ([59a780d](https://github.com/akveo/react-native-ui-kitten/commit/59a780d))
* docs(guides): add getting-started and theme-system guides ([96ef0dd](https://github.com/akveo/react-native-ui-kitten/commit/96ef0dd))
* docs(readme): update README.md ([910fb0c](https://github.com/akveo/react-native-ui-kitten/commit/910fb0c))
* docs(theme): add theme components documentation (#387) ([c2e5be0](https://github.com/akveo/react-native-ui-kitten/commit/c2e5be0)), closes [#387](https://github.com/akveo/react-native-ui-kitten/issues/387)
* fix(ci): travis auth (#270) ([bf65ddb](https://github.com/akveo/react-native-ui-kitten/commit/bf65ddb)), closes [#270](https://github.com/akveo/react-native-ui-kitten/issues/270)
* fix(docs): update dev and contributing guides (#169) ([b0e1285](https://github.com/akveo/react-native-ui-kitten/commit/b0e1285)), closes [#169](https://github.com/akveo/react-native-ui-kitten/issues/169)
* fix(framework): eva-adopt ([2a9e315](https://github.com/akveo/react-native-ui-kitten/commit/2a9e315))
* fix(RkSwitch): Fix incorrect thumb animation in case if gesture was intercepted by parent view ([1492f41](https://github.com/akveo/react-native-ui-kitten/commit/1492f41))
* fix(tab-set): example screen component description ([f9989bd](https://github.com/akveo/react-native-ui-kitten/commit/f9989bd))
* fix(tab-set): initial tab render when no selection is passed ([be58950](https://github.com/akveo/react-native-ui-kitten/commit/be58950))
* fix(tab-set): tabBar styles ([d5cce2f](https://github.com/akveo/react-native-ui-kitten/commit/d5cce2f))
* fix(tab-view): update rkTabView docs ([15216a4](https://github.com/akveo/react-native-ui-kitten/commit/15216a4))
* fix(theme): mapping application order. Closes #218 (#220) ([ca37382](https://github.com/akveo/react-native-ui-kitten/commit/ca37382)), closes [#218](https://github.com/akveo/react-native-ui-kitten/issues/218) [#220](https://github.com/akveo/react-native-ui-kitten/issues/220)
* fix(theme): style HOCs component arg type ([b18b8aa](https://github.com/akveo/react-native-ui-kitten/commit/b18b8aa))
* fix(theme): style provider - reduce setState calls ([1afbcfe](https://github.com/akveo/react-native-ui-kitten/commit/1afbcfe))
* fix(theme): theme change fix (#399) ([318c038](https://github.com/akveo/react-native-ui-kitten/commit/318c038)), closes [#399](https://github.com/akveo/react-native-ui-kitten/issues/399)
* fix(ui): adopt to eva (#397) ([1b90281](https://github.com/akveo/react-native-ui-kitten/commit/1b90281)), closes [#397](https://github.com/akveo/react-native-ui-kitten/issues/397)
* fix(ui): button layout issues (#375) ([a2e61d4](https://github.com/akveo/react-native-ui-kitten/commit/a2e61d4)), closes [#375](https://github.com/akveo/react-native-ui-kitten/issues/375)
* fix(ui): button-group border-right fix ([c32b8e2](https://github.com/akveo/react-native-ui-kitten/commit/c32b8e2))
* fix(ui): common issues ([d0835af](https://github.com/akveo/react-native-ui-kitten/commit/d0835af))
* fix(ui): container component interactions (#367) ([671ddd1](https://github.com/akveo/react-native-ui-kitten/commit/671ddd1)), closes [#367](https://github.com/akveo/react-native-ui-kitten/issues/367)
* fix(ui): export tab-view children props ([cb3ebae](https://github.com/akveo/react-native-ui-kitten/commit/cb3ebae))
* fix(ui): input styles passing and applying fix ([a5fafb1](https://github.com/akveo/react-native-ui-kitten/commit/a5fafb1))
* fix(ui): list-item activeOpacity ([fe33ffe](https://github.com/akveo/react-native-ui-kitten/commit/fe33ffe))
* fix(ui): mapping find issues ([a08f8f2](https://github.com/akveo/react-native-ui-kitten/commit/a08f8f2))
* fix(ui): modal component/service/panel, popover fix ([a0491cb](https://github.com/akveo/react-native-ui-kitten/commit/a0491cb))
* fix(ui): popover - crash when no styles (#380) ([2c45eae](https://github.com/akveo/react-native-ui-kitten/commit/2c45eae)), closes [#380](https://github.com/akveo/react-native-ui-kitten/issues/380)
* fix(ui): popover - scrollable container ([766214c](https://github.com/akveo/react-native-ui-kitten/commit/766214c))
* fix(ui): popover - useless element render ([903f766](https://github.com/akveo/react-native-ui-kitten/commit/903f766))
* fix(ui): popover margins offsets fix (#371) ([1e3167b](https://github.com/akveo/react-native-ui-kitten/commit/1e3167b)), closes [#371](https://github.com/akveo/react-native-ui-kitten/issues/371)
* fix(ui): popover position ([d0effb9](https://github.com/akveo/react-native-ui-kitten/commit/d0effb9))
* fix(ui): top-navigation center align ([a01cbd1](https://github.com/akveo/react-native-ui-kitten/commit/a01cbd1))
* fix(ui): top-navigation style apply ([9d94b38](https://github.com/akveo/react-native-ui-kitten/commit/9d94b38))
* fix(ui): top-navigation-bar fix (#392) ([4410486](https://github.com/akveo/react-native-ui-kitten/commit/4410486)), closes [#392](https://github.com/akveo/react-native-ui-kitten/issues/392)
* fix(ui): update input mappings ([9aa396c](https://github.com/akveo/react-native-ui-kitten/commit/9aa396c))
* fix(ui): update text mappings ([87b89c1](https://github.com/akveo/react-native-ui-kitten/commit/87b89c1))
* fix(ui): view-pager scroll event on Android ([4655f48](https://github.com/akveo/react-native-ui-kitten/commit/4655f48))
* fix(ui): view-pager swipe ([2925e70](https://github.com/akveo/react-native-ui-kitten/commit/2925e70))
* feat(tab-set/tab): add icon prop ([c1ec7a3](https://github.com/akveo/react-native-ui-kitten/commit/c1ec7a3))
* refactor(mapping/theme): theme variables refactor ([dcad574](https://github.com/akveo/react-native-ui-kitten/commit/dcad574))
* package(common): update typing packages versions (#391) ([735edd3](https://github.com/akveo/react-native-ui-kitten/commit/735edd3)), closes [#391](https://github.com/akveo/react-native-ui-kitten/issues/391)
* test(common): temporary configuration changes ([059bf0c](https://github.com/akveo/react-native-ui-kitten/commit/059bf0c))
* test(theme): add style-provider change mappings/theme tests ([d75cacb](https://github.com/akveo/react-native-ui-kitten/commit/d75cacb))
* test(theme): add theme consumer tests ([830a566](https://github.com/akveo/react-native-ui-kitten/commit/830a566))
* chore(config): integrate with EditorConfig ([4a14277](https://github.com/akveo/react-native-ui-kitten/commit/4a14277))
* chore(next): initial solution structure ([6b9825b](https://github.com/akveo/react-native-ui-kitten/commit/6b9825b))
* chore(next): solution clean-up ([39e88bd](https://github.com/akveo/react-native-ui-kitten/commit/39e88bd))
* chore(tab-set): initial setup ([f5b59ac](https://github.com/akveo/react-native-ui-kitten/commit/f5b59ac))
