import prop1 from '../assets/images/img1.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="w-screen h-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[1280px] h-full p-4 flex flex-col items-center justify-center">
            <div className="w-full h-max flex flex-col-reverse md:flex-row items-center">
                <div className="w-full max-w-[30rem] mt-20 md:mt-0 md:mr-8 lg:mr-20 flex flex-col items-center md:items-start">
                    <h1 className="font-bold text-lg md:text-2xl mb-2">Learn with Project X</h1>
                    <p className="text-base text-center md:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corrupti in ducimus facilis quod nobis vitae quia harum. Necessitatibus quasi accusamus, facilis illum ratione sapiente, similique nostrum suscipit molestiae eaque obcaecati laborum!</p>
                    <Link to="/users/login" className="self-center bg-blue-500 text-white p-3 rounded-md w-full max-w-[15rem] mt-6 cursor-pointer flex items-center justify-center">
                        <button className="outline-none">Get Started</button>
                    </Link>
                </div>
                <div className="hero-img relative">
                    <div className="blob-img-wrapper overflow-hidden">
                        <img src={prop1} alt="banner image" className="w-full h-full" />
                    </div>
                    <div className="blob-shadow absolute left-0 -bottom-[20%] h-full -z-[1]"></div>
                </div>
            </div>
        </div>
    </div>
  )
}
