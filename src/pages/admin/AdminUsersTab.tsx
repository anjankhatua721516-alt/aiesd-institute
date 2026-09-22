import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import {
  Users,
  Key,
  ShieldCheck,
  LogOut,
  Plus,
  Trash2,
  Lock,
  UserCheck,
  AlertCircle,
  X
} from 'lucide-react';
import { AdminUser, AdminRole } from '../../types';

export const AdminUsersTab: React.FC = () => {
  const { adminUser, showToast } = useApp();
  const [users, setUsers] = useState<AdminUser[]>(dbService.getAdminUsers());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminRole>('Editor');

  const reload = () => {
    setUsers(dbService.getAdminUsers());
  };

  const isOwner = adminUser?.role === 'Owner';

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('All fields are required.', 'error');
      return;
    }

    const currentUsers = dbService.getAdminUsers();
    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      role,
      addedAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };

    try {
      dbService.saveAdminUsers([...currentUsers, newUser]);
      showToast(`User ${name} created as ${role}.`, 'success');
      setIsModalOpen(false);
      setName('');
      setEmail('');
      setPassword('');
      reload();
    } catch {
      showToast('Could not save user.', 'error');
    }
  };

  const handleDeleteUser = (id: string, userEmail: string) => {
    if (!isOwner) {
      showToast('Only the Owner can delete administrative accounts.', 'error');
      return;
    }
    if (userEmail === adminUser?.email) {
      showToast('You cannot delete your own active session account.', 'error');
      return;
    }
    if (confirm(`Are you sure you want to remove administrator ${userEmail}?`)) {
      const currentUsers = dbService.getAdminUsers();
      dbService.saveAdminUsers(currentUsers.filter((u) => u.id !== id));
      showToast('Admin user deleted.', 'success');
      reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Access Control
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Administrator Accounts &amp; Permissions
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Manage Owner and Editor access credentials. Owner has full control; Editor can edit courses, content, and leads.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Admin User</span>
          </button>
        )}
      </div>

      {!isOwner && (
        <div className="p-4 bg-[#fafafa] border border-[#e4e4e7] rounded-[18px] flex items-center gap-3 text-xs text-[#3f3f46]">
          <AlertCircle className="w-5 h-5 text-[#18181b] shrink-0" />
          <span>
            You are logged in as an Editor. Account creation and deletion require Owner privileges.
          </span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-[24px] border border-[#e4e4e7] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#fafafa] border-b border-[#e4e4e7] font-bold text-[#18181b]">
            <tr>
              <th className="p-4">Name / Title</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Created Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e4e7]">
            {users.map((u) => {
              const isSelf = u.email === adminUser?.email;
              return (
                <tr key={u.id} className="hover:bg-[#fafafa]">
                  <td className="p-4">
                    <div className="font-bold text-[#18181b] flex items-center gap-2">
                      <span>{u.name || 'Admin'}</span>
                      {isSelf && (
                        <span className="text-[10px] bg-[#09090b] text-white font-extrabold px-2 py-0.5 rounded-full">
                          Current Session
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[#71717a]">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase border ${
                        u.role === 'Owner'
                          ? 'bg-[#09090b] text-white border-transparent'
                          : 'bg-[#f4f4f5] text-[#18181b] border-[#e4e4e7]'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-[#71717a]">{u.addedAt}</td>
                  <td className="p-4 text-right">
                    {isOwner && !isSelf && (
                      <button
                        onClick={() => handleDeleteUser(u.id, u.email)}
                        className="p-1.5 text-[#71717a] hover:text-rose-600 rounded-full transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#09090b]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] border border-[#e4e4e7] max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
              <h3 className="text-base font-bold text-[#18181b]">Add Administrator Account</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#71717a] hover:text-[#18181b] rounded-full hover:bg-[#f4f4f5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#18181b]">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="awesomic-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#18181b]">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@aiesd.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="awesomic-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#18181b]">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="awesomic-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#18181b]">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="awesomic-input text-xs bg-white"
                >
                  <option value="Editor">Editor (Edit courses, view leads)</option>
                  <option value="Owner">Owner (Full access, delete accounts, global settings)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="awesomic-btn-light py-2 px-4 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="awesomic-btn-dark py-2 px-5 text-xs"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
