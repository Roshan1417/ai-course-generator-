"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import Link from 'next/link'
import { HiHome } from 'react-icons/hi2'

function CourseStart({params}) {
    const { courseId } = React.use(params);
    const [course,setCourse]=useState();
    const [selectedChapter,setSelectedChapter]=useState(0);
    const [chapterContent,setChapterContent]=useState();
    useEffect(()=>{
        GetCourse();
    },[courseId])

    useEffect(()=>{
        if(course?.courseOutput?.course?.chapters){
            setSelectedChapter(course?.courseOutput?.course?.chapters[0]);
            GetSelectedChapterContent(0);
        }
    },[course])

    const GetCourse=async()=>{
        const result=await db.select().from(CourseList)
        .where(eq(CourseList?.courseId, courseId));
        setCourse(result[0]);
    }

    const GetSelectedChapterContent=async(chapterId)=>{
        const result=await db.select().from(Chapters)
        .where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters.courseId,course?.courseId)));
        setChapterContent(result[0]);
        console.log(result);
    }

  return (
    <div>
        {/* Chapter list Side Bar */}
        <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm overflow-y-auto'>
            {/* Home button */}
            <div className='p-3 border-b'>
              <Link href='/dashboard'>
                <button className='flex items-center gap-2 text-sm text-gray-600 hover:text-primary hover:bg-purple-50 w-full px-3 py-2 rounded-lg transition-colors'>
                  <HiHome className='text-lg'/>
                  <span>Back to Home</span>
                </button>
              </Link>
            </div>
            <h2 className='font-medium text-lg bg-primary p-4 text-white'>
              {course?.courseOutput?.course?.name}
            </h2>
            <div>
                {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
                    <div key={index}
                    className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.name==chapter?.name&&'bg-purple-100'}`}
                    onClick={()=>{setSelectedChapter(chapter); GetSelectedChapterContent(index)}}
                    >
                        <ChapterListCard chapter={chapter} index={index} />
                    </div>
                ))}
            </div>
        </div>

        {/* Mobile Home Button */}
        <div className='md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b px-4 py-2 flex items-center gap-3'>
          <Link href='/dashboard'>
            <button className='flex items-center gap-1 text-sm text-gray-600 hover:text-primary'>
              <HiHome className='text-lg'/> Home
            </button>
          </Link>
          <span className='text-gray-300'>|</span>
          <span className='text-sm font-medium truncate'>{course?.courseOutput?.course?.name}</span>
        </div>

        {/* Content Div */}
        <div className='md:ml-72 mt-10 md:mt-0'>
            <ChapterContent chapter={selectedChapter} content={chapterContent}/>
        </div>
    </div>
  )
}

export default CourseStart