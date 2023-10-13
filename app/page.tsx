"use client"

import Image from 'next/image';
import { useState } from 'react';
import Head from 'next/head';
import { MdSend, MdMenu, MdClose } from 'react-icons/md';

export default function Home() {

  const [sideNav, showSideNav] = useState(false);
  const [country, setCountry] = useState("IND");
  const [query, setQuery] = useState("");



  return (
    <main className="overflow-hidden flex h-screen w-screen flex-col items-center bg-gray-50 text-black">
      <div className={sideNav ? "w-[250px] slide-in absolute right-0 top-0 h-screen bg-white shadow-2xl p-4 hidden flex-col justify-between nav-slide max-sm:flex" : "w-[250px] absolute right-0 top-0 h-screen bg-white shadow-2xl p-4 hidden flex-col justify-between nav-slide2"}>
        <div>
          <div className='flex items-center justify-between w-full mb-10'>
            <Image alt='BuildSuite Logo' src={"/logo.png"} width={40} height={40} />
            <MdClose onClick={() => showSideNav(false)} className="text-[24px]"></MdClose>
          </div>

          <p className="text-[#53D878] cursor-pointer my-3">Purchase Credits</p>
          <p className="cursor-pointer">Sign out</p>
        </div>
        <div className="cursor-pointer w-full py-2 text-center rounded-md shadow-sm outline-none border-[1px] border-[#53D878] text-[#53D878] text-[12px] hover:bg-[#53D878] hover:text-white mr-8">
          3/5 Credits Remaining
        </div>
      </div>

      <div className="w-[1200px] max-xl:w-[1000px] max-lg:w-full max-lg:px-[3vw] mx-0 h-screen flex flex-col justify-start overflow-hidden">

        <nav className="w-full h-[10vh] flex items-center justify-between max-sm:px-4 max-sm:h-[7vh]">
          <p className="text-[18px] font-bold cursor-pointer text-[#7CAF75]">BuildSuite</p>

          <MdMenu onClick={() => showSideNav(true)} className="max-sm:block text-[28px] text-slate-400 hidden" ></MdMenu>

          <div className="flex items-center max-sm:hidden">
            <div className="cursor-pointer px-5 py-2 rounded-md shadow-sm outline-none border-[1px] border-[#53D878] text-[#53D878] text-[14px] hover:bg-[#53D878] hover:text-white mr-8">
              3/5 Credits Remaining
            </div>
            <p className="mr-8 text-[#53D878] cursor-pointer">Purchase Credits</p>
            <p className="cursor-pointer">Sign out</p>
          </div>
        </nav>

        <div className="h-[85vh] max-sm:h-[90vh] flex items-center justify-between max-lg:flex-col-reverse">

          <div className="w-[40%] h-full max-lg:h-[10%] max-lg:w-full max-lg:flex-row flex flex-col shadow-md rounded-sm bg-white border-[1px] border-gray-300 p-8 max-lg:p-2">

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
            {/* <input type="text" className="px-5 py-2 outline-none border-[1px] border-gray-200 text-black text-[14px] hover:bg-blue-700 hover:text-white" /> */}
          </div>

        </div>

      </div>

    </main>
  )
}
