import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Smartphone, Calculator, ClipboardList, TrendingUp } from 'lucide-react';
import { TOOLS, CATEGORIES, getFeaturedTools, getToolsByCategory } from '@/data/toolsData';
import ToolCard from '@/components/ui/ToolCard';
import CategoryCard from '@/components/ui/CategoryCard';
import Button from '@/components/ui/Button';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import SectionHeading from '@/components/shared/SectionHeading';
import FAQSection from '@/components/shared/FAQSection';

const homeFaqs = [
  {
    question: 'Are these student tools free to use?',
    answer: 'Yes. Every calculator and tool on StudentHub is completely free, with no sign-up, no limits, and no hidden paywalls. They run entirely in your browser, so your data never leaves your device.',
  },
  {
    question: 'Do I need an account to use the calculators?',
    answer: 'No account is needed. Tools like the Study Planner and Exam Countdown save your data locally in your browser (localStorage), so it stays on your device and is available every time you return.',
  },
  {
    question: 'Are the calculation results accurate for my university?',
    answer: 'The calculators use standard, widely accepted formulas and clearly state their assumptions. Since grading and attendance rules vary between institutions, always confirm critical decisions with your official university records.',
  },
  {
    question: 'Does my data get stored on a server?',
    answer: 'No. Everything you type into these tools is processed and stored in your own browser only. There is no backend and nothing is transmitted anywhere.',
  },
  {
    question: 'Can I use these tools on my phone?',
    answer: 'Absolutely. The entire site is designed mobile-first — every calculator, timer, and planner works comfortably on small screens, tablets, laptops, and desktops.',
  },
];

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const academicTools = getToolsByCategory('academic');
  const productivityTools = getToolsByCategory('productivity');

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Simplify your <span className="text-blue-600 dark:text-blue-400">studies</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Free academic calculators and study productivity tools. Instant, private, and simple.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/student-dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" icon={ArrowRight}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular tools */}
      <section className="container mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="Most used"
          title="Popular student tools"
          description="The tools students reach for most often, all free and instant."
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <AdPlaceholder slot="in-content" className="container mx-auto px-4" />

      {/* Category sections */}
      <section className="container mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(CATEGORIES).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              toolCount={
                category.id === 'academic' ? academicTools.length : productivityTools.length
              }
            />
          ))}
        </div>
      </section>

      {/* Why use */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
        <div className="container mx-auto px-4 py-14">
          <SectionHeading
            align="center"
            title="Why students use StudentHub"
            description="Built for real coursework situations — fast, private, and accurate."
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Zap size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Instant results</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                No page reloads or waiting — every calculation updates as you type.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Private by design</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                All math runs in your browser. Your marks and plans never leave your device.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Smartphone size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Works everywhere</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Designed mobile-first, so every tool feels right on your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-14">
        <SectionHeading
          align="center"
          title="How it works"
          description="Three steps — no account, no setup."
          className="mb-10"
        />
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <li className="text-center">
            <div className="mx-auto w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Calculator size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              Pick a tool
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Choose the calculator or planner that matches what you need.
            </p>
          </li>
          <li className="text-center">
            <div className="mx-auto w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <ClipboardList size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              Enter your details
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Type your numbers — clear labels tell you exactly what to enter.
            </p>
          </li>
          <li className="text-center">
            <div className="mx-auto w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              Get your answer
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              See results instantly, with the working out explained below every tool.
            </p>
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-14">
        <SectionHeading
          align="center"
          title="Frequently asked questions"
          className="mb-8"
        />
        <div className="max-w-3xl mx-auto">
          <FAQSection faqs={homeFaqs} title="" className="[&>h2]:hidden" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-blue-600">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to sort out your semester?
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Check your attendance, calculate your CGPA, and plan your study time — all in one place.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore All Tools <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
