import React, { useState } from 'react';

interface FormProps {
  initialTitle: string;
  onSubmit: (title: string, description: string) => Promise<void>;
}

export const PublishToBlogForm = (props: FormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    await props.onSubmit(title, description);
  }

  return (
    <div>
      <h2>Publish to Blog</h2>
      <input
        type="text"
        defaultValue={props.initialTitle}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }}
      />
      <textarea
        value={description}
        placeholder='"I think this is a great article because..."'
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', height: '100px', padding: '8px', boxSizing: 'border-box' }}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  )
}