# How to run the project


1. **Clone repo → Go to GitHub → Click Code → Copy HTTPS link → Place in code editor**

2. **Run the project (clean install + start Expo) run this command in termianl.**

```bash
nvm use 20
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
npx expo start -c
```

5. **Run the app**

Press **w** → browser

Press **i** → iOS simulator

Press **a** → Android

OR scan QR code using **Expo Go**

**No device?** 
key 'w' to run in the browser

# To contribute to project 

1. Fork the repository

2. Clone the forked repository to your device

3. Create a new branch for the feature you are working on by running
```bash
git checkout -b 'your-branch-name'
```

**⛔️⚠️Please do not make changes directly to main!⚠️⛔️**
 
4. Commit **often**. Regular commits make debugging easier and merging code easier. Commits can be made through your IDE's GUI

   
 **OR**

To stage all changes: 
```bash
git add .
```

To commit changes:
```bash 
git commit -m "your commit message"
``` 
 
When ready to merge changes run
```bash'
git push origin your-branch-name
```
 
5. Create a pull request in the main repository and **request review**.
   
⚠️⛔️Do **not** merge unreviewed code⚠️⛔️.

# Project styling

This project uses tailwind for styling. Tailwind documentation can be found at : https://tailwindcss.com/docs/installation/using-vite

## Tailwind styles
```<Text classname="text-3xl font-bold"> Hello, World! </Text>```

## Inline styles

```<Text styles={fontSize: "20px", fontWeight: 'bold}> Hello, World! </Text>```

Where tailwind classes are unavailable such as non React Native components, inline styles should be used to maintain readability 

# Expo Router

The project makes use of expo router for navigation. The documentation can be found at : https://docs.expo.dev/router/advanced/stack/

Primarily stack navigation is used in the project with the exception of tabs for the main tab views. 

Expo router uses file-based navigation. For example to navigate to a view with the file name "home.jsx"

```bash
   router.push("/home")
```
This will add the home screen to the top of the stack and allow for users to navigate backwards.

Alternatively the Link tag can also be used
```bash
   <Link href={"/home"}>
      <Text>Go to home page</Home>
   </Link>
```

##  To navigate and clear the stack:

```bash
   router.replace("/home")
```

This will navigate to the home screen and clear the stack.


