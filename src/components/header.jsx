import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import NavSlider from "./navSlider";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    return (
        <>

            {isSliderOpen&& <NavSlider closeSlider={()=>{setIsSliderOpen(false)}}/>}

            <header className="bg-white w-full h-[80px] relative flex items-center justify-center shadow-md">



                <img src="/logo.png" className="cursor-pointer h-full rounded-full absolute left-[10px]" />
                <RxHamburgerMenu onClick={()=>{setIsSliderOpen(true)}} className="text-3xl absolute right-[10px] lg:hidden cursor-pointer text-accent" />
                <div className="h-full items-center w-[500px] justify-evenly hidden lg:flex">
                    <Link to="/" className="text-accent font-bold text-xl hover:border-b border-b-accent">
                        Home
                    </Link>
                    <Link to="/products" className="text-accent font-bold text-xl hover:border-b border-b-accent">
                        Products
                    </Link>
                    <Link to="/about" className="text-accent font-bold text-xl hover:border-b border-b-accent">
                        About Us
                    </Link>
                    <Link to="/contact" className="text-accent font-bold text-xl hover:border-b border-b-accent">
                        Contact Us
                    </Link>
                    <Link to="/cart" className="text-accent font-bold text-xl hover:border-b border-b-accent">
                        Cart
                    </Link>
                </div>
            </header>
        </>
    );
}