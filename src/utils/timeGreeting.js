/**
 * Generates a time-appropriate greeting based on the current local time.
 * @param {string} name - The user's name
 * @param {'student' | 'teacher'} role - The user's role
 * @returns {{ greeting: string, message: string, timeOfDay: string }}
 */
export function getTimeGreeting(name = 'Scholar', role = 'student') {
  const now = new Date();
  const hour = now.getHours();
  
  let greeting = '';
  let timeOfDay = '';
  
  if (hour < 12) {
    greeting = `Good morning, ${name}`;
    timeOfDay = 'morning';
  } else if (hour < 17) {
    greeting = `Good afternoon, ${name}`;
    timeOfDay = 'afternoon';
  } else {
    greeting = `Good evening, ${name}`;
    timeOfDay = 'evening';
  }
  
  let message = '';
  if (role === 'student') {
    const studentMessages = {
      morning: 'Ready to conquer your study goals and build momentum today?',
      afternoon: 'Keep up the focused revision and make steady academic progress.',
      evening: 'Wrap up your daily revision tasks and review your key concepts tonight.'
    };
    message = studentMessages[timeOfDay];
  } else {
    const teacherMessages = {
      morning: 'Inspiring minds and structuring effective academic modules today.',
      afternoon: 'Managing coursework and empowering students with insightful learning materials.',
      evening: 'Reviewing curriculum milestones and guiding academic excellence.'
    };
    message = teacherMessages[timeOfDay];
  }
  
  return { greeting, message, timeOfDay };
}

/**
 * Format seconds into HH:MM:SS or MM:SS
 */
export function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
