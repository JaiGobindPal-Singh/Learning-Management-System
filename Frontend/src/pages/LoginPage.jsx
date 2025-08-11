import { useParams } from "react-router-dom"
function LoginPage() {
     // Extract userType from the URL parameters
     const {userType} = useParams();
     return (
          <div>
               <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{userType == "teacher"?"Teacher Login":userType == "admin"?"Administrator Login":"Student Login"}</h2>
                         <form className="space-y-6">
                              <div>
                                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{userType == "teacher"?"Teacher ID":userType == "admin"?"Admin ID":"Roll Number"}</label>
                                   <input
                                        type="Number"
                                        id="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={userType == "teacher"?"enter teacher ID":userType == "admin"?"enter admin ID":"enter roll number"}
                                        required
                                   />
                              </div>
                              <div>
                                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                   <input
                                        type="password"
                                        id="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                        required
                                   />
                              </div>
                              <div className="flex items-center justify-between">
                                   <div className="flex items-center">
                                        <input
                                             id="remember-me"
                                             type="checkbox"
                                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                             Remember me
                                        </label>
                                   </div>
                                   <a href="#" className="text-sm text-blue-600 hover:underline">
                                        Forgot password?
                                   </a>
                              </div>
                              <div>
                                   <button
                                        type="submit"
                                        className="w-full bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                   >
                                        Sign in
                                   </button>
                              </div>
                         </form>
                         <div className="mt-6 text-center">
                              <p className="text-sm text-gray-600">
                                   Don't have an account?{' '}
                                   <a href="#" className="font-medium text-blue-600 hover:underline">
                                        Sign up
                                   </a>
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default LoginPage
