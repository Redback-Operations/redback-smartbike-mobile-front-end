/**
 * dashboard.jsx — SmartBike VR Analytics Dashboard
 *
 * A standalone screen accessible without authentication that presents
 * four tabs of SmartBike session analytics using synthetic data.
 * All static values in this file are placeholders — replace them with
 * real API calls once the backend session endpoints are available.
 *
 * Tabs:
 *   1. Overview      — trimester KPIs, weekly sessions, team delivery,
 *                      mission completion rates, top-5 riders leaderboard
 *   2. Performance   — speed trend, speed distribution, calories by
 *                      resistance level, brake events per session
 *   3. Engagement    — session frequency heatmap, mission play counts,
 *                      avg session duration per mission
 *   4. System Health — MQTT latency with spike detection, connection
 *                      stability gauges, disconnect events, sensor errors
 *
 * Entry point: route /dashboard (expo-router file-based routing)
 * Accessible from the login screen via "View dashboard without signing in".
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LineChart, BarChart } from "react-native-gifted-charts";

// ── Layout constants ──────────────────────────────────────────────
// All pixel widths are derived from the physical screen width so the
// layout adapts to any device without media queries.

const { width: screenWidth } = Dimensions.get("window");
const PADDING = 16;  // outer horizontal padding for the screen
const GAP = 8;       // gap between side-by-side panels

const avail = screenWidth - PADDING * 2;          // usable row width
const col2 = Math.floor((avail - GAP) * 2 / 3);  // wide column in a 2:1 row
const col1 = Math.floor((avail - GAP) / 3);       // narrow column in a 2:1 row
const colHalf = Math.floor((avail - GAP) / 2);    // each column in a 1:1 row
const CARD_W = Math.floor((avail - GAP) / 2);     // width of a KPI card in a 2-col grid

const PH = 12; // horizontal padding inside each Panel card

// Chart widths subtract the panel's left + right padding so charts
// never overflow their containing card.
const chartCol2 = col2 - PH * 2;
const chartCol1 = col1 - PH * 2;
const chartHalf = colHalf - PH * 2;

// ── Design tokens ─────────────────────────────────────────────────
// Central colour palette. Update these values to retheme the entire
// dashboard without touching individual components.

const C = {
  bg: "#f5f4f0",       // screen background (warm off-white)
  card: "#ffffff",     // panel / card surface
  border: "#d3d1c7",   // subtle border between elements
  panelBg: "#f1efe8",  // inset background used inside panels (e.g. chart rules, placeholders)
  text: "#1a1a18",     // primary body text
  muted: "#888780",    // secondary / label text
  faint: "#b4b2a9",    // tertiary / hint text

  // Green family — used for positive deltas and primary chart fill
  green: "#1D9E75",
  greenDark: "#0F6E56",
  greenMid: "#5DCAA5",
  greenLight: "#9FE1CB",
  greenBg: "#E1F5EE",   // badge background
  greenText: "#0F6E56", // badge foreground

  // Amber — used for flat/warning deltas and spike highlights
  amber: "#BA7517",
  amberBg: "#FAEEDA",
  amberText: "#854F0B",
  amberFill: "#EF9F27",

  // Red — used for negative deltas and error states
  red: "#A32D2D",
  redBg: "#FCEBEB",
  redFill: "#E24B4A",

  // Accent colours for per-mission differentiation
  purple: "#AFA9EC",
  orange: "#F0997B",
  blue: "#85B7EB",

  spike: "#D85A30", // MQTT latency spike bars
};

// ── Synthetic data ────────────────────────────────────────────────
// Replace each constant below with an API fetch / hook when the
// backend is ready. The shape of each array matches what the chart
// components expect, so only the source needs to change.

// --- Overview tab ---

// KPI cards: label shown above the value, delta shown below in colour
// type: "up" = green, "warn" = amber, "down" = red, "neutral" = grey
const overviewKpis = [
  { label: "Total Sessions", value: "482", delta: "↑ 18% vs T1", type: "up" },
  { label: "Active Users", value: "47", delta: "↑ 6 new users", type: "up" },
  { label: "Avg Duration", value: "34 min", delta: "↑ 4 min vs T1", type: "up" },
  { label: "Mission Completion", value: "71%", delta: "— flat vs T1", type: "warn" },
  { label: "System Health Score", value: "94%", delta: "↑ 3 pts", type: "up" },
];

// Weekly session counts — bar colour encodes volume tier
const weeklyData = [12, 18, 15, 24, 22, 29, 32, 26, 36, 34, 31, 40].map(v => ({
  value: v,
  frontColor: v >= 30 ? C.green : v >= 20 ? C.greenMid : C.greenLight,
}));

// Horizontal bar chart — completion % per VR mission
const missionCompletion = [
  { name: "Forest Trail", pct: 84, color: C.green },
  { name: "Mountain Peak", pct: 61, color: C.blue },
  { name: "City Sprint", pct: 77, color: C.greenMid },
  { name: "Ocean Breeze", pct: 70, color: C.purple },
  { name: "Desert Storm", pct: 55, color: C.orange },
];

// Leaderboard table — top 5 users by total distance ridden
const topRiders = [
  { rank: 1, user: "U012", km: 184, sessions: 22 },
  { rank: 2, user: "U034", km: 161, sessions: 18 },
  { rank: 3, user: "U007", km: 148, sessions: 15 },
  { rank: 4, user: "U023", km: 132, sessions: 14 },
  { rank: 5, user: "U041", km: 119, sessions: 12 },
];

// --- Performance tab ---

const performanceKpis = [
  { label: "Avg Speed", value: "24.3 km/h", delta: "↑ 1.2 km/h", type: "up" },
  { label: "Avg Distance", value: "13.7 km", delta: "↑ 0.9 km", type: "up" },
  { label: "Avg Calories", value: "318 kcal", delta: "↑ 22 kcal", type: "up" },
  { label: "Top Speed Record", value: "42.1 km/h", delta: "U012 · 8 Apr", type: "neutral" },
];

// Rolling 7-day average speed — one point per session date
const speedTrend = [21, 23, 22, 25, 24, 27, 26, 28, 25, 29, 30, 28].map(v => ({
  value: v, dataPointColor: C.green,
}));

// Speed distribution histogram — sessions bucketed in 5 km/h bins
const speedDist = [
  { value: 3, label: "<15", frontColor: C.greenLight },
  { value: 12, label: "15-20", frontColor: C.greenLight },
  { value: 28, label: "20-25", frontColor: C.greenMid },
  { value: 35, label: "25-30", frontColor: C.green },
  { value: 18, label: "30-35", frontColor: C.greenMid },
  { value: 7, label: ">35", frontColor: C.greenLight },
];

// Average calories burned per session at each resistance level (2–10)
const caloriesByResist = [
  { value: 180, label: "2", frontColor: C.greenLight },
  { value: 210, label: "4", frontColor: C.greenLight },
  { value: 265, label: "6", frontColor: C.greenMid },
  { value: 318, label: "8", frontColor: C.green },
  { value: 390, label: "10", frontColor: C.greenDark },
];

// Number of brake events recorded per session sample
const brakeEvents = [
  { value: 4, label: "S1", frontColor: C.greenLight },
  { value: 7, label: "S2", frontColor: C.greenMid },
  { value: 3, label: "S3", frontColor: C.greenLight },
  { value: 9, label: "S4", frontColor: C.amberFill }, // above-average — amber
  { value: 5, label: "S5", frontColor: C.greenMid },
  { value: 6, label: "S6", frontColor: C.greenMid },
];

// --- Engagement tab ---

const engagementKpis = [
  { label: "Sessions/User/Week", value: "2.3", delta: "↑ 0.4", type: "up" },
  { label: "Workout Save Rate", value: "79%", delta: "↑ 5%", type: "up" },
  { label: "Summary Viewed Rate", value: "63%", delta: "— no change", type: "warn" },
  { label: "Most Popular Mission", value: "Forest Trail", delta: "148 plays", type: "up" },
];

// Total play count per mission — drives the horizontal bar chart
const missionPlays = [
  { name: "Forest Trail", value: 148, color: C.green },
  { name: "City Sprint", value: 122, color: C.greenMid },
  { name: "Ocean Breeze", value: 101, color: C.greenLight },
  { name: "Mountain Peak", value: 80, color: C.purple },
  { name: "Desert Storm", value: 31, color: C.orange },
];

// Heatmap: rows = time-of-day [AM, PM, Eve], cols = day [Mon–Sun]
// Cell values 0–4 map to hmColors (0 = no activity, 4 = peak activity)
const heatmapData = [
  [1, 2, 1, 2, 1, 3, 3], // AM
  [3, 4, 3, 2, 3, 1, 1], // PM
  [4, 3, 4, 3, 2, 1, 2], // Eve
];
const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatmapTimes = ["AM", "PM", "Eve"];
const hmColors = ["#f1efe8", "#C8EFE1", "#9FE1CB", "#5DCAA5", "#1D9E75"]; // index = intensity

// Average session duration (minutes) per mission type
const missionDuration = [
  { value: 38, label: "Forest", frontColor: C.green },
  { value: 28, label: "City", frontColor: C.greenMid },
  { value: 42, label: "Ocean", frontColor: C.blue },
  { value: 22, label: "Mtn", frontColor: C.purple },
  { value: 18, label: "Desert", frontColor: C.orange },
];

// --- System Health tab ---

const systemKpis = [
  { label: "Avg MQTT Delay", value: "112 ms", delta: "↓ 38ms vs T1", type: "up" },
  { label: "Peak MQTT Delay", value: "1,840 ms", delta: "Bluetooth spike", type: "warn" },
  { label: "Connection Stability", value: "96.2%", delta: "↑ 2.1%", type: "up" },
  { label: "Sensor Error Rate", value: "1.4%", delta: "↓ 0.6%", type: "up" },
];

// Raw MQTT round-trip times in ms — bars > 500 ms are coloured as spikes
const mqttData = [80, 100, 72, 120, 88, 1840, 112, 80, 140, 96, 72, 1200, 88, 76, 120, 84, 100, 80, 68, 92].map(v => ({
  value: v,
  frontColor: v > 500 ? C.spike : C.greenMid,
}));

// Weekly count of full connection drops (Bluetooth/WiFi disconnects)
const disconnectData = [
  { value: 3, label: "W1", frontColor: C.greenMid },
  { value: 5, label: "W2", frontColor: C.greenMid },
  { value: 2, label: "W3", frontColor: C.greenMid },
  { value: 8, label: "W4", frontColor: C.amberFill }, // elevated — amber
  { value: 4, label: "W5", frontColor: C.greenMid },
  { value: 1, label: "W6", frontColor: C.greenMid },
];

// Sensor error rates by sensor type — badge colour encodes severity
const sensorErrors = [
  { name: "Speed sensor", value: "0.7%", type: "amber" },
  { name: "Resistance sensor", value: "0.3%", type: "green" },
  { name: "IoT–VR latency >3s", value: "4.1%", type: "amber" },
  { name: "MQTT disconnects", value: "0.4%", type: "green" },
];

// ── Reusable UI components ────────────────────────────────────────
// Each component below is a pure presentational building block with
// no internal state. They accept only the props they render and are
// intentionally kept small so they can be reused across all four tabs.

// Coloured pill label — green / amber / red
function Badge({ label, type }) {
  const map = {
    green: { bg: C.greenBg, color: C.greenText },
    amber: { bg: C.amberBg, color: C.amberText },
    red: { bg: C.redBg, color: C.red },
  };
  const c = map[type] || map.green;
  return (
    <View style={[s.badge, { backgroundColor: c.bg }]}>
      <Text style={[s.badgeText, { color: c.color }]}>{label}</Text>
    </View>
  );
}

// Small uppercase section heading displayed above a group of panels
function SectionLabel({ text }) {
  return <Text style={s.sectionLabel}>{text}</Text>;
}

// A single KPI tile — label + headline value + optional coloured delta
function KpiCard({ label, value, delta, type, cardStyle }) {
  const dc = { up: C.green, warn: C.amber, down: C.red, neutral: C.faint }[type] || C.faint;
  return (
    <View style={[s.kpiCard, cardStyle]}>
      <Text style={s.kpiLabel}>{label}</Text>
      <Text style={s.kpiValue}>{value}</Text>
      {delta ? <Text style={[s.kpiDelta, { color: dc }]}>{delta}</Text> : null}
    </View>
  );
}

// White rounded card that wraps any chart or list content.
// Pass flex={n} to make it grow/shrink inside a Row.
function Panel({ children, flex, style }) {
  return (
    <View style={[s.panel, flex !== undefined && { flex }, style]}>
      {children}
    </View>
  );
}

// Uppercase panel title + optional Badge aligned to the right
function PanelHeader({ title, badge, badgeType }) {
  return (
    <View style={s.panelHeader}>
      <Text style={s.panelTitle} numberOfLines={2}>{title}</Text>
      {badge ? <Badge label={badge} type={badgeType || "green"} /> : null}
    </View>
  );
}

// Horizontal gauge bar — used for team delivery and connection status
// pct: 0–100, rendered as a percentage-width filled bar
function HBar({ label, pct, color, labelColor }) {
  return (
    <View style={s.hbarRow}>
      <Text style={[s.hbarLabel, labelColor && { color: labelColor }]}>{label}</Text>
      <View style={s.hbarTrack}>
        <View style={[s.hbarFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <Text style={s.hbarPct}>{pct}%</Text>
    </View>
  );
}

// Horizontal mission bar — supports both raw count (value/max) and
// direct percentage (pct) so it works for both completion and play count
function MBar({ name, pct, value, max, color }) {
  const fill = value !== undefined ? Math.round((value / max) * 100) : pct;
  const display = value !== undefined ? String(value) : `${pct}%`;
  return (
    <View style={s.mbarRow}>
      <Text style={s.mbarName} numberOfLines={1}>{name}</Text>
      <View style={s.mbarTrack}>
        <View style={[s.mbarFill, { width: `${fill}%`, backgroundColor: color }]} />
      </View>
      <Text style={s.mbarVal}>{display}</Text>
    </View>
  );
}

// Grey placeholder box shown where a chart type is not yet implemented
// (e.g. scatter plot, stacked bar). Replace with a real chart component
// once the relevant library or data is available.
function ChartPlaceholder({ label, height = 80 }) {
  return (
    <View style={[s.placeholder, { height }]}>
      <Text style={s.placeholderText}>{label}</Text>
    </View>
  );
}

// Small footnote text rendered below a chart
function Note({ children }) {
  return <Text style={s.note}>{children}</Text>;
}

// Lays out two Panels side by side with a GAP between them
function Row({ children, style }) {
  return <View style={[s.row, style]}>{children}</View>;
}

// 2×2 grid of KPI cards — used by Performance, Engagement, System Health
// Each card is half the available width so exactly two fit per row
function KpiGrid4({ kpis }) {
  return (
    <View style={s.kpiGrid4}>
      {kpis.map(k => (
        <KpiCard key={k.label} {...k} cardStyle={{ width: CARD_W }} />
      ))}
    </View>
  );
}

// Session frequency heatmap — a 3-row (AM/PM/Eve) × 7-col (Mon–Sun) grid.
// Cell colour is looked up from hmColors using the intensity value (0–4)
// stored in heatmapData.
function Heatmap() {
  return (
    <View>
      {/* Day-of-week header row */}
      <View style={s.hmRow}>
        <Text style={s.hmTime} />
        {heatmapDays.map(d => (
          <Text key={d} style={s.hmDay}>{d}</Text>
        ))}
      </View>
      {/* One row per time-of-day band */}
      {heatmapData.map((row, ri) => (
        <View key={ri} style={s.hmRow}>
          <Text style={s.hmTime}>{heatmapTimes[ri]}</Text>
          {row.map((val, ci) => (
            <View key={ci} style={[s.hmCell, { backgroundColor: hmColors[val] }]} />
          ))}
        </View>
      ))}
      <Note>Darker = more sessions</Note>
    </View>
  );
}

// ── Tab screens ───────────────────────────────────────────────────
// Each tab is a self-contained ScrollView. To connect real data,
// replace the static arrays above with API responses and pass them
// as props (or via context / a hook) into the relevant tab.

function OverviewTab() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.tabContent}>
      <SectionLabel text="KEY METRICS · THIS TRIMESTER" />

      {/* 5 KPI cards in a horizontally scrollable strip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: GAP }}>
        {overviewKpis.map(k => (
          <KpiCard key={k.label} {...k} cardStyle={{ minWidth: 120, marginRight: GAP }} />
        ))}
      </ScrollView>

      {/* Sessions per week (2/3 width) + Team delivery gauges (1/3 width) */}
      <Row>
        <Panel flex={2} style={{ marginRight: GAP }}>
          <PanelHeader title="Sessions per week" badge="Jan–Apr 2026" />
          <BarChart
            data={weeklyData}
            width={chartCol2}
            height={60}
            barWidth={14}
            spacing={4}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            noOfSections={3}
            maxValue={45}
            initialSpacing={4}
          />
          <Note>Bar chart — weekly session volume</Note>
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="Team delivery" />
          <HBar label="IoT" pct={82} color={C.greenMid} />
          <HBar label="VR" pct={68} color={C.purple} />
          <HBar label="Mobile" pct={91} color={C.blue} />
          <Note>% of sprint goals delivered</Note>
        </Panel>
      </Row>

      {/* Mission completion horizontal bars + Top 5 riders table */}
      <Row>
        <Panel flex={1} style={{ marginRight: GAP }}>
          <PanelHeader title="Mission completion rate by mission" />
          {missionCompletion.map(m => (
            <MBar key={m.name} name={m.name} pct={m.pct} color={m.color} />
          ))}
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="Top 5 riders (distance km)" />
          <View style={s.tableHead}>
            <Text style={[s.thCell, { flex: 0.3 }]}>#</Text>
            <Text style={[s.thCell, { flex: 1 }]}>User</Text>
            <Text style={[s.thCell, { flex: 0.8, textAlign: "right" }]}>km</Text>
            <Text style={[s.thCell, { flex: 0.9, textAlign: "right" }]}>sess.</Text>
          </View>
          {topRiders.map(r => (
            <View key={r.rank} style={s.tableRow}>
              <Text style={[s.tdRank, { flex: 0.3 }]}>{r.rank}</Text>
              <Text style={[s.tdCell, { flex: 1 }]}>{r.user}</Text>
              <Text style={[s.tdCell, { flex: 0.8, textAlign: "right", fontWeight: "500", color: C.text }]}>{r.km}</Text>
              <Text style={[s.tdCell, { flex: 0.9, textAlign: "right" }]}>{r.sessions}</Text>
            </View>
          ))}
        </Panel>
      </Row>
    </ScrollView>
  );
}

function PerformanceTab() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.tabContent}>
      <SectionLabel text="RIDER PERFORMANCE METRICS" />
      <KpiGrid4 kpis={performanceKpis} />

      {/* Speed trend line (2/3) + Speed distribution histogram (1/3) */}
      <Row>
        <Panel flex={2} style={{ marginRight: GAP }}>
          <PanelHeader title="Avg speed trend over time" badge="Line chart" />
          <LineChart
            data={speedTrend}
            width={chartCol2}
            height={80}
            color={C.green}
            thickness={1.5}
            dataPointsColor={C.green}
            dataPointsRadius={3}
            curved
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            noOfSections={3}
            initialSpacing={4}
          />
          <Note>Speed (km/h) by session date — rolling 7-day avg</Note>
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="Speed distribution" />
          <BarChart
            data={speedDist}
            width={chartCol1}
            height={80}
            barWidth={12}
            spacing={3}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            xAxisLabelTextStyle={{ fontSize: 7, color: C.faint }}
            noOfSections={3}
            initialSpacing={3}
          />
          <Note>Histogram · 5 km/h bins</Note>
        </Panel>
      </Row>

      {/* Calories by resistance (1/2) + Brake events (1/2) */}
      <Row>
        <Panel flex={1} style={{ marginRight: GAP }}>
          <PanelHeader title="Calories by resistance level" />
          <BarChart
            data={caloriesByResist}
            width={chartHalf}
            height={70}
            barWidth={20}
            spacing={8}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            xAxisLabelTextStyle={{ fontSize: 9, color: C.faint }}
            noOfSections={3}
            maxValue={450}
            initialSpacing={8}
          />
          <Note>Bar chart · levels 1–10</Note>
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="Brake events per session" />
          <BarChart
            data={brakeEvents}
            width={chartHalf}
            height={70}
            barWidth={20}
            spacing={8}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            xAxisLabelTextStyle={{ fontSize: 9, color: C.faint }}
            noOfSections={3}
            maxValue={12}
            initialSpacing={8}
          />
          <Note>Bar chart</Note>
        </Panel>
      </Row>

      {/* Scatter plot placeholder — requires a dedicated scatter chart library */}
      <Panel style={{ marginBottom: GAP }}>
        <PanelHeader title="Distance vs Duration" />
        <ChartPlaceholder label="Scatter plot — distance (km) vs duration (min)" height={70} />
      </Panel>
    </ScrollView>
  );
}

function EngagementTab() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.tabContent}>
      <SectionLabel text="USER ENGAGEMENT & GAMIFICATION" />
      <KpiGrid4 kpis={engagementKpis} />

      {/* Session frequency heatmap (1/2) + New vs returning placeholder (1/2) */}
      <Row>
        <Panel flex={1} style={{ marginRight: GAP }}>
          <PanelHeader title="Session frequency heatmap" badge="Day × Hour" badgeType="amber" />
          <Heatmap />
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="New vs returning users per week" />
          {/* Stacked bar requires additional setup — placeholder until implemented */}
          <ChartPlaceholder label="Stacked bar — New (green) vs Returning (teal)" height={100} />
        </Panel>
      </Row>

      {/* Mission play count bars (1/2) + Avg duration per mission bar chart (1/2) */}
      <Row>
        <Panel flex={1} style={{ marginRight: GAP }}>
          <PanelHeader title="Mission play count" />
          {missionPlays.map(m => (
            <MBar key={m.name} name={m.name} value={m.value} max={148} color={m.color} />
          ))}
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="Avg session duration by mission" />
          <BarChart
            data={missionDuration}
            width={chartHalf}
            height={90}
            barWidth={20}
            spacing={6}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            xAxisLabelTextStyle={{ fontSize: 8, color: C.faint }}
            noOfSections={3}
            maxValue={50}
            initialSpacing={6}
          />
          <Note>Grouped bar — duration (min) by mission</Note>
        </Panel>
      </Row>
    </ScrollView>
  );
}

function SystemHealthTab() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.tabContent}>
      <SectionLabel text="SYSTEM & CONNECTIVITY METRICS" />
      <KpiGrid4 kpis={systemKpis} />

      {/* MQTT latency bar chart (2/3) — spikes coloured orange — + Connection gauges (1/3) */}
      <Row>
        <Panel flex={2} style={{ marginRight: GAP }}>
          <PanelHeader title="MQTT delay over time" badge="Spikes flagged" badgeType="red" />
          <BarChart
            data={mqttData}
            width={chartCol2}
            height={60}
            barWidth={9}
            spacing={3}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            noOfSections={3}
            initialSpacing={3}
          />
          <Note>Orange = spike {">"} 500ms · target {"<"} 3s per brief</Note>
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="Connection status" />
          <HBar label="Stable" pct={93} color={C.greenMid} labelColor={C.greenDark} />
          <HBar label="Unstable" pct={5} color={C.amberFill} labelColor={C.amber} />
          <HBar label="Dropped" pct={2} color={C.redFill} labelColor={C.red} />
        </Panel>
      </Row>

      {/* Weekly disconnect events bar chart (1/2) + Sensor error list (1/2) */}
      <Row>
        <Panel flex={1} style={{ marginRight: GAP }}>
          <PanelHeader title="Disconnect events per week" />
          <BarChart
            data={disconnectData}
            width={chartHalf}
            height={70}
            barWidth={26}
            spacing={10}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0.5}
            xAxisColor={C.border}
            xAxisLabelTextStyle={{ fontSize: 9, color: C.faint }}
            noOfSections={3}
            maxValue={10}
            initialSpacing={8}
          />
        </Panel>
        <Panel flex={1}>
          <PanelHeader title="Sensor errors by type" />
          {sensorErrors.map((e, i) => (
            <View key={e.name} style={[s.sensorRow, i < sensorErrors.length - 1 && s.sensorBorder]}>
              <Text style={s.sensorName} numberOfLines={2}>{e.name}</Text>
              <Badge label={e.value} type={e.type} />
            </View>
          ))}
        </Panel>
      </Row>
    </ScrollView>
  );
}

// ── Root component ────────────────────────────────────────────────
// Manages which tab is active and renders the header + tab bar that
// are shared across all four views. Tab switching uses conditional
// rendering (not a navigator) to avoid remounting chart libraries
// on every switch.

const TABS = ["Overview", "Performance", "Engagement", "System Health"];

export default function Dashboard() {
  const [active, setActive] = useState(0); // index of the currently visible tab

  return (
    <SafeAreaView style={s.safe}>

      {/* ── Header bar ── */}
      <View style={s.topBar}>
        <View style={s.logoRow}>
          <View style={s.logoDot}>
            <View style={s.logoDotInner} />
          </View>
          <View>
            <Text style={s.logoTitle}>SmartBike VR — Analytics Hub</Text>
            <Text style={s.logoSub}>T2 2026 · Last updated: 13 Apr 2026</Text>
          </View>
        </View>
        <Badge label="System Healthy" type="green" />
      </View>

      {/* ── Tab bar ── */}
      <View style={s.tabBar}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[s.tabItem, active === i && s.tabItemActive]}
            onPress={() => setActive(i)}
          >
            <Text style={[s.tabLabel, active === i && s.tabLabelActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Tab content ── */}
      <View style={{ flex: 1 }}>
        {active === 0 && <OverviewTab />}
        {active === 1 && <PerformanceTab />}
        {active === 2 && <EngagementTab />}
        {active === 3 && <SystemHealthTab />}
      </View>

    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: C.card,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    paddingHorizontal: PADDING,
    paddingVertical: 10,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
  },
  logoDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" },
  logoTitle: { fontSize: 12, fontWeight: "500", color: C.text },
  logoSub: { fontSize: 10, color: C.muted },

  tabBar: {
    flexDirection: "row",
    backgroundColor: C.card,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    paddingHorizontal: PADDING,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginBottom: -0.5,
  },
  tabItemActive: { borderBottomColor: C.green },
  tabLabel: { fontSize: 11, color: C.muted },
  tabLabelActive: { color: C.text, fontWeight: "500" },

  tabContent: { padding: PADDING, paddingBottom: 40 },

  sectionLabel: {
    fontSize: 9,
    fontWeight: "500",
    color: C.faint,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  // KPI cards
  kpiCard: {
    backgroundColor: C.card,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 8,
    padding: 10,
  },
  kpiGrid4: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    marginBottom: GAP,
  },
  kpiLabel: {
    fontSize: 9,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  kpiValue: { fontSize: 17, fontWeight: "500", color: C.text, lineHeight: 21 },
  kpiDelta: { fontSize: 10, marginTop: 2 },

  // Panel card
  panel: {
    backgroundColor: C.card,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 8,
    padding: PH,
    marginBottom: GAP,
    overflow: "hidden",
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 4,
  },
  panelTitle: {
    fontSize: 9,
    fontWeight: "500",
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    flex: 1,
  },

  row: { flexDirection: "row", marginBottom: GAP },

  // Horizontal gauge bar (team delivery, connection status)
  hbarRow: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 5 },
  hbarLabel: { fontSize: 9, color: C.muted, width: 44 },
  hbarTrack: {
    flex: 1,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.panelBg,
    overflow: "hidden",
  },
  hbarFill: { height: "100%", borderRadius: 4 },
  hbarPct: { fontSize: 9, color: C.muted, width: 26, textAlign: "right" },

  // Mission / play-count horizontal bar
  mbarRow: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 5 },
  mbarName: { fontSize: 9, color: C.muted, width: 68 },
  mbarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.panelBg,
    overflow: "hidden",
  },
  mbarFill: { height: "100%", borderRadius: 3 },
  mbarVal: { fontSize: 9, color: C.muted, width: 24, textAlign: "right" },

  // Top-riders table
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    paddingBottom: 3,
    marginBottom: 2,
  },
  thCell: { fontSize: 9, color: C.faint, textTransform: "uppercase", letterSpacing: 0.3 },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: C.border + "40",
    paddingVertical: 3,
    alignItems: "center",
  },
  tdRank: { fontSize: 9, color: C.faint, fontWeight: "500" },
  tdCell: { fontSize: 10, color: C.muted },

  // Session frequency heatmap grid
  hmRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  hmTime: { fontSize: 8, color: C.faint, width: 22 },
  hmDay: { fontSize: 8, color: C.faint, flex: 1, textAlign: "center" },
  hmCell: { flex: 1, height: 14, borderRadius: 2, marginHorizontal: 1 },

  // Placeholder for unimplemented chart types
  placeholder: {
    backgroundColor: C.panelBg,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  placeholderText: { fontSize: 9, color: C.faint, textAlign: "center" },

  note: { fontSize: 9, color: C.faint, marginTop: 4 },

  badge: { borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 },
  badgeText: { fontSize: 9, fontWeight: "500" },

  // Sensor error list rows
  sensorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  sensorBorder: { borderBottomWidth: 0.5, borderBottomColor: C.border },
  sensorName: { fontSize: 9, color: C.muted, flex: 1, marginRight: 4 },
});
