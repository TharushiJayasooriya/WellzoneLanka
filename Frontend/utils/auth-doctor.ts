import axios from "axios";

interface LoginDoctorRequest {
    email: string;
    password: string;
}

interface LoginDoctorResponse {
    token: string; // Assuming the response contains a token
}

// Function to login a doctor
export async function loginDoctor(email: string, password: string): Promise<LoginDoctorResponse | null> {
    try {
        // Send POST request to the backend API
        const response = await axios.post<LoginDoctorResponse>("http://localhost:5000/api/doctors/login", {
            email,
            password,
        } as LoginDoctorRequest);

        // Return the response data (token) if successful
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Server responded with an error
            console.error("Login failed:", error.response?.data);
        } else if (error.request) {
            // No response from the server
            console.error("No response received from server:", error.request);
        } else {
            // Issue with setting up the request
            console.error("Error setting up the request:", error.message);
        }
        return null; // Return null if there is an error
    }
}
