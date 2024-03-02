/**
 * Main component of the App
 */
const App = () => {

  return (
    <div className="heading">
      <div className="flex h-screen">
            {/* Slider Container */}
            <div className="slider-container bg-gray-700 w-1/4">
                {/* Slider */}
                <div className="slider h-full flex flex-col justify-around">
                    <div className="slide bg-blue-500 flex justify-center items-center">
                        <h2 className="text-2xl font-bold text-white">Page 1</h2>
                    </div>
                    <div className="slide bg-green-500 flex justify-center items-center">
                        <h2 className="text-2xl font-bold text-white">Page 2</h2>
                    </div>
                    <div className="slide bg-yellow-500 flex justify-center items-center">
                        <h2 className="text-2xl font-bold text-white">Page 3</h2>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="bg-white p-8 rounded shadow-md w-3/4">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                        <input type="text" id="username" name="username" className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input type="password" id="password" name="password" className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                </form>
            </div>
        </div>
    </div>
  )
};

export default App;
