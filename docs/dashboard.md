# Analytics Dashboard — Technical Documentation

**File:** `src/app/(tabs)/dashboard.jsx`  
**Branch:** `feature/analytics-dashboard`  
**Trimester:** T2 2026

---

## Overview

The Analytics Dashboard is a standalone screen in the SmartBike VR mobile app that presents session data across four thematic tabs. It is accessible without authentication — users can navigate to it directly from the login screen via the *"View dashboard without signing in"* link.

All data displayed is currently **synthetic (hardcoded)**. The architecture is designed so that replacing the static arrays with real API calls requires changes only to the data section of the file, not to any components or layout.

---

## How to Access

### From the login screen
A link at the bottom of `src/app/index.jsx` routes to `/dashboard`:
```jsx
router.replace("/dashboard")
```

### Direct navigation (development)
In `src/app/index.jsx`, comment out the `handleLogin` call and uncomment:
```js
router.replace("/dashboard");
```
This makes the app boot directly into the dashboard without any login step.

---

## Tab Structure

| Tab | Content |
|---|---|
| **Overview** | 5 KPI cards, weekly sessions bar chart, team delivery gauges, mission completion bars, top-5 riders table |
| **Performance** | 4 KPI cards, speed trend line chart, speed distribution histogram, calories by resistance, brake events per session |
| **Engagement** | 4 KPI cards, session frequency heatmap, mission play count bars, avg session duration per mission |
| **System Health** | 4 KPI cards, MQTT latency chart with spike detection, connection stability gauges, weekly disconnects, sensor error list |

Tab switching uses **conditional rendering** (`active === n && <TabComponent />`), not a navigator, so chart state is not preserved when switching tabs. This is intentional for a proof-of-concept — if state persistence is needed later, lift data into a context or use `react-navigation` tab navigator.

---

## Architecture

```
Dashboard (root)
├── Header bar        — logo, subtitle, "System Healthy" badge
├── Tab bar           — 4 touchable underline tabs
└── Tab content       — conditionally rendered based on active index
    ├── OverviewTab
    ├── PerformanceTab
    ├── EngagementTab
    └── SystemHealthTab
```

### Layout system

All pixel widths are derived from `Dimensions.get("window").width` at module load time, so the dashboard adapts to any screen size without media queries.

| Constant | Description |
|---|---|
| `avail` | Usable row width after outer padding |
| `col2` | Wide panel width in a 2:1 side-by-side row |
| `col1` | Narrow panel width in a 2:1 side-by-side row |
| `colHalf` | Each panel width in a 1:1 side-by-side row |
| `CARD_W` | KPI card width for a 2-column grid |
| `chartCol2/1/Half` | Chart widths (panel width minus horizontal padding) |

### Colour palette (`C`)

All colours are defined in a single `C` object at the top of the file. To retheme the dashboard, only this object needs to change.

| Token | Usage |
|---|---|
| `C.green` / `C.greenMid` / `C.greenLight` | Primary chart fills, positive delta text |
| `C.amber` | Warning deltas, elevated metric badges |
| `C.red` | Error states, negative deltas |
| `C.spike` | MQTT latency bars that exceed 500 ms |
| `C.bg` / `C.card` / `C.border` | Screen background, panel surface, dividers |

---

## Reusable Components

These are all pure, stateless components defined within the file.

| Component | Props | Purpose |
|---|---|---|
| `Badge` | `label`, `type` (`green`/`amber`/`red`) | Coloured pill label |
| `KpiCard` | `label`, `value`, `delta`, `type`, `cardStyle` | Single KPI tile |
| `KpiGrid4` | `kpis[]` | 2×2 grid of KPI cards |
| `Panel` | `children`, `flex`, `style` | White rounded card container |
| `PanelHeader` | `title`, `badge`, `badgeType` | Panel title row with optional badge |
| `HBar` | `label`, `pct`, `color`, `labelColor` | Horizontal percentage gauge |
| `MBar` | `name`, `pct`/`value`/`max`, `color` | Horizontal mission/play-count bar |
| `Row` | `children` | Side-by-side panel layout (flexDirection row) |
| `Heatmap` | — | 3×7 session frequency grid |
| `ChartPlaceholder` | `label`, `height` | Grey box for unimplemented chart types |
| `SectionLabel` | `text` | Uppercase section heading |
| `Note` | `children` | Small footnote below a chart |

