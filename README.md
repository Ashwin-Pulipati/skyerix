<div align="center">
  <a href="https://github.com/Ashwin-Pulipati/skyrix">
    <img src="public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Skyerix</h3>

  <p align="center">
    A sleek, modern weather dashboard providing real-time weather information, forecasts, and a world map of your favorite cities.
    <br />
    <a href="https://skyerix.vercel.app/"><strong>View Demo »</strong></a>
  </p>
</div>

## 📝 About The Project

Skyrix is a beautifully designed weather application built with a modern tech stack. It allows users to get instantaneous, detailed weather updates for any city, track hourly and 5-day forecasts, and visualize their favorite locations on an interactive world map. With a clean, responsive UI and powerful data-fetching capabilities, Skyrix makes it easy to stay informed about the weather.



https://github.com/user-attachments/assets/b127ac56-d7b3-4357-858a-559eafc135c2



## ⚙️ Built With

This project is built with a modern tech stack that ensures a fast, responsive, and scalable application.

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
*   **UI:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Charting:** [Recharts](https://recharts.org/)
*   **Maps:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
*   **Deployment:** [Vercel](https://vercel.com/)

## ✅ Key Features

- **Real-time Weather:** Get up-to-date weather information for any city in the world.
- **City Search:** Quickly find weather information for any location.
- **Geolocation:** Automatically fetch weather for your current location.
- **Hourly & 5-Day Forecasts:** Plan ahead with detailed hourly and daily weather predictions.
- **Interactive World Map:** Pin and view your favorite cities on a beautiful world map.
- **Weather Details:** Access in-depth information like humidity, wind speed, visibility, and more.
- **Light & Dark Mode:** A comfortable viewing experience in any lighting condition.
- **Responsive Design:** A seamless experience on both desktop and mobile devices.

## 🏗️ System Architecture

<div align="center">
    <img src="https://github.com/user-attachments/assets/ba9b010d-dbbd-4cd2-b3d9-ca39daccfdb8" alt="Skyerix Weather Dashboard System Architecture Diagram" width="900">
</div>
<br />

Skyerix is built on a high-performance Next.js architecture designed for real-time data visualization and persistent user preferences. The system emphasizes a clean separation between server state, client state, and the data access layer.
1. Application Layer (Next.js & UI)
•	App Router Orchestration: Leverages the Next.js App Router for structured navigation and optimized layouts.
•	State-Linked Routing: Uses URL Search Parameters as the primary source of truth for location state. This allows for deep-linking and ensures that the UI remains in sync even after page refreshes or link sharing.
•	Modern UI primitives: Built using Tailwind CSS and shadcn/ui, featuring responsive data visualizations via Recharts and interactive mapping via Leaflet.js.
2. State & Logic Layer (The "Engine")
•	Server State Management: Powered by TanStack Query (React Query). This handles all asynchronous data lifecycle tasks, including background refetching, intelligent caching (stale-while-revalidate), and loading state management.
•	Custom Hooks Architecture: Logic is encapsulated within domain-specific hooks (useWeather, useFavorites, useGeolocation). This creates a clean, declarative API for the UI components to consume.
•	Client-Side Persistence: A custom useLocalStorage hook manages long-term persistence for user "Favorites" and "Search History," decoupled from the volatile weather data.
3. Data Access Layer (Abstraction)
•	WeatherAPI Class: All external interactions are abstracted into a singleton WeatherAPI class. This encapsulates the fetch logic, error handling, and URL construction, making the codebase resilient to future API changes.
•	Type-Safe Interfaces: Comprehensive TypeScript interfaces define the shape of the weather and forecast data, providing end-to-end type safety from the API response to the visual components.

## ▶️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Ashwin-Pulipati/skyrix.git
    cd skyrix
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up your environment variables:**
    Create a `.env.local` file in the root of your project and add your OpenWeather API key.
    ```env
    # OpenWeather API Key
    NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_API_KEY
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🚀 Usage

Skyrix is designed for simplicity and ease of use. Upon visiting the site, you can allow location access to get your local weather or use the search bar to find any city. The dashboard will display the current weather, hourly and daily forecasts, and other detailed metrics. You can add cities to your favorites to see them pinned on the world map for quick access.

## 🏆 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/nishanthpilli/">
        <img src="https://tinyurl.com/nishanth-profile" width="100px;" alt="Nishanth Pilli"/><br />
      </a>
      <span><b>Nishanth Pilli</b></span><br />
      <span>(Product Designer)</span><br />
      <a href="https://www.linkedin.com/in/nishanthpilli/">LinkedIn</a> | 
      <a href="https://www.nishanthpilli.com/">Portfolio</a>
    </td>
  </tr>
</table>

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

You can also report a bug or request a feature by opening an issue:
- [Report Bug](https://github.com/Ashwin-Pulipati/skyrix/issues)
- [Request Feature](https://github.com/Ashwin-Pulipati/skyrix/issues)


## 📄 License

Distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## 📧 Contact

Ashwin Pulipati - [LinkedIn](https://www.linkedin.com/in/ashwinpulipati/) - ashwinpulipati@gmail.com

Project Link: [https://github.com/Ashwin-Pulipati/skyrix](https://github.com/Ashwin-Pulipati/skyrix)
