<<<<<<< HEAD
export const initialFriends = [
  {
    id: 1,
    name: "Jordan Anderson",
    photo: "https://i.pravatar.cc/150?img=12",
    email: "jordan@example.com",
    dob: "1995-04-12",
    status: "Online",
    rides: 24,
    weeklyDistance: 86.4,
    points: 2480,
    badge: "Sprint King",
    leaderboardStats: {
      daily: {
        distance: 14.2,
        points: 480,
        rides: 1,
      },
      weekly: {
        distance: 86.4,
        points: 2480,
        rides: 6,
      },
      monthly: {
        distance: 312.8,
        points: 8940,
        rides: 24,
      },
    },
  },
  {
    id: 2,
    name: "Aviksha Vidya",
    photo: "https://i.pravatar.cc/150?img=5",
    email: "aviksha@example.com",
    dob: "1998-09-28",
    status: "Active",
    rides: 18,
    weeklyDistance: 58.1,
    points: 1985,
    badge: "Early Bird",
    leaderboardStats: {
      daily: {
        distance: 9.6,
        points: 365,
        rides: 1,
      },
      weekly: {
        distance: 58.1,
        points: 1985,
        rides: 4,
      },
      monthly: {
        distance: 244.6,
        points: 7760,
        rides: 18,
      },
    },
  },
  {
    id: 3,
    name: "Karan Kapoor",
    photo: "https://i.pravatar.cc/150?img=20",
    email: "karan@example.com",
    dob: "1993-07-22",
    status: "Offline",
    rides: 31,
    weeklyDistance: 64.2,
    points: 2090,
    badge: "Power Ride",
    leaderboardStats: {
      daily: {
        distance: 11.8,
        points: 410,
        rides: 1,
      },
      weekly: {
        distance: 64.2,
        points: 2090,
        rides: 5,
      },
      monthly: {
        distance: 358.4,
        points: 9780,
        rides: 31,
      },
    },
  },
  {
    id: 4,
    name: "Alicia Chen",
    photo: "https://i.pravatar.cc/150?img=24",
    email: "alicia@example.com",
    dob: "1996-01-17",
    status: "Online",
    rides: 27,
    weeklyDistance: 79.3,
    points: 2365,
    badge: "Climber",
    leaderboardStats: {
      daily: {
        distance: 13.5,
        points: 455,
        rides: 1,
      },
      weekly: {
        distance: 79.3,
        points: 2365,
        rides: 5,
      },
      monthly: {
        distance: 329.7,
        points: 9215,
        rides: 27,
      },
    },
  },
];

const createCurrentRider = (username = "Username") => ({
  id: "self",
  name: username || "Username",
  photo: "https://i.pravatar.cc/150?img=14",
  email: "username@example.com",
  dob: "1997-11-02",
  status: "Rising",
  rides: 22,
  weeklyDistance: 68.7,
  points: 2210,
  badge: "Consistency",
  leaderboardStats: {
    daily: {
      distance: 12.1,
      points: 430,
      rides: 1,
    },
    weekly: {
      distance: 68.7,
      points: 2210,
      rides: 5,
    },
    monthly: {
      distance: 287.9,
      points: 8485,
      rides: 22,
    },
  },
});

export const getLeaderboardData = (
  timeframe = "weekly",
  username = "Username"
) => {
  const riders = [...initialFriends, createCurrentRider(username)];

  return riders
    .sort((first, second) => {
      const firstStats = first.leaderboardStats[timeframe];
      const secondStats = second.leaderboardStats[timeframe];

      if (secondStats.points !== firstStats.points) {
        return secondStats.points - firstStats.points;
      }

      return secondStats.distance - firstStats.distance;
    })
    .map((rider, index) => ({
      ...rider,
      distance: rider.leaderboardStats[timeframe].distance,
      points: rider.leaderboardStats[timeframe].points,
      periodRides: rider.leaderboardStats[timeframe].rides,
      rank: index + 1,
    }));
};
=======
export { friends as initialFriends } from "@/features/friends/data";
>>>>>>> upstream/main
