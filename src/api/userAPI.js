import axios from "axios";

var time = [
  "9AM",
  "9:30AM",
  "10AM",
  "10:30AM",
  "11AM",
  "11:30AM",
  "12AM",
  "12:30AM",
  "1PM",
  "1:30PM",
  "2PM",
  "2:30PM",
  "3PM",
  "3:30PM",
  "4PM",
  "4:30PM",
  "5PM",
  "5:30PM",
  "6PM",
  "6:30PM",
  "7PM",
  "7:30Pm",
];

export const fetchAllData = async () => {
  const result = await axios.get(
    "https://reqres.in/api/users?page=1&per_page=5"
  );
  let userData = result.data.data;
  for (let i = 0; i < userData.length; i++) {
    let tempAttendanceData = [];
    for (let j = 0; j < time.length; j++) {
      tempAttendanceData.push({
        name: userData[i].first_name + " " + userData[i].last_name,
        time: time[j],
        value: Math.floor(Math.random() * 100),
      });
    }
    userData[i].attendanceData = tempAttendanceData;
  }
  return { data: userData };
};
