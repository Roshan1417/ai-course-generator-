import React from 'react'
import { HiOutlineCheckCircle } from "react-icons/hi2";

const Upgrade = () => {
  return (
    <div>
      <h2 className='text-3xl font-bold text-center'>Upgrade Your Plan</h2>
      <p className='text-center text-gray-500 mt-2'>
        Unlock unlimited course generation and premium features
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-3xl mx-auto'>
        {/* Free Plan */}
        <div className='border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow'>
          <h3 className='font-bold text-2xl'>Free</h3>
          <p className='text-gray-500 mt-1'>Get started for free</p>
          <h2 className='font-bold text-4xl mt-5'>
            $0
            <span className='text-lg font-normal text-gray-500'>/month</span>
          </h2>

          <ul className='mt-8 space-y-4'>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>5 Course Generation</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>Basic Support</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>Access to All Templates</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>YouTube Video Integration</span>
            </li>
          </ul>

          <button className='w-full mt-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-purple-50 transition-colors'>
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className='border-2 border-primary rounded-2xl p-8 shadow-lg relative'>
          <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium'>
            Recommended
          </div>
          <h3 className='font-bold text-2xl'>Pro</h3>
          <p className='text-gray-500 mt-1'>For power users</p>
          <h2 className='font-bold text-4xl mt-5'>
            $9.99
            <span className='text-lg font-normal text-gray-500'>/month</span>
          </h2>

          <ul className='mt-8 space-y-4'>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span className='font-medium'>Unlimited Course Generation</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>Priority Support</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>Access to All Templates</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>YouTube Video Integration</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>Advanced AI Content</span>
            </li>
            <li className='flex items-center gap-3'>
              <HiOutlineCheckCircle className='text-primary text-xl flex-none' />
              <span>Custom Course Branding</span>
            </li>
          </ul>

          <button className='w-full mt-8 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity'>
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Upgrade