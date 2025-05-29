import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { firstNameAtom, lastNameAtom, ageAtom, hobbiesAtom } from '../atoms/user.atom';

const User: React.FC = () => {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [hobbies, setHobbies] = useAtom(hobbiesAtom);

  // Form state
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const availableHobbies = ['Reading', 'Gaming', 'Sports', 'Music', 'Cooking', 'Travel'];

  const handleHobbyChange = (hobby: string) => {
    setSelectedHobbies(prev => 
      prev.includes(hobby) 
        ? prev.filter(h => h !== hobby)
        : [...prev, hobby]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFirstName(formFirstName);
    setLastName(formLastName);
    setAge(parseInt(formAge) || 0);
    setHobbies(selectedHobbies);
    
    // Reset form
    setFormFirstName('');
    setFormLastName('');
    setFormAge('');
    setSelectedHobbies([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>Current User Info:</h2>
        <div><strong>First Name:</strong> <span>{firstName || 'Not set'}</span></div>
        <div><strong>Last Name:</strong> <span>{lastName || 'Not set'}</span></div>
        <div><strong>Age:</strong> <span>{age || 'Not set'}</span></div>
        <div><strong>Hobbies:</strong> <span>{hobbies.length > 0 ? hobbies.join(', ') : 'None'}</span></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Update User Info:</h2>
        
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={formFirstName}
            onChange={(e) => setFormFirstName(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={formLastName}
            onChange={(e) => setFormLastName(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            value={formAge}
            onChange={(e) => setFormAge(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div>
          <label>Hobbies:</label>
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableHobbies.map(hobby => (
              <label key={hobby} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="checkbox"
                  checked={selectedHobbies.includes(hobby)}
                  onChange={() => handleHobbyChange(hobby)}
                />
                {hobby}
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default User;