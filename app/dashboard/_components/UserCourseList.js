"use client";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { CourseList } from '@/configs/schema'
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

const UserCourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Only fetch when Clerk has fully loaded AND we have a valid email
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      getUserCourses();
    } else if (isLoaded && !user) {
      // User is logged out - clear list
      setLoading(false);
      setCourseList([]);
    }
  }, [user, isLoaded]);

  const getUserCourses = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    // Hard guard — never query without a real email
    if (!email) return;

    setLoading(true);
    try {
      const result = await db.select().from(CourseList)
        .where(eq(CourseList.createdBy, email))
        .orderBy(desc(CourseList.id));
      setCourseList(result);
      setUserCourseList(result);
    } catch (e) {
      console.error('Error fetching courses:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl dark:text-white">My AI Courses</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          // Skeleton loaders while waiting for data
          [1, 2, 3].map((item) => (
            <div key={item} className='w-full mt-5 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg h-[270px]'></div>
          ))
        ) : courseList?.length > 0 ? (
          courseList.map((course, index) => (
            <CourseCard course={course} key={index} refreshData={() => getUserCourses()} />
          ))
        ) : (
          <div className="col-span-3 text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-lg">No courses yet.</p>
            <p className="text-sm mt-1">Click <span className="text-primary font-medium">"+ Create Course"</span> to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourseList;
