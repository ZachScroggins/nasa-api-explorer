import { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='flex h-screen overflow-hidden bg-white'>
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        <Transition show={isOpen}>
          <div
            className='fixed inset-0 z-40 flex lg:hidden'
            role='dialog'
            aria-modal='true'
          >
            <Transition.Child
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div
                className='fixed inset-0 bg-gray-600 bg-opacity-75'
                aria-hidden='true'
              />
            </Transition.Child>
            <Transition.Child
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex flex-col flex-1 w-screen h-screen max-w-xs bg-white focus:outline-none'>
                <Transition.Child
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 pt-2 -mr-12'>
                    <button
                      type='button'
                      className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setIsOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      {/* Heroicon name: outline/x */}
                      <svg
                        className='w-6 h-6 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                  <div className='flex items-center flex-shrink-0 px-4'>
                    <img
                      className='w-auto h-8'
                      src='https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg'
                      alt='Workflow'
                    />
                  </div>
                  <nav aria-label='Sidebar' className='mt-5'>
                    <div className='px-2 space-y-1'>
                      {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                      <Link href='/'>
                        <a className='flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-gray-100 rounded-md group'>
                          {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                          {/* Heroicon name: outline/home */}
                          <svg
                            className='flex-shrink-0 w-6 h-6 mr-4 text-gray-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                            />
                          </svg>
                          Home
                        </a>
                      </Link>
                      <Link href='/images'>
                        <a className='flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'>
                          {/* Heroicon name: outline/calendar */}
                          <svg
                            className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          Image Library
                        </a>
                      </Link>
                      <Link href='/epic'>
                        <a className='flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'>
                          {/* Heroicon name: outline/user-group */}
                          <svg
                            className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                            />
                          </svg>
                          Earth Polychromatic Imaging Camera
                        </a>
                      </Link>
                      <Link href='/apod'>
                        <a className='flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'>
                          {/* Heroicon name: outline/search-circle */}
                          <svg
                            className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          Astronomy Picture of the Day
                        </a>
                      </Link>
                    </div>
                    <hr
                      className='my-5 border-t border-gray-200'
                      aria-hidden='true'
                    />
                    <div className='px-2 space-y-1'>
                      <a
                        href='https://github.com/ZachScroggins/nasa-api-explorer'
                        className='flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                      >
                        {/* Heroicon name: outline/view-grid-add */}
                        <svg
                          className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
                          />
                        </svg>
                        GitHub
                      </a>
                      <a
                        href='https://zachscroggins.com'
                        className='flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                      >
                        {/* Heroicon name: outline/cog */}
                        <svg
                          className='flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        My Work
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Transition>
        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:flex-shrink-0'>
          <div className='flex flex-col w-64'>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200'>
              <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
                <div className='flex items-center flex-shrink-0 px-4'>
                  <img
                    className='w-auto h-8'
                    src='https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg'
                    alt='Workflow'
                  />
                </div>
                <nav className='flex-1 mt-5' aria-label='Sidebar'>
                  <div className='px-2 space-y-1'>
                    {/* Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                    <Link href='/'>
                      <a className='flex items-center px-2 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md group'>
                        {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                        {/* Heroicon name: outline/home */}
                        <svg
                          className='flex-shrink-0 w-6 h-6 mr-3 text-gray-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                          />
                        </svg>
                        Home
                      </a>
                    </Link>
                    <Link href='/images'>
                      <a className='flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'>
                        {/* Heroicon name: outline/calendar */}
                        <svg
                          className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        Image Library
                      </a>
                    </Link>
                    <Link href='/epic'>
                      <a className='flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'>
                        {/* Heroicon name: outline/user-group */}
                        <svg
                          className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                          />
                        </svg>
                        Earth Polychromatic Imaging Camera
                      </a>
                    </Link>
                    <Link href='/apod'>
                      <a className='flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'>
                        {/* Heroicon name: outline/search-circle */}
                        <svg
                          className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        Astronomy Picture of the Day
                      </a>
                    </Link>
                  </div>
                  <hr
                    className='my-5 border-t border-gray-200'
                    aria-hidden='true'
                  />
                  <div className='flex-1 px-2 space-y-1'>
                    <a
                      href='https://github.com/ZachScroggins/nasa-api-explorer'
                      className='flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                    >
                      {/* Heroicon name: outline/view-grid-add */}
                      <svg
                        className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
                        />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href='https://zachscroggins.com'
                      className='flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group'
                    >
                      {/* Heroicon name: outline/cog */}
                      <svg
                        className='flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      My Work
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 min-w-0 overflow-hidden'>
          <div className='lg:hidden'>
            <div className='flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5'>
              <div>
                <img
                  className='w-auto h-8'
                  src='https://tailwindui.com/img/logos/workflow-mark-pink-500.svg'
                  alt='Workflow'
                />
              </div>
              <div>
                <button
                  type='button'
                  className='inline-flex items-center justify-center w-12 h-12 -mr-3 text-gray-500 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600'
                  onClick={() => setIsOpen(true)}
                >
                  <span className='sr-only'>Open sidebar</span>
                  {/* Heroicon name: outline/menu */}
                  <svg
                    className='w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className='relative z-0 flex flex-1 overflow-hidden'>
            <main
              className='relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last'
              tabIndex={0}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
