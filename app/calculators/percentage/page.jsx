import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import PercentageCalculator from '@/components/calculators/PercentageCalculator';

const tool = getToolById('percentage');

export const metadata = {
  title: 'Percentage Calculator — Marks & Score Percentage',
  description: 'Calculate marks percentage, percentage change, and fractional scores with ease.',
};

export default function PercentagePage() {
  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How to Calculate Percentage"
      explanationContent={
        <>
          <p>
            Percentage represents a proportion out of 100. To find the percentage of any score or marks,
            divide the obtained value by the maximum possible value and multiply by 100.
          </p>
          <p className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            Percentage = (Obtained Marks ÷ Maximum Marks) × 100
          </p>
        </>
      }
    >
      <PercentageCalculator tool={tool} />
    </CalculatorWrapper>
  );
}
