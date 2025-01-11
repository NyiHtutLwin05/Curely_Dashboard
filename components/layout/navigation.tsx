import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Pill,
  Target,
  Stethoscope,
  Video,
  Upload,
  Bell,
  LineChart,
  Contact,
  Clock,
  CreditCard,
  Languages,
  MessageSquare,
  Newspaper,
  Shield,
  Activity,
  Siren,
  Users,
  HeartPulse,
  Brain,
  TestTube,
} from 'lucide-react';

export const navigation = [
  {
    key: 'dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    label: 'Dashboard',
  },
  {
    key: 'appointments',
    icon: <Calendar className="w-4 h-4" />,
    label: 'Appointments',
  },
  {
    key: 'medical-history',
    icon: <ClipboardList className="w-4 h-4" />,
    label: 'Medical History',
  },
  {
    key: 'prescriptions',
    icon: <Pill className="w-4 h-4" />,
    label: 'Prescriptions',
  },
  {
    key: 'health-goals',
    icon: <Target className="w-4 h-4" />,
    label: 'Health Goals',
  },
  {
    key: 'symptom-checker',
    icon: <Stethoscope className="w-4 h-4" />,
    label: 'Symptom Checker',
  },
  {
    key: 'doctor-search',
    icon: <Users className="w-4 h-4" />,
    label: 'Find Doctors',
  },
  {
    key: 'telemedicine',
    icon: <Video className="w-4 h-4" />,
    label: 'Telemedicine',
  },
  {
    key: 'reports',
    icon: <Upload className="w-4 h-4" />,
    label: 'Medical Reports',
  },
  {
    key: 'notifications',
    icon: <Bell className="w-4 h-4" />,
    label: 'Notifications',
  },
  {
    key: 'analytics',
    icon: <LineChart className="w-4 h-4" />,
    label: 'Analytics',
  },
  {
    key: 'emergency-contacts',
    icon: <Contact className="w-4 h-4" />,
    label: 'Emergency Contacts',
  },
  {
    key: 'medication-reminders',
    icon: <Clock className="w-4 h-4" />,
    label: 'Medication Reminders',
  },
  {
    key: 'payments',
    icon: <CreditCard className="w-4 h-4" />,
    label: 'Payments',
  },
  {
    key: 'language',
    icon: <Languages className="w-4 h-4" />,
    label: 'Language',
  },
  {
    key: 'messaging',
    icon: <MessageSquare className="w-4 h-4" />,
    label: 'Messages',
  },
  {
    key: 'health-tips',
    icon: <Newspaper className="w-4 h-4" />,
    label: 'Health Tips',
  },
  {
    key: 'insurance',
    icon: <Shield className="w-4 h-4" />,
    label: 'Insurance',
  },
  {
    key: 'fitness',
    icon: <Activity className="w-4 h-4" />,
    label: 'Fitness Tracker',
  },
  {
    key: 'emergency',
    icon: <Siren className="w-4 h-4" />,
    label: 'Emergency Services',
  },
  {
    key: 'community',
    icon: <Users className="w-4 h-4" />,
    label: 'Community',
  },
  {
    key: 'second-opinion',
    icon: <HeartPulse className="w-4 h-4" />,
    label: 'Second Opinion',
  },
  {
    key: 'mental-health',
    icon: <Brain className="w-4 h-4" />,
    label: 'Mental Health',
  },
  {
    key: 'lab-results',
    icon: <TestTube className="w-4 h-4" />,
    label: 'Lab Results',
  },
];