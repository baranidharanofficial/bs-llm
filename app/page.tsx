import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="h-screen w-screen bg-[#143F8D] flex flex-col items-center justify-center overflow-hidden">
      <p className=" font-medium text-[32px]">Hello, I'm PARK</p>
      <Image src="/3d-logo.png" alt="Logo Image" width={100} height={100} className=" w-[270px]" />
      <p className="text-center font-medium text-[20px] w-[300px] mb-5">Your AI companion to answer your construction related queries..</p>
      <Link href="/home">
        <button className=" bg-[#37AD4A] w-[300px] h-[48px] rounded-[2px] p-3 my-3">Continue with Email</button>
      </Link>
      <Link href="/home">
        <button className=" bg-[#37AD4A] w-[300px] h-[48px] rounded-[2px] p-3 mb-20">Continue with Mobile number</button>
      </Link>
      <Image src="/logo2.png" alt="Logo Image" width={100} height={100} className=" h-[30px] w-auto mb-5" />
      <div className="w-[180px] flex items-center justify-between">
        <p className="text-[12px] text-[#D6D6D6]">Terms of use</p>
        <p className="text-[12px] text-[#D6D6D6]">Privacy Policy</p>
      </div>
    </div>
  );
}