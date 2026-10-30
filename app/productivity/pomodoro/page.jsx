import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import PomodoroTimer from '@/components/productivity/PomodoroTimer';

const tool = getToolById('pomodoro');

export const metadata = {
  title: 'Pomodoro Timer — Focus & Study Intervals',
  description: 'Boost your productivity with a focus timer based on the Pomodoro technique.',
};

export default function PomodoroPage() {
  return (
    <CalculatorWrapper tool={tool}>
      <PomodoroTimer tool={tool} />
    </CalculatorWrapper>
  );
}
