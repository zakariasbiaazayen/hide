import { Event } from '../../../types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'RoboChallenge 2024',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    description: 'Annual robotics competition for innovators and tech enthusiasts',
    date: '2024-03-15',
    time: '09:00',
    type: 'competition',
    themes: [
      {
        id: 't1',
        title: 'Autonomous Navigation',
        description: 'Build robots that can navigate complex environments',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
        date: '2024-03-15',
        time: '10:00',
        age: '14-18',
        price: 150,
        driveLink: 'https://drive.google.com/file/d/example1'
      },
      {
        id: 't2',
        title: 'AI Integration',
        description: 'Integrate machine learning models into robotic systems',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
        date: '2024-03-15',
        time: '14:00',
        age: '16-22',
        price: 175,
        driveLink: 'https://drive.google.com/file/d/example2'
      }
    ],
    registrationFields: [
      { id: 'rf1', title: 'Full Name', type: 'text' },
      { id: 'rf2', title: 'Email Address', type: 'email' },
      { id: 'rf3', title: 'Age', type: 'number' },
      { id: 'rf4', title: 'Experience Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] }
    ],
    infoBlocks: [
      {
        id: 'ib1',
        title: 'Required Materials',
        bulletPoints: [
          'Laptop with development environment',
          'Robot kit (provided on-site)',
          'Safety goggles',
          'Programming cables'
        ]
      },
      {
        id: 'ib2',
        title: 'Competition Rules',
        bulletPoints: [
          'Teams of 2-4 participants',
          'Maximum 3 hours build time',
          'Must use provided materials',
          'Safety protocols must be followed'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'AI & Machine Learning Workshop',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    description: 'Hands-on workshop covering neural networks and deep learning',
    date: '2024-03-22',
    time: '13:00',
    type: 'workshop',
    themes: [
      {
        id: 't3',
        title: 'Introduction to Neural Networks',
        description: 'Learn the fundamentals of neural network architectures',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
        date: '2024-03-22',
        time: '13:00',
        age: '16+',
        price: 80,
        driveLink: 'https://drive.google.com/file/d/example3'
      }
    ],
    registrationFields: [
      { id: 'rf5', title: 'Full Name', type: 'text' },
      { id: 'rf6', title: 'Contact Email', type: 'email' },
      { id: 'rf7', title: 'Programming Experience', type: 'select', options: ['None', 'Basic', 'Proficient', 'Expert'] }
    ],
    infoBlocks: [
      {
        id: 'ib3',
        title: 'What to Bring',
        bulletPoints: [
          'Laptop with Python installed',
          'Notebook for taking notes',
          'Enthusiasm and curiosity'
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Summer Tech Camp 2024',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    description: 'Week-long immersive camp for young tech enthusiasts',
    date: '2024-07-10',
    time: '08:30',
    type: 'camp',
    themes: [
      {
        id: 't4',
        title: 'Web Development Track',
        description: 'Build your first website from scratch',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
        date: '2024-07-10',
        time: '09:00',
        age: '12-16',
        price: 450,
        driveLink: 'https://drive.google.com/file/d/example4'
      },
      {
        id: 't5',
        title: 'Mobile App Development',
        description: 'Create native mobile applications',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
        date: '2024-07-10',
        time: '09:00',
        age: '14-18',
        price: 500,
        driveLink: 'https://drive.google.com/file/d/example5'
      }
    ],
    registrationFields: [
      { id: 'rf8', title: 'Participant Name', type: 'text' },
      { id: 'rf9', title: 'Parent Email', type: 'email' },
      { id: 'rf10', title: 'Age', type: 'number' },
      { id: 'rf11', title: 'Dietary Restrictions', type: 'text' }
    ],
    infoBlocks: [
      {
        id: 'ib4',
        title: 'Daily Schedule',
        bulletPoints: [
          '8:30 AM - Check-in and breakfast',
          '9:00 AM - Morning session',
          '12:00 PM - Lunch break',
          '1:00 PM - Afternoon session',
          '4:00 PM - Wrap-up and pickup'
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Hackathon: Code for Good',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    description: '24-hour hackathon focused on creating tech solutions for social impact',
    date: '2024-04-05',
    time: '18:00',
    type: 'hackathon',
    themes: [
      {
        id: 't6',
        title: 'Environmental Solutions',
        description: 'Build apps addressing climate and sustainability',
        image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&q=80',
        date: '2024-04-05',
        time: '18:00',
        age: '18+',
        price: 50,
        driveLink: 'https://drive.google.com/file/d/example6'
      },
      {
        id: 't7',
        title: 'Education Accessibility',
        description: 'Create tools to improve access to education',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
        date: '2024-04-05',
        time: '18:00',
        age: '18+',
        price: 50,
        driveLink: 'https://drive.google.com/file/d/example7'
      }
    ],
    registrationFields: [
      { id: 'rf12', title: 'Team Name', type: 'text' },
      { id: 'rf13', title: 'Team Lead Email', type: 'email' },
      { id: 'rf14', title: 'Team Size', type: 'number' },
      { id: 'rf15', title: 'Track Preference', type: 'select', options: ['Environmental Solutions', 'Education Accessibility', 'No Preference'] }
    ],
    infoBlocks: [
      {
        id: 'ib5',
        title: 'Hackathon Guidelines',
        bulletPoints: [
          'Teams of 2-5 members',
          'All code must be written during the event',
          'Must present final project to judges',
          'Prizes for top 3 teams'
        ]
      },
      {
        id: 'ib6',
        title: 'What We Provide',
        bulletPoints: [
          'Workspace and WiFi',
          'Meals and snacks',
          'Mentorship from industry professionals',
          'API credits and development tools'
        ]
      }
    ]
  }
];
