import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './surveyFormReview';
import { surveyForm } from './surveyFormSlice';

export default function SurveyNew() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  //redux
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.surveyFormData);

  useEffect(() => {
    dispatch(surveyForm(null));
  }, []);

  const renderContent = () => {
    if (showReviewForm) {
      return <SurveyFormReview onCancel={() => setShowReviewForm(false)} />;
    }
    return <SurveyForm onSurveySubmit={() => setShowReviewForm(true)} />;
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      {renderContent()}
    </div>
  );
}
