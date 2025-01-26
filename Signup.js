export default function Signup() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500">
        <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Mobile number</label>
              <input
                type="phone"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }