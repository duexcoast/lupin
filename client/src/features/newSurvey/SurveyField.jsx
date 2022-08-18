import React from 'react';

export default function SurveyField({ placeholder, registration, register }) {
  return (
    <>
      <input
        type='text'
        className='input input-bordered input-primary w-full max-w-xs'
        placeholder={placeholder}
        {...register("surveyTitle", {required: ttrue})}
      />
    </>
  );
}
