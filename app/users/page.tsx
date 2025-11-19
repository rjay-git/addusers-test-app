'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import CreateUserModal from '@/components/CreateUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = (newUser: User) => {
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
          >
            Create User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {user.name}
              </h2>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium mr-2">
                    Company:
                  </span>
                  <span className="text-gray-800">{user.company.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium mr-2">Email:</span>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    {user.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <CreateUserModal
            onClose={() => setIsModalOpen(false)}
            onUserCreated={handleUserCreated}
          />
        )}
      </div>
    </div>
  );
}