---

## Charting Library

Charts are rendered using **`react-native-gifted-charts`** (already a project dependency).

| Component used | Where |
|---|---|
| `BarChart` | Sessions/week, speed distribution, calories, brake events, MQTT delay, disconnects, mission duration |
| `LineChart` | Speed trend over time |

### Key chart props used

```jsx
<BarChart
  data={arrayOfObjects}   // [{ value, frontColor, label }]
  width={chartCol2}       // must be set explicitly — no auto-width
  height={60}
  barWidth={14}
  spacing={4}
  hideRules               // removes horizontal grid lines
  hideYAxisText           // removes Y axis numbers
  yAxisThickness={0}      // hides Y axis line
  xAxisThickness={0.5}    // subtle X axis line
  noOfSections={3}        // number of Y divisions
  maxValue={45}           // optional ceiling; auto-scales if omitted
  initialSpacing={4}      // left padding before first bar
/>
```

---

## Data Structure

Each dataset is a plain JavaScript array at the top of the file. The shape required for charts:

```js
// BarChart / LineChart data item
{ value: Number, label?: String, frontColor?: String, dataPointColor?: String }

// KPI card item
{ label: String, value: String, delta: String, type: "up"|"warn"|"down"|"neutral" }

// Mission bar item
{ name: String, pct?: Number, value?: Number, max?: Number, color: String }

// Heatmap
// 2D array [rows][cols] where each cell is an intensity index 0–4
const heatmapData = [
  [1, 2, 1, 2, 1, 3, 3], // AM
  [3, 4, 3, 2, 3, 1, 1], // PM
  [4, 3, 4, 3, 2, 1, 2], // Eve
];
```

---

## Connecting Real Data

When the backend session API is ready, replace the static arrays with fetched data. The recommended pattern using a hook:

```jsx
// Example: replacing overviewKpis with live data
import { useEffect, useState } from "react";

function useOverviewKpis() {
  const [kpis, setKpis] = useState(overviewKpis); // fall back to synthetic
  useEffect(() => {
    fetch(`${API_BASE_URL}/analytics/overview/`)
      .then(r => r.json())
      .then(data => setKpis(data.kpis))
      .catch(() => {}); // keep synthetic data on failure
  }, []);
  return kpis;
}
```

Then inside `OverviewTab`:
```jsx
const kpis = useOverviewKpis();
// pass kpis into the ScrollView instead of the static overviewKpis array
```

### Placeholder charts to implement

Two charts are currently rendered as grey placeholder boxes. They require either a different library or additional setup:

| Chart | Location | Suggested approach |
|---|---|---|
| Distance vs Duration scatter plot | Performance tab | `react-native-svg` custom scatter, or `Victory Native` |
| New vs returning users stacked bar | Engagement tab | `BarChart` with `stackData` prop from `react-native-gifted-charts` |

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react-native-gifted-charts` | `^1.4.58` | Bar and line charts |
| `react-native-svg` | `^15.11.2` | Required peer dependency for gifted-charts |
| `react-native-reanimated` | `3.17.4` | Required peer dependency for gifted-charts (pinned to match native module) |
| `react-native-chart-kit` | `^6.12.2` | Installed during setup (not currently used in dashboard) |

> `react-native-reanimated` is pinned to exactly `3.17.4` (no `^`) to prevent a JS/native version mismatch that causes a crash on launch. Do not upgrade it without also rebuilding the native module.

---

## File Map

```
src/
├── app/
│   ├── index.jsx              Login screen — contains the skip-login link
│   └── (tabs)/
│       ├── _layout.jsx        Registers the dashboard tab in the bottom nav
│       └── dashboard.jsx      This file — the full analytics dashboard
docs/
└── dashboard.md               This document
```
