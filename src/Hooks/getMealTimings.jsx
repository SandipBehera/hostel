function getMealTimings(schedule, day) {
  const daySchedule = schedule[day];

  if (!daySchedule) {
    console.error(`No schedule found for ${day}`);
    return null;
  }

  const breakfastStart = new Date();
  breakfastStart.setHours(
    parseInt(daySchedule["Breakfast"]["From"].split(":")[0]),
    parseInt(daySchedule["Breakfast"]["From"].split(":")[1]),
    0
  );

  const breakfastEnd = new Date();
  breakfastEnd.setHours(
    parseInt(daySchedule["Breakfast"]["To"].split(":")[0]),
    parseInt(daySchedule["Breakfast"]["To"].split(":")[1]),
    0
  );

  const lunchStart = new Date();
  lunchStart.setHours(
    parseInt(daySchedule["Lunch"]["From"].split(":")[0]),
    parseInt(daySchedule["Lunch"]["From"].split(":")[1]),
    0
  );

  const lunchEnd = new Date();
  lunchEnd.setHours(
    parseInt(daySchedule["Lunch"]["To"].split(":")[0]),
    parseInt(daySchedule["Lunch"]["To"].split(":")[1]),
    0
  );

  const dinnerStart = new Date();
  dinnerStart.setHours(
    parseInt(daySchedule["Dinner"]["From"].split(":")[0]),
    parseInt(daySchedule["Dinner"]["From"].split(":")[1]),
    0
  );

  const dinnerEnd = new Date();
  dinnerEnd.setHours(
    parseInt(daySchedule["Dinner"]["To"].split(":")[0]),
    parseInt(daySchedule["Dinner"]["To"].split(":")[1]),
    0
  );

  return {
    breakfastStart,
    breakfastEnd,
    lunchStart,
    lunchEnd,
    dinnerStart,
    dinnerEnd,
  };
}

function getMealType(currentTime) {
  const breakfastStart = new Date();
  breakfastStart.setHours(6, 0, 0); // Set breakfast start time (6 am)
  const breakfastEnd = new Date();
  breakfastEnd.setHours(10, 0, 0); // Set breakfast end time (10 am)

  const lunchStart = new Date();
  lunchStart.setHours(12, 0, 0); // Set lunch start time (12 pm)
  const lunchEnd = new Date();
  lunchEnd.setHours(15, 0, 0); // Set lunch end time (3 pm)

  const dinnerStart = new Date();
  dinnerStart.setHours(18, 0, 0); // Set dinner start time (6 pm)
  const dinnerEnd = new Date();
  dinnerEnd.setHours(22, 0, 0); // Set dinner end time (10 pm)

  if (currentTime >= breakfastStart && currentTime <= breakfastEnd) {
    return "Breakfast";
  } else if (currentTime >= lunchStart && currentTime <= lunchEnd) {
    return "Lunch";
  } else if (currentTime >= dinnerStart && currentTime <= dinnerEnd) {
    return "Dinner";
  } else {
    return "No meal";
  }
}
export { getMealTimings, getMealType };
