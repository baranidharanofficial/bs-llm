"use client"

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { constants } from "./constants/constants";

export default function Login() {

  const { data: session } = useSession();
  const navigate = useRouter();


  useEffect(() => {
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
            navigate.push('/sales');
          })
          .catch((error: any) => console.log('error', error));
      }

      login();
    } else if (session?.user) {
      navigate.push('/sales');
    }
  }, [session, navigate]);



  return (
    <div className="h-screen w-screen bg-[#143F8D] flex flex-col items-center justify-center overflow-hidden">
      <p className=" font-medium text-[32px]">Hello, I&apos;m PARK</p>
      <Image src="/3d-logo.png" alt="Logo Image" width={100} height={100} className=" w-[200px]" />
      <p className="text-center font-medium text-[18px] w-[300px] mb-5">Your AI companion to answer your construction related queries..</p>
      <button onClick={() => signIn("google")} className="bg-white text-black w-[300px] h-[48px] p-3 mt-3 mb-20 rounded-sm flex items-center justify-center">
        <img src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png" alt="Logo Image" width={100} height={100} className="w-[25px] mr-4" />
        <p>Continue with Google</p>
      </button>

      {/* <Link href="/home">
        <button className=" bg-[#37AD4A] w-[300px] h-[48px] rounded-[2px] p-3 mb-20">Continue with Mobile number</button>
      </Link> */}
      <Image src="/logo2.png" alt="Logo Image" width={100} height={100} className=" h-[30px] w-auto mb-5" />
      <div className="w-[180px] flex items-center justify-between">
        <p className="text-[12px] text-[#D6D6D6]">Terms of use</p>
        <p className="text-[12px] text-[#D6D6D6]">Privacy Policy</p>
      </div>
    </div>
  );
}