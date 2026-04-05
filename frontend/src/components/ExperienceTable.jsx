// ============================================================================
// EXPERIENCE TABLE COMPONENT - Updated Version
// Save as: src/components/ExperienceTable.jsx
// ============================================================================

import React, { useState } from 'react';

// ExperienceTable component receives 'data' as a prop (Task 4)
function ExperienceTable({ data, onDelete, onEdit }) {
    const [deletingId, setDeletingId] = useState(null);

    // Handle delete with confirmation
    const handleDelete = (expId) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            setDeletingId(expId);
            onDelete(expId);
            setTimeout(() => setDeletingId(null), 500);
        }
    };

    // Handle empty data
    if (!data || data.length === 0) {
        return (
            <div className="empty-state">
                <p>No work experience added yet.</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Click "Add Experience" to get started!</p>
            </div>
        );
    }

    return (
        <table className="experience-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Job Title</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Company</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Years</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* Use .map() to generate table rows (Task 4) */}
                {data.map((job) => (
                    <tr key={job.ExpID} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            <strong>{job.JobTitle}</strong>
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            {job.CompanyName}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            {job.YearsWorked} year{job.YearsWorked > 1 ? 's' : ''}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            <button 
                                onClick={() => onEdit(job)}
                                style={{
                                    marginRight: '10px',
                                    padding: '5px 10px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(job.ExpID)}
                                disabled={deletingId === job.ExpID}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: deletingId === job.ExpID ? '#ccc' : '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: deletingId === job.ExpID ? 'not-allowed' : 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    if (deletingId !== job.ExpID) e.target.style.backgroundColor = '#da190b';
                                }}
                                onMouseLeave={(e) => {
                                    if (deletingId !== job.ExpID) e.target.style.backgroundColor = '#f44336';
                                }}
                            >
                                {deletingId === job.ExpID ? 'Deleting...' : 'Delete'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExperienceTable;