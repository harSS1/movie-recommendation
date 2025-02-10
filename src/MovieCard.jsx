import React from 'react';
import { motion, useMotionValue,useTransform, useMotionValueEvent } from 'framer-motion';

const MovieCard = ({ movie, onSwipe }) => {
  const { title, poster_path, vote_average, original_language } = movie;
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150] , [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  
  // useMotionValueEvent(x, 'change', (latest) => {
  //   console.log(latest);
  // });
  
  const handleDragEnd = () => {
    if (x.get() > 100) {
      onSwipe(movie,"right")
    } else if (x.get() < -100) {
      onSwipe(movie, "left");
    }
  }

  return (
    <motion.img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} className="h-96 w-72 rounded-lg object-cover hover:cursor-grab active: cursor-grabbing" style={{ gridRow: 1, gridColumn: 1,x, opacity,rotate }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd} />
  )
}

export default MovieCard;