// ============================================================================
// ADD EXPERIENCE COMPONENT - Separate File Version
// Save as: src/components/AddExperience.jsx
// ============================================================================

import React, { useState } from 'react';

function AddExperience({ userId, onSave }) {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [yearsWorked, setYearsWorked] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [jobTitleError, setJobTitleError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [yearsWorkedError, setYearsWorkedError] = useState('');

    // handleSave function (Task 8)
    const handleSave = async () => {
       
        if(!jobTitle)
        {
            setJobTitleError('Job title is required')
            return;
        }
         if(!companyName)
        {
            setCompanyNameError('Company Name is required')
             return;
        }
         if(!yearsWorked)
        {
            setYearsWorkedError('Number of years worked is required')
             return;
        }

        
        setIsSubmitting(true);
        setMessage('');
        
        try {
            // POST request to backend (Task 8)
            const response = await fetch('http://localhost:5000/api/addExp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserID: userId,
                    JobTitle: jobTitle,
                    CompanyName: companyName,
                    YearsWorked: parseInt(yearsWorked)
                })
            });
            
            const result = await response.json();
            console.log('Save result:', result);
            
            if (result.success) {
                setMessage('Experience added successfully!');
                setJobTitle('');
                setCompanyName('');
                setYearsWorked('');
                onSave();  // Refresh the list
            } else {
                setMessage('Error: ' + result.message);
            }
        } catch (error) {
            setMessage('Failed to save experience');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-form-container">
            <h3>Add New Experience</h3>
            <div className="add-form">
                <div className="input-field">
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => {
                            setJobTitle(e.target.value);
                            setJobTitleError('');
                        }}
                        placeholder="Job Title *"
                    />
                    {jobTitleError && <span className="error-text">* {jobTitleError}</span>}
                </div>
                
                <div className="input-field">
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => {
                            setCompanyName(e.target.value);
                            setCompanyNameError('');
                        }}
                        placeholder="Company Name *"
                    />
                    {companyNameError && <span className="error-text">* {companyNameError}</span>}
                </div>
                
                <div className="input-field">
                    <input
                        type="number"
                        value={yearsWorked}
                        onChange={(e) => {
                            setYearsWorked(e.target.value);
                            setYearsWorkedError('');
                        }}
                        placeholder="Years Worked *"
                        min="1"
                    />
                    {yearsWorkedError && <span className="error-text">* {yearsWorkedError}</span>}
                </div>
                
                <div className="button-field">
                   <button onClick={handleSave} disabled={isSubmitting || !jobTitle || !companyName || !yearsWorked}>
    {isSubmitting ? 'Saving...' : 'Add Experience'}
</button>
                </div>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddExperience;