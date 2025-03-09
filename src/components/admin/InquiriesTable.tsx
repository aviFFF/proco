'use client';

import { useState } from 'react';
import axios from 'axios';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  status: 'new' | 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface InquiriesTableProps {
  inquiries: Inquiry[];
  onStatusChange: (id: string, status: 'new' | 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
}

export default function InquiriesTable({ inquiries, onStatusChange, onDelete }: InquiriesTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle status change
  const handleStatusChange = async (id: string, newStatus: 'new' | 'pending' | 'completed') => {
    setUpdatingId(id);
    try {
      await onStatusChange(id, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inquiries.map((inquiry) => (
            <tr key={inquiry._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{inquiry.email}</div>
                <div className="text-sm text-gray-500">{inquiry.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {inquiry.course}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">
                  {inquiry.message || <span className="text-gray-400 italic">No message</span>}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{formatDate(inquiry.createdAt)}</div>
                <div className="text-xs text-gray-400">Updated: {formatDate(inquiry.updatedAt || inquiry.createdAt)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry._id, e.target.value as 'new' | 'pending' | 'completed')}
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(inquiry.status)} border-0 focus:ring-2 focus:ring-primary`}
                  disabled={updatingId === inquiry._id}
                >
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                {updatingId === inquiry._id && (
                  <span className="ml-2 inline-block w-4 h-4 border-2 border-gray-200 border-t-primary rounded-full animate-spin"></span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onDelete(inquiry._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 