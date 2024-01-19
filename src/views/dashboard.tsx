import { useContext} from 'react'
import { userContext } from '../context/userContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { user } = useContext(userContext);

    return (
        <div className="w-screen h-full min-h-screen flex items-center justify-center">
            <div className="w-full max-w-[1280px] h-full p-4 flex flex-col items-center justify-center">
                <div className="flex h-max w-full max-w-[500px] mb-5 flex-col items-center rounded-lg bg-white">
                    <h3 className="text-xl md:text-3xl text-blue-500 font-bold mt-2 mb-5">
                        Hoorayyy!! 🎉🎉
                    </h3>
                    <p className="text-base text-center text-slate-700 mb-4">
                        You finally made it to your { user?.role } dashboard. You're all set to get started with whatever you were hoping to do here. Below is your profile information.
                    </p>
                </div>
                <div className="w-full max-w-[700px] p-3 md:p-5 mx-auto bg-white border-2 border-slate-300 rounded-sm">
                    {/* <h1 className="text-xl mb-6">User Profile</h1> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center">
                            <label className="block text-sm font-semibold mr-2">
                                User Name:
                            </label>
                            <p className="text-sm md:text-base">{user?.username}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block text-sm font-semibold mr-2">
                                Email:
                            </label>
                            <p className="text-sm md:text-base">{user?.email}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block text-sm font-semibold mr-2">
                                Status:
                            </label>
                            <p className="text-sm md:text-base">{
                                user && user.isVerified ? 'Verified' : 'Unverified'
                            }</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block text-sm font-semibold mr-2">
                                Account Creation Date:
                            </label>
                            <p className="text-sm md:text-base">{
                                new Date(user?.createdAt as string).toISOString().split('.')[0].replace('T', ' ')
                            }</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block text-sm font-semibold mr-2">
                                Registration Method:
                            </label>
                            <p className="text-sm md:text-base">{
                                user && user.googleId ? 'Google' : 'Email'
                            }</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block text-sm font-semibold mr-2">
                                Role:
                            </label>
                            <p className="text-sm md:text-base">{user?.role}</p>
                        </div>
                    </div>
                </div>
                {
                    user && ['admin', 'company'].includes(user.role) && (
                        <Link to={`/users/protected/manage`}
                            className="self-center bg-blue-500 text-white p-3 rounded-md w-full max-w-[15rem] mt-6 cursor-pointer flex items-center justify-center"
                        >
                            <button className="outline-none">Manage users</button>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}
