"use client"

import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';


interface Chat {
    query: string;
    answer: string;
}


export default function Home() {

    const [sideNav, showSideNav] = useState(false);
    const [country, setCountry] = useState("");
    const [place, setPlace] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [query, setQuery] = useState("");
    const [countryChat, setCountryChat] = useState("");
    const [placeChat, setPlaceChat] = useState("");
    const [disabled, setDisabled] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [showBS, setShowBS] = useState(false);

    const [chats, setChats] = useState<Chat[]>([]);

    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    };

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const sendCountryQuery = (countrySelected: string) => {
        setCountry(countrySelected);
        typeWriter(0,
            `Great! Thanks for specifying your country. To give you the most accurate information, could 
                you please tell me which specific city or 
                area within ` + countrySelected + ` your query is about? This will help me tailor the 
                response to your location. Feel free to type the name of your city or area.`);
    }

    function typeWriter(i: number, txt: string) {
        var speed = 40;

        if (i < txt.length) {
            setDisabled(true);
            setTimeout(() => {
                setCountryChat(txt.substring(0, i + 1) + '|');
                typeWriter(i + 1, txt);
                scrollToBottom();
            }, speed);
        } else {
            setDisabled(false);
            setCountryChat(txt);
        }
    }

    const sendPlaceQuery = async () => {
        setPlace(query);
        typeWriter2(0,
            `Perfect, ` + query + ` it is! Now, go ahead and ask your construction-related question. 
            If you're unsure how to format it, you can use the following as an example: \n\n
            For instance, you might ask, "What are the zoning regulations for residential buildings in Mumbai, India?"`);
        setQuery("");
    }

    function typeWriter2(i: number, txt: string) {
        var speed = 40;

        if (i < txt.length) {
            setDisabled(true);
            setTimeout(() => {
                setPlaceChat(txt.substring(0, i + 1) + '|');
                typeWriter2(i + 1, txt);
                scrollToBottom();
            }, speed);
        } else {
            setDisabled(false);
            setPlaceChat(txt);
        }
    }


    const sendQuery = () => {

        let cChat: Chat = {
            query: query,
            answer: "Sorry I'm still in development process. Come back after some time."
        }

        setChats([...chats, cChat]);

        setTimeout(() => scrollToBottom(), 500);
        setQuery("");
    }

    function typeWriter3(i: number, txt: string) {
        var speed = 50;

        if (i < txt.length) {
            setDisabled(true);
            setTimeout(() => {
                setCountryChat(txt.substring(0, i + 1) + '|');
                typeWriter(i + 1, txt);
                scrollToBottom();
            }, speed);
        } else {
            setDisabled(false);
            setCountryChat(txt);
        }
    }


    return (
        <main className="overflow-hidden flex h-[100dvh] w-screen flex-col items-center bg-gray-50 text-black">

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

            {showBS && <div className='absolute top-0 left-0 w-[100vw] h-[100dvh] pt-6 pb-20 px-6 bg-[#143F8D] flex flex-col items-center justify-between'>

                <div>
                    <div onClick={() => setShowBS(false)} className="w-full text-[36px] text-white text-xl flex justify-end">
                        <MdClose></MdClose>
                    </div>


                    <img alt='BuildSuite Logo' src={"/logo2.png"} width={40} height={40} className=' self-start h-[6vh] w-auto mt-6' />

                    <div className='text-[#37AD4A] font-semibold text-[24px] ml-2 mt-5'>
                        <p>WORLD&apos;S FIRST AI POWERED CONSTRUCTION MANAGEMENT PLATFORM</p>
                    </div>
                </div>


                <div className='w-[93%] text-center'>
                    <button className='w-full text-[16px] bg-[#37AD4A] text-white font-semibold py-2 rounded-sm justify-end'>
                        ASK FOR DEMO
                    </button>
                    <button className='mt-5 text-[#37AD4A] font-semibold'>
                        VISIT WEBSITE
                    </button>
                </div>


            </div>}


            <div className="w-[1200px] max-xl:w-[1000px] max-lg:w-full h-full flex flex-col justify-start">

                <div className='h-[7%] bg-[#143F8D] px-3 flex items-center justify-between'>
                    <img alt='BuildSuite Logo' src={"/logo2.png"} width={40} height={40} className=' h-[3vh] w-auto' />
                    <p onClick={() => setShowBS(true)} className=' text-white text-[12px]'>KNOW MORE</p>
                </div>

                <nav className="h-[7%] w-full bg-white shadow-md flex items-center justify-between max-lg:px-[3vw]">
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

                <div ref={divRef} className="h-[66%] flex flex-col smooth-scroll overflow-x-hidden overflow-y-auto px-3">

                    <div className='flex items-start justify-start mt-2 mb-8'>
                        <Image src="/ideogram.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                        <div>
                            <p className='text-[#143F8D] font-medium text-[24px] mb-1'>Hello, I&apos;m PARK</p>
                            <p className='text-[#143F8D] font-medium text-[20px] mb-4'>Your construction rules assistant.</p>
                            <p className='text-black text-[16px] mb-10'> We&apos;re currently in beta, and we&apos;re here to assist you with building rules and compliance in India and the UAE. Please select your country to get started.</p>

                            <p className='mb-2'>Select Country:</p>
                            <div className='flex'>
                                <p onClick={() => country.length == 0 && sendCountryQuery("India")} className={country == "India" ? "bg-[#37AD4A] px-5 py-3 text-[14px] text-white mr-2" : 'px-5 py-3 text-[14px] bg-[#DCF3E0] text-[#248233] mr-2'} > India</p>
                                <p onClick={() => country.length == 0 && sendCountryQuery("UAE")} className={country == "UAE" ? "bg-[#37AD4A] px-5 py-3 text-[14px] text-white mr-2" : 'px-5 py-3 text-[14px] bg-[#DCF3E0] text-[#248233] mr-2'}>UAE</p>
                            </div>
                        </div>
                    </div>

                    {/* <div className='flex items-start justify-start mb-4'>
                            <Image src="/question.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                            <p className=' font-semibold text-[16px] text-[#143F8D]'>Offset required from 33 KV electric line?</p>
                        </div> */}

                    {country.length > 0 && <div className='flex items-start justify-start mb-8'>
                        <Image src="/ideogram.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                        <div className=''>
                            <p className='font-normal text-[16px] text-black'>{countryChat}</p>

                            {/* <p className='mb-5 text-[#868686]'><i>Reference <span className='text-black underline'>KMBR 2023</span></i></p>
                                <p className='mb-[80px] text-[#868686]'><i>Send Feedback</i></p> */}

                        </div>

                    </div>}

                    {place.length > 0 && <div className='flex items-start justify-start mb-8'>
                        <Image src="/ideogram.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                        <div className=''>
                            <p className='font-normal text-[16px] text-black'>{placeChat}</p>

                            {/* <p className='mb-5 text-[#868686]'><i>Reference <span className='text-black underline'>KMBR 2023</span></i></p>
                                <p className='mb-[80px] text-[#868686]'><i>Send Feedback</i></p> */}

                        </div>

                    </div>}


                    {chats.map((data: Chat) => {
                        return <div key={data.query}>
                            <div className='flex items-start justify-start mb-4'>
                                <Image src="/question.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                                <p className=' font-semibold text-[16px] text-[#143F8D]'>{data.query}</p>
                            </div>

                            <div className='flex items-start justify-start mb-8'>
                                <Image src="/ideogram.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                                <div className=''>
                                    <p className='font-normal text-[16px] text-black'>{data.answer}</p>

                                    {/* <p className='mb-5 text-[#868686]'><i>Reference <span className='text-black underline'>KMBR 2023</span></i></p>
                                <p className='mb-[80px] text-[#868686]'><i>Send Feedback</i></p> */}

                                </div>

                            </div>
                        </div>
                    })}

                    <div className='text-[#868686] text-[14px] text-center ml-10 mt-14 pb-3'>
                        <p>© 2023 BuildSuite. All Rights Reserved.</p>

                        <div className='flex items-center justify-between'>
                            <p>Home Page</p>
                            <p>Terms of Use</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </div>

                <div className='h-[20%] bg-[#143F8D] w-screen px-2 py-3 '>
                    <div className='bg-[#30569C] rounded-md w-full py-2 pl-4 pr-2 flex items-center justify-between mb-2'>
                        <textarea disabled={country.length == 0 || disabled} rows={1} value={query} onChange={(evt) => handleTextareaChange(evt)} placeholder="Ask your question here." className="text-white max-h-40 border-none outline-none w-[85%] bg-transparent text-[16px]" />
                        <button onClick={() => place.length > 0 ? sendQuery() : sendPlaceQuery()} className={query.length == 0 ? '' : 'bg-[#37AD4A] rounded-sm self-end'}>
                            <Image src="/send.svg" alt='Send Image' width={20} height={20} className=' p-2 h-[35px] w-[35px]' />
                        </button>
                    </div>
                    <p className='text-[#D6D6D6] text-[12px] font-medium text-center'>Currently in beta testing. Your feedback is invaluable for enhancing our service. Please report errors or share suggestions.</p>
                </div>
            </div>

        </main >
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