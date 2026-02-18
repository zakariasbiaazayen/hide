import React, { useState } from 'react';
import { Member } from '../../types/member';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

interface MemberDetailsProps {
  member: Member;
  editing: boolean;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (m: Member) => void;
}

export const MemberDetails: React.FC<MemberDetailsProps> = ({ member, editing, onBack, onEdit, onDelete, onSave }) => {
  const [form, setForm] = useState<Member>(member);

  const update = <K extends keyof Member>(key: K, value: Member[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const addAchievement = () => {
    update('achievements', [...form.achievements, { id: crypto.randomUUID(), title: '' }]);
  };

  const addProject = () => {
    update('projects', [...form.projects, { id: crypto.randomUUID(), title: '' }]);
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 p-6 space-y-6">
        <div className="relative h-60 overflow-hidden rounded-xl">
          <img src={form.image || 'https://via.placeholder.com/600'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>

        {editing && (
          <input
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="Image URL"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="First Name" value={form.firstName} editing={editing} onChange={(v) => update('firstName', v)} />
          <Field label="Last Name" value={form.lastName} editing={editing} onChange={(v) => update('lastName', v)} />
          <Field label="Role" value={form.role} editing={editing} onChange={(v) => update('role', v)} />
          <Field label="Age" type="number" value={form.age} editing={editing} onChange={(v) => update('age', Number(v))} />
        </div>

        <Section title="Achievements">
          {form.achievements.map((a, i) => (
            <Field
              key={a.id}
              label={`Achievement ${i + 1}`}
              value={a.title}
              editing={editing}
              onChange={(v) => {
                const list = [...form.achievements];
                list[i] = { ...a, title: v };
                update('achievements', list);
              }}
            />
          ))}
          {editing && <button onClick={addAchievement} className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 transition-colors">Add Achievement</button>}
        </Section>

        <Section title="Projects">
          {form.projects.map((p, i) => (
            <Field
              key={p.id}
              label={`Project ${i + 1}`}
              value={p.title}
              editing={editing}
              onChange={(v) => {
                const list = [...form.projects];
                list[i] = { ...p, title: v };
                update('projects', list);
              }}
            />
          ))}
          {editing && <button onClick={addProject} className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 transition-colors">Add Project</button>}
        </Section>

        <div className="flex gap-3">
          {editing ? (
            <button onClick={() => onSave(form)} className="flex-1 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium transition-colors border border-blue-500/20 hover:border-blue-500/40">
              Save
            </button>
          ) : (
            <button onClick={onEdit} className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Pencil className="h-4 w-4" /> Edit
            </button>
          )}

          <button onClick={onDelete} className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 transition-colors text-red-500 flex gap-2">
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, editing, onChange, type = 'text' }: { label: string; value: any; editing: boolean; onChange: (v: any) => void; type?: string }) => (
  <div className="space-y-1">
    <p className="text-sm text-slate-400">{label}</p>
    {editing ? (
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    ) : (
      <p className="font-medium text-slate-100">{value || '—'}</p>
    )}
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
    {children}
  </div>
);