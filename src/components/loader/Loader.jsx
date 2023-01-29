import React from 'react';
import { useSelector } from 'react-redux';
import './Loader.scss';

const Loader = () => {
  const isLoading = useSelector(state => state.load.isLoading);

  return (
    isLoading
      ? <div className="app--container">
          <div className="app--container--loader"/>
        </div>
      : null
  );
};

export default Loader;
