# Humeka

Humeka is a mental health application that provides support groups, session bookings with mental health professionals, journaling, and other features to help users improve their mental well-being.

## Project Overview
Humeka consists of:
- A **backend** (Node.js, Express, PostgreSQL) handling APIs and authentication.
- A **website** (React, Next.js)
- A **mobile app** (React Native with Expo) for mobile users.

---

## Demo and Deployed Links
- **Deployed Backend:** [https://humeka-be.onrender.com](https://humeka-be.onrender.com)
- **Deployed Website:** [https://humeka.vercel.app](https://humeka.vercel.app)
- **Mobile APK:** Available in the repository folder.
- **Demo Video:** [https://www.youtube.com/watch?v=dHLBdQcJHG0](https://www.youtube.com/watch?v=dHLBdQcJHG0)

---

## Getting Started
To set up and run the project locally, follow these steps in order:

### Backend Setup
1. **Navigate to the Backend Repository:**
   ```sh
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the project root and configure the necessary environment variables:
   ```sh
    DB_NAME=postgres
    DB_PORT=5432
    DB_PASSWORD=IieOb68PHkJWofkG
    JWT_SECRET=vfed9vhn93458nv934r8nivn
    DEFAULT_IMG=https://res.cloudinary.com/ditrc0kph/image/upload/v1734082056/xf64p1ufccrtqqhhz3bh.png
    APP_URL=http://localhost:3000
    DB_HOST=aws-0-eu-central-1.pooler.supabase.com
    DB_USERNAME=postgres.wlstwddbggwnubncptqq
   ```

4. **Run the backend:**
   ```sh
   npm run dev
   ```
   The backend will now be available at `http://localhost:3000`.

---

### Mobile App Setup
1. **Navigate into the Mobile Repository:**
   ```sh
   cd mobile
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Get Your IP Address:**
   - Run the following command to find your local IP address:
     ```sh
     ipconfig (Windows) or ifconfig (Mac/Linux)
     ```
   - Copy the IP address and replace `your-ip-address` in the `.env` file.

4. **Create a `.env` file** in the project root and configure the base URL:
   ```sh
   EXPO_PUBLIC_BASE_URL=http://your-ip-address:3000/api
   EXPO_PUBLIC_URL=http://your-ip-address:3000
   EXPO_PUBLIC_DEFAULT_PROFILE_IMAGE=https://res.cloudinary.com/dwvfkpxu9/image/upload/v1740585371/boy_lhrvrl.png
   EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=image_upload
   EXPO_PUBLIC_CLOUDINARY_NAME=dwvfkpxu9
   ```

5. **Run the mobile app:**
   ```sh
   npm start
   ```

5. **Run on Physical Device:**
   - Install **Expo Go** on your Android or iOS device.
   - Scan the QR code displayed in the terminal to launch the app.

6. **Run on an Android Emulator:**
   - Install **Android Studio** and create an emulator.
   - Start the emulator.
   - In the Expo CLI terminal, press `'a'` to open the app inside the emulator.

---

### Website Setup
1. **Navigate into the website repository:**
   ```sh
   cd website
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the frontend:**
   ```sh
   npm run dev
   ```
   The frontend will now be available at `http://localhost:3001` (or another port if specified).

---

## Troubleshooting
- **Backend not running?** Ensure environment variables are correctly set and retry.
- **Frontend API requests failing?** Ensure your `EXPO_PUBLIC_BASE_URL` is correctly pointing to the backend.
- **Mobile app network issues?** Ensure your phone and development machine are on the same Wi-Fi network.
- **Expo not detecting your device?** Try restarting Expo and ensuring your device has Expo Go installed.

---

## Additional Resources
- [Expo Documentation](https://docs.expo.dev/)
- [Node.js Documentation](https://nodejs.org/)
- [Next.js Documentation](https://nextjs.org/)
- [Express Documentation](https://expressjs.com/)

---

This guide provides a step-by-step approach to setting up and running the **Humeka** project. If you encounter issues, feel free to check the respective documentation or reach out to the maintainers. 🚀