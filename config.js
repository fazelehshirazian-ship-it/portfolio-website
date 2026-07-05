// Default Data Structure
const DEFAULT_DATA = {
    siteName: 'Fazelehsadat Shirazian',
    email: 'fazelehshirazian@gmail.com',
    phone: '017631120465',
    adminPassword: 'admin123',
    sections: [
        {
            id: 1,
            type: 'hero',
            title: 'Welcome to My Portfolio',
            content: 'I am a Biomedical Engineering student at TU Darmstadt',
            items: [],
            order: 1,
            visible: true
        },
        {
            id: 2,
            type: 'about',
            title: 'About Me',
            content: 'Passionate about microfluidic systems and medical imaging. Experience in interdisciplinary research projects.',
            items: [],
            order: 2,
            visible: true
        },
        {
            id: 3,
            type: 'projects',
            title: 'My Projects',
            content: '',
            items: [
                {
                    id: 101,
                    title: 'AI Emotion Recognition',
                    content: 'Computer Vision Pipeline using MediaPipe and CNN/LSTM'
                },
                {
                    id: 102,
                    title: 'Microfluidic Systems',
                    content: 'Design and fabrication of channels and microlinses'
                }
            ],
            order: 3,
            visible: true
        },
        {
            id: 4,
            type: 'skills',
            title: 'Skills',
            content: '',
            items: ['SolidWorks', 'Python', 'MATLAB', 'Machine Learning', 'Medical Imaging', 'Clean Room', 'Photolithography'],
            order: 4,
            visible: true
        },
        {
            id: 5,
            type: 'contact',
            title: 'Get in Touch',
            content: 'Feel free to reach out for projects or inquiries',
            items: [],
            order: 5,
            visible: true
        }
    ]
};

// Default Theme Colors
const DEFAULT_THEME = {
    primary: '#0f172a',      // Slate-900
    secondary: '#1e293b',    // Slate-800
    accent: '#3b82f6',       // Blue-500
    text: '#ffffff'
};

// Preset Themes
const PRESET_THEMES = {
    'dark-blue': {
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: '#3b82f6',
        text: '#ffffff'
    },
    'dark-green': {
        primary: '#0f2f1f',
        secondary: '#1a3a2a',
        accent: '#10b981',
        text: '#ffffff'
    },
    'dark-purple': {
        primary: '#2d1b4e',
        secondary: '#3d2563',
        accent: '#a855f7',
        text: '#ffffff'
    },
    'dark-red': {
        primary: '#2f1010',
        secondary: '#3f2020',
        accent: '#ef4444',
        text: '#ffffff'
    },
    'dark-cyan': {
        primary: '#0f3f3f',
        secondary: '#1a5a5a',
        accent: '#06b6d4',
        text: '#ffffff'
    }
};
