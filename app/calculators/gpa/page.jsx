import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import GPACalculator from '@/components/calculators/GPACalculator';

const tool = getToolById('gpa');

export const metadata = {
  title: 'GPA Calculator — Semester Grade Point Average',
  description: 'Calculate your semester GPA from course grades, letter grades, and credit hours.',
};

export default function GPAPage() {
  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How Semester GPA is Calculated"
      explanationContent={
        <>
          <p>
            Your semester Grade Point Average (GPA) is computed by multiplying the grade points earned in
            each subject by that subject's credits, summing them up, and dividing by the total credits.
          </p>
          <p className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            GPA = Σ (Course Grade Points × Course Credits) ÷ Total Credits
          </p>
        </>
      }
    >
      <GPACalculator tool={tool} />
    </CalculatorWrapper>
  );
}
