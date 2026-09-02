import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorPage from './components/Error.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'

const DashBoard = lazy(() => import("./components/DashBoard.jsx"));
const Appointments = lazy(() => import("./components/Appointments.jsx"));
const Doctors = lazy(() => import("./components/Doctors.jsx"));
const Patients = lazy(() => import("./components/Patients.jsx"));
const Invoices = lazy(() => import("./components/Invoices.jsx"));
const Prescription = lazy(() => import("./components/Prescriptions.jsx"));
const Settings = lazy(() => import("./components/Settings.jsx"));
const PatientProfile = lazy(() => import("./components/PatientProfile.jsx"));
const DoctorProfile = lazy(() => import("./components/DoctorProfile.jsx"));
const AppointmentView = lazy(() =>  import("./components/AppointView.jsx"));
const Appointment = lazy(() => import("./components/Appointments.jsx"));
const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children:[
        {
          path:"/",
          element: <Suspense fallback={<div>Loading</div>}><DashBoard/></Suspense>
        },
        {
          path:"/doctors",
          element: <Suspense fallback={<div>Loading</div>}><Doctors/></Suspense>
        },
        {
          path:"/appointments",
          element: <Suspense fallback={<div>Loading</div>}><Appointments/></Suspense>
        },
        {
          path:"/patients",
          element: <Suspense fallback={<div>Loading</div>}><Patients/></Suspense>
        },
        {
          path:"/prescriptions",
          element: <Suspense fallback={<div>Loading</div>}><Prescription/></Suspense>
        },
        {
          path:"/settings",
          element: <Suspense fallback={<div>Loading</div>}><Settings/></Suspense>
        },
        {
          path:"/invoices",
          element: <Suspense fallback={<div>Loading</div>}><Invoices/></Suspense>
        },
        {
          path:"/patients/:id",
          element: <Suspense fallback={<div>Loading</div>}><PatientProfile/></Suspense>
        },
        {
          path:"/doctors/:id",
          element: <Suspense fallback={<div>Loading</div>}><DoctorProfile/></Suspense>
        },
        {
          path:"/appointments/:id",
          element: <Suspense fallback={<div>Loading</div>}><AppointmentView/></Suspense>
        }
      ],
      errorElement: <ErrorPage/>
    }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)

