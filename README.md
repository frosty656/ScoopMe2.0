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
- Implimented new neuomorphic design 

## Tools used

- Formik and yup for form validation
    - Login/Signup built with this
    - show/hide Password Field's visibility 👁
- uses Context API & checks user's auth state
-  Firebase for user authentication and data storage 


## Screens

Main screens:

- Register
    - Login
    - Signup
    - Forgot password
- Tabs
    - Current rides
        - Ride info
        - User information
    - Map view
    - Profile
        - Ride history
    - Settings
        - Logout
        - Change email
        - Change name
        - Change password

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
