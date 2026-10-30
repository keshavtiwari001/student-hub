import {
  Calculator,
  Calendar,
  AlertTriangle,
  Award,
  GraduationCap,
  Percent,
  FileText,
  Medal,
  Layers,
  RefreshCw,
  Wallet,
  ListChecks,
  AlarmClock,
  Hourglass,
  Clock,
  Timer,
  LayoutDashboard,
} from 'lucide-react';

const ICONS = {
  Calculator,
  Calendar,
  AlertTriangle,
  Award,
  GraduationCap,
  Percent,
  FileText,
  Medal,
  Layers,
  RefreshCw,
  Wallet,
  ListChecks,
  AlarmClock,
  Hourglass,
  Clock,
  Timer,
  LayoutDashboard,
};

export default function getToolIcon(name) {
  return ICONS[name] || Calculator;
}
