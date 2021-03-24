import React from 'react';

export default function test() {
  return (
    <>
      {/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
extend: {
  colors: {
    rose: colors.rose,
  }
}
    },
    plugins: [
// ...
require('@tailwindcss/forms'),
require('@tailwindcss/typography'),
    ]
  }
  ```
*/}
      <div className='flex h-screen overflow-hidden bg-white'>
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}

        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:flex-shrink-0'>
          <div className='flex flex-col w-64'>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex flex-col flex-1 h-0'>
              <div className='flex items-center flex-shrink-0 h-16 px-4 bg-gray-900'>
                <img
                  className='w-auto h-8'
                  src='https://tailwindui.com/img/logos/workflow-logo-rose-500-mark-white-text.svg'
                  alt='Workflow'
                />
              </div>
              <div className='flex flex-col flex-1 overflow-y-auto'>
                <nav className='flex-1 px-2 py-4 bg-gray-800'>
                  <div className='space-y-1'>
                    {/* Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                    <a
                      href='#'
                      className='flex items-center px-2 py-2 text-sm font-medium text-white bg-gray-900 rounded-md group'
                    >
                      {/* Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" */}
                      {/* Heroicon name: outline/home */}
                      <svg
                        className='w-6 h-6 mr-3 text-gray-300'
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
                      All Issues
                    </a>
                    <a
                      href='#'
                      className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
                    >
                      {/* Heroicon name: outline/view-list */}
                      <svg
                        className='w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300'
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
                          d='M4 6h16M4 10h16M4 14h16M4 18h16'
                        />
                      </svg>
                      My Issues
                    </a>
                    <a
                      href='#'
                      className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
                    >
                      {/* Heroicon name: outline/user-circle */}
                      <svg
                        className='w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300'
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
                          d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      Assigned
                    </a>
                    <a
                      href='#'
                      className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
                    >
                      {/* Heroicon name: outline/archive */}
                      <svg
                        className='w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300'
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
                          d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                        />
                      </svg>
                      Closed
                    </a>
                    <a
                      href='#'
                      className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
                    >
                      {/* Heroicon name: outline/clock */}
                      <svg
                        className='w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300'
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
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      Recent
                    </a>
                  </div>
                  <div className='mt-10'>
                    <p className='px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase'>
                      Projects
                    </p>
                    <div className='mt-2 space-y-1'>
                      <a
                        href='#'
                        className='flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700'
                      >
                        <span className='truncate'>GraphQL API</span>
                      </a>
                      <a
                        href='#'
                        className='flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700'
                      >
                        <span className='truncate'>iOS App</span>
                      </a>
                      <a
                        href='#'
                        className='flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700'
                      >
                        <span className='truncate'>
                          Marketing Site Redesign
                        </span>
                      </a>
                      <a
                        href='#'
                        className='flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md group hover:text-white hover:bg-gray-700'
                      >
                        <span className='truncate'>Customer Portal</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 w-0 overflow-hidden'>
          <div className='relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200'>
            <button
              type='button'
              className='px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:hidden'
            >
              <span className='sr-only'>Open sidebar</span>
              {/* Heroicon name: outline/menu-alt-2 */}
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
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            </button>
            <div className='flex justify-between flex-1 px-4'>
              <div className='flex flex-1'>
                <form className='flex w-full lg:ml-0' action='#' method='GET'>
                  <label htmlFor='search_field' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                    <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                      {/* Heroicon name: solid/search */}
                      <svg
                        className='w-5 h-5'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <input
                      id='search_field'
                      className='block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                      placeholder='Search'
                      type='search'
                      name='search'
                    />
                  </div>
                </form>
              </div>
              <div className='flex items-center ml-4 lg:ml-6'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <main
            className='relative flex-1 overflow-y-auto focus:outline-none'
            tabIndex={-1}
          >
            <div className='py-8 xl:py-10'>
              <div className='max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3'>
                <div className='xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200'>
                  <div>
                    <div>
                      <div className='md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6'>
                        <div>
                          <h1 className='text-2xl font-bold text-gray-900'>
                            ARIA attribute misspelled
                          </h1>
                          <p className='mt-2 text-sm text-gray-500'>
                            #400 opened by
                            <a href='#' className='font-medium text-gray-900'>
                              Hilary Mahy
                            </a>
                            in
                            <a href='#' className='font-medium text-gray-900'>
                              Customer Portal
                            </a>
                          </p>
                        </div>
                        <div className='flex mt-4 space-x-3 md:mt-0'>
                          <button
                            type='button'
                            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                          >
                            {/* Heroicon name: solid/pencil */}
                            <svg
                              className='w-5 h-5 mr-2 -ml-1 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                            </svg>
                            <span>Edit</span>
                          </button>
                          <button
                            type='button'
                            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                          >
                            {/* Heroicon name: solid/bell */}
                            <svg
                              className='w-5 h-5 mr-2 -ml-1 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
                            </svg>
                            <span>Subscribe</span>
                          </button>
                        </div>
                      </div>
                      <aside className='mt-8 xl:hidden'>
                        <h2 className='sr-only'>Details</h2>
                        <div className='space-y-5'>
                          <div className='flex items-center space-x-2'>
                            {/* Heroicon name: solid/lock-open */}
                            <svg
                              className='w-5 h-5 text-green-500'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path d='M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z' />
                            </svg>
                            <span className='text-sm font-medium text-green-700'>
                              Open Issue
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            {/* Heroicon name: solid/chat-alt */}
                            <svg
                              className='w-5 h-5 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span className='text-sm font-medium text-gray-900'>
                              4 comments
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            {/* Heroicon name: solid/calendar */}
                            <svg
                              className='w-5 h-5 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span className='text-sm font-medium text-gray-900'>
                              Created on{' '}
                              <time dateTime='2020-12-02'>Dec 2, 2020</time>
                            </span>
                          </div>
                        </div>
                        <div className='py-6 mt-6 space-y-8 border-t border-b border-gray-200'>
                          <div>
                            <h2 className='text-sm font-medium text-gray-500'>
                              Assignees
                            </h2>
                            <ul className='mt-3 space-y-3'>
                              <li className='flex justify-start'>
                                <a
                                  href='#'
                                  className='flex items-center space-x-3'
                                >
                                  <div className='flex-shrink-0'>
                                    <img
                                      className='w-5 h-5 rounded-full'
                                      src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                      alt=''
                                    />
                                  </div>
                                  <div className='text-sm font-medium text-gray-900'>
                                    Eduardo Benz
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h2 className='text-sm font-medium text-gray-500'>
                              Tags
                            </h2>
                            <ul className='mt-2 leading-8'>
                              <li className='inline'>
                                <a
                                  href='#'
                                  className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                                >
                                  <div className='absolute flex items-center justify-center flex-shrink-0'>
                                    <span
                                      className='h-1.5 w-1.5 rounded-full bg-rose-500'
                                      aria-hidden='true'
                                    />
                                  </div>
                                  <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                    Bug
                                  </div>
                                </a>
                              </li>
                              <li className='inline'>
                                <a
                                  href='#'
                                  className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                                >
                                  <div className='absolute flex items-center justify-center flex-shrink-0'>
                                    <span
                                      className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                                      aria-hidden='true'
                                    />
                                  </div>
                                  <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                    Accessibility
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </aside>
                      <div className='py-3 xl:pt-6 xl:pb-0'>
                        <h2 className='sr-only'>Description</h2>
                        <div className='prose max-w-none'>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Expedita, hic? Commodi cumque similique id
                            tempora molestiae deserunt at suscipit, dolor
                            voluptatem, numquam, harum consequatur laboriosam
                            voluptas tempore aut voluptatum alias?
                          </p>
                          <ul>
                            <li>
                              Tempor ultrices proin nunc fames nunc ut auctor
                              vitae sed. Eget massa parturient vulputate
                              fermentum id facilisis nam pharetra. Aliquet leo
                              tellus.
                            </li>
                            <li>
                              Turpis ac nunc adipiscing adipiscing metus
                              tincidunt senectus tellus.
                            </li>
                            <li>
                              Semper interdum porta sit tincidunt. Dui
                              suspendisse scelerisque amet metus eget sed. Ut
                              tellus in sed dignissim.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section
                    aria-labelledby='activity-title'
                    className='mt-8 xl:mt-10'
                  >
                    <div>
                      <div className='divide-y divide-gray-200'>
                        <div className='pb-4'>
                          <h2
                            id='activity-title'
                            className='text-lg font-medium text-gray-900'
                          >
                            Activity
                          </h2>
                        </div>
                        <div className='pt-6'>
                          {/* Activity feed*/}
                          <div className='flow-root'>
                            <ul className='-mb-8'>
                              <li>
                                <div className='relative pb-8'>
                                  <span
                                    className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
                                    aria-hidden='true'
                                  />
                                  <div className='relative flex items-start space-x-3'>
                                    <div className='relative'>
                                      <img
                                        className='flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full ring-8 ring-white'
                                        src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                        alt=''
                                      />
                                      <span className='absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px'>
                                        {/* Heroicon name: solid/chat-alt */}
                                        <svg
                                          className='w-5 h-5 text-gray-400'
                                          xmlns='http://www.w3.org/2000/svg'
                                          viewBox='0 0 20 20'
                                          fill='currentColor'
                                          aria-hidden='true'
                                        >
                                          <path
                                            fillRule='evenodd'
                                            d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                                            clipRule='evenodd'
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                      <div>
                                        <div className='text-sm'>
                                          <a
                                            href='#'
                                            className='font-medium text-gray-900'
                                          >
                                            Eduardo Benz
                                          </a>
                                        </div>
                                        <p className='mt-0.5 text-sm text-gray-500'>
                                          Commented 6d ago
                                        </p>
                                      </div>
                                      <div className='mt-2 text-sm text-gray-700'>
                                        <p>
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Tincidunt
                                          nunc ipsum tempor purus vitae id.
                                          Morbi in vestibulum nec varius. Et
                                          diam cursus quis sed purus nam.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className='relative pb-8'>
                                  <span
                                    className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
                                    aria-hidden='true'
                                  />
                                  <div className='relative flex items-start space-x-3'>
                                    <div>
                                      <div className='relative px-1'>
                                        <div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-8 ring-white'>
                                          {/* Heroicon name: solid/user-circle */}
                                          <svg
                                            className='w-5 h-5 text-gray-500'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                          >
                                            <path
                                              fillRule='evenodd'
                                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                                              clipRule='evenodd'
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='min-w-0 flex-1 py-1.5'>
                                      <div className='text-sm text-gray-500'>
                                        <a
                                          href='#'
                                          className='font-medium text-gray-900'
                                        >
                                          Hilary Mahy
                                        </a>
                                        assigned
                                        <a
                                          href='#'
                                          className='font-medium text-gray-900'
                                        >
                                          Kristin Watson
                                        </a>
                                        <span className='whitespace-nowrap'>
                                          2d ago
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className='relative pb-8'>
                                  <span
                                    className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
                                    aria-hidden='true'
                                  />
                                  <div className='relative flex items-start space-x-3'>
                                    <div>
                                      <div className='relative px-1'>
                                        <div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-8 ring-white'>
                                          {/* Heroicon name: solid/tag */}
                                          <svg
                                            className='w-5 h-5 text-gray-500'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                          >
                                            <path
                                              fillRule='evenodd'
                                              d='M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z'
                                              clipRule='evenodd'
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='flex-1 min-w-0 py-0'>
                                      <div className='text-sm leading-8 text-gray-500'>
                                        <span className='mr-0.5'>
                                          <a
                                            href='#'
                                            className='font-medium text-gray-900'
                                          >
                                            Hilary Mahy
                                          </a>
                                          added tags
                                        </span>
                                        <span className='mr-0.5'>
                                          <a
                                            href='#'
                                            className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm'
                                          >
                                            <span className='absolute flex items-center justify-center flex-shrink-0'>
                                              <span
                                                className='h-1.5 w-1.5 rounded-full bg-rose-500'
                                                aria-hidden='true'
                                              />
                                            </span>
                                            <span className='ml-3.5 font-medium text-gray-900'>
                                              Bug
                                            </span>
                                          </a>
                                          <a
                                            href='#'
                                            className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm'
                                          >
                                            <span className='absolute flex items-center justify-center flex-shrink-0'>
                                              <span
                                                className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                                                aria-hidden='true'
                                              />
                                            </span>
                                            <span className='ml-3.5 font-medium text-gray-900'>
                                              Accessibility
                                            </span>
                                          </a>
                                        </span>
                                        <span className='whitespace-nowrap'>
                                          6h ago
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className='relative pb-8'>
                                  <div className='relative flex items-start space-x-3'>
                                    <div className='relative'>
                                      <img
                                        className='flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full ring-8 ring-white'
                                        src='https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                        alt=''
                                      />
                                      <span className='absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px'>
                                        {/* Heroicon name: solid/chat-alt */}
                                        <svg
                                          className='w-5 h-5 text-gray-400'
                                          xmlns='http://www.w3.org/2000/svg'
                                          viewBox='0 0 20 20'
                                          fill='currentColor'
                                          aria-hidden='true'
                                        >
                                          <path
                                            fillRule='evenodd'
                                            d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                                            clipRule='evenodd'
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                      <div>
                                        <div className='text-sm'>
                                          <a
                                            href='#'
                                            className='font-medium text-gray-900'
                                          >
                                            Jason Meyers
                                          </a>
                                        </div>
                                        <p className='mt-0.5 text-sm text-gray-500'>
                                          Commented 2h ago
                                        </p>
                                      </div>
                                      <div className='mt-2 text-sm text-gray-700'>
                                        <p>
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Tincidunt
                                          nunc ipsum tempor purus vitae id.
                                          Morbi in vestibulum nec varius. Et
                                          diam cursus quis sed purus nam.
                                          Scelerisque amet elit non sit ut
                                          tincidunt condimentum. Nisl ultrices
                                          eu venenatis diam.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='mt-6'>
                            <div className='flex space-x-3'>
                              <div className='flex-shrink-0'>
                                <div className='relative'>
                                  <img
                                    className='flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full ring-8 ring-white'
                                    src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                    alt=''
                                  />
                                  <span className='absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px'>
                                    {/* Heroicon name: solid/chat-alt */}
                                    <svg
                                      className='w-5 h-5 text-gray-400'
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      aria-hidden='true'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              <div className='flex-1 min-w-0'>
                                <form action='#'>
                                  <div>
                                    <label
                                      htmlFor='comment'
                                      className='sr-only'
                                    >
                                      Comment
                                    </label>
                                    <textarea
                                      id='comment'
                                      name='comment'
                                      rows={3}
                                      className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                      placeholder='Leave a comment'
                                      defaultValue={''}
                                    />
                                  </div>
                                  <div className='flex items-center justify-end mt-6 space-x-4'>
                                    <button
                                      type='button'
                                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                                    >
                                      {/* Heroicon name: solid/check-circle */}
                                      <svg
                                        className='w-5 h-5 mr-2 -ml-1 text-green-500'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                        aria-hidden='true'
                                      >
                                        <path
                                          fillRule='evenodd'
                                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                          clipRule='evenodd'
                                        />
                                      </svg>
                                      <span>Close issue</span>
                                    </button>
                                    <button
                                      type='submit'
                                      className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                                    >
                                      Comment
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <aside className='hidden xl:block xl:pl-8'>
                  <h2 className='sr-only'>Details</h2>
                  <div className='space-y-5'>
                    <div className='flex items-center space-x-2'>
                      {/* Heroicon name: solid/lock-open */}
                      <svg
                        className='w-5 h-5 text-green-500'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path d='M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z' />
                      </svg>
                      <span className='text-sm font-medium text-green-700'>
                        Open Issue
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      {/* Heroicon name: solid/chat-alt */}
                      <svg
                        className='w-5 h-5 text-gray-400'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-sm font-medium text-gray-900'>
                        4 comments
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      {/* Heroicon name: solid/calendar */}
                      <svg
                        className='w-5 h-5 text-gray-400'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-sm font-medium text-gray-900'>
                        Created on{' '}
                        <time dateTime='2020-12-02'>Dec 2, 2020</time>
                      </span>
                    </div>
                  </div>
                  <div className='py-6 mt-6 space-y-8 border-t border-gray-200'>
                    <div>
                      <h2 className='text-sm font-medium text-gray-500'>
                        Assignees
                      </h2>
                      <ul className='mt-3 space-y-3'>
                        <li className='flex justify-start'>
                          <a href='#' className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                              <img
                                className='w-5 h-5 rounded-full'
                                src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                alt=''
                              />
                            </div>
                            <div className='text-sm font-medium text-gray-900'>
                              Eduardo Benz
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className='text-sm font-medium text-gray-500'>
                        Tags
                      </h2>
                      <ul className='mt-2 leading-8'>
                        <li className='inline'>
                          <a
                            href='#'
                            className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                          >
                            <div className='absolute flex items-center justify-center flex-shrink-0'>
                              <span
                                className='h-1.5 w-1.5 rounded-full bg-rose-500'
                                aria-hidden='true'
                              />
                            </div>
                            <div className='ml-3.5 text-sm font-medium text-gray-900'>
                              Bug
                            </div>
                          </a>
                        </li>
                        <li className='inline'>
                          <a
                            href='#'
                            className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                          >
                            <div className='absolute flex items-center justify-center flex-shrink-0'>
                              <span
                                className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                                aria-hidden='true'
                              />
                            </div>
                            <div className='ml-3.5 text-sm font-medium text-gray-900'>
                              Accessibility
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
