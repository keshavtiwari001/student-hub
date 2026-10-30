import { getToolById } from '@/data/toolsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import MarksCalculator from '@/components/calculators/MarksCalculator';

const tool = getToolById('marks');

export const metadata = {
  title: 'Marks Calculator — Total Marks & Aggregate Percentage',
  description: 'Sum up multiple subject marks, compute aggregate scores, and find your overall percentage.',
};

export default function MarksPage() {
  return (
    <CalculatorWrapper
      tool={tool}
      explanationTitle="How Marks Aggregate & Percentage Works"
      explanationContent={
        <p>
          Enter the obtained marks and maximum marks for each of your subjects. The calculator will sum
          up all obtained marks, sum up all maximum marks, and calculate your overall aggregate percentage.
        </p>
      }
    >
      <MarksCalculator tool={tool} />
    </CalculatorWrapper>
  );
}
