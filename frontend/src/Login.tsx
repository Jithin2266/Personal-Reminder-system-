import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the mobile number from the form
    const form = e.target as HTMLFormElement;
    const mobileInput = form.querySelector('input[type="tel"]') as HTMLInputElement;
    const rawMobile = mobileInput ? mobileInput.value : '';
    // Strip spaces and special characters to ensure a consistent lookup key
    const mobile = rawMobile.replace(/\\D/g, '');

    const users = JSON.parse(localStorage.getItem('mockUsers') || '{}');

    if (!isLogin && name) {
      // Registration: Save to mock database and start session
      users[mobile] = name;
      localStorage.setItem('mockUsers', JSON.stringify(users));
      sessionStorage.setItem('userName', name);
      sessionStorage.setItem('userMobile', mobile);
    } else if (isLogin) {
      // Login: Retrieve from mock database based on mobile number
      if (users[mobile]) {
        sessionStorage.setItem('userName', users[mobile]);
        sessionStorage.setItem('userMobile', mobile);
      } else {
        // Fallback if user not found in mock DB
        sessionStorage.setItem('userName', 'Guest User');
        sessionStorage.setItem('userMobile', mobile || 'guest');
      }
    }
    
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 glass rounded-2xl relative z-10 border-t border-primary/20 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">ReminderPro</h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Welcome back! Please enter your details.' : 'Create a new account to get started.'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Mobile Number</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 py-3 rounded-l-xl border border-r-0 border-slate-700 bg-slate-800/80 text-slate-300 font-medium">
                +91
              </span>
              <input 
                type="tel" 
                placeholder="98765 43210" 
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-r-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-dark font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] mt-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}
