import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <div>
        <Link to='/surveys/new'>
          <button className='btn btn-lg btn-primary absolute bottom-12 right-12'>
            Add Survey
          </button>
        </Link>
      </div>
    </div>
  );
}
