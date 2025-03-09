'use client';

import { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [responseMode, setResponseMode] = useState<string>('');

  const courseOptions = [
    'JavaScript Development',
    'Android App Development',
    'MERN Stack Development',
    'Software Testing',
    'Graphic Designing',
    'AI-Powered Development',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number should be 10 digits';
    }
    
    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Send data to backend API
      const response = await axios.post('/api/inquiries', formData);
      
      // Check if we're in demo mode
      if (response.data.mode) {
        setResponseMode(response.data.mode);
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorMessage(`Server error: ${error.response.status}. Please try again later.`);
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMessage('No response from server. Please check your connection and try again.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(`Error: ${error.message}`);
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-dark mb-4">Contact Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Interested in our courses? Fill out the form below and our team will get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-dark mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">Your inquiry has been submitted successfully. We'll contact you shortly.</p>
              {responseMode === 'demo' && (
                <p className="text-sm text-yellow-600 mb-6">
                  Note: Your submission was processed in demo mode as MongoDB is not connected.
                </p>
              )}
              <button 
                onClick={() => setSubmitStatus('idle')}
                className="btn btn-primary"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="course" className="block text-gray-700 font-medium mb-2">Course of Interest *</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={`input ${errors.course ? 'border-red-500' : ''}`}
                >
                  <option value="">Select a course</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input min-h-[120px]"
                  placeholder="Any specific questions or requirements?"
                  rows={4}
                ></textarea>
              </div>

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
                  <p>{errorMessage || 'There was an error submitting your inquiry. Please try again later.'}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
} 