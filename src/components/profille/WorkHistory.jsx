import { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
const WorkHistory = () => {
    const[showReview,setShowReview]=useState(false)
    const handleReview=()=>{
        setShowReview(prev=>!prev)
    }
  return (
    <div className="h-full sm:px-20 overflow-x-hidden">
      <div className="bg-white">
        <div className="w-full border-b py-5 sm:px-24 ss:px-[5%]">
          <h1 className="text-[#9E6F27] font-extrabold text-xl">
            Work History
          </h1>
        </div>
        <div className="flex flex-col ">
          <div className="flex md:flex-row py-5   ss:px-[20%]     md:justify-between  ss:flex-col ss:gap-6  ">
            <div className="flex md:flex-col gap-3 items-center    md:p-0 ss:flex-row">
              <div className="flex flex-row gap-1 items-center text-xl  font-bold hover:cursor-pointer">
                <AiOutlineStar size={32} color="#FFB803" />
                <p className="text-[#FFB803]">4.5</p>
              </div>
              <p className="">Rating</p>
            </div>
            <div className="flex md:flex-col gap-3   items-center ">
              <p className="text-xl font-bold ">98</p>
              <p>Students</p>
            </div>
            <div className="flex md:flex-col  md:flow-row gap-3 md:p-0  ">
              <p className="text-xl font-bold ">156</p>
              <p>lessons</p>
            </div>
            <div className="flex md:flex-col gap-3 sm:items-center   md:p-0 ">
              <p className="text-xl font-bold ">100%</p>
              <p>Attendance</p>
            </div>
            <div className="flex md:flex-col gap-3 items-center  md:p-0 ">
              <p className="text-xl font-bold ">80%</p>
              <p>Response</p>
            </div>
          </div>
          <div className="flex  items-center  pb-5 ss:px-[19%] ">
            <button className="border-2 border-[#9E6F27] text-[#9E6F27] ss:m-0 md:mx-auto sm:w-[60%] md:w-[30%] rounded-3xl  ss:w-[60%] py-2" onClick={handleReview}>
              Show Reviews
            </button>
          </div>
          {showReview && (
            <>
              <div className="border  mb-16 sm:px-20 ss:w-full py-5 rounded-lg">
                <div className="border-b px-4  flex flex-col gap-5 py-6">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-3">
                  <img src="/assets/user3.png" alt=" user 3" />
                  <p>Owen lee</p>
                  <p className="text-[#5B5B5B]">1 month ago</p>
                </div>
                <div className="flex flex-row gap-1 items-center text-xl font-medium hover:cursor-pointer">
                  <p className="">4.5</p>
                  <AiOutlineStar size={32} color="#FFB803" />
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque augue quam, interdum quis eros vel, viverra
                  auctor elit.
                  <br /> uisque sodales viverra ante, at dignissim eros pretium
                  sed. Aliquam placerat est a tortor sagittiQs accumsan.
                </p>
              </div>
            </div>
            <div className="border-b px-4 flex flex-col gap-5 py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <img src="/assets/user3.png" alt=" user 3" />
                  <p>Owen lee</p>
                  <p className="text-[#5B5B5B]">1 month ago</p>
                </div>
                <div className="flex flex-row gap-1 items-center text-xl font-medium hover:cursor-pointer">
                  <p className="">4.5</p>
                  <AiOutlineStar size={32} color="#FFB803" />
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque augue quam, interdum quis eros vel, viverra
                  auctor elit.
                  <br /> uisque sodales viverra ante, at dignissim eros pretium
                  sed. Aliquam placerat est a tortor sagittiQs accumsan.
                </p>
              </div>
            </div>
            <div className="border-b px-4 flex flex-col gap-5 py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <img src="/assets/user3.png" alt=" user 3" />
                  <p>Owen lee</p>
                  <p className="text-[#5B5B5B]">1 month ago</p>
                </div>
                <div className="flex flex-row gap-1 items-center text-xl font-medium hover:cursor-pointer">
                  <p className="">4.5</p>
                  <AiOutlineStar size={32} color="#FFB803" />
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque augue quam, interdum quis eros vel, viverra
                  auctor elit.
                  <br /> uisque sodales viverra ante, at dignissim eros pretium
                  sed. Aliquam placerat est a tortor sagittiQs accumsan.
                </p>
              </div>
            </div>
            <div className="border-b px-4 flex flex-col gap-5 py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <img src="/assets/user3.png" alt=" user 3" />
                  <p>Owen lee</p>
                  <p className="text-[#5B5B5B]">1 month ago</p>
                </div>
                <div className="flex flex-row gap-1 items-center text-xl font-medium hover:cursor-pointer">
                  <p className="">4.5</p>
                  <AiOutlineStar size={32} color="#FFB803" />
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque augue quam, interdum quis eros vel, viverra
                  auctor elit.
                  <br /> uisque sodales viverra ante, at dignissim eros pretium
                  sed. Aliquam placerat est a tortor sagittiQs accumsan.
                </p>
              </div>
            </div>
            <div className="border-b px-4 flex flex-col gap-5 py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <img src="/assets/user3.png" alt=" user 3" />
                  <p>Owen lee</p>
                  <p className="text-[#5B5B5B]">1 month ago</p>
                </div>
                <div className="flex flex-row gap-1 items-center text-xl font-medium hover:cursor-pointer">
                  <p className="">4.5</p>
                  <AiOutlineStar size={32} color="#FFB803" />
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque augue quam, interdum quis eros vel, viverra
                  auctor elit.
                  <br /> uisque sodales viverra ante, at dignissim eros pretium
                  sed. Aliquam placerat est a tortor sagittiQs accumsan.
                </p>
              </div>
            </div>
            <div className="border-b px-4 flex flex-col gap-5 py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <img src="/assets/user3.png" alt=" user 3" />
                  <p>Owen lee</p>
                  <p className="text-[#5B5B5B]">1 month ago</p>
                </div>
                <div className="flex flex-row gap-1 items-center text-xl font-medium hover:cursor-pointer">
                  <p className="">4.5</p>
                  <AiOutlineStar size={32} color="#FFB803" />
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque augue quam, interdum quis eros vel, viverra
                  auctor elit.
                  <br /> uisque sodales viverra ante, at dignissim eros pretium
                  sed. Aliquam placerat est a tortor sagittiQs accumsan.
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-1  pt-5">
              <button className="border-2 px-2 ">&lt;</button>
              <button className="border-2 px-2 ">1</button>
              <button className="border-2 px-2 ">2</button>
              <button className="border-2 px-2 ">...</button>
              <button className="border-2 px-2 ">9</button>
              <button className="border-2 px-2 ">10</button>
              <button className="border-2 px-2 ">&gt;</button>
            </div>
          </div>
            </>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;
