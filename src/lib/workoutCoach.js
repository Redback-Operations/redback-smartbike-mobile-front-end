export const buildCoachPlan = ({ scheduledWorkouts = [], customWorkouts = [], today = new Date() }) => {
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const upcoming = scheduledWorkouts
    .filter((workout) => new Date(workout.date) >= today)
    .sort((first, second) => new Date(first.date) - new Date(second.date));
  const thisWeek = upcoming.filter((workout) => new Date(workout.date) <= weekEnd);
  const totalMinutes = thisWeek.reduce((total, workout) => total + (Number(workout.duration) || 0), 0);
  const intensity = totalMinutes >= 150 ? "High" : totalMinutes >= 60 ? "Balanced" : "Light";
  const recommendation = totalMinutes >= 150
    ? { action: "Schedule recovery", title: "Recovery ride", category: "Recovery", duration: 20, icon: "heart-pulse", accent: "#60A5FA", reason: "Your week is already full, so an easy session is the best next step." }
    : { action: "Plan a tempo ride", title: "Tempo ride", category: "Endurance", duration: 30, icon: "bike-fast", accent: "#22C55E", reason: "A focused ride will help you build a steady training rhythm." };

  return {
    intensity,
    intensityCopy: `${thisWeek.length} session${thisWeek.length === 1 ? "" : "s"} planned over the next seven days.`,
    coachMessage: totalMinutes ? `You have ${totalMinutes} minutes planned this week. Keep one day open for recovery.` : "Start with one manageable ride, then build your week around it.",
    recoveryMessage: totalMinutes >= 150 ? "Keep your next session easy and leave space between harder workouts." : "Add mobility or an easy ride after your next harder session.",
    recommendation,
    nextWorkout: upcoming[0] ?? null,
    totals: { thisWeekCount: thisWeek.length, totalMinutes, customCount: customWorkouts.length },
    priorities: [
      upcoming[0] ? `Prepare for ${upcoming[0].title}, your next planned session.` : "Add your next workout to the calendar.",
      "Balance harder sessions with easy recovery time.",
      "Review your plan at the end of the week and adjust if needed.",
    ],
  };
};
