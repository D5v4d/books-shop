'use client';
import Button from "@/src/components/button";
import "@/styles/button.css";
import { profileExit, uptokens } from "@/src/redux/slice/authorizationSlice";
import { upToken } from "@/src/redux/slice/basketSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileData() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const tokens = useSelector((state: RootState) => (state.authorization));

    useEffect(() => {
        const dataProfile = tokens.tokens.find(
            (token) => token.token === tokens.tokenProfile
        );
        if (dataProfile) {
            setName(dataProfile.name)
            setEmail(dataProfile.email)
        }
    }, [tokens.tokenProfile, tokens.tokens]);

    const isOpenEdit = () => {
        if (name == "" || !isEmailValid) {
            return
        }
        if (edit) {
            dispatch(uptokens({ name, email }))
        }
        setEdit(!edit)
    }

    const Exit = () => {
        dispatch(profileExit())
        dispatch(upToken(""))
        router.push('/')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(emailRegex.test(value));
    };

    return (
        <>
            <section className="flex mt-[87px] gap-x-[15px]">
                <div className="h-[270px] flex gap-x-[17px]">
                    <div>
                        <h1 className="text-[#1C2A39] text-[24px] font-bold mb-[7px]">PROFILE</h1>
                        <Image src={"/img/profile.png"} alt={"profile"} width={235} height={235}></Image>
                    </div>
                    <div className="pt-[41px] w-[500px]">
                        <div className="mb-[25px]">
                            <h2 className="text-[#1C2A39] text-[12px] font-bold">YOUR NAME</h2>
                            {edit ?
                                <input
                                    type="text"
                                    id="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    className={`h-[35px] p-2.5 border focus:outline-none text-[#4C3DB2] font-bold text-[12px]`}
                                    required />
                                : <span className="text-[#1C2A39] text-[24px] font-bold">{name}</span>}
                        </div>
                        <div className="mb-[41px]">
                            <h2 className="text-[#1C2A39] text-[12px] font-bold">YOUR EMAIL</h2>
                            {edit ?
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="example@email.com"
                                    className={`h-[35px] p-2.5 border focus:outline-none text-[#4C3DB2] font-bold text-[12px]
                                   ${isEmailValid ? 'border-[#4C3DB2]' : 'border-[#FF353A] text-[#FF353A]'}`}
                                    required />
                                :
                                <span className="text-[#1C2A39] text-[24px] font-bold">{email}</span>}
                        </div>
                        <div className="flex">
                            <Button className={"booksBtn"} onClick={isOpenEdit} text="EDIT PROFILE" />
                        </div>
                    </div>
                </div>
                <div className="w-[353px] h-[345px] py-[17px] px-[28px] bg-[#FFE0E2]">
                    <h1 className="text-[#1C2A39] text-[12px] font-bold text-center mb-[29px]">ABOUT ME</h1>
                    <p className="text-[#5C6A79] text-[12px] font-semibold w-[277px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
                        ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
                        quis ipsum. Proin mollis pellentesque nulla ac varius.
                    </p>
                </div>
            </section>
            <section>
                <button onClick={Exit} className="exitBtn">Exit</button>
            </section>
        </>
    );
}