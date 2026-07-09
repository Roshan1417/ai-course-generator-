import React, { useState } from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

function ChapterContent({chapter, content}) {
    const [videoError, setVideoError] = useState(false);

  return (
    <div className='p-10'>
        <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
        <p className='text-gray-500'>{chapter?.about}</p>
        
        {/* Video  */}
        <div className='flex justify-center my-6'>
            {content?.videoId && !videoError ? (
                <YouTube
                    videoId={content.videoId}
                    opts={opts}
                    onError={() => setVideoError(true)}
                />
            ) : (
                <div className='w-[640px] h-[390px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300'>
                    <svg className='w-16 h-16 mb-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
                    </svg>
                    <p className='font-medium'>Video unavailable</p>
                    <p className='text-sm text-gray-400 mt-1'>
                        {!content?.videoId ? 'No video was found for this chapter' : 'This video cannot be embedded'}
                    </p>
                    {content?.videoId && (
                        <a
                            href={`https://www.youtube.com/watch?v=${content.videoId}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-3 text-sm text-blue-500 hover:underline'
                        >
                            Watch on YouTube →
                        </a>
                    )}
                </div>
            )}
        </div>

        {/* Content  */}
        <div>
            {content?.content?.map((item,index)=>(
                <div key={index} className='p-5 bg-purple-50 shadow-sm mb-3 rounded-lg'>
                    <h2 className='font-medium text-2xl'>{item.title}</h2>
                    <ReactMarkdown className='text-lg text-black leading-9'>{item?.description || item?.explanation}</ReactMarkdown>
                  { item.codeExample && 
                  <div className='p-4 bg-black text-white rounded-md mt-3'>
                        <pre>
                            <code>{item.codeExample.replace('<precode>','').replace('</precode>','')}</code>
                        </pre>
                    </div>}
                    { item.code && 
                  <div className='p-4 bg-black text-white rounded-md mt-3'>
                        <pre>
                            <code>{item.code.replace('<precode>','').replace('</precode>','')}</code>
                        </pre>
                    </div>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterContent