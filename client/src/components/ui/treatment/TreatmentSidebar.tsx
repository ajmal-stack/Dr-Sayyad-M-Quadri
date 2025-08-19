import Link from 'next/link';

interface TreatmentSidebarProps {
  currentPage: string;
}

const mentalHealthTopics = [
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

const generalHealthTopics = [
  { name: "Adult Vaccinations", href: "/treatment/vaccinations" },
  { name: "Diabetes Management", href: "/treatment/diabetes" },
  { name: "High Blood Pressure", href: "/treatment/hypertension" },
  { name: "COVID-19 Care", href: "/treatment/covid" },
  { name: "Healthy Weight Management", href: "/treatment/weight" },
  { name: "Preventive Health Screenings", href: "/treatment/preventive" },
];

export default function TreatmentSidebar({ currentPage }: TreatmentSidebarProps) {
  // Determine which category of topics to show based on current page
  const isGeneralHealth = [
    '/treatment/vaccinations',
    '/treatment/diabetes', 
    '/treatment/hypertension',
    '/treatment/covid',
    '/treatment/weight',
    '/treatment/preventive'
  ].includes(currentPage);

  const topicsToShow = isGeneralHealth ? generalHealthTopics : mentalHealthTopics;
  const categoryTitle = isGeneralHealth ? 'GENERAL HEALTH TOPICS' : 'MENTAL HEALTH TOPICS';
  
  // Dynamic color themes based on category
  const colorTheme = isGeneralHealth ? {
    active: 'bg-teal-100 text-teal-700',
    hover: 'hover:text-gray-900 hover:bg-teal-50',
    primaryLink: 'text-teal-600 hover:text-teal-800 hover:bg-teal-50',
    secondaryHover: 'hover:text-gray-700 hover:bg-teal-50'
  } : {
    active: 'bg-blue-100 text-blue-700',
    hover: 'hover:text-gray-900 hover:bg-blue-50',
    primaryLink: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50',
    secondaryHover: 'hover:text-gray-700 hover:bg-blue-50'
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">{categoryTitle}</h3>
        <nav className="space-y-1">
          {topicsToShow.map((topic) => (
            <Link
              key={topic.name}
              href={topic.href}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                topic.href === currentPage
                  ? `${colorTheme.active} font-medium` 
                  : `text-gray-600 ${colorTheme.hover}`
              }`}
            >
              {topic.name}
            </Link>
          ))}
        </nav>
        
        {/* Category Switch Link */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            href="/treatment"
            className={`block px-3 py-2 text-sm ${colorTheme.primaryLink} rounded-md transition-colors font-medium`}
          >
            ← Browse All Categories
          </Link>
          {isGeneralHealth ? (
            <Link
              href="/treatment/anxiety"
              className={`block px-3 py-2 text-sm text-gray-500 ${colorTheme.secondaryHover} rounded-md transition-colors mt-1`}
            >
              View Mental Health Topics
            </Link>
          ) : (
            <Link
              href="/treatment/vaccinations"
              className={`block px-3 py-2 text-sm text-gray-500 ${colorTheme.secondaryHover} rounded-md transition-colors mt-1`}
            >
              View General Health Topics
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
