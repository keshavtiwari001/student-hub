import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import ExamCountdown from '@/components/productivity/ExamCountdown';

const tool = getToolById('exam-countdown');

export const metadata = {
  title: 'Exam Countdown — Live Timer for Tests & Finals',
  description: 'Live countdown timers for upcoming midterms, finals, and standardized tests.',
};

export default function ExamCountdownPage() {
  return (
    <CalculatorWrapper tool={tool}>
      <ExamCountdown tool={tool} />
    </CalculatorWrapper>
  );
}
