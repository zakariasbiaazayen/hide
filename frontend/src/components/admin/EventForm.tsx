import React, { useState } from 'react';
import { Event, EventType, Theme, RegistrationField, InfoBlock, FieldType } from '../../types/event';

interface EventFormProps {
  event?: Event;
  mode: 'create' | 'edit';
  onSave: (event: Event) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ event, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Event>(event || {
    id: Date.now().toString(),
    title: '',
    image: '',
    description: '',
    date: '',
    time: '',
    type: 'workshop',
    themes: [],
    registrationFields: [],
    infoBlocks: []
  });

  const [activeSection, setActiveSection] = useState<'basic' | 'themes' | 'registration' | 'info'>('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTheme = () => {
    const newTheme: Theme = {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      date: formData.date,
      time: formData.time,
      age: '',
      price: 0,
      driveLink: ''
    };
    setFormData({ ...formData, themes: [...formData.themes, newTheme] });
  };

  const updateTheme = (index: number, field: keyof Theme, value: string | number) => {
    const newThemes = [...formData.themes];
    newThemes[index] = { ...newThemes[index], [field]: value };
    setFormData({ ...formData, themes: newThemes });
  };

  const removeTheme = (index: number) => {
    setFormData({ ...formData, themes: formData.themes.filter((_, i) => i !== index) });
  };

  const addRegistrationField = () => {
    const newField: RegistrationField = {
      id: Date.now().toString(),
      title: '',
      type: 'text',
      options: []
    };
    setFormData({ ...formData, registrationFields: [...formData.registrationFields, newField] });
  };

  const updateRegistrationField = (index: number, field: keyof RegistrationField, value: any) => {
    const newFields = [...formData.registrationFields];
    newFields[index] = { ...newFields[index], [field]: value };
    setFormData({ ...formData, registrationFields: newFields });
  };

  const removeRegistrationField = (index: number) => {
    setFormData({ ...formData, registrationFields: formData.registrationFields.filter((_, i) => i !== index) });
  };

  const addInfoBlock = () => {
    const newBlock: InfoBlock = {
      id: Date.now().toString(),
      title: '',
      bulletPoints: ['']
    };
    setFormData({ ...formData, infoBlocks: [...formData.infoBlocks, newBlock] });
  };

  const updateInfoBlock = (index: number, field: keyof InfoBlock, value: string | string[]) => {
    const newBlocks = [...formData.infoBlocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setFormData({ ...formData, infoBlocks: newBlocks });
  };

  const removeInfoBlock = (index: number) => {
    setFormData({ ...formData, infoBlocks: formData.infoBlocks.filter((_, i) => i !== index) });
  };

  const addBulletPoint = (blockIndex: number) => {
    const newBlocks = [...formData.infoBlocks];
    newBlocks[blockIndex].bulletPoints.push('');
    setFormData({ ...formData, infoBlocks: newBlocks });
  };

  const updateBulletPoint = (blockIndex: number, pointIndex: number, value: string) => {
    const newBlocks = [...formData.infoBlocks];
    newBlocks[blockIndex].bulletPoints[pointIndex] = value;
    setFormData({ ...formData, infoBlocks: newBlocks });
  };

  const removeBulletPoint = (blockIndex: number, pointIndex: number) => {
    const newBlocks = [...formData.infoBlocks];
    newBlocks[blockIndex].bulletPoints = newBlocks[blockIndex].bulletPoints.filter((_, i) => i !== pointIndex);
    setFormData({ ...formData, infoBlocks: newBlocks });
  };

  const sections = [
    { id: 'basic' as const, label: 'Basic Info', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'themes' as const, label: 'Themes', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    { id: 'registration' as const, label: 'Registration', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'info' as const, label: 'Info Blocks', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-100">
          {mode === 'create' ? 'Create New Event' : 'Edit Event'}
        </h1>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
            </svg>
            {section.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        {activeSection === 'basic' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 space-y-6 animate-slideUp">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Enter event title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Enter event description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Time *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Event Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="workshop">Workshop</option>
                  <option value="competition">Competition</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="camp">Camp</option>
                  <option value="learning">Learning</option>
                  <option value="seminar">Seminar</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Themes Section */}
        {activeSection === 'themes' && (
          <div className="space-y-4 animate-slideUp">
            {formData.themes.map((theme, index) => (
              <div key={theme.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-100">Theme {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeTheme(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={theme.title}
                      onChange={(e) => updateTheme(index, 'title', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      placeholder="Theme title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={theme.image}
                      onChange={(e) => updateTheme(index, 'image', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea
                      value={theme.description}
                      onChange={(e) => updateTheme(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
                      placeholder="Theme description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                    <input
                      type="date"
                      value={theme.date}
                      onChange={(e) => updateTheme(index, 'date', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                    <input
                      type="time"
                      value={theme.time}
                      onChange={(e) => updateTheme(index, 'time', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Age Group</label>
                    <input
                      type="text"
                      value={theme.age}
                      onChange={(e) => updateTheme(index, 'age', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., 14-18"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={theme.price}
                      onChange={(e) => updateTheme(index, 'price', parseFloat(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Google Drive Link</label>
                    <input
                      type="url"
                      value={theme.driveLink}
                      onChange={(e) => updateTheme(index, 'driveLink', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      placeholder="https://drive.google.com/..."
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addTheme}
              className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Theme
            </button>
          </div>
        )}

        {/* Registration Fields Section */}
        {activeSection === 'registration' && (
          <div className="space-y-4 animate-slideUp">
            {formData.registrationFields.map((field, index) => (
              <div key={field.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-100">Field {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeRegistrationField(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Field Title</label>
                    <input
                      type="text"
                      value={field.title}
                      onChange={(e) => updateRegistrationField(index, 'title', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      placeholder="e.g., Full Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Field Type</label>
                    <select
                      value={field.type}
                      onChange={(e) => updateRegistrationField(index, 'type', e.target.value as FieldType)}
                      className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="email">Email</option>
                      <option value="select">Select</option>
                    </select>
                  </div>

                  {field.type === 'select' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Options (comma-separated)</label>
                      <input
                        type="text"
                        value={field.options?.join(', ') || ''}
                        onChange={(e) => updateRegistrationField(index, 'options', e.target.value.split(',').map(s => s.trim()))}
                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addRegistrationField}
              className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Registration Field
            </button>
          </div>
        )}

        {/* Info Blocks Section */}
        {activeSection === 'info' && (
          <div className="space-y-4 animate-slideUp">
            {formData.infoBlocks.map((block, blockIndex) => (
              <div key={block.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-100">Info Block {blockIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeInfoBlock(blockIndex)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Block Title</label>
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) => updateInfoBlock(blockIndex, 'title', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., Required Materials"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Bullet Points</label>
                  {block.bulletPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateBulletPoint(blockIndex, pointIndex, e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                        placeholder={`Point ${pointIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeBulletPoint(blockIndex, pointIndex)}
                        className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addBulletPoint(blockIndex)}
                    className="w-full py-2 border border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors text-sm"
                  >
                    + Add Bullet Point
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addInfoBlock}
              className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Info Block
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
          >
            {mode === 'create' ? 'Create Event' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
