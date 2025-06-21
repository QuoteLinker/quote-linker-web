'use client';

import { useState } from 'react';
import { Lock, User, Shield, FileText, DollarSign, Settings } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  roles: {
    admin: boolean;
    manager: boolean;
    agent: boolean;
  };
}

const permissions: Permission[] = [
  {
    id: 'view_leads',
    name: 'View Leads',
    description: 'Access and view incoming leads',
    roles: { admin: true, manager: true, agent: true },
  },
  {
    id: 'edit_leads',
    name: 'Edit Leads',
    description: 'Modify lead information and status',
    roles: { admin: true, manager: true, agent: true },
  },
  {
    id: 'delete_leads',
    name: 'Delete Leads',
    description: 'Remove leads from the system',
    roles: { admin: true, manager: true, agent: false },
  },
  {
    id: 'view_team',
    name: 'View Team',
    description: 'See team members and their activities',
    roles: { admin: true, manager: true, agent: false },
  },
  {
    id: 'manage_team',
    name: 'Manage Team',
    description: 'Add, edit, or remove team members',
    roles: { admin: true, manager: false, agent: false },
  },
  {
    id: 'view_reports',
    name: 'View Reports',
    description: 'Access analytics and reports',
    roles: { admin: true, manager: true, agent: false },
  },
  {
    id: 'manage_billing',
    name: 'Manage Billing',
    description: 'Update billing information and subscriptions',
    roles: { admin: true, manager: false, agent: false },
  },
  {
    id: 'manage_settings',
    name: 'Manage Settings',
    description: 'Configure system settings and preferences',
    roles: { admin: true, manager: false, agent: false },
  },
];

const roles = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full system access',
    icon: Shield,
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Team and leads management',
    icon: Lock,
  },
  {
    id: 'agent',
    name: 'Agent',
    description: 'Basic lead access',
    icon: User,
  },
];

export default function TeamPermissions() {
  const [selectedRole, setSelectedRole] = useState('admin');

  return (
    <div className="bg-background-secondary">
      {/* Role selector */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`
                relative p-6 rounded-lg border-2 text-left transition-all
                ${selectedRole === role.id 
                  ? 'border-primary-500 bg-white shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300'}
              `}
            >
              <div className="flex items-center">
                <div className={`
                  p-2 rounded-lg 
                  ${selectedRole === role.id ? 'bg-primary-50 text-primary-600' : 'bg-gray-100 text-gray-600'}
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {role.name}
                  </h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Permissions grid */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {roles.find(r => r.id === selectedRole)?.name} Permissions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage access levels and capabilities for each role
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className={`p-6 flex items-center justify-between ${
                permission.roles[selectedRole as keyof typeof permission.roles]
                  ? 'bg-white'
                  : 'bg-gray-50'
              }`}
            >
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {permission.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {permission.description}
                </p>
              </div>
              <div className="ml-4">
                {permission.roles[selectedRole as keyof typeof permission.roles] ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Disabled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors flex items-center">
          <User className="h-5 w-5 text-gray-400" />
          <span className="ml-3 text-sm font-medium text-gray-900">Invite Team Member</span>
        </button>
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors flex items-center">
          <FileText className="h-5 w-5 text-gray-400" />
          <span className="ml-3 text-sm font-medium text-gray-900">Access Logs</span>
        </button>
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors flex items-center">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <span className="ml-3 text-sm font-medium text-gray-900">Billing & Plan</span>
        </button>
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors flex items-center">
          <Settings className="h-5 w-5 text-gray-400" />
          <span className="ml-3 text-sm font-medium text-gray-900">Team Settings</span>
        </button>
      </div>
    </div>
  );
}
