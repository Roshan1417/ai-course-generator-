"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      GetAllCourse();
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [pageIndex, user, isLoaded]);

  const GetAllCourse = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    setLoading(true);
    try {
      const result = await db.select().from(CourseList)
        .where(eq(CourseList.createdBy, email))
        .orderBy(desc(CourseList.id))
        .limit(9)
        .offset(pageIndex * 9);
      setCourseList(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className='font-bold text-3xl dark:text-white'>My Courses</h2>
      <p className='text-gray-500 dark:text-gray-400 mt-1'>All courses you have created with AI</p>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className='w-full h-[230px] bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg'></div>
          ))
        ) : courseList?.length > 0 ? (
          courseList.map((course, index) => (
            <div key={index}>
              <CourseCard course={course} refreshData={() => GetAllCourse()} />
            </div>
          ))
        ) : (
          <div className='col-span-3 text-center py-16 text-gray-400'>
            <p className='text-lg'>No courses found.</p>
            <p className='text-sm mt-1'>Create your first course from the dashboard!</p>
          </div>
        )}
      </div>

      <div className='flex justify-between mt-5'>
        {pageIndex !== 0 && (
          <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous Page</Button>
        )}
        {courseList?.length === 9 && (
          <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
        )}
      </div>
    </div>
  )
}

export default Explore