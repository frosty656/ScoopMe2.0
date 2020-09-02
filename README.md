# Scoop Me 2.0

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />  
</p>

Is a cheaper way to be able to share rides with other people who are actaully going close to the location that you are. No one is sitting around waiting for you.

## Features
- Create account
- Create profile
- View others profile
- Join rides
- Create rides
- View ride history

## Tools used

- Formik for form validation
    - Login/Signup form built using Formik & yup
- show/hide Password Field's visibility 👁
- uses Context API & checks user's auth state
- implement Password Reset Screen
- all components are now functional components and use [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Screens

Main screens:

- Login
- Signup
- Forgot password

![Initial Welcome Screen](https://i.imgur.com/KJAzftx.gif)

![Successful Signup](https://i.imgur.com/Ih72jol.gif)

![Successful Login](https://i.imgur.com/Xp0tiI1.gif)

![Forgot Password](https://i.imgur.com/HDvQMfp.png)

## ⚠️⚠️⚠️

Expo uses Firebase Web SDK and does not support all Firebase services such as phone auth. If you are looking forward to use those services, please use `react-native-firebase` in a vanilla react native app.

[**Here is more on what and why Expo cannot support complete Firebase integration**](https://expo.canny.io/feature-requests/p/full-native-firebase-integration)

---

<strong>Built by [@amanhimself](https://twitter.com/amanhimself)</strong>

**Happy Coding!** 🎉🎉
