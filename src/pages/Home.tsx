function Home() {

    return (
        <>
            <div>
                <div className="flex justify-around items-center bg-slate-500 px6 w-full h-11">
                    <div>
                        <span className="font-bold text-2xl">Auction</span>
                    </div>
                    <ul className="flex">
                        <li className="mx-3"><a className="cursor-pointer font-semibold">Home</a></li>
                        <li className="mx-3"><a className="cursor-pointer font-semibold">Search</a></li>
                        <li className="mx-3"><a className="cursor-pointer font-semibold">Premium</a></li>
                        <li className="mx-3"><a className="cursor-pointer font-semibold">About Us</a></li>
                        <li className="mx-3"><a className="cursor-pointer font-semibold">Contact</a></li>
                    </ul>
                    <div>
                        <button className="mx-3 cursor-pointer px-6 py-2 font-semibold bg-red-600">Login</button>
                        <button className="mx-3 cursor-pointer px-6 py-2 font-semibold bg-blue-600">Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home