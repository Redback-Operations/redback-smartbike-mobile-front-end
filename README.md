# Redback SmartBike Mobile Frontend

React Native / Expo Router app for SmartBike auth, leaderboard, friends, friend requests, notifications, chat, workouts, and ride statistics.

## Requirements

- Node.js 20+
- npm
- Expo Go compatible with Expo SDK 54
- Backend running on port 5000
- Supabase project with the SmartBike schema applied

## Environment

Create `.env` from `.env.example`.

```env
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

API URL examples:

```env
# Web
EXPO_PUBLIC_API_URL=http://localhost:5000

# Android emulator
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000

# Physical phone on same Wi-Fi
EXPO_PUBLIC_API_URL=http://<computer-lan-ip>:5000
```

Do not commit `.env` or real Supabase keys.

## Run

```bash
npm install --legacy-peer-deps
npx expo start -c
```

Expo shortcuts:

- Press `w` for web.
- Press `a` for Android emulator.
- Scan the QR code with Expo Go for a physical device.

When testing on a phone, the phone must be able to reach the backend using the computer LAN IP. Restart Expo with `-c` after changing `.env`.

## Company Supabase Handover

1. Apply the backend schema in `redback-smartbike-mobile-back-end/database/schema.sql` to the company Supabase project.
2. Configure Supabase Auth email/password and any OAuth providers required for Apple, Facebook, or Google.
3. Update frontend `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=<company-supabase-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<company-supabase-anon-key>
EXPO_PUBLIC_API_URL=<backend-url>
```

4. Update backend `.env` with the same company Supabase URL and anon key.
5. Start backend, then start Expo.

New users are created through Supabase Auth. The frontend creates/repairs rows in `public.profiles` after signup/login.

## Testing

This project uses **Jest** and **React Native Testing Library** for automated regression testing.

### Running Tests Locally

Install dependencies first:
```bash
npm install --legacy-peer-deps
```

Run all tests:
```bash
npm test
```

Run tests in watch mode (re-run on file changes):
```bash
npm test -- --watch
```

Run a specific test file:
```bash
npm test -- src/app/__tests__/index.test.jsx
```

Run tests matching a pattern (e.g., all login tests):
```bash
npm test -- --testNamePattern="LGN"
```

Run tests with coverage report:
```bash
npm test -- --coverage
```

### Test Structure

Tests are located alongside the code they test, using the `__tests__` directory:

```
src/
  app/
    __tests__/
      index.test.jsx          # Login screen tests (LGN-*)
      signup.test.jsx         # Signup screen tests (SGN-*)
      dashboard.test.jsx      # Dashboard screen tests
  components/
    __tests__/
      components.test.jsx     # Reusable component tests (CMP-*)
```

### Regression Test Coverage

**Current test suites:**

- **Login (LGN-01 to LGN-14)**: Valid/invalid credentials, empty fields, email validation, spaces, password visibility, rapid clicks, network errors, loading states, navigation.
- **Signup (SGN-01 to SGN-04)**: Form rendering, empty field validation, successful signup, error handling.
- **Dashboard**: Tab switching, dark mode toggle.
- **Components (CMP-01 to CMP-04)**: TextInputWithLogo, Avatar, WelcomeMessage rendering and accessibility.

### Writing New Regression Tests

1. Create test files in a `__tests__` directory next to the component/screen you're testing.
2. Use descriptive test names with IDs (e.g., `LGN-01`, `SGN-01`).
3. Mock external dependencies (auth, API calls, navigation).
4. Test user interactions and expected outcomes.
5. Do not use real credentials or API keys.

Example test structure:

```javascript
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import MyScreen from "../MyScreen";

jest.mock("@/context/authContext", () => ({
  useAuth: () => ({
    signIn: jest.fn(),
  }),
}));

describe("My Screen Tests", () => {
  it("should render without crashing", () => {
    const { getByText } = render(<MyScreen />);
    expect(getByText("Expected Text")).toBeTruthy();
  });
});
```

### Mocking

Common mocks are configured in `jest.setup.js`:

- **Async Storage**: Mocked with in-memory storage.
- **Linear Gradient**: Mocked as a plain View.
- **Gifted Charts**: Mocked as plain Views.
- **Global alert()**: Mocked function.

Additional context mocks should be added in individual test files using `jest.mock()`.

### GitHub Actions CI/CD

Tests run automatically on:
- **Pull Requests** to `main` or `develop` branches
- **Pushes** to `main` or `develop` branches

The workflow is defined in `.github/workflows/frontend-tests.yml` and:

1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm install --legacy-peer-deps`
4. Runs `npm test -- --coverage`
5. Uploads coverage reports to Codecov

**PR checks fail if tests fail**, preventing merges.

### Test Best Practices

1. **Mock API calls**: Never use real Supabase/backend in tests.
2. **Reset mocks**: Call `jest.clearAllMocks()` before each test.
3. **Use meaningful assertions**: Test what the user sees, not implementation details.
4. **Keep tests independent**: Each test should pass/fail on its own.
5. **Test happy and sad paths**: Include success and error scenarios.
6. **Use descriptive names**: Make test purpose clear from the name.

### Common Issues

- **Tests timeout**: Increase timeout with `jest.setTimeout(10000)` if needed.
- **Module not found**: Check that mocks are properly configured in `jest.setup.js`.
- **CSS import errors**: CSS files are mocked via `jest-css-mock.js` and configured in `package.json`.

### Future Test Coverage

Recommended areas for regression tests:

- **Friends/Social**: Add friend, remove friend, accept/decline requests.
- **Profile/Settings**: Edit profile, delete account, change password.
- **Notifications**: Display, dismiss, navigation.
- **Chat**: Send message, load messages, error handling.
- **Workouts**: Start workout, schedule workout, view history.
- **Leaderboard**: Load rankings, filter/sort.
- **Error Handling**: Network failures, auth token expiry, server errors.
