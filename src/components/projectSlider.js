import React, { useState, useEffect, useRef } from 'react';
import { ProjectData  } from './projectData';
import {ReactComponent as Cursor} from './../assets/images/cursorDark.svg';

const ProjectSlider = ({setBackground}) => {
  const [current, setCurrent] = useState(0);
  const length = ProjectData.length;

  

  useEffect(() => {
    setBackground(current);
  }, [current, setBackground]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Touch swipe support
  const touchStartXRef = useRef(null);
  const swipedRef = useRef(false);
  const SWIPE_THRESHOLD = 40; // px

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    swipedRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (touchStartXRef.current == null || swipedRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      swipedRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    swipedRef.current = false;
  };

  if (!Array.isArray(ProjectData) || ProjectData.length <= 0) {
    return null;
  }

  return (
    <section
      className='slider'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Cursor className='left-arrow' onClick={prevSlide} />
      <Cursor className='right-arrow' onClick={nextSlide} />
      {ProjectData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
            onClick={() => setCurrent(index)}
          > 
              {/* <img src={slide.img} alt='project image' className='image' /> */}
              {/* <h4>{slide.title}</h4>
              <p>{slide.description}</p>
              <p>{slide.stack}</p>
              <a href={slide.link}>visit</a> */}
            {index === current && (
                <>
              <img src={slide.img} alt='project image' className='image' />
              <div className='detail'>
                  <h4>{slide.title}</h4>
                  <p className='desc'>{slide.description}</p>
                  <span>
                  <p className='stack'>{slide.stack}</p>
                  <a href={slide.link} target='_blank' rel='noopener noreferrer'>visit ↵</a>
                  </span>
              </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ProjectSlider;