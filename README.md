# Patient Interface

This is the main ToothFix website, which is a patient interface for the ToothFix system.
Main features of the website include:
- Registering and logging into the ToothFix system
- Booking appointments and seing available time slots
- Viewing and editing personal information
- Viewing the map of the clinics
- Checking the upcoming appointments

## Getting Started

To run the website, install all dependencies by navigating to the `patient-interface` folder and running:

```bash
npm install
```

Then, start the development server by running:

```bash
npm run dev
```

Navigating to [http://localhost:3000](http://localhost:3000) will open the website in a browser of your choice.

## Running Requirements
> Please note that the following parts of the ToothFix system have to be running in order for the website to work properly:
- [API Delegator](https://git.chalmers.se/courses/dit355/2023/student-teams/dit356-2023-06/api-delegator)
- Parts of [BANCs](https://git.chalmers.se/courses/dit355/2023/student-teams/dit356-2023-06/bancs):
  - Availability Service
  - Booking Service
  - Notification Service
  - Logging Service *(optional)*

## Technologies Used
- [Google Firebase/Firestore](https://firebase.google.com/) - used for authentication and storing user data
- [Next.js](https://nextjs.org/) - the framework used for building the website
  