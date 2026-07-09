"use client";
import Image from 'next/image';
import React, { useContext } from 'react';
import { HiHome } from "react-icons/hi2";
import { MdOutlineExplore } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

const SideBar = () => {
  const { userCourseList } = useContext(UserCourseListContext);

  const Menu = [
    {
      id: 1,
      name: 'Home',
      icon: <HiHome />,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Explore',
      icon: <MdOutlineExplore />,
      path: '/dashboard/explore',
    },
    {
      id: 3,
      name: 'Settings',
      icon: <HiOutlineCog6Tooth />,
      path: '/dashboard/settings',
    },
    {
      id: 4,
      name: 'Logout',
      icon: <TbLogout2 />,
      path: '/dashboard/logout',
    },
  ];

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image alt="logo" src={'/logo.svg'} width={160} height={100} />
      <hr className="my-5" />
      <ul>
        {Menu.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                  item.path === path && 'bg-gray-100 text-black'
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length / 10) * 100} />
        <h2 className="text-sm my-2">{userCourseList?.length} out of 10 created</h2>
      </div>
    </div>
  );
};

export default SideBar;
