import CreateEmployee from "../pages/employee/create";
import AllEmployee from "../pages/employee/AllEmployee";
import AllStudents from "../pages/students/AllStudents";
import RoomManagement from "../pages/Setting/RoomManagement";
import FoodPlanner from "../pages/Setting/FoodPlanner";
import FoodBook from "../pages/foodbook/FoodBook";
import Take_Attendence from "../pages/Attendence-Management/Take_Attendence";
import AllPlanner from "../pages/Setting/AllPlanner";
import AllRoom from "../pages/Setting/AllRoom";
import AttendenceReport from "../pages/Attendence-Management/AttendenceReport";
import Dashboard from "../pages/Dashboard";
import StudentDashboard from "../student_pages/dashboard/StudentDashboard";
import MyProfile from "../student_pages/profile/MyProfile";
import Complaints from "../student_pages/complaints/Complaints";
import ComplaintsReport from "../student_pages/complaints/ComplaintsReport";
import FoodCalendar from "../student_pages/foodcalendar/FoodCalendar";
import StudentFoodBook from "../student_pages/foodbook/StudentFoodBook";
import Purchases from "../pages/Stock-Management/Purchases";
import AllPurchases from "../pages/Stock-Management/AllPurchases";
import HouseKeeping from "../pages/Employee_Dashboard/Attendance";
import Attendence from "../pages/Employee_Dashboard/Attendance";
import Complaint from "../pages/Employee_Dashboard/Complaint";
import AllOuting from "../pages/Employee_Dashboard/AllOuting";
import ComplainAction from "../pages/Employee_Dashboard/ComplainAction";
import CreateComplain from "../pages/Complain/CreateComplain";
import ViewComplain from "../pages/Complain/ViewComplain";
import OutingForm from "../student_pages/OutingApproval/OutingForm";
import ComplaintStatus from "../pages/Complain/ComplaintStatus";
import DayToDayOrder from "../pages/purchase-order/DayToDayOrder";
import PurchaseReport from "../pages/purchase-order/PurchaseReport";
import NewPatient from "../student_pages/healthmanagement/NewPatient";
import AllPatient from "../student_pages/healthmanagement/AllPatient";
import WardenDashboard from "../wardenPages/dashboard";
import MyOutings from "../student_pages/OutingApproval/MyOutings";
import FoodBookEntry from "../wardenPages/foodbook/entry";
import MonthlyAttendanceReport from "../pages/Attendence-Management/MonthlyAttendenceReport";
import HostelConfig from "../pages/Setting/HostelConfig";
import UpdateEmployee from "../pages/employee/UpdateEmployee";
import Config from "../pages/Setting/Hostel-Config/Config";
import EditRoom from "../pages/Setting/Hostel-Config/EditRoom";
import CreateFine from "../pages/Fines/CreateFine";

export const routes = [
  { path: `/dashboard`, Component: <Dashboard /> },
  //Food Book routes
  { path: `/food-book`, Component: <FoodBookEntry /> },
  { path: `/today-Booking`, Component: <FoodBook /> },

  //Attendence management
  { path: `/take-attendence`, Component: <Take_Attendence /> },
  { path: `/attendencereport`, Component: <AttendenceReport /> },
  { path: `/monthlyattendencereport`, Component: <MonthlyAttendanceReport /> },

  //Food planner routes
  { path: `/food-planner`, Component: <FoodPlanner /> },
  { path: `/allplanner`, Component: <AllPlanner /> },

  //Purchase Order routes
  { path: `/day-to-day-order`, Component: <DayToDayOrder /> },
  { path: `/purchase-report`, Component: <PurchaseReport /> },

  //employee Management routes
  { path: `/create-employee`, Component: <CreateEmployee /> },
  { path: `/allemployee`, Component: <AllEmployee /> },
  { path: `/all-student`, Component: <AllStudents /> },
  { path: `/complaint/complain-action/:id`, Component: <ComplainAction /> },
  { path: `/edit/:id`, Component: <UpdateEmployee /> },

  //ROOM MANAGEMENT
  { path: `/room-management`, Component: <RoomManagement /> },
  { path: `/allroom`, Component: <AllRoom /> },
{ path: `/editroom/:id`, Component: <EditRoom /> },
  //Compain Management
  { path: `/create-complain`, Component: <CreateComplain /> },
  { path: `/view-complain`, Component: <ViewComplain /> },
  {
    path: `/view-complain/complain-status/:id`,
    Component: <ComplaintStatus />,
  },

  //My Profile routes
  { path: `/my-profile`, Component: <MyProfile /> },

  //Health Management routes
  { path: `/new-patient`, Component: <NewPatient /> },
  { path: `/all-patient`, Component: <AllPatient /> },

  //Hostel Config
  { path: `/hostel-config`, Component: <HostelConfig /> },
  { path: `/config`, Component: <Config /> },

  // Stock Item Management
  { path: `/item-purchases`, Component: <Purchases /> },
  { path: `/all-item-purchases`, Component: <AllPurchases /> },

  //Employee Dashboard
  { path: `/complaint`, Component: <Complaint /> },
  { path: `/attendence`, Component: <Attendence /> },
  { path: "/house_keeping", Component: <HouseKeeping /> },

  {path: "/create-fine", Component: <CreateFine/>},

  //employee Management routes ends
];

export const Wardenroutes = [
  {
    path: `/dashboard`,
    Component: <WardenDashboard />,
  },
  { path: "/all-outing", Component: <AllOuting /> },

  { path: `/food-book`, Component: <FoodBookEntry /> },
  { path: `/today-Booking`, Component: <FoodBook /> },

  //My Profile routes
  { path: `/my-profile`, Component: <MyProfile /> },

  //Health Management routes
  { path: `/new-patient`, Component: <NewPatient /> },
  { path: `/all-patient`, Component: <AllPatient /> },

  //Attendence management
  { path: `/take-attendence`, Component: <Take_Attendence /> },
  { path: `/attendencereport`, Component: <AttendenceReport /> },
  { path: `/monthlyattendencereport`, Component: <MonthlyAttendanceReport /> },
];

export const studentRoutes = [
  { path: `/dashboard`, Component: <StudentDashboard /> },

  //My Profile routes
  { path: `/my-profile`, Component: <MyProfile /> },

  //Health Management routes
  { path: `/new-patient`, Component: <NewPatient /> },
  { path: `/all-patient`, Component: <AllPatient /> },

  //Food Book routes
  { path: `/student-foodbook`, Component: <StudentFoodBook /> },

  //  //Complaints routes
  { path: `/complaints`, Component: <Complaints /> },
  { path: `/complaints-report`, Component: <ComplaintsReport /> },

  //   //Food Calender routes
  { path: `/food-calendar`, Component: <FoodCalendar /> },

  //outing approval
  { path: `/create-request`, Component: <OutingForm /> },
  { path: `/my-outings`, Component: <MyOutings /> },
  // { path: `/all-request`, Component: < /> },
];
