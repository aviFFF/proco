'use client';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface CoursesTableProps {
  courses: Course[];
}

export default function CoursesTable({ courses }: CoursesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Icon
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Features
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-2xl">{course.icon}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{course.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs">{course.description}</div>
              </td>
              <td className="px-6 py-4">
                <ul className="text-sm text-gray-900 list-disc pl-5">
                  {course.features.map((feature, index) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-8 bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700 text-sm">
          <strong>Note:</strong> In this demo version, course editing is not available. In a production environment, you would be able to add, edit, and delete courses.
        </p>
      </div>
    </div>
  );
} 