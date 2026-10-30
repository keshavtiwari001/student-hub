import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import StudyHoursCalculator from '@/components/productivity/StudyHoursCalculator';

const tool = getToolById('study-hours');

export const metadata = {
  title: 'Study Hours Calculator — Weekly Planner',
  description: 'Plan your study goals by distributing your available hours evenly across subjects.',
};

export default function StudyHoursPage() {
  return (
    <CalculatorWrapper tool={tool}>
      <StudyHoursCalculator tool={tool} />
    </CalculatorWrapper>
  );
}
