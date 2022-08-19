import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './surveyFormReview';

export default function SurveyNew() {
  const [showReviewForm, setShowReviewForm] = useState(false);

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
