import axios from "axios";

export async function fetchDoctors() {
    try {
        // Check if localStorage is available (for SSR safety)
        if (typeof window === "undefined") {
            console.error("⛔ LocalStorage is not available in this environment.");
            return [];
        }

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("🚫 No authentication token found.");
            return [];
        }

        console.log("🔍 Fetching doctors with token:", token);

        const response = await axios.get("http://localhost:5000/api/doctors", {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000, // Prevents requests hanging forever
        });

        console.log("✅ Doctors fetched successfully:", response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error(`⚠️ Error ${error.response.status}:`, error.response.data);
                
                if (error.response.status === 401) {
                    console.warn("⚠️ Unauthorized access. Redirecting to login...");
                    window.location.href = "/login"; // Redirect user to login page
                }
            } else if (error.request) {
                console.error("⏳ No response received from server:", error.request);
            } else {
                console.error("⚙️ Request setup error:", error.message);
            }
        } else {
            console.error("Unexpected error:", error);
        }

        return [];
    }
}
