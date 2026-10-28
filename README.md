# Kathmandu Waste (React Native / Expo)

Citizen and Driver apps converted from the two HTML files. Same colors, spacing and light/dark themes.

## Run

```
npm install
npx expo install --fix
npm run citizen
npm run driver
```

`citizen:web` and `driver:web` open the web build. `.npmrc` enables `legacy-peer-deps` to avoid peer-dependency conflicts.

The app is chosen with `EXPO_PUBLIC_APP_ROLE` (`citizen` or `driver`, default `citizen`).

## Structure

- `src/data/` all static data as JSON (theme, users, routes, programs, waste items, messages, options)
- `src/shared/` theme, layout hook, icon registry, reusable UI (buttons, rows, sheet, toast, fields, select, nav, map frame)
- `src/apps/citizen/` store, screens, components
- `src/apps/driver/` store, screens, components

## Notes on the conversion

- Global mutable state and `innerHTML` redraws became React context stores (`CitizenContext`, `DriverContext`).
- Emoji icons in navigation and buttons use `lucide-react-native`. Emoji inside data text is unchanged.
- `<select>` is a modal list (`Select`), bottom sheets are `Sheet`, toasts are `Toast`.
- Photo capture and upload use `expo-image-picker`; the identification result is still simulated.
- Pull-to-refresh on the citizen app uses `RefreshControl`.
- Responsive: content is capped at 430 wide and centered on wide screens; text scales down slightly below 390 wide; safe-area insets are applied.
- Only intended change: the driver map's "You are here" label flips to the left near the right edge so it is not clipped.
