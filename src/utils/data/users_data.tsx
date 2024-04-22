import { TableProps } from "antd";

interface User {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  level: number;
}

export const usersColumns: TableProps<User>["columns"] = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Educational Level",
    dataIndex: "level",
    key: "level",
  },
];

export const usersData: User[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    location: "New York",
    level: 3,
  },
  {
    key: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    location: "London",
    level: 2,
  },
  {
    key: "3",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    location: "Paris",
    level: 1,
  },
  {
    key: "4",
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    location: "Berlin",
    level: 4,
  },
  {
    key: "5",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    location: "Tokyo",
    level: 2,
  },
  {
    key: "6",
    firstName: "Michael",
    lastName: "Davis",
    email: "michael.davis@example.com",
    location: "Sydney",
    level: 3,
  },
  {
    key: "7",
    firstName: "Olivia",
    lastName: "Miller",
    email: "olivia.miller@example.com",
    location: "Toronto",
    level: 1,
  },
  {
    key: "8",
    firstName: "William",
    lastName: "Wilson",
    email: "william.wilson@example.com",
    location: "Los Angeles",
    level: 4,
  },
  {
    key: "9",
    firstName: "Sophia",
    lastName: "Anderson",
    email: "sophia.anderson@example.com",
    location: "Melbourne",
    level: 2,
  },
  {
    key: "10",
    firstName: "James",
    lastName: "Taylor",
    email: "james.taylor@example.com",
    location: "Vancouver",
    level: 3,
  },
  {
    key: "11",
    firstName: "Ava",
    lastName: "Thomas",
    email: "ava.thomas@example.com",
    location: "Madrid",
    level: 1,
  },
  {
    key: "12",
    firstName: "Liam",
    lastName: "Robinson",
    email: "liam.robinson@example.com",
    location: "Rome",
    level: 4,
  },
  {
    key: "13",
    firstName: "Isabella",
    lastName: "Clark",
    email: "isabella.clark@example.com",
    location: "Seoul",
    level: 2,
  },
  {
    key: "14",
    firstName: "Benjamin",
    lastName: "Walker",
    email: "benjamin.walker@example.com",
    location: "Moscow",
    level: 3,
  },
  {
    key: "15",
    firstName: "Mia",
    lastName: "Hall",
    email: "mia.hall@example.com",
    location: "Beijing",
    level: 1,
  },
  {
    key: "16",
    firstName: "Henry",
    lastName: "Young",
    email: "henry.young@example.com",
    location: "Stockholm",
    level: 4,
  },
  {
    key: "17",
    firstName: "Charlotte",
    lastName: "Harris",
    email: "charlotte.harris@example.com",
    location: "Copenhagen",
    level: 2,
  },
  {
    key: "18",
    firstName: "Alexander",
    lastName: "Lewis",
    email: "alexander.lewis@example.com",
    location: "Helsinki",
    level: 3,
  },
  {
    key: "19",
    firstName: "Amelia",
    lastName: "King",
    email: "amelia.king@example.com",
    location: "Dublin",
    level: 1,
  },
  {
    key: "20",
    firstName: "Daniel",
    lastName: "Baker",
    email: "daniel.baker@example.com",
    location: "Vienna",
    level: 4,
  },
  // Add more user objects as needed
];
