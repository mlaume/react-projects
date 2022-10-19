import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0);
  // as the value of index changes the props data will be changing, default  index 0
  const {name, job, image, text} = people[index];

  const checkNumber = (num) => {
    // i.e. people length is 5
    // if the next arrow index is 6 we want to go to the beginning which is 0
    if(num > people.length - 1){
      return 0;
    }
    // if you go backwards into negative numbers, go to the end of the list length
    if(num < 0) {
      return people.length - 1;
    }
    // else return num as is
    return num;
  }
  const nextPerson = () => {
    console.log("next", index);
    setIndex((index) =>{
      let newIndex = index + 1;
      return checkNumber(newIndex);
    })
  };
  const prevPerson = () => {
    console.log("prev", index);
    setIndex((index) =>{
      let newIndex = index - 1;
      return checkNumber(newIndex);
    })
  };
  const randomPerson = () => {
    //  math.random gives random num between 0 and 1 by lenght of array rounded down to give a random index
    let randomNum = Math.floor(Math.random() * people.length);
    console.log('random', randomNum);
    //  in the case the random num is the same as before add 1
    if(randomNum === index) {
      randomNum = index + 1;
    }
    //  adding 1 might make it out of index so we want to use the checker function
    setIndex(checkNumber(randomNum));
  };

  console.log('people', people);
  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className='person-img'/>
      <span className="quote-icon">
        <FaQuoteRight/>
      </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft/>
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight/>
        </button>
      </div>
      <button className="random-btn" onClick={randomPerson}>
        Surprise Me
      </button>
    </article>
  );
};

export default Review;
