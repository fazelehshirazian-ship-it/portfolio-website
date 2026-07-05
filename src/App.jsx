import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, LogOut, Edit2, Plus, Trash2, Eye, EyeOff, Lock } from 'lucide-react';

export default function PortfolioApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load data from localStorage
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : {
      name: 'Fazelehsadat Shirazian',
      title: 'Master Student in Biomedical Engineering | TU Darmstadt',
      email: 'fazelehshirazian@gmail.com',
      phone: '017631120465',
      location: 'Darmstadt, Germany',
      about: 'Master student in Biomedical Engineering at TU Darmstadt with practical experience in microfluidic systems, laboratory work, and interdisciplinary research projects. Interested in Micro-/Nanosystems, medical image processing, and AI-driven data analysis.',
      profileImage: null,
      experiences: [
        {
          id: 1,
          title: 'Scientific Research Assistant',
          company: 'TU Darmstadt - Integrated Micro-Nano-Systems',
          period: 'Oct 2024 - Present',
          description: 'Design, development and fabrication of microfluidic systems and cell analysis in biomedical research projects.'
        },
        {
          id: 2,
          title: 'Tutor',
          company: 'TU Darmstadt - Integrated Micro-Nano-Systems',
          period: 'Oct 2024 - Present',
          description: 'Support students in conducting EKG and EMG investigations.'
        }
      ],
      projects: [
        {
          id: 1,
          title: 'AI-based Emotion Recognition in Table Tennis',
          description: 'Developed a computer vision pipeline using MediaPipe, Python, CNN/LSTM models',
          image: null,
          video: null,
          tags: ['Computer Vision', 'AI', 'Python']
        }
      ],
      skills: {
        technical: ['SolidWorks', 'Python', 'MATLAB', 'Autodesk Fusion 360', 'LaTeX'],
        laboratory: ['Clean Room', 'Photolithography', '3D Printing', 'Microfluidic Fabrication'],
        ai: ['Machine Learning', 'Medical Imaging', 'Computer Vision', 'Deep Learning'],
        languages: ['German (C1)', 'English (C1)', 'Persian (Native)']
      },
      education: [
        {
          id: 1,
          degree: 'Master in Biomedical Engineering',
          institution: 'TU Darmstadt',
          period: 'Apr 2024 - Present'
        },
        {
          id: 2,
          degree: 'B.Sc. Biomedical Engineering',
          institution: 'Islamic Azad University - Mashhad',
          period: 'Oct 2018 - Aug 2022',
          gpa: '1.86 (17.15/20)'
        }
      ],
      gallery: []
    };
  });

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  // Admin login
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setAdminPassword(passwordInput);
      setIsLoggedIn(true);
      setPasswordInput('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEditMode(false);
    setAdminPassword('');
  };

  // Image upload handler
  const handleImageUpload = (field, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPortfolioData({
        ...portfolioData,
        [field]: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  // Add/Edit functions
  const addExperience = () => {
    setPortfolioData({
      ...portfolioData,
      experiences: [...portfolioData.experiences, {
        id: Date.now(),
        title: '',
        company: '',
        period: '',
        description: ''
      }]
    });
  };

  const deleteExperience = (id) => {
    setPortfolioData({
      ...portfolioData,
      experiences: portfolioData.experiences.filter(exp => exp.id !== id)
    });
  };

  const updateExperience = (id, field, value) => {
    setPortfolioData({
      ...portfolioData,
      experiences: portfolioData.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  // PUBLIC VIEW
  if (!isLoggedIn) {
    return <PublicPortfolio data={portfolioData} onAdminClick={() => setEditMode(true)} editMode={editMode} setEditMode={setEditMode} onLogin={handleLogin} passwordInput={passwordInput} setPasswordInput={setPasswordInput} showPassword={showPassword} setShowPassword={setShowPassword} />;
  }

  // ADMIN PANEL
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Admin Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">📊 Admin Panel</h1>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Personal Info */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">👤 Personal Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={portfolioData.name}
              onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
              placeholder="Name"
              className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
            />
            <input
              type="text"
              value={portfolioData.title}
              onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
              placeholder="Title"
              className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
            />
            <textarea
              value={portfolioData.about}
              onChange={(e) => setPortfolioData({ ...portfolioData, about: e.target.value })}
              placeholder="About"
              className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-blue-400 focus:outline-none h-24"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                value={portfolioData.email}
                onChange={(e) => setPortfolioData({ ...portfolioData, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
              />
              <input
                type="tel"
                value={portfolioData.phone}
                onChange={(e) => setPortfolioData({ ...portfolioData, phone: e.target.value })}
                placeholder="Phone"
                className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-white mb-2 block">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload('profileImage', e.target.files[0])}
                className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600"
              />
              {portfolioData.profileImage && (
                <img src={portfolioData.profileImage} alt="Profile" className="w-32 h-32 rounded mt-3 object-cover" />
              )}
            </div>
          </div>
        </div>

        {/* Experiences */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">💼 Experiences</h2>
            <button onClick={addExperience} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
              <Plus size={18} /> Add
            </button>
          </div>
          <div className="space-y-4">
            {portfolioData.experiences.map((exp) => (
              <div key={exp.id} className="bg-slate-700 p-4 rounded border border-slate-600">
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold text-white">{exp.title || 'New Experience'}</h3>
                  <button onClick={() => deleteExperience(exp.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  placeholder="Job Title"
                  className="w-full bg-slate-600 text-white p-2 rounded mb-2 border border-slate-500 focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company"
                  className="w-full bg-slate-600 text-white p-2 rounded mb-2 border border-slate-500 focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                  placeholder="Period (e.g., Jan 2020 - Dec 2021)"
                  className="w-full bg-slate-600 text-white p-2 rounded mb-2 border border-slate-500 focus:border-blue-400 focus:outline-none"
                />
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Description"
                  className="w-full bg-slate-600 text-white p-2 rounded border border-slate-500 focus:border-blue-400 focus:outline-none h-20"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">⚡ Skills</h2>
          <div className="space-y-4">
            {Object.entries(portfolioData.skills).map(([category, skillList]) => (
              <div key={category}>
                <label className="text-white font-semibold mb-2 block capitalize">{category}</label>
                <textarea
                  value={skillList.join(', ')}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    skills: {
                      ...portfolioData.skills,
                      [category]: e.target.value.split(',').map(s => s.trim())
                    }
                  })}
                  className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-blue-400 focus:outline-none h-20"
                  placeholder="Separate with commas"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-slate-400">
          <p>💾 All changes are automatically saved!</p>
        </div>
      </div>
    </div>
  );
}

// PUBLIC PORTFOLIO VIEW
function PublicPortfolio({ data, onAdminClick, editMode, setEditMode, onLogin, passwordInput, setPasswordInput, showPassword, setShowPassword }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (editMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
          <div className="flex items-center justify-center mb-6">
            <Lock size={40} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
          <p className="text-slate-400 text-center mb-6">Enter password to manage portfolio</p>
          <form onSubmit={onLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-blue-400 focus:outline-none pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition-colors">
              Login
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold p-3 rounded transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <button
              onClick={() => onAdminClick()}
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
            >
              <Lock size={16} /> Admin
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="pb-4">
              <button
                onClick={() => {
                  onAdminClick();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
              >
                Admin Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {data.profileImage && (
            <div className="mb-8">
              <img src={data.profileImage} alt={data.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-400" />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {data.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">{data.title}</p>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl">{data.about}</p>
          <div className="flex justify-center gap-4 mb-12">
            {data.email && (
              <a href={`mailto:${data.email}`} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Mail size={20} /> Email
              </a>
            )}
            <a href="#" className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Github size={20} /> GitHub
            </a>
            <a href="#" className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">💼 Experience</h2>
          <div className="space-y-8">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-400 pl-6">
                <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                <p className="text-blue-400 font-semibold mb-2">{exp.company}</p>
                <p className="text-slate-400 text-sm mb-3">{exp.period}</p>
                <p className="text-slate-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">🎓 Education</h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-blue-400 mb-2">{edu.institution}</p>
                <p className="text-slate-400">{edu.period}</p>
                {edu.gpa && <p className="text-slate-400 text-sm mt-2">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">⚡ Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category} className="bg-slate-700/50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-400 capitalize">{category}</h3>
                <ul className="space-y-2">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">🚀 Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-colors">
                {project.image && <img src={project.image} alt={project.title} className="w-full h-48 rounded mb-4 object-cover" />}
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-600 text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 text-center text-slate-400">
        <p>© 2024 {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
