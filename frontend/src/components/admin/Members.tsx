import React, { useMemo, useState } from "react";
import { Search, ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import Member_img from '../../assets/team1.jpg';
import MemberCard  from "./MemberCard.tsx";
import { MemberDetails } from "./MemberDetails.tsx";
export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  link?: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  age: number;
  image: string;
  startDate: string;
  endDate?: string;
  achievements: Achievement[];
  projects: Project[];
}

// ================= MOCK DATA =================
const initialMembers: Member[] = [
  {
    id: "1",
    firstName: "Ahmed",
    lastName: "Smida",
    role: "President",
    age: 20,
    image: Member_img,
    startDate: "2023-01-01",
    achievements: [
      { id: "a1", title: "Won Robotics Competition", date: "2024" },
    ],
    projects: [
      { id: "p1", title: "Line Follower Robot" },
    ],
  },{
    id: "2",
    firstName: "Ahmed",
    lastName: "Smida",
    role: "President",
    age: 20,
    image: Member_img,
    startDate: "2023-01-01",
    achievements: [
      { id: "a1", title: "Won Robotics Competition", date: "2024" },
    ],
    projects: [
      { id: "p1", title: "Line Follower Robot" },
    ],
  },{
    id: "3",
    firstName: "Ahmed",
    lastName: "Smida",
    role: "President",
    age: 20,
    image: Member_img,
    startDate: "2023-01-01",
    achievements: [
      { id: "a1", title: "Won Robotics Competition", date: "2024" },
    ],
    projects: [
      { id: "p1", title: "Line Follower Robot" },
    ],
  },{
    id: "4",
    firstName: "Ahmed",
    lastName: "Smida",
    role: "President",
    age: 20,
    image: Member_img,
    startDate: "2023-01-01",
    achievements: [
      { id: "a1", title: "Won Robotics Competition", date: "2024" },
    ],
    projects: [
      { id: "p1", title: "Line Follower Robot" },
    ],
  },{
    id: "5",
    firstName: "Ahmed",
    lastName: "Smida",
    role: "President",
    age: 20,
    image: Member_img,
    startDate: "2023-01-01",
    achievements: [
      { id: "a1", title: "Won Robotics Competition", date: "2024" },
    ],
    projects: [
      { id: "p1", title: "Line Follower Robot" },
    ],
  },
];

// ================= MAIN PAGE =================
export default function MembersAdmin() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [selected, setSelected] = useState<Member | null>(null);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return members.filter((m) =>
      `${m.firstName} ${m.lastName} ${m.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [members, search]);

  function deleteMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setSelected(null);
  }

  function saveMember(updated: Member) {
    setMembers((prev) => {
      const exists = prev.some((m) => m.id === updated.id);
      if (exists) {
        return prev.map((m) => (m.id === updated.id ? updated : m));
      }
      return [...prev, updated];
    });
    setSelected(updated);
    setEditing(false);
  }

  // ================= LIST VIEW =================
  if (!selected) {
    return (
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              className="w-full rounded-xl border pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => {
              setSelected({
                id: crypto.randomUUID(),
                firstName: "",
                lastName: "",
                role: "",
                age: 0,
                image: "",
                startDate: "",
                achievements: [],
                projects: [],
              });
              setEditing(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> New Member
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onView={() => setSelected(member)}
              onEdit={() => {
                setSelected(member);
                setEditing(true);
              }}
              onDelete={() => deleteMember(member.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // ================= DETAILS / EDIT VIEW =================
  return (
    <MemberDetails
      member={selected}
      editing={editing}
      onBack={() => {
        setSelected(null);
        setEditing(false);
      }}
      onEdit={() => setEditing(true)}
      onDelete={() => deleteMember(selected.id)}
      onSave={saveMember}
    />
  );
}



// ================= SMALL UI COMPONENTS =================
