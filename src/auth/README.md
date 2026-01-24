# Mobile Auth (MVP Fake JWT) – Developer Guide

This project currently uses a **fake JWT authentication flow** to unblock frontend development while the backend is not ready.

The frontend **does not validate tokens**. It only:

* stores tokens after login
* reads tokens on app start
* attaches tokens to API requests
* clears tokens on logout

When the backend is ready, replace the fake auth service with real API calls.

---

## What is implemented

### Auth core

Location: `src/auth/`

* `AuthContext.tsx`

  * Provides auth state (`isAuthed`, `isBooting`)
  * Exposes `signIn(email, password)` and `signOut()`
  * Reads `access_token` on app start to decide if user is signed in

* `AuthGate.tsx`

  * Redirect guard based on auth state
  * If not authenticated → blocks private routes and redirects to `/`
  * If authenticated → redirects away from auth screens to `/home`

### Fake auth

* `fakeAuthService.ts`

  * Returns fake tokens so login can be tested without backend
  * Used only inside `AuthContext.signIn()`

### Token storage

* `tokenStorage.ts`

  * Stores tokens securely using `expo-secure-store`
  * Uses `localStorage` fallback for web
  * Functions:

    * `saveTokens(accessToken, refreshToken?)`
    * `getAccessToken()`
    * `getRefreshToken()`
    * `clearTokens()`

---

## Routing / Navigation setup

### Root layout wrapper

File: `src/app/_layout.tsx`

`AuthProvider` wraps the app and `AuthGate` runs on every route:

```tsx
<AuthProvider>
  <AuthGate />
  <Stack ... />
</AuthProvider>
```

### Public vs private routes

`AuthGate.tsx` defines public routes:

* `/` (sign in)
* `/signup`
* `/forgot-password`

Everything else is treated as private.
If the user is not signed in and tries to access a private screen, they are redirected to `/`.

---

## How login works (current MVP)

File: `src/app/index.jsx`

* User enters email + password
* Calls `auth.signIn(email, password)`
* On success, redirects to `/home`

The JWT is fake, but this tests the full flow:

* sign in, token stored, `isAuthed = true`, redirects to home

---

## How logout works

Logout clears tokens and redirects to the sign-in screen.

Used in:

* `src/components/Setting.jsx` (logout option)
* `src/app/(tabs)/home.jsx` (hard logout button)

Logout behaviour:

* `signOut()` sets `isAuthed` to false
* clears storage tokens
* `router.replace("/")`

---

## API integration (when backend is ready)

File: `src/services/api.ts`

An axios instance automatically attaches the `Authorization` header if a token exists:

```ts
Authorization: Bearer <token>
```

When the backend is ready:

* update `baseURL`
* backend should verify JWT and respond accordingly

---

## How to switch from fake JWT to real backend login

### Step 1: Replace fake login call

File: `src/auth/AuthContext.tsx`

Current:

```ts
const { accessToken, refreshToken } = await fakeLogin(email, password);
```

Replace with a real API call:

```ts
const res = await api.post("/login", { email, password });
const { accessToken, refreshToken } = res.data;
```

### Step 2: Replace signup flow (if needed)

File: `src/app/signup.jsx`

Currently, signup just calls `signIn()` for MVP testing.
Once backend is ready:

* call backend `/signup`
* then call `/login` (or return tokens directly after signup)

### Step 3: Add refresh token support (optional later)

You already store a refresh token. When backend supports it:

* create `refreshAccessToken()` using refresh token
* auto-refresh when access token expires (axios interceptor)

---

## Testing checklist

### Not signed in

* App should open to `/` sign-in screen
* Visiting a private route should redirect back to `/`

### Signed in

* Sign in redirects to `/home`
* Public screens should redirect away to `/home`

### Logout

* Logout should clear tokens
* After logout, app should redirect to `/`
* Trying to access `/home` should be blocked and redirected to `/`

---

## Notes / limitations

* Fake JWT tokens are for testing only
* No real user profile is returned yet (backend dependent)
* Edit Profile / Delete Account are currently UI flows only until backend endpoints exist

