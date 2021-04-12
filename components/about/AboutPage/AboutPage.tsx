import React from 'react';

const AboutPage = () => {
  return (
    <div className='container min-h-screen px-4 pt-20 mx-auto sm:px-6 md:px-8 lg:pt-0'>
      <h1>About</h1>
      <ul className='space-y-8'>
        <li id='images'>NASA Image and Video Library</li>
        <li id='epic'>EPIC: Earth Polychromatic Imaging Camera</li>
        <li id='apod'>Astronomy Picture of the Day</li>
      </ul>
    </div>
  );
};

export default AboutPage;
