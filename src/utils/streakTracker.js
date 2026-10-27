/**
 * Study Streak Tracker utility using localStorage.
 * Implements real consecutive-day tracking with clear deterministic logic.
 */

const STREAK_COUNT_KEY = 'acaderix_streak_count';
const LAST_STUDY_DATE_KEY = 'acaderix_last_study_date';
const TOTAL_STUDY_TIME_KEY = 'acaderix_total_study_seconds';
const STUDY_LOGS_KEY = 'acaderix_study_logs';

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns yesterday's date formatted as YYYY-MM-DD in local time
 */
export function getYesterdayDateString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Read current streak data from localStorage
 */
export function getStreakData() {
  const count = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || '1', 10);
  const lastDate = localStorage.getItem(LAST_STUDY_DATE_KEY) || null;
  const totalSeconds = parseInt(localStorage.getItem(TOTAL_STUDY_TIME_KEY) || '1800', 10);
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  let isStreakActive = false;
  let statusMessage = '';

  if (!lastDate) {
    statusMessage = 'Welcome! Complete your first study session today to establish your day 1 streak.';
    isStreakActive = true;
  } else if (lastDate === today) {
    statusMessage = `You've already studied today (${today})! Your ${count}-day streak is secured.`;
    isStreakActive = true;
  } else if (lastDate === yesterday) {
    statusMessage = `You studied yesterday (${yesterday}). Study today to extend your streak to ${count + 1} days!`;
    isStreakActive = true;
  } else {
    statusMessage = `Last study activity was on ${lastDate}. Your consecutive streak has reset. Study today to start fresh at 1 day.`;
    isStreakActive = false;
  }

  return {
    streakCount: count,
    lastStudyDate: lastDate,
    totalSeconds,
    today,
    yesterday,
    isStreakActive,
    statusMessage
  };
}

/**
 * Records a study session, updates total time, and updates streak
 * @param {number} durationSeconds - Seconds spent studying
 */
export function recordStudySession(durationSeconds) {
  if (durationSeconds <= 0) return getStreakData();

  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  const currentLastDate = localStorage.getItem(LAST_STUDY_DATE_KEY);
  let currentCount = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || '0', 10);

  // Update streak count based on last study date
  if (currentLastDate === today) {
    // Already studied today; streak count remains the same
    if (currentCount === 0) currentCount = 1;
  } else if (currentLastDate === yesterday) {
    // Studied yesterday, consecutive day achieved!
    currentCount += 1;
  } else {
    // Gap longer than 1 day or first time
    currentCount = 1;
  }

  // Update total seconds
  const currentTotal = parseInt(localStorage.getItem(TOTAL_STUDY_TIME_KEY) || '0', 10);
  const newTotal = currentTotal + durationSeconds;

  // Append to session logs
  let logs = [];
  try {
    logs = JSON.parse(localStorage.getItem(STUDY_LOGS_KEY) || '[]');
  } catch {
    logs = [];
  }
  logs.unshift({
    id: Date.now().toString(),
    date: today,
    durationSeconds,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  // Keep last 15 logs
  if (logs.length > 15) logs = logs.slice(0, 15);

  localStorage.setItem(STREAK_COUNT_KEY, currentCount.toString());
  localStorage.setItem(LAST_STUDY_DATE_KEY, today);
  localStorage.setItem(TOTAL_STUDY_TIME_KEY, newTotal.toString());
  localStorage.setItem(STUDY_LOGS_KEY, JSON.stringify(logs));

  return getStreakData();
}

/**
 * Get recent study logs
 */
export function getStudyLogs() {
  try {
    return JSON.parse(localStorage.getItem(STUDY_LOGS_KEY) || '[]');
  } catch {
    return [];
  }
}
