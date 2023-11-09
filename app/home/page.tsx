"use client"

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MdMenu, MdClose, MdThumbUp, MdThumbDown } from 'react-icons/md';
import { constants } from '../constants/constants';


interface Chat {
    query: string;
    answer?: ChatResponse | null;
    isLiked: boolean | null;
}

interface Model {
    model_id: string;
    model_name: string;
}

interface ChatResponse {
    msg: string;
    query_id: string;
    response: string;
    session_id: string
    sources: string[];
}


export default function Home() {

    const [sideNav, showSideNav] = useState(false);
    const [country, setCountry] = useState("");
    const [model, setModel] = useState("001");
    const [place, setPlace] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [query, setQuery] = useState("");
    const [currentResponse, setCurrentResponse] = useState<ChatResponse>();
    const [queryID, setQueryID] = useState("");
    const [feedback, setFeedback] = useState("");
    const [currentLike, setCurrentLike] = useState("");
    const [countryChat, setCountryChat] = useState("");
    const [placeChat, setPlaceChat] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [loader, setLoader] = useState(false);
    const [textLoader, setTextLoader] = useState("Park is typing");
    const [mainLoader, setMainLoader] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [showBS, setShowBS] = useState(false);
    const [showFeedbackID, setShowFeedbackID] = useState("");

    const [chats, setChats] = useState<Chat[]>([]);

    const [models, setModels] = useState<Model[]>([]);

    const { data: session } = useSession();

    const navigate = useRouter();


    useEffect(() => {
        startLoader();
        if (session?.user) {
            const getModels = async () => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({});

                const requestOptions: RequestInit = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                };

                await fetch(`${constants.BASE_URL}fetch_models`, requestOptions)
                    .then((response: Response) => response.text())
                    .then((result: string) => {
                        console.log(JSON.parse(result));
                        setModels(JSON.parse(result));
                    })
                    .catch((error: any) => console.log('error', error));
            }
            getModels();
            getProfile();
        }

    }, [session]);



    const getProfile = async () => {
        console.log(session?.user.email);
        const token = localStorage.getItem("token");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "email": session?.user.email,
        }
        );

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch(`${constants.BASE_URL}profile`, requestOptions)
            .then((response: Response) => {
                if (response.status !== 200) {
                    logout();
                }
            })
            .catch((error: any) => console.log('error', error));
    }



    useEffect(() => {
        if (localStorage.getItem("token") == null || localStorage.getItem('token') == undefined) {
            navigate.push('/');
        }
    }, [session, navigate])

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

    const sendCountryQuery = (countrySelected: Model) => {
        setCountry(countrySelected.model_name);
        setModel(countrySelected.model_id);
        typeWriter(0,
            `Great! Thanks for specifying your country. To give you the most accurate information, could 
                you please tell me which specific city or 
                area within ` + countrySelected.model_name + ` your query is about? This will help me tailor the 
                response to your location. Feel free to type the name of your city or area.`);
    }

    function typeWriter(i: number, txt: string) {
        var speed = 30;

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

    const sendPlaceQuery = async (evt: any) => {
        evt.preventDefault();
        setPlace(query);
        typeWriter2(0,
            `Perfect, ` + query + ` it is! Now, go ahead and ask your construction-related question. 
            If you're unsure how to format it, you can use the following as an example: \n\n
            For instance, you might ask, "What are the zoning regulations for residential buildings in Mumbai, India?"`);
        setQuery("");
    }

    function typeWriter2(i: number, txt: string) {
        var speed = 30;

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


    const sendQuery = async (evt: any) => {
        if (query.length > 0) {
            setDisabled(true);
            setLoader(true);
            evt.preventDefault();

            let cChat: Chat = {
                query: query,
                answer: null,
                isLiked: null,
            }
            setChats([...chats, cChat]);
            setTimeout(() => scrollToBottom(), 500);
            setQuery("");
            await getResponse();
            setDisabled(false);
            setLoader(false);
        } else {
            alert("Enter your query");
        }
    }

    function filterUniqueByIndex0(data: any) {
        const uniqueData = [];
        const seenValues = new Set();

        for (const item of data) {
            if (!seenValues.has(item[0])) {
                uniqueData.push(item);
                seenValues.add(item[0]);
            }
        }

        return uniqueData;
    }


    useEffect(() => {
        if (currentResponse) {
            chats.forEach((data, index) => {
                if (index == (chats.length - 1)) {
                    data.answer = currentResponse;
                    data.answer.sources = filterUniqueByIndex0(data.answer.sources);
                }
            });

            setChats([...chats]);
            console.log(chats);

            setTimeout(() => scrollToBottom(), 500);

        }

    }, [currentResponse])

    const getResponse = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cache-Control", "no-cache");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

        const raw = JSON.stringify({
            "email": session?.user.email,
            "model_id": model,
            "query": query,
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch(`${constants.BASE_URL}create_query`, requestOptions)
            .then(async (response: Response) => {
                if (response.status == 401) {
                    await logout();
                }
                return response.text();
            })
            .then((result: string) => {
                console.log(JSON.parse(result));
                setCurrentResponse(JSON.parse(result));
            })
            .catch((error: any) => {
                console.log('error', error);
                setLoader(false);
            });
    }

    const addFeedback = async () => {
        setMainLoader(true);
        console.log(showFeedbackID);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token") ?? "");

        const raw = JSON.stringify({
            "email": session?.user.email,
            "query_id": showFeedbackID,
            "feedback": currentLike,
            "feedback_comment": feedback
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch(`${constants.BASE_URL}feedback`, requestOptions)
            .then((response: Response) => response.text())
            .then((result: string) => {
                console.log(JSON.parse(result));
                setShowFeedbackID("");
                setMainLoader(false);
            })
            .catch((error: any) => console.log('error', error));
    }

    const chatLogout = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem("token") ?? "");

        const raw = JSON.stringify({
            "email": session?.user.email
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch(`${constants.BASE_URL}logout`, requestOptions)
            .then((response: Response) => response.text())
            .then((result: string) => {
                console.log(result);
                navigate.push('/');
            })
            .catch((error: any) => console.log('error', error));
    }

    const logout = async () => {
        await signOut();
        localStorage.clear();
        await chatLogout();
    }


    const addReaction = async (isLiked: boolean, cQueryID: string) => {
        chats.forEach(data => {
            if (data.answer?.query_id == cQueryID) {
                data.isLiked = isLiked;
            }
        })

        setChats([...chats]);

        setShowFeedbackID(cQueryID);
        setCurrentLike(isLiked ? 'GOOD' : 'BAD');
    }

    const startLoader = () => {
        let dots = 0;

        const updateTextLoader = () => {
            const dotString = '.'.repeat(dots);
            setTextLoader('Park is typing' + dotString);
            dots = (dots + 1) % 4;
        }
        setInterval(updateTextLoader, 2000);
    }

    return (
        <main className="h-[100vh] w-[100vw] bg-gray-50 text-black flex flex-col items-center overflow-hidden">

            <div className={sideNav ? "w-[250px] translate-x-[0px] duration-300 z-10 fixed right-0 top-0 h-full bg-[#143F8D] shadow-2xl p-4 flex flex-col justify-between" : "w-[250px] translate-x-[250px] duration-300 z-10 fixed right-0 top-0 h-full bg-[#143F8D] shadow-2xl p-4 flex-col justify-between flex"}>
                <div>
                    <div className='flex items-center justify-between w-full mb-10'>
                        <Image alt='BuildSuite Logo' src={"/logo2.png"} width={40} height={40} className=' h-[25px] w-auto' />
                        <MdClose onClick={() => showSideNav(false)} className="text-[24px] cursor-pointer text-white"></MdClose>
                    </div>

                    <p className="text-white cursor-pointer ml-2 my-4">Hi {session?.user?.name?.split(" ")[0]}</p>
                    <p className="text-white font-bold cursor-pointer ml-2 my-4"><a target='_blank' href="https://www.buildsuite.io/">WHAT IS BUILDSUITE</a></p>
                    <p className="text-white font-bold cursor-pointer ml-2 my-4"><a target='_blank' href="https://www.buildsuite.io/contact-us">CONTACT US</a></p>
                    <p onClick={() => logout()} className="text-white font-bold cursor-pointer ml-2 my-4">SIGN OUT</p>
                </div>

                <div className='text-slate-50 text-[10px] text-center'>
                    <p>© 2023 BuildSuite. All Rights Reserved.</p>

                    <div className='flex items-center justify-between mt-2 mx-[10%]'>
                        {/* <p>Home Page</p> */}
                        <a target='_blank' href='https://www.buildsuite.io/terms'>Terms of Use</a>
                        <a target='_blank' className='cursor-pointer' href='https://www.buildsuite.io/privacy'>Privacy Policy</a>
                    </div>
                </div>

            </div>


            {showFeedbackID.length > 0 && <div className='absolute z-50 top-0 left-0 w-[100vw] h-[100dvh] pt-6 pb-20 px-6 bg-[#143e8d53] flex items-center justify-center'>
                <div className='bg-white w-[30%] max-sm:w-[90%] rounded-sm p-5'>

                    <div className='flex items-center justify-between mb-4'>
                        <p className='font-semibold text-[18px]'>Send feedback</p>
                        <MdClose onClick={() => setShowFeedbackID("")} className="text-[24px]"></MdClose>
                    </div>

                    <textarea rows={2} value={feedback} onChange={(evt) => setFeedback(evt.target.value)} placeholder="Ask your question here." className="text-black bg-slate-200 h-30 max-h-40 p-2 border-none outline-none w-full bg-transparent text-[14px] mb-4" />

                    <button onClick={() => addFeedback()} className='bg-[#37AD4A] w-full p-2 rounded-sm text-[14px] font-semibold text-white'>Submit</button>
                </div>
            </div>}

            {
                showBS && <div className='absolute z-50 top-0 left-0 w-[100vw] h-[100dvh] pt-6 pb-20 px-6 bg-[#143F8D] flex flex-col items-center justify-between'>

                    <div>
                        <div onClick={() => setShowBS(false)} className="w-full text-[36px] text-white text-xl cursor-pointer flex justify-end">
                            <MdClose></MdClose>
                        </div>


                        <img alt='BuildSuite Logo' src={"/logo2.png"} width={40} height={40} className=' self-start h-[6vh] w-auto mt-6' />

                        <div className='text-[#37AD4A] font-semibold max-md:text-[24px] text-[28px] max-w-[300px]  ml-2 mt-5'>
                            <p>WORLD&apos;S FIRST AI POWERED CONSTRUCTION MANAGEMENT PLATFORM</p>
                        </div>
                    </div>


                    <div className='w-[93%] flex flex-col items-center text-center'>
                        <a href='https://www.buildsuite.io/ask-for-demo' target='_blank' className='w-full max-w-[300px] text-[16px] bg-[#37AD4A] text-white font-semibold py-2 rounded-sm justify-end'>

                            ASK FOR DEMO

                        </a>

                        <a href='https://www.buildsuite.io' target='_blank' className='mt-5 text-[#37AD4A] font-semibold'>
                            VISIT WEBSITE
                        </a>
                    </div>


                </div>
            }

            <div className='h-[5%] bg-[#143F8D] w-full px-3 flex items-center cursor-pointer justify-between'>
                <img alt='BuildSuite Logo' src={"/logo2.png"} width={40} height={40} className='h-[3vh]  w-auto' />
                <p onClick={() => setShowBS(true)} className='text-white text-[12px]'>KNOW MORE </p>
            </div>


            <div className="w-[1200px] h-[95%] max-xl:w-[1000px] max-lg:w-full flex flex-col justify-start">


                <nav className="h-[7%] w-full max-sm:shadow-md flex items-center justify-between max-lg:px-[3vw] px-3">
                    <img alt='BuildSuite Logo' src={"/logo3.png"} width={40} height={40} className=' h-[5vh] w-auto' />

                    <div className='flex items-center justify-end '>
                        {/* <p className='mr-4 bg-[#37AD4A] text-white text-[12px] rounded-full px-3 py-1'>0 / 10 Credits</p> */}
                        <MdMenu onClick={() => showSideNav(true)} className="text-[28px] cursor-pointer text-slate-800" ></MdMenu>
                    </div>
                </nav>

                <div ref={divRef} className="h-[72%] flex flex-col smooth-scroll overflow-x-hidden overflow-y-auto max-lg:px-[3vw] px-3">

                    <div className='flex items-start justify-start mt-2 mb-8'>
                        <Image src="/ideogram.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                        <div>
                            <p className='text-[#143F8D] font-medium text-[24px] mb-1'>Welcome to &apos;Park&apos;</p>
                            <p className='text-[#143F8D] font-medium text-[20px] mb-4'>Your Construction Companion!</p>
                            <ul className='list-inside list-disc text-[14px]'>
                                <li>I am your trusty companion for construction queries, covering building codes, state-specific rules (e.g., Kerala, Karnataka, Delhi NCR), and Indian standards.</li>
                                <li>As a Beta user, your feedback is crucial in refining me to be more accurate and helpful.</li>
                                <li>Please keep in mind that I am in Beta, and while I strive for accuracy, my responses may not always be 100% precise.</li>
                                <li>I encourage you to explore me in a friendly and respectful manner - I&apos;m your trusted construction companion!</li>
                                <li>Thank you for being a part of our Beta user community, where we work together to create a valuable resource for the construction industry. Let&apos;s start exploring now!</li>
                            </ul>
                            <br></br>
                        </div>
                    </div>




                    {chats.map((data: Chat, index) => {
                        if (chats.length == 1 || index < (chats.length - 1)) {
                            return <div key={index}>
                                <div className='flex items-start justify-start mb-4'>
                                    <img src={session?.user.image} alt="" width={30} height={30} className='pt-1 h-[35px] w-[30px] bg-cover mr-3 rounded-b-sm rounded-t-md' />
                                    <p className=' font-semibold text-[16px] text-[#143F8D]'>{data.query}</p>
                                </div>

                                <div className='flex items-start justify-start mb-8'>
                                    <Image src="/ideogram.png" alt="" width={30} height={30} className='pt-1 h-[35px] w-auto mr-3' />
                                    <div className=''>
                                        {loader && chats.length <= 1 && <p className='font-normal text-[16px] text-black'>{textLoader}</p>}
                                        {data.answer?.response != undefined && <div className='font-normal text-[16px] text-black' dangerouslySetInnerHTML={{ __html: data.answer?.response }}></div>}
                                        {!loader && data.answer?.response == undefined && <p className='font-normal text-[16px] text-black'>Please hang on we&apos;re fixing it 🔧🚀.</p>
                                        }
                                        <br></br>

                                        {data.answer?.sources && <i className='text-slate-400 mb-2'>Reference</i>}
                                        <br></br>
                                        <ol className=' mb-5 list-inside list-decimal text-slate-400'>
                                            {data.answer?.sources.map((data, index) => {
                                                return <li key={index} className='mb-1'><i>{data[0]}</i></li>
                                            })}
                                        </ol>




                                        {data.answer?.response != undefined && !loader && <div className='flex items-center justify-start'>
                                            <MdThumbUp onClick={() => data.isLiked == null && data.answer?.response != undefined && addReaction(true, data.answer?.query_id ?? "")} className={data.isLiked != null && data.isLiked ? "text-[#143F8D] mr-2 cursor-pointer" : "text-slate-400 mr-2 cursor-pointer"}></MdThumbUp>
                                            <MdThumbDown onClick={() => data.isLiked == null && data.answer?.response != undefined && addReaction(false, data.answer?.query_id ?? "")} className={data.isLiked != null && !data.isLiked ? "text-[#143F8D] mr-2 cursor-pointer" : "text-slate-400 mr-2 cursor-pointer"}></MdThumbDown>
                                        </div>}

                                    </div>

                                </div>
                            </div>
                        }

                    })}


                    {chats.length > 1 && <div key={chats[chats.length - 1].query}>
                        <div className='flex items-start justify-start mb-4'>
                            <img src={session?.user.image} alt="" width={30} height={30} className='pt-1 h-[30px] w-[30px] object-fill rounded-md mr-3' />
                            <p className=' font-semibold text-[16px] text-[#143F8D]'>{chats[chats.length - 1].query}</p>
                        </div>

                        <div className='flex items-start justify-start mb-8'>
                            <Image src="/ideogram.png" alt="" width={30} height={30} className='pt-1 h-[35px] object-cover w-auto mr-3' />
                            <div className=''>
                                {!loader ? <div className='font-normal text-[16px] text-black' dangerouslySetInnerHTML={{ __html: chats[chats.length - 1].answer?.response ?? "Please hang on we're fixing it 🔧🚀." }}></div> :
                                    <p className='font-normal text-[16px] text-black'> {textLoader}</p>}
                                <br></br>

                                {chats[chats.length - 1].answer?.sources && <i className='text-slate-400 mb-2'>Reference</i>}

                                <ol className=' mb-5 list-inside list-decimal text-slate-400'>
                                    {chats[chats.length - 1].answer?.sources.map((data, index) => {
                                        return <li key={index} className='mb-1'><i>{data[0]}</i></li>
                                    })}
                                </ol>

                                {chats[chats.length - 1].answer?.response != undefined && !loader && <div className='flex items-center justify-start'>
                                    <MdThumbUp onClick={() => chats[chats.length - 1].isLiked == null && chats[chats.length - 1].answer?.response != undefined && addReaction(true, chats[chats.length - 1].answer?.query_id ?? "")} className={chats[chats.length - 1].isLiked != null && chats[chats.length - 1].isLiked ? "text-[#143F8D] mr-2 cursor-pointer" : "text-slate-400 mr-2 cursor-pointer"}></MdThumbUp>
                                    <MdThumbDown onClick={() => chats[chats.length - 1].isLiked == null && chats[chats.length - 1].answer?.response != undefined && addReaction(false, chats[chats.length - 1].answer?.query_id ?? "")} className={chats[chats.length - 1].isLiked != null && !chats[chats.length - 1].isLiked ? "text-[#143F8D] mr-2 cursor-pointer" : "text-slate-400 mr-2 cursor-pointer"}></MdThumbDown>
                                </div>}


                            </div>

                        </div>
                    </div>}




                </div>

                <div className='max-h-[300px] fixed bottom-0 max-sm:bg-[#143F8D] bg-slate-100 w-[1200px] max-xl:w-[1000px] max-lg:w-full  rounded-md max-sm:rounded-none px-4 py-4 max-sm:px-2 max-sm:py-3 '>
                    <form onSubmit={(evt) => place.length > 0 ? sendQuery(evt) : sendPlaceQuery(evt)} className='bg-slate-200 max-sm:bg-[#30569C] rounded-md w-full py-2 pl-4 pr-2 flex items-center justify-between mb-2'>
                        <textarea
                            disabled={disabled}
                            rows={1}
                            value={query}
                            onChange={(evt) => handleTextareaChange(evt)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.shiftKey) {
                                } else if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    // place.length > 0 ? sendQuery(e) : sendPlaceQuery(e);
                                    sendQuery(e);
                                }
                            }}
                            placeholder="Ask your question here."
                            className="text-black max-sm:text-white h-6 max-h-40 border-none outline-none w-[85%] bg-transparent text-[16px]"
                        />


                        <button type='submit' onClick={(evt) => sendQuery(evt)} className={query.length == 0 ? 'max-sm:bg-transparent bg-slate-800 rounded-sm' : 'bg-[#37AD4A] rounded-sm self-end'}>
                            <Image src="/send.svg" alt='Send Image' width={20} height={20} className=' p-2 h-[35px] w-[35px]' />
                        </button>
                    </form>
                    <p className='text-[#37AD4A] max-sm:text-white text-[12px] font-medium text-center'>Currently in beta testing. Your feedback is invaluable for enhancing our service. Please report errors or share suggestions.</p>
                </div>
            </div>

        </main >
    )
}
