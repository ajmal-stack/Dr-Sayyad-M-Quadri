import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import Treatment from '../models/Treatment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

const treatmentsData = [
  // Mental Health Treatments
  {
    name: 'Anxiety Disorders Treatment',
    description: 'Comprehensive treatment for various anxiety disorders including generalized anxiety, social anxiety, and panic disorders.',
    detailedDescription: '<h2>Understanding Anxiety Disorders</h2><p>Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. Our evidence-based treatment approach combines cognitive-behavioral therapy, mindfulness techniques, and when appropriate, medication management to help you regain control over your life.</p>',
    category: 'Mental Health',
    subcategory: 'Anxiety',
    image: '/Services/Anxiety.jpg',
    gradient: 'from-blue-500 to-indigo-600',
    icon: 'HeartIcon',
    duration: '12-16 sessions',
    methods: ['Cognitive Behavioral Therapy (CBT)', 'Exposure Therapy', 'Mindfulness-Based Stress Reduction', 'Medication Management'],
    conditions: ['Generalized Anxiety Disorder', 'Social Anxiety', 'Panic Disorder', 'Specific Phobias'],
    keyPoints: [
      'Evidence-based treatment approaches',
      'Personalized treatment plans',
      'Both in-person and telehealth options',
      'Medication management when needed'
    ],
    metaTitle: 'Anxiety Disorders Treatment | Dr. Syed M Quadri',
    metaDescription: 'Expert treatment for anxiety disorders using evidence-based approaches. Get help with generalized anxiety, social anxiety, and panic disorders.',
    keywords: ['anxiety treatment', 'anxiety disorder', 'panic disorder', 'social anxiety', 'CBT'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 150,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Depression Treatment',
    description: 'Effective treatment for depression using evidence-based therapies and comprehensive care approaches.',
    detailedDescription: '<h2>Treating Depression</h2><p>Depression is a serious but treatable condition. Our comprehensive approach includes psychotherapy, lifestyle modifications, and medication when necessary to help you overcome depression and rediscover joy in life.</p>',
    category: 'Mental Health',
    subcategory: 'Depression',
    image: '/Services/Depression.jpg',
    gradient: 'from-purple-500 to-pink-600',
    icon: 'SparklesIcon',
    duration: '12-20 sessions',
    methods: ['Cognitive Behavioral Therapy', 'Interpersonal Therapy', 'Behavioral Activation', 'Medication Management'],
    conditions: ['Major Depressive Disorder', 'Persistent Depressive Disorder', 'Seasonal Affective Disorder'],
    keyPoints: [
      'Comprehensive assessment and diagnosis',
      'Evidence-based treatment protocols',
      'Regular progress monitoring',
      'Holistic approach to wellness'
    ],
    metaTitle: 'Depression Treatment | Dr. Syed M Quadri',
    metaDescription: 'Professional depression treatment using proven therapies. Get help overcoming depression with personalized care.',
    keywords: ['depression treatment', 'major depression', 'therapy for depression', 'antidepressants'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 150,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'PTSD & Trauma Treatment',
    description: 'Specialized treatment for post-traumatic stress disorder and trauma-related conditions.',
    detailedDescription: '<h2>Healing from Trauma</h2><p>Trauma can have lasting effects on mental health. Our trauma-informed care approach helps you process traumatic experiences safely and develop healthy coping mechanisms.</p>',
    category: 'Mental Health',
    subcategory: 'Trauma',
    image: '/Services/PTSD.jpg',
    gradient: 'from-red-500 to-orange-600',
    icon: 'ShieldCheckIcon',
    duration: '16-24 sessions',
    methods: ['EMDR Therapy', 'Trauma-Focused CBT', 'Prolonged Exposure Therapy', 'Somatic Experiencing'],
    conditions: ['PTSD', 'Complex PTSD', 'Acute Stress Disorder', 'Trauma-Related Disorders'],
    keyPoints: [
      'Trauma-informed care approach',
      'Evidence-based trauma therapies',
      'Safe and supportive environment',
      'Gradual processing of traumatic memories'
    ],
    metaTitle: 'PTSD & Trauma Treatment | Dr. Syed M Quadri',
    metaDescription: 'Expert PTSD and trauma treatment using EMDR and trauma-focused therapies. Heal from traumatic experiences.',
    keywords: ['PTSD treatment', 'trauma therapy', 'EMDR', 'trauma counseling'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 175,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Bipolar Disorder Management',
    description: 'Comprehensive management of bipolar disorder with medication and therapy.',
    detailedDescription: '<h2>Managing Bipolar Disorder</h2><p>Bipolar disorder requires ongoing management. Our integrated approach combines medication management, psychotherapy, and lifestyle interventions to help stabilize mood and improve quality of life.</p>',
    category: 'Mental Health',
    subcategory: 'Mood Disorders',
    image: '/Services/Bipolar.jpg',
    gradient: 'from-yellow-500 to-orange-600',
    icon: 'BoltIcon',
    duration: 'Ongoing care',
    methods: ['Medication Management', 'Psychoeducation', 'CBT', 'Family Therapy'],
    conditions: ['Bipolar I Disorder', 'Bipolar II Disorder', 'Cyclothymic Disorder'],
    keyPoints: [
      'Mood stabilization strategies',
      'Medication optimization',
      'Relapse prevention',
      'Family support and education'
    ],
    metaTitle: 'Bipolar Disorder Management | Dr. Syed M Quadri',
    metaDescription: 'Comprehensive bipolar disorder management with medication and therapy. Stabilize mood and improve quality of life.',
    keywords: ['bipolar disorder', 'mood stabilizers', 'bipolar treatment', 'mania'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 175,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: true
    }
  },
  {
    name: 'ADHD Treatment',
    description: 'Comprehensive ADHD treatment for children, adolescents, and adults.',
    detailedDescription: '<h2>ADHD Treatment Across the Lifespan</h2><p>ADHD affects people of all ages. Our comprehensive approach includes assessment, medication management, behavioral strategies, and coaching to help you manage symptoms effectively.</p>',
    category: 'Mental Health',
    subcategory: 'ADHD',
    image: '/Services/ADHD.jpg',
    gradient: 'from-green-500 to-teal-600',
    icon: 'LightBulbIcon',
    duration: 'Ongoing care',
    methods: ['Medication Management', 'Behavioral Therapy', 'Coaching', 'Skills Training'],
    conditions: ['ADHD Inattentive Type', 'ADHD Hyperactive Type', 'ADHD Combined Type'],
    keyPoints: [
      'Comprehensive ADHD assessment',
      'Medication optimization',
      'Executive function coaching',
      'School/work accommodations support'
    ],
    metaTitle: 'ADHD Treatment | Dr. Syed M Quadri',
    metaDescription: 'Expert ADHD treatment for all ages. Medication management, therapy, and coaching for better focus and productivity.',
    keywords: ['ADHD treatment', 'attention deficit', 'ADHD medication', 'ADHD therapy'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 150,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Stress Management',
    description: 'Learn effective strategies to manage stress and improve overall well-being.',
    detailedDescription: '<h2>Mastering Stress Management</h2><p>Chronic stress can impact every aspect of your life. Learn evidence-based techniques to manage stress, build resilience, and improve your overall well-being.</p>',
    category: 'Mental Health',
    subcategory: 'Wellness',
    image: '/Services/Stress.jpg',
    gradient: 'from-cyan-500 to-blue-600',
    icon: 'SunIcon',
    duration: '8-12 sessions',
    methods: ['Mindfulness Training', 'Relaxation Techniques', 'Time Management', 'Lifestyle Coaching'],
    conditions: ['Chronic Stress', 'Work-Related Stress', 'Burnout'],
    keyPoints: [
      'Stress reduction techniques',
      'Mindfulness practices',
      'Work-life balance strategies',
      'Resilience building'
    ],
    metaTitle: 'Stress Management | Dr. Syed M Quadri',
    metaDescription: 'Learn effective stress management techniques. Build resilience and improve well-being with expert guidance.',
    keywords: ['stress management', 'stress relief', 'burnout', 'mindfulness'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 125,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Sleep Disorders Treatment',
    description: 'Treatment for insomnia and other sleep-related disorders.',
    detailedDescription: '<h2>Improving Sleep Quality</h2><p>Quality sleep is essential for mental and physical health. Our evidence-based approach addresses the root causes of sleep problems and helps you develop healthy sleep patterns.</p>',
    category: 'Mental Health',
    subcategory: 'Sleep',
    image: '/Services/Sleep.jpg',
    gradient: 'from-indigo-500 to-purple-600',
    icon: 'MoonIcon',
    duration: '6-10 sessions',
    methods: ['CBT for Insomnia', 'Sleep Hygiene Education', 'Relaxation Training', 'Medication Management'],
    conditions: ['Insomnia', 'Sleep-Wake Disorders', 'Circadian Rhythm Disorders'],
    keyPoints: [
      'Evidence-based sleep interventions',
      'Sleep hygiene optimization',
      'Cognitive restructuring',
      'Medication when appropriate'
    ],
    metaTitle: 'Sleep Disorders Treatment | Dr. Syed M Quadri',
    metaDescription: 'Expert treatment for insomnia and sleep disorders. Improve sleep quality with CBT and proven techniques.',
    keywords: ['insomnia treatment', 'sleep disorders', 'CBT for insomnia', 'sleep therapy'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 150,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Couples Therapy',
    description: 'Relationship counseling to improve communication and strengthen bonds.',
    detailedDescription: '<h2>Strengthening Relationships</h2><p>Healthy relationships require work and commitment. Our couples therapy helps partners improve communication, resolve conflicts, and build stronger connections.</p>',
    category: 'Mental Health',
    subcategory: 'Relationships',
    image: '/Services/Couples.jpg',
    gradient: 'from-pink-500 to-rose-600',
    icon: 'HeartIcon',
    duration: '12-20 sessions',
    methods: ['Emotionally Focused Therapy', 'Gottman Method', 'Communication Training', 'Conflict Resolution'],
    conditions: ['Relationship Distress', 'Communication Issues', 'Infidelity Recovery'],
    keyPoints: [
      'Improve communication skills',
      'Resolve conflicts effectively',
      'Rebuild trust and intimacy',
      'Strengthen emotional connection'
    ],
    metaTitle: 'Couples Therapy | Dr. Syed M Quadri',
    metaDescription: 'Professional couples therapy to improve communication and strengthen relationships. Expert relationship counseling.',
    keywords: ['couples therapy', 'marriage counseling', 'relationship therapy', 'couples counseling'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 200,
      insuranceAccepted: false
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Addiction Recovery',
    description: 'Comprehensive treatment for substance use disorders and behavioral addictions.',
    detailedDescription: '<h2>Path to Recovery</h2><p>Addiction is a treatable disease. Our comprehensive approach addresses both the physical and psychological aspects of addiction to support lasting recovery.</p>',
    category: 'Mental Health',
    subcategory: 'Addiction',
    image: '/Services/Addiction.jpg',
    gradient: 'from-orange-500 to-red-600',
    icon: 'ShieldCheckIcon',
    duration: 'Ongoing care',
    methods: ['Motivational Interviewing', '12-Step Facilitation', 'CBT', 'Medication-Assisted Treatment'],
    conditions: ['Substance Use Disorders', 'Alcohol Use Disorder', 'Behavioral Addictions'],
    keyPoints: [
      'Comprehensive assessment',
      'Individualized treatment plans',
      'Relapse prevention strategies',
      'Family support programs'
    ],
    metaTitle: 'Addiction Recovery Treatment | Dr. Syed M Quadri',
    metaDescription: 'Comprehensive addiction treatment and recovery support. Evidence-based care for substance use disorders.',
    keywords: ['addiction treatment', 'substance abuse', 'recovery', 'rehab'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 175,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: true
    }
  },
  {
    name: 'Life Transitions Counseling',
    description: 'Support during major life changes and transitions.',
    detailedDescription: '<h2>Navigating Life Changes</h2><p>Major life transitions can be challenging. Get support and guidance as you navigate career changes, relocation, retirement, or other significant life events.</p>',
    category: 'Mental Health',
    subcategory: 'Wellness',
    image: '/Services/Life-Transitions.jpg',
    gradient: 'from-teal-500 to-cyan-600',
    icon: 'ArrowPathIcon',
    duration: '6-12 sessions',
    methods: ['Solution-Focused Therapy', 'Supportive Counseling', 'Goal Setting', 'Stress Management'],
    conditions: ['Career Transitions', 'Relocation Stress', 'Retirement Adjustment', 'Life Changes'],
    keyPoints: [
      'Navigate change effectively',
      'Build resilience',
      'Set meaningful goals',
      'Develop coping strategies'
    ],
    metaTitle: 'Life Transitions Counseling | Dr. Syed M Quadri',
    metaDescription: 'Professional support during major life transitions. Navigate change with confidence and resilience.',
    keywords: ['life transitions', 'career change', 'life coaching', 'transition counseling'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 125,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'COVID-19 Mental Health Support',
    description: 'Mental health support for pandemic-related stress and anxiety.',
    detailedDescription: '<h2>Pandemic Mental Health Support</h2><p>The COVID-19 pandemic has affected mental health worldwide. Get support for pandemic-related anxiety, isolation, grief, and adjustment challenges.</p>',
    category: 'Mental Health',
    subcategory: 'Crisis Support',
    image: '/Services/COVID-Mental-Health.jpg',
    gradient: 'from-blue-500 to-purple-600',
    icon: 'HeartIcon',
    duration: '8-12 sessions',
    methods: ['Supportive Therapy', 'Grief Counseling', 'Anxiety Management', 'Resilience Building'],
    conditions: ['Pandemic Anxiety', 'Isolation', 'Grief and Loss', 'Adjustment Disorders'],
    keyPoints: [
      'Process pandemic experiences',
      'Manage anxiety and stress',
      'Address isolation effects',
      'Build post-pandemic resilience'
    ],
    metaTitle: 'COVID-19 Mental Health Support | Dr. Syed M Quadri',
    metaDescription: 'Mental health support for pandemic-related stress, anxiety, and grief. Expert care during challenging times.',
    keywords: ['COVID mental health', 'pandemic anxiety', 'COVID stress', 'pandemic support'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 125,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },

  // General Health Treatments
  {
    name: 'Diabetes Management',
    description: 'Comprehensive diabetes care including monitoring, medication, and lifestyle management.',
    detailedDescription: '<h2>Managing Diabetes Effectively</h2><p>Effective diabetes management requires a comprehensive approach. Our program includes regular monitoring, medication management, nutrition counseling, and lifestyle modifications to help you maintain healthy blood sugar levels.</p>',
    category: 'General Health',
    subcategory: 'Chronic Disease',
    image: '/Services/Diabetes Management.jpg',
    gradient: 'from-blue-500 to-cyan-600',
    icon: 'HeartIcon',
    duration: 'Ongoing care',
    methods: ['Blood Sugar Monitoring', 'Medication Management', 'Nutrition Counseling', 'Exercise Planning'],
    conditions: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Prediabetes', 'Gestational Diabetes'],
    keyPoints: [
      'Regular blood sugar monitoring',
      'Personalized medication plans',
      'Nutrition and lifestyle guidance',
      'Complication prevention'
    ],
    metaTitle: 'Diabetes Management | Dr. Syed M Quadri',
    metaDescription: 'Comprehensive diabetes care and management. Expert guidance for Type 1, Type 2, and prediabetes.',
    keywords: ['diabetes management', 'blood sugar control', 'diabetes care', 'insulin therapy'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 150,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Hypertension Treatment',
    description: 'Blood pressure management through medication and lifestyle modifications.',
    detailedDescription: '<h2>Controlling High Blood Pressure</h2><p>High blood pressure is a serious condition that requires ongoing management. Our comprehensive approach combines medication, diet, exercise, and stress management to help you maintain healthy blood pressure levels.</p>',
    category: 'General Health',
    subcategory: 'Cardiovascular',
    image: '/Services/Hypertension.jpg',
    gradient: 'from-red-500 to-pink-600',
    icon: 'HeartIcon',
    duration: 'Ongoing care',
    methods: ['Medication Management', 'DASH Diet', 'Exercise Program', 'Stress Reduction'],
    conditions: ['Primary Hypertension', 'Secondary Hypertension', 'Resistant Hypertension'],
    keyPoints: [
      'Regular blood pressure monitoring',
      'Medication optimization',
      'Lifestyle modifications',
      'Heart disease prevention'
    ],
    metaTitle: 'Hypertension Treatment | Dr. Syed M Quadri',
    metaDescription: 'Expert hypertension treatment and blood pressure management. Reduce cardiovascular risk with comprehensive care.',
    keywords: ['hypertension', 'high blood pressure', 'blood pressure management', 'cardiovascular health'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 125,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Weight Management',
    description: 'Medically supervised weight loss and healthy weight maintenance programs.',
    detailedDescription: '<h2>Achieving Healthy Weight</h2><p>Sustainable weight management requires a personalized approach. Our program combines medical supervision, nutrition counseling, exercise planning, and behavioral support to help you achieve and maintain a healthy weight.</p>',
    category: 'General Health',
    subcategory: 'Wellness',
    image: '/Services/Weight.jpg',
    gradient: 'from-green-500 to-emerald-600',
    icon: 'ScaleIcon',
    duration: '12-24 weeks',
    methods: ['Nutrition Counseling', 'Exercise Planning', 'Behavioral Therapy', 'Medical Monitoring'],
    conditions: ['Obesity', 'Overweight', 'Metabolic Syndrome'],
    keyPoints: [
      'Personalized weight loss plans',
      'Medical supervision',
      'Sustainable lifestyle changes',
      'Long-term maintenance support'
    ],
    metaTitle: 'Weight Management Program | Dr. Syed M Quadri',
    metaDescription: 'Medically supervised weight management program. Achieve healthy weight with expert guidance and support.',
    keywords: ['weight loss', 'weight management', 'obesity treatment', 'medical weight loss'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 150,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: false
    }
  },
  {
    name: 'Preventive Care',
    description: 'Comprehensive preventive health screenings and wellness checkups.',
    detailedDescription: '<h2>Prevention is Key</h2><p>Regular preventive care is essential for maintaining good health. Our comprehensive screenings and wellness checkups help detect potential health issues early when they are most treatable.</p>',
    category: 'General Health',
    subcategory: 'Prevention',
    image: '/Services/Preventive.jpg',
    gradient: 'from-purple-500 to-indigo-600',
    icon: 'ShieldCheckIcon',
    duration: 'Annual visits',
    methods: ['Health Screenings', 'Lab Tests', 'Physical Examinations', 'Health Education'],
    conditions: ['Health Maintenance', 'Disease Prevention', 'Early Detection'],
    keyPoints: [
      'Comprehensive health screenings',
      'Early disease detection',
      'Personalized prevention plans',
      'Health risk assessment'
    ],
    metaTitle: 'Preventive Care Services | Dr. Syed M Quadri',
    metaDescription: 'Comprehensive preventive care and health screenings. Maintain optimal health with regular checkups.',
    keywords: ['preventive care', 'health screening', 'wellness checkup', 'annual physical'],
    status: 'published',
    featured: true,
    active: true,
    pricing: {
      sessionCost: 200,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: false,
      emergency: false
    }
  },
  {
    name: 'Vaccination Services',
    description: 'Comprehensive vaccination services for all ages.',
    detailedDescription: '<h2>Stay Protected</h2><p>Vaccinations are one of the most effective ways to prevent serious diseases. We offer comprehensive vaccination services for children, adults, and seniors, including flu shots, COVID-19 vaccines, and travel vaccines.</p>',
    category: 'General Health',
    subcategory: 'Prevention',
    image: '/Services/Vaccinations.jpg',
    gradient: 'from-yellow-500 to-orange-600',
    icon: 'ShieldCheckIcon',
    duration: 'As needed',
    methods: ['Immunizations', 'Vaccine Counseling', 'Travel Medicine', 'Booster Shots'],
    conditions: ['Disease Prevention', 'Travel Health', 'Immunization'],
    keyPoints: [
      'All recommended vaccines',
      'Travel vaccination services',
      'Vaccine safety information',
      'Immunization records'
    ],
    metaTitle: 'Vaccination Services | Dr. Syed M Quadri',
    metaDescription: 'Comprehensive vaccination services for all ages. Stay protected with flu shots, COVID-19 vaccines, and more.',
    keywords: ['vaccinations', 'immunizations', 'flu shot', 'COVID vaccine', 'travel vaccines'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 50,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: false,
      emergency: false
    }
  },
  {
    name: 'COVID-19 Care',
    description: 'Testing, treatment, and management of COVID-19 and long COVID symptoms.',
    detailedDescription: '<h2>COVID-19 Care Services</h2><p>Comprehensive COVID-19 care including testing, treatment, vaccination, and long COVID management. Get expert care throughout your COVID-19 journey.</p>',
    category: 'General Health',
    subcategory: 'Infectious Disease',
    image: '/Services/COVID.jpg',
    gradient: 'from-red-500 to-orange-600',
    icon: 'ShieldCheckIcon',
    duration: 'As needed',
    methods: ['COVID Testing', 'Treatment Protocols', 'Vaccination', 'Long COVID Management'],
    conditions: ['COVID-19 Infection', 'Long COVID', 'Post-COVID Syndrome'],
    keyPoints: [
      'Rapid and PCR testing',
      'Evidence-based treatment',
      'Vaccination services',
      'Long COVID support'
    ],
    metaTitle: 'COVID-19 Care | Dr. Syed M Quadri',
    metaDescription: 'Comprehensive COVID-19 testing, treatment, and long COVID management. Expert care for all COVID-related needs.',
    keywords: ['COVID-19', 'COVID testing', 'long COVID', 'COVID treatment', 'COVID vaccine'],
    status: 'published',
    featured: false,
    active: true,
    pricing: {
      sessionCost: 100,
      insuranceAccepted: true
    },
    availability: {
      inPerson: true,
      telehealth: true,
      emergency: true
    }
  }
];

async function seedTreatments() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing treatments
    console.log('🗑️  Clearing existing treatments...');
    await Treatment.deleteMany({});
    console.log('✅ Cleared existing treatments');

    // Generate slugs for all treatments
    console.log('🔧 Generating slugs...');
    const treatmentsWithSlugs = treatmentsData.map(treatment => ({
      ...treatment,
      slug: slugify(treatment.name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      })
    }));
    console.log('✅ Slugs generated');

    // Insert new treatments
    console.log('📝 Inserting treatments...');
    const insertedTreatments = await Treatment.insertMany(treatmentsWithSlugs);
    console.log(`✅ Successfully inserted ${insertedTreatments.length} treatments`);

    // Display summary
    console.log('\n📊 Summary:');
    const mentalHealthCount = insertedTreatments.filter(t => t.category === 'Mental Health').length;
    const generalHealthCount = insertedTreatments.filter(t => t.category === 'General Health').length;
    console.log(`   Mental Health: ${mentalHealthCount} treatments`);
    console.log(`   General Health: ${generalHealthCount} treatments`);
    console.log(`   Total: ${insertedTreatments.length} treatments`);

    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding treatments:', error);
    process.exit(1);
  }
}

// Run the seed function
seedTreatments();
