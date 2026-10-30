import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import AssignmentDeadline from '@/components/productivity/AssignmentDeadline';

const tool = getToolById('assignment-deadline');

export const metadata = {
  title: 'Assignment Deadline Calculator — Track Due Dates',
  description: 'Calculate exact time remaining and get visual urgency levels for pending assignments.',
};

export default function AssignmentDeadlinePage() {
  return (
    <CalculatorWrapper tool={tool}>
      <AssignmentDeadline tool={tool} />
    </CalculatorWrapper>
  );
}
