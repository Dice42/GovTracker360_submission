import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  userType: 'internal' | 'external';
}

interface FormData {
  email: '',
  Pass: '',
}

export function LoginForm({ userType }: LoginFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("Pass", formData.password);
    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      body: data,
    });
    console.log(response["status"])
    if (response["status"] != 404)
      navigate(userType === 'internal' ? '/internal/dashboard' : '/external/dashboard');
    else
      alert("Invalid Email or Password")
  };

  return (
    <div className="w-full max-w-md">
      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to role selection
      </button>

      <div className="bg-[var(--bg-primary)] rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-[var(--font-bold)] text-[var(--text-primary)]">
            {userType === 'internal' ? 'Internal Department Login' : 'External Entity Login'}
          </h2>
          <p className="text-[var(--text-secondary)]">Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-[var(--font-medium)] text-[var(--text-secondary)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-primary w-full px-4 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-[var(--font-medium)] text-[var(--text-secondary)] mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-primary w-full px-4 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3 rounded-xl shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <a href="#" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}