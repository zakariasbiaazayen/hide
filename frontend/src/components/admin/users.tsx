import { useState } from "react";
import { mockUsers } from "./data/UserData";
import type { user } from "./data/UserData";
import { ArrowLeft, Pencil, User , Trash2, SearchIcon, Plus, Upload } from "lucide-react";
import { updateUser ,updateUserImg } from "../../services/admin.services";


function Field({ label, value, editing, onChange, type = "text" }: {
  label: string;
  value: any;
  editing: boolean;
  onChange: (v: any) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-slate-400">{label}</p>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      ) : (
        <p className="text-slate-100">{value || "—"}</p>
      )}
    </div>
  );
}

async function ImageUpload({ label, value, editing, onChange, id }: {
  label: string;
  value?: string;
  editing: boolean;
  onChange: (v: string) => void;
  id: string;
}) 
  const [isUploading, setIsUploading] = useState(false); // ✅ here

  async function handleFile(file: File, id: string) {
    const preview = URL.createObjectURL(file);

    try {
      setIsUploading(true);

      const res = await updateUserImg(file, id);
      console.log("Upload response:", res);

      onChange(preview);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }


function UserCard({ user, onView, onDelete }: { user: user; onView: () => void; onDelete: () => void }) {
  return (
    <div className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition hover:-translate-y-1">
      {
        user.imageUrl!=='none' ? (
          <img src={user.imageUrl} alt={user.name} className="h-48 w-full object-cover" />
        ) : (
          <div className="h-48 w-full bg-slate-700 flex items-center justify-center">
            <User className="w-12 h-12 text-slate-500" />
          </div>
        )
      }
      <div className="p-4 space-y-2">
        <p className="text-slate-100 font-semibold line-clamp-1">{user.name}</p>
        <p className="text-sm text-slate-400">{user.email}</p>
        <p className="text-sm text-slate-400">Age: {user.age}</p>
        <p className="text-sm text-slate-400">{user.university}</p>
        <div className="flex gap-2 pt-2">
          <button
            onClick={onView}
            className="flex-1 px-3 py-2 text-sm rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20"
          >
            View
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function UserDetails({ user, onBack, onSave, onDelete }: {
  user: user;
  onBack: () => void;
  onSave: (u: user) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<user>(user);
  function update<K extends keyof user>(key: K, value: user[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <div className="justify-center md:justify-start flex pt-5">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      </div>
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-6">
        <div className="flex justify-center">
          <ImageUpload
            label="Profile Image"
            value={form.imageUrl}
            editing={editing}
            onChange={(v) => update("imageUrl", v)}
            id={form.id} 
          />

        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Email" value={form.email} editing={editing} onChange={(v) => update("email", v)} />
          <Field label="Phone" value={form.phone} editing={editing} onChange={(v) => update("phone", v)} />
          <Field label="Age" type="date" value={form.age} editing={editing} onChange={(v) => update("age", v)} />
          <Field label="Signup Since" type="date" value={form.signupSince} editing={editing} onChange={(v) => update("signupSince", v)} />
          <Field label="University" value={form.university} editing={editing} onChange={(v) => update("university", v)} />
          <Field label="Major" value={form.major} editing={editing} onChange={(v) => update("major", v)} />
          <Field label="Robotics Experience (years)" type="number" value={form.roboticsExperience} editing={editing} onChange={(v) => update("roboticsExperience", Number(v))} />
          <Field label="LinkedIn" value={form.linkedin} editing={editing} onChange={(v) => update("linkedin", v)} />
        </div>
        <div className="flex gap-3">
          {editing ? (
            <button
              onClick={() => { onSave(form); setEditing(false); }}
              className="px-4 py-2 rounded-lg bg-cyan-600 text-white"
            >
              Save
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-lg bg-slate-700 flex items-center gap-2">
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
          <button onClick={onDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<user[]>(mockUsers);
  const [selected, setSelected] = useState<user | null>(null);
  const [search, setSearch] = useState("");

  function deleteUser(id: string) {
    setUsers((u) => u.filter((x) => x.id !== id));
    setSelected(null);
  }

  function saveUser(updated: user) {
    console.log("Saving user:", updated);
    updateUser(updated.id, updated).then(() => {
      setUsers((u) => u.map((x) => (x.id === updated.id ? updated : x)));
      setSelected(updated);
    });
  }

  if (selected) {
    return <UserDetails user={selected} onBack={() => setSelected(null)} onSave={saveUser} onDelete={() => deleteUser(selected.id)} />;
  }

  // Filter users based on search input
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.university.toLowerCase().includes(search.toLowerCase()) ||
    u.major.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-100">Users</h1>

        <div className="flex flex-1 max-w-md items-center gap-2">
          <SearchIcon className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by email, university, or major..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          onClick={() => {
            const newUser: user = {
              id: crypto.randomUUID(),
              email: "newuser@email.com",
              name: "New User",
              imageUrl: "",
              age: 18,
              phone: "",
              signupSince: new Date().toISOString().split("T")[0],
              university: "",
              major: "",
              roboticsExperience: 0,
              linkedin: "",
            };
            setUsers((u) => [newUser, ...u]);
            setSelected(newUser);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user , index) => (
          <UserCard key={index} user={user} onView={() => setSelected(user)} onDelete={() => deleteUser(user.id)} />
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-slate-400 col-span-full text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}