"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { constants } from "../constants/constants";
import { MdCheck } from "react-icons/md";

export default function BetaRegister() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [organization, setOrganization] = useState("");
    const [country, setCountry] = useState("");

    const [terms, setTerms] = useState(false);
    const [marketing, setMarketing] = useState(false);

    const [error, setError] = useState(false);

    const { data: session } = useSession();
    const navigate = useRouter();


    useEffect(() => {
        setName(session?.user?.name.split(' ')[0]);
        setEmail(session?.user?.email);
        console.log(session?.user?.name);
    }, [session]);


    const submitForm = async () => {
        if (terms) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token") ?? "");

            const raw = JSON.stringify({
                "email": session?.user?.email,
                "name": session?.user?.name,
                "phone": phone,
                "organisation": organization,
                "role": role,
                "country": country,
                "consent-marketing": marketing ? "True" : "False"
            });

            console.log(raw);

            const requestOptions: RequestInit = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            await fetch(`${constants.BASE_URL}user_info`, requestOptions)
                .then((response: Response) => response.text())
                .then((result: string) => {
                    console.log(result);
                    setPhone("");
                    setCountry("");
                    setOrganization("");
                    setRole("");
                    navigate.push('/home');
                })
                .catch((error: any) => console.log('error', error));
        } else {
            setError(true);
        }

    }



    return (
        <div className="h-screen w-screen bgimg text-slate-900 flex flex-col items-center justify-center">
            <h1 className="text-[24px] font-bold mb-6">Register as a Beta user</h1>

            <form className="flex flex-col items-center" onSubmit={(evt) => { evt.preventDefault(); submitForm(); }}>
                <input
                    value={name}
                    autoComplete="off"
                    onChange={(evt) => setName(evt.target.value)}
                    placeholder="Enter your name"
                    className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-[#143F8D]"
                />

                <input
                    disabled={true}
                    value={email}
                    autoComplete="off"
                    placeholder="Enter your email"
                    className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-[#143F8D]"
                />

                <input
                    value={phone}
                    type="number"
                    autoComplete="off"
                    required
                    onChange={(evt) => setPhone(evt.target.value)}
                    placeholder="Phone number with country code"
                    className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-[#143F8D]"
                />

                <input
                    value={organization}
                    autoComplete="off"
                    placeholder="Organization"
                    onChange={(evt) => setOrganization(evt.target.value)}
                    className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-[#143F8D]"
                />

                <input
                    value={role}
                    autoComplete="off"
                    placeholder="Role"
                    onChange={(evt) => setRole(evt.target.value)}
                    className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-[#143F8D]"
                />

                <input
                    value={country}
                    autoComplete="off"
                    placeholder="Country"
                    onChange={(evt) => setCountry(evt.target.value)}
                    className="text-black bg-white  px-4 py-3 outline-none shadow-sm rounded-sm border-[2px] border-slate-200 w-[320px] bg-transparent text-[14px] mb-4 focus:border-[#143F8D]"
                />

                <div className=" flex items-start justify-between mb-4 w-[320px] text-[12px]">
                    <div onClick={() => { setError(false); setTerms(!terms); }} className={terms ? "h-5 w-5 rounded-sm border-[2px] border-green-200 bg-[#37AD4A] mt-2 cursor-pointer flex items-center justify-center" : "h-5 w-5 rounded-sm border-[2px] border-slate-400 bg-white mt-2 cursor-pointer"}>
                        {terms && <MdCheck className="text-white"></MdCheck>}
                    </div>
                    <p className="w-[90%] text-justify">
                        I understand that &apos;Park&apos; is in Beta and may make mistakes. I&apos;m willing to help improve the model.
                    </p>
                </div>


                <div className=" flex items-start justify-between mb-4 w-[320px] text-[12px]">
                    <div onClick={() => setMarketing(!marketing)} className={marketing ? "h-5 w-5 rounded-sm border-[2px] border-green-200 bg-[#37AD4A] cursor-pointer flex items-center justify-center" : "h-5 w-5 rounded-sm border-[2px] border-slate-400 bg-white cursor-pointer"}>
                        {marketing && <MdCheck className="text-white"></MdCheck>}
                    </div>
                    <p className="w-[90%] text-justify">
                        I agree to receive promotional messages
                    </p>
                </div>

                {error && <p className="text-red-500 text-[12px]">* Accept Terms & Conditions</p>}

                <button type="submit" className="bg-[#143F8D] text-white w-[320px] py-3 mt-4 font-semibold" >
                    Submit
                </button>
            </form>

            {/* <a className="text-[#143F8D] underline mt-3" href="/home">Skip and Continue</a> */}
        </div>
    );
}