"use client"

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { constants } from "../constants/constants";

export default function Login() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const { data: session } = useSession();
    const navigate = useRouter();


    useEffect(() => {
        setName(session?.user?.name.split(' ')[0]);
        setEmail(session?.user?.email);
        console.log(session?.user?.name);
        if (session?.user && localStorage.getItem("token") == null && localStorage.getItem("token") == undefined) {

            const login = async () => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "email": session.user?.email,
                    "uid": session.user?.id,
                    "profile_pic": session.user?.image,
                    "name": session.user?.name,
                });

                console.log(raw);

                const requestOptions: RequestInit = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                };

                await fetch(`${constants.BASE_URL}login`, requestOptions)
                    .then((response: Response) => response.text())
                    .then((result: string) => {
                        console.log(result);
                        localStorage.setItem("token", JSON.parse(result)['JWT']);
                        // navigate.push('/home');
                    })
                    .catch((error: any) => console.log('error', error));
            }

            // login();
        } else if (session?.user) {
            // navigate.push('/home');
        }
    }, [session]);



    return (
        <div className="h-screen w-screen bgimg text-slate-900 flex flex-col items-center justify-center">
            <h1 className="text-[24px] font-bold mb-6">Connect me to Sales</h1>

            <input
                value={name}
                autoComplete="off"
                onChange={(evt) => setName(evt.target.value)}
                placeholder="Enter your name"
                className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-amber-600"
            />

            <input
                disabled={true}
                value={email}
                autoComplete="off"
                placeholder="Enter your email"
                className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-amber-600"
            />

            <input
                value={phone}
                type="number"
                autoComplete="off"

                onChange={(evt) => setPhone(evt.target.value)}
                placeholder="Phone number with country code"
                className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-amber-600"
            />

            <input
                value={role}
                autoComplete="off"
                placeholder="Role in your organization"
                onChange={(evt) => setRole(evt.target.value)}
                className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-amber-600"
            />

            <div className=" flex items-start justify-between mb-4 w-[320px] text-[12px]">
                <div className=" h-4 w-4 rounded-sm border-[2px] border-slate-400 bg-white mt-2 cursor-pointer">
                </div>
                <p className="w-[90%] text-justify">
                    I understand that 'Park' is in Beta and may make mistakes. I'm willing to help improve the model.
                </p>
            </div>


            <div className=" flex items-start justify-between mb-4 w-[320px] text-[12px]">
                <div className=" h-4 w-4 rounded-sm border-[2px] border-slate-400 bg-white cursor-pointer">
                </div>
                <p className="w-[90%] text-justify">
                    I agree to receive promotional messages
                </p>
            </div>

            <button className="bg-amber-600 text-white w-[320px] py-3 mt-4 font-semibold" >
                Submit
            </button>
            <a className="text-amber-600 underline mt-3" href="/home">Skip and Continue</a>
        </div>
    );
}