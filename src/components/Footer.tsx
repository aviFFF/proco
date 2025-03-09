import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ProCo</h3>
            <p className="text-gray-300">
              Professional Computer Institute offering skill-based courses to prepare you for the modern tech industry.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><Link href="/admin" className="text-gray-300 hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Education Street</p>
              <p className="mb-2">Tech City, TC 12345</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Email: info@proco.edu</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} ProCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 