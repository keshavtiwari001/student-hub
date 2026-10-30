import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import StudyPlanner from '@/components/productivity/StudyPlanner';

const tool = getToolById('study-planner');

export const metadata = {
  title: 'Study Planner — Organize Tasks & Goals',
  description: 'Plan your study goals, prioritize homework, and track your syllabus coverage locally.',
};

export default function StudyPlannerPage() {
  return (
    <CalculatorWrapper tool={tool}>
      <StudyPlanner tool={tool} />
    </CalculatorWrapper>
  );
}
