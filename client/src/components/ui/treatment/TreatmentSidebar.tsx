import Link from 'next/link';

interface TreatmentSidebarProps {
  currentPage: string;
}

const healthTopics = [
  { name: "Anxiety Disorders", href: "/treatment/anxiety" },
  { name: "Attention-Deficit/Hyperactivity Disorder (ADHD)", href: "/treatment/adhd" },
  // { name: "Autism Spectrum Disorder", href: "/treatment/autism" },
  { name: "Bipolar Disorder", href: "/treatment/bipolar" },
  // { name: "Borderline Personality Disorder", href: "/treatment/borderline" },
  { name: "COVID-19 and Mental Health", href: "/treatment/covid-mental-health" },
  { name: "Couples Therapy", href: "/treatment/couples" },
  { name: "Depression", href: "/treatment/depression" },
  // { name: "Disruptive Mood Dysregulation Disorder (DMDD)", href: "/treatment/dmdd" },
  // { name: "Eating Disorders", href: "/treatment/eating-disorders" },
  // { name: "HIV and Mental Health", href: "/treatment/hiv-mental-health" },
  { name: "Life Transitions", href: "/treatment/life-transitions" },
  { name: "Addiction Recovery", href: "/treatment/addiction" },
  // { name: "Obsessive-Compulsive Disorder (OCD)", href: "/treatment/ocd" },
  // { name: "Schizophrenia", href: "/treatment/schizophrenia" },
  { name: "Sleep Disorders", href: "/treatment/sleep" },
  { name: "Stress Management", href: "/treatment/stress" },
  // { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
  { name: "Trauma Therapy", href: "/treatment/trauma" },
  { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd" },
];

export default function TreatmentSidebar({ currentPage }: TreatmentSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">HEALTH TOPICS</h3>
        <nav className="space-y-1">
          {healthTopics.map((topic) => (
            <Link
              key={topic.name}
              href={topic.href}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                topic.href === currentPage
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {topic.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
