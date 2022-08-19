import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SurveyField from './surveyField';
import { schema } from './validationSchema';
import { useSelector, useDispatch } from 'react-redux';
import { surveyForm } from './surveyFormSlice';


export default function SurveyForm({ onSurveySubmit }) {
  // redux
  const surveyFormData = useSelector((state) => state.surveyFormData);
  const dispatch = useDispatch();

  // use-hook-form config
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const renderError = (inputName) => {
    if (errors[inputName]?.message) {
      return (
        <div className=''>
          <div>{errors[inputName]?.message}</div>
        </div>
      );
    } else {
      return '';
    }
  };

  // separate helper for rendering email error
  const renderEmailError = () => {
    const emailErrors = [];
    if (errors.recipientList) {
      errors.recipientList.forEach((item) => {
        emailErrors.push(item.message);
      });
      return (
        <div className=''>
          <div>{emailErrors}</div>
        </div>
      );
    }
  };

  const onSubmit = (data) => {
    onSurveySubmit();
    dispatch(surveyForm(data));
  };
  return (
    <div className='card w-96 bg-base-100 text-neutral-content shadow-xl'>
      <div className='card-body items-center text-center'>
        <form
          className='flex flex-col w-full text-neutral'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='card-title text-neutral'>Create a Survey</h2>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='surveyTitle' className='label'>
              <span className='label-text'>Survey Title:</span>
            </label>
            <input
              id='surveyTitle'
              type='text'
              placeholder='Subject Title'
              {...register('surveyTitle')}
              className={`input input-bordered ${
                errors.surveyTitle ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>
                {renderError('surveyTitle')}
              </span>
            </label>
          </div>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='surveySubject' className='label'>
              <span className='label-text'>Subject Line:</span>
            </label>
            <input
              id='surveySubject'
              type='text'
              placeholder='Subject Line'
              {...register('surveySubject')}
              className={`input input-bordered ${
                errors.surveySubject ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>
                {renderError('surveySubject')}
              </span>
            </label>
          </div>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='surveyQuestion' className='label'>
              <span className='label-text'>Survey Question:</span>
            </label>
            <input
              id='surveyQuestion'
              type='text'
              placeholder='Survey Question'
              {...register('surveyQuestion')}
              className={`input input-bordered ${
                errors.surveyQuestion ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>
                {renderError('surveyQuestion')}
              </span>
            </label>
          </div>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='recipientList' className='label'>
              <span className='label-text'>Recipient List:</span>
            </label>
            <input
              id='recipientList'
              type='text'
              placeholder='Recipient List'
              {...register('recipientList')}
              className={`input input-bordered ${
                errors.recipientList ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>
                {renderEmailError('recipientList')}
              </span>
            </label>
          </div>
          <div className='flex gap-4 justify-center'>
            <input
              className='btn btn-outline btn-accent'
              type='reset'
              onClick={() => reset({ keepErrors: false })}
            />
            <input className='btn btn-outline btn-primary' type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
}
