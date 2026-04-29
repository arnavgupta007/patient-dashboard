const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";
const AUTH_HEADER = "Basic " + btoa("coalition:skills-test");

export async function fetchPatients() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: AUTH_HEADER,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export function findJessicaTaylor(patients) {
  return patients.find((p) => p.name === "Jessica Taylor");
}