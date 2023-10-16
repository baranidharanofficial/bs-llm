"use client"

import Image from 'next/image';
import { useState } from 'react';
import { MdSend, MdMenu, MdClose } from 'react-icons/md';

export default function Home() {

    const [sideNav, showSideNav] = useState(false);
    const [country, setCountry] = useState("IND");
    const [query, setQuery] = useState("");

    return (
        <main className="overflow-hidden flex h-screen w-screen flex-col items-center bg-gray-50 text-black">
            <div className={sideNav ? "w-[250px] z-10 slide-in absolute right-0 top-0 h-screen bg-[#143F8D] shadow-2xl p-4 hidden flex-col justify-between nav-slide max-sm:flex" : "w-[250px] z-10 absolute right-0 top-0 h-screen bg-[#143F8D] shadow-2xl p-4 hidden flex-col justify-between nav-slide2"}>
                <div>
                    <div className='flex items-center justify-between w-full mb-10'>
                        <Image alt='BuildSuite Logo' src={"/logo2.png"} width={40} height={40} className=' h-[25px] w-auto' />
                        <MdClose onClick={() => showSideNav(false)} className="text-[24px] text-white"></MdClose>
                    </div>

                    <p className="text-white font-bold cursor-pointer ml-2 my-4">BUY CREDITS</p>
                    <p className="text-white font-bold cursor-pointer ml-2 my-4">WHAT IS BUILDSUITE</p>
                    <p className="text-white font-bold cursor-pointer ml-2 my-4">CONTACT US</p>
                    <p className="text-white font-bold cursor-pointer ml-2 my-4">SIGN OUT</p>
                </div>
                <div className="cursor-pointer w-full py-2 text-center rounded-md shadow-sm outline-none bg-[#37AD4A] text-white text-[14px]">
                    3/5 Credits Remaining
                </div>
            </div>

            <div className="w-[1200px] max-xl:w-[1000px] max-lg:w-full max-lg:px-[3vw] mx-0 h-screen flex flex-col justify-start overflow-hidden">

                <nav className="w-full h-[10vh] flex items-center justify-between max-sm:h-[7vh]">
                    <Image alt='BuildSuite Logo' src={"/logo3.png"} width={40} height={40} className=' h-[5vh] w-auto' />

                    <div className='max-sm:flex items-center justify-end hidden'>
                        <p className='mr-4 bg-[#37AD4A] text-white text-[12px] rounded-full px-3 py-1'>0/10 Credits</p>
                        <MdMenu onClick={() => showSideNav(true)} className="max-sm:block text-[28px] text-slate-800 hidden" ></MdMenu>
                    </div>


                    <div className="flex items-center max-sm:hidden">
                        <div className="cursor-pointer px-5 py-2 rounded-md shadow-sm outline-none border-[1px] border-[#53D878] text-[#53D878] text-[14px] hover:bg-[#53D878] hover:text-white mr-8">
                            3/5 Credits Remaining
                        </div>
                        <p className="mr-8 text-[#53D878] cursor-pointer">Purchase Credits</p>
                        <p className="cursor-pointer">Sign out</p>
                    </div>
                </nav>

                <div className="h-[85vh] max-sm:h-[93vh] flex flex-col">

                    <div className='flex flex-col h-[calc(93vh-140px)] justify-evenly overflow-auto'>
                        <div>
                            <p className='text-[#143F8D] font-medium text-[24px] mb-6'>Hello, I'm PARK</p>
                            <p className='text-[#143F8D] text-[18px] mb-20'>Your AI buddy for answering questions about construction rules in India and the UAE.</p>
                        </div>


                        <div>
                            <p className='text-[14px] mb-2'>Sample Questions</p>
                            <div className='bg-[#DCF3E0]'>
                                <p className='text-[16px] text-[#248233] p-5'>Explain the construction waste disposal regulations in the UAE.</p>
                            </div>
                        </div>

                    </div>

                    <div className='h-[140px] text-[#868686] font-bold'></div>
                </div>


                <div className=' bg-[#143F8D] absolute bottom-0 left-0 w-screen p-3'>
                    <div className='bg-[#30569C] rounded-md w-full py-2 pl-4 pr-2 flex items-center justify-between mb-2'>
                        <textarea rows={1} placeholder="Ask your question here." className="text-white border-none outline-none w-[85%] bg-transparent text-[16px]" />

                        <button className='bg-[#37AD4A] rounded-sm'>
                            <Image src="/send.svg" alt='Send Image' width={20} height={20} className=' p-2 h-[35px] w-[35px]' />
                        </button>
                    </div>

                    <p className='text-[#D6D6D6] text-[12px] font-medium text-center'>Currently in beta testing. Your feedback is invaluable for enhancing our service. Please report errors or share suggestions.</p>

                </div>

            </div>

        </main>
    )
}



{/* <div className="w-[40%] h-full max-lg:h-[10%] max-lg:w-full max-lg:flex-row flex flex-col shadow-md rounded-sm bg-white border-[1px] border-gray-300 p-8 max-lg:p-2">

                        <p className=" max-lg:hidden">Select Country</p>

                        <div className="flex items-center mb-4 max-lg:hidden">
                            <button className={country == "IND" ? "flex items-center rounded-sm bg-[#53D878] text-white px-6 py-2 my-3 mr-3" : "flex items-center rounded-sm border-[1px] border-gray-400 hover:border-[#53D878] text-[#182139] px-6 py-2 my-3 mr-3"} onClick={() => setCountry("IND")}>
                                <Image alt='BuildSuite Logo' src={"/ind-flag.jpg"} width={25} height={20} />
                                <p className='ml-3'>India</p>
                            </button>
                            <button className={country == "UAE" ? "flex items-center rounded-sm bg-[#53D878] text-white px-6 py-2 my-3 mr-3" : "flex items-center rounded-sm border-[1px] border-gray-400 hover:border-[#53D878] text-[#182139] px-6 py-2 my-3"} onClick={() => setCountry("UAE")}>
                                <Image alt='BuildSuite Logo' src={"/uae-flag.png"} width={25} height={20} />
                                <p className='ml-3'>UAE</p>
                            </button>
                        </div>

                        <div className="flex items-center justify-between mb-3 max-lg:hidden">
                            <p>Query</p>
                            <p className="text-[#53D878] cursor-pointer text-[12px]">Generate Sample</p>
                        </div>

                        <textarea rows={12} placeholder="Enter your query" className="p-5 max-lg:hidden rounded-sm text-[16px] outline-none border-[1px] border-gray-400 text-black focus:border-gray-500 mb-5" />
                        <button className="max-lg:hidden cursor-pointer px-5 py-2 rounded-sm shadow-md outline-none text-[16px] bg-[#53D878] text-white">
                            Get Quote
                        </button>

                        <div className="w-full max-lg:flex hidden">
                            <input type="text" placeholder="Enter your query" className="p-2 w-[80%] max-sm:w-[85%] rounded-sm text-[16px] outline-none border-none text-black focus:border-gray-500" />
                            <button className=" max-sm:hidden w-[20%] px-5 py-2 rounded-sm shadow-md outline-none text-[14px] bg-[#53D878] text-white">
                                Get Quote
                            </button>
                            <button className="hidden max-sm:flex items-center justify-center w-[15%] rounded-sm shadow-md outline-none text-[24px] bg-[#53D878] text-white">
                                <MdSend></MdSend>
                            </button>
                        </div>


                    </div>


                    <div className="w-[58%] h-full max-lg:h-[88%] max-lg:w-full flex flex-col shadow-md rounded-sm bg-white border-[1px] border-gray-300 p-8">
                        <p className="mb-4">Tips</p>
                        <div className="px-4 bg-slate-50">
                            <ul className="list-disc p-4 text-[12px]">
                                <li>To get your answer correct, please ask the query in as much as detail as possible.</li>
                            </ul>
                        </div>
                        {/* <input type="text" className="px-5 py-2 outline-none border-[1px] border-gray-200 text-black text-[14px] hover:bg-blue-700 hover:text-white" /> 
                    </div> */}