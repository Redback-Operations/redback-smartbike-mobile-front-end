const createWeeklyActivity = (entries) =>
  entries.map((entry, index) => ({
    id: `${entry.day}-${index}`,
    ...entry,
  }));

export const friends = [
  {
    id: "1",
    name: "Jordan Anderson",
    photo: "https://i.pravatar.cc/150?img=12",
    email: "jordan@example.com",
    dob: "1995-04-12",
    accent: "#fb7185",
    summary: "Completed an interval ride and crushed a new cadence record.",
    latestWorkout: {
      title: "Sunset Interval Ride",
      type: "Cycling",
      distance: "12.4 km",
      duration: "32 min",
      calories: "245 kcal",
      averageSpeed: "23.2 km/h",
      date: "2026-04-29",
      intensity: "High effort",
    },
    weeklyActivity: createWeeklyActivity([
      { day: "Mon", minutes: 22 },
      { day: "Tue", minutes: 34 },
      { day: "Wed", minutes: 18 },
      { day: "Thu", minutes: 42 },
      { day: "Fri", minutes: 30 },
      { day: "Sat", minutes: 48 },
      { day: "Sun", minutes: 32 },
    ]),
    recentActivities: [
      {
        id: "jordan-a1",
        title: "Sunset Interval Ride",
        subtitle: "Beat last week by 1.8 km",
        date: "2026-04-29",
        distance: "12.4 km",
        duration: "32 min",
        calories: "245 kcal",
      },
      {
        id: "jordan-a2",
        title: "Recovery Spin",
        subtitle: "Easy pace with steady cadence",
        date: "2026-04-27",
        distance: "6.1 km",
        duration: "18 min",
        calories: "118 kcal",
      },
      {
        id: "jordan-a3",
        title: "Tempo Ride",
        subtitle: "Focused on sustained power",
        date: "2026-04-24",
        distance: "15.0 km",
        duration: "40 min",
        calories: "301 kcal",
      },
    ],
    engagement: {
      likes: 12,
      comments: 4,
      note: "Friends loved the cadence milestone and asked for the workout split.",
    },
  },
  {
    id: "2",
    name: "Aviksha Vidya",
    photo: "https://i.pravatar.cc/150?img=5",
    email: "aviksha@example.com",
    dob: "1998-09-28",
    accent: "#4ade80",
    summary: "Closed the week with a consistency streak and a calm recovery ride.",
    latestWorkout: {
      title: "Recovery Ride",
      type: "Cycling",
      distance: "8.7 km",
      duration: "27 min",
      calories: "172 kcal",
      averageSpeed: "19.3 km/h",
      date: "2026-04-30",
      intensity: "Moderate",
    },
    weeklyActivity: createWeeklyActivity([
      { day: "Mon", minutes: 15 },
      { day: "Tue", minutes: 28 },
      { day: "Wed", minutes: 25 },
      { day: "Thu", minutes: 35 },
      { day: "Fri", minutes: 21 },
      { day: "Sat", minutes: 39 },
      { day: "Sun", minutes: 27 },
    ]),
    recentActivities: [
      {
        id: "aviksha-a1",
        title: "Recovery Ride",
        subtitle: "Finished with a full 7-day streak",
        date: "2026-04-30",
        distance: "8.7 km",
        duration: "27 min",
        calories: "172 kcal",
      },
      {
        id: "aviksha-a2",
        title: "Morning Ride",
        subtitle: "Kept a smooth endurance pace",
        date: "2026-04-28",
        distance: "10.2 km",
        duration: "31 min",
        calories: "214 kcal",
      },
      {
        id: "aviksha-a3",
        title: "Cadence Builder",
        subtitle: "Short session focused on rhythm",
        date: "2026-04-26",
        distance: "5.5 km",
        duration: "16 min",
        calories: "104 kcal",
      },
    ],
    engagement: {
      likes: 9,
      comments: 2,
      note: "The streak badge got a lot of love from the group chat.",
    },
  },
  {
    id: "3",
    name: "Karan Kapoor",
    photo: "https://i.pravatar.cc/150?img=20",
    email: "karan@example.com",
    dob: "1993-07-22",
    accent: "#60a5fa",
    summary: "Logged a quick lunchtime ride and shared a strong average speed.",
    latestWorkout: {
      title: "Lunch Break Ride",
      type: "Cycling",
      distance: "5.8 km",
      duration: "14 min",
      calories: "114 kcal",
      averageSpeed: "24.8 km/h",
      date: "2026-04-28",
      intensity: "Fast",
    },
    weeklyActivity: createWeeklyActivity([
      { day: "Mon", minutes: 10 },
      { day: "Tue", minutes: 0 },
      { day: "Wed", minutes: 14 },
      { day: "Thu", minutes: 24 },
      { day: "Fri", minutes: 20 },
      { day: "Sat", minutes: 12 },
      { day: "Sun", minutes: 26 },
    ]),
    recentActivities: [
      {
        id: "karan-a1",
        title: "Lunch Break Ride",
        subtitle: "Best average speed this month",
        date: "2026-04-28",
        distance: "5.8 km",
        duration: "14 min",
        calories: "114 kcal",
      },
      {
        id: "karan-a2",
        title: "Climb Session",
        subtitle: "Short hills with high resistance",
        date: "2026-04-25",
        distance: "7.3 km",
        duration: "24 min",
        calories: "189 kcal",
      },
      {
        id: "karan-a3",
        title: "Weekend Ride",
        subtitle: "Easy ride with cooldown finish",
        date: "2026-04-21",
        distance: "9.6 km",
        duration: "26 min",
        calories: "207 kcal",
      },
    ],
    engagement: {
      likes: 6,
      comments: 1,
      note: "A few friends asked Karan to share the hill resistance settings.",
    },
  },
  {
    id: "4",
    name: "Alicia Chen",
    photo: "https://i.pravatar.cc/150?img=24",
    email: "alicia@example.com",
    dob: "1996-01-17",
    accent: "#f59e0b",
    summary: "Wrapped up a recovery-focused week with balanced distance and pace.",
    latestWorkout: {
      title: "Balanced Endurance Ride",
      type: "Cycling",
      distance: "11.1 km",
      duration: "29 min",
      calories: "180 kcal",
      averageSpeed: "22.9 km/h",
      date: "2026-04-27",
      intensity: "Steady",
    },
    weeklyActivity: createWeeklyActivity([
      { day: "Mon", minutes: 12 },
      { day: "Tue", minutes: 24 },
      { day: "Wed", minutes: 19 },
      { day: "Thu", minutes: 0 },
      { day: "Fri", minutes: 34 },
      { day: "Sat", minutes: 29 },
      { day: "Sun", minutes: 31 },
    ]),
    recentActivities: [
      {
        id: "alicia-a1",
        title: "Balanced Endurance Ride",
        subtitle: "Smooth pacing from start to finish",
        date: "2026-04-27",
        distance: "11.1 km",
        duration: "29 min",
        calories: "180 kcal",
      },
      {
        id: "alicia-a2",
        title: "Recovery Spin",
        subtitle: "Light resistance and mobility focus",
        date: "2026-04-24",
        distance: "6.8 km",
        duration: "19 min",
        calories: "121 kcal",
      },
      {
        id: "alicia-a3",
        title: "Weekend Endurance",
        subtitle: "Longer ride with negative split finish",
        date: "2026-04-20",
        distance: "13.6 km",
        duration: "37 min",
        calories: "262 kcal",
      },
    ],
    engagement: {
      likes: 11,
      comments: 5,
      note: "Her pacing graph sparked a good discussion about endurance training.",
    },
  },
];

export const getFriendById = (id) =>
  friends.find((friend) => friend.id === String(id));

export const getWeeklyMinutes = (friend) =>
  friend.weeklyActivity.reduce((sum, day) => sum + day.minutes, 0);

export const formatActivityDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getDashboardSummary = () => {
  const totalFriends = friends.length;
  const totalWeeklyMinutes = friends.reduce(
    (sum, friend) => sum + getWeeklyMinutes(friend),
    0
  );
  const totalLikes = friends.reduce(
    (sum, friend) => sum + friend.engagement.likes,
    0
  );

  return {
    totalFriends,
    totalWeeklyMinutes,
    totalLikes,
  };
};
