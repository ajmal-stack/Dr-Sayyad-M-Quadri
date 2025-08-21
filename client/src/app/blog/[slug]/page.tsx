import { notFound } from 'next/navigation';
import blogsData from '@/data/blogs.json';
import BlogPostClient from './BlogPostClient';

// Type definitions
interface JSONBlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  featured: boolean;
  content?: string;
}

interface HardcodedBlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorDetails: {
    name: string;
    title: string;
    bio: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
  engagement: {
    likes: number;
    views: number;
    comments: number;
    saves: number;
  };
  content: string;
}

type BlogPost = JSONBlogPost | HardcodedBlogPost;

// Create slug from title
const createSlug = (title: string) => {
  return title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

// Get blog post by slug from JSON data
const getBlogPost = (slug: string): JSONBlogPost | null => {
  // Check all blogs (featured + others) for matching slug
  const allBlogs = [blogsData.featuredBlog, ...blogsData.otherBlogs];
  
  return allBlogs.find(blog => createSlug(blog.title) === slug) || null;
};

// Fallback hardcoded data for development (can be removed when all data is in JSON)
const getHardcodedBlogPost = (slug: string): HardcodedBlogPost | null => {
  const posts = {
    'managing-diabetes-in-2024-evidence-based-approaches-for-better-health-outcomes': {
      id: 1,
      title: 'Managing Diabetes in 2024: Evidence-Based Approaches for Better Health Outcomes',
      excerpt: 'As diabetes rates continue to rise globally, understanding modern management strategies is crucial. Dr. Syed M Quadri shares insights from 15 years of clinical practice on comprehensive diabetes care, from lifestyle interventions to cutting-edge technologies.',
      author: 'Dr. Syed M Quadri',
      authorDetails: {
        name: 'Dr. Syed M Quadri',
        title: 'MD, Internal Medicine & General Practice',
        credentials: ['Board Certified Physician', 'Internal Medicine Residency', '15+ Years Experience'],
        bio: 'Dr. Quadri is a board-certified physician with over 15 years of experience in internal medicine and diabetes care. He specializes in comprehensive diabetes management, cardiovascular risk reduction, and lifestyle medicine.',
        specialties: ['Diabetes Management', 'Cardiovascular Health', 'Preventive Care'],
        publications: 23,
        citations: 567
      },
      category: 'General Health',
      publishedAt: '2024-12-20',
      readTime: '12 min read',
      image: '/Services/Diabetes Management.jpg',
      tags: ['Diabetes', 'Internal Medicine', 'Lifestyle Medicine', 'Cardiovascular Health'],
      engagement: {
        likes: 267,
        views: 3842,
        comments: 45,
        saves: 123
      },
      rating: 4.8,
      difficulty: 'Intermediate',
      citations: 18,
      content: `
        <p>Diabetes mellitus affects over 537 million adults worldwide, making it one of the most significant public health challenges of our time. As a physician who has spent over 15 years treating patients with diabetes, I've witnessed remarkable advances in our understanding and management of this complex condition.</p>

        <h2>Understanding Diabetes: Beyond Blood Sugar</h2>
        <p>Diabetes is fundamentally a metabolic disorder characterized by chronic hyperglycemia resulting from defects in insulin secretion, insulin action, or both. However, modern medicine recognizes diabetes as a multisystem disease requiring comprehensive, patient-centered care.</p>

        <h3>Type 1 vs Type 2: Key Differences</h3>
        <p><strong>Type 1 Diabetes</strong> represents an autoimmune destruction of pancreatic beta cells, typically presenting in childhood or early adulthood. These patients require lifelong insulin therapy and careful monitoring for autoimmune comorbidities.</p>
        <p><strong>Type 2 Diabetes</strong> accounts for 90-95% of cases and involves insulin resistance combined with progressive beta-cell dysfunction. This form is strongly associated with obesity, sedentary lifestyle, and genetic predisposition.</p>

        <h2>The Modern Approach to Diabetes Management</h2>
        <p>In my practice, I've adopted a holistic approach that addresses not just glycemic control, but the full spectrum of patient needs:</p>

        <h3>1. Individualized Glycemic Targets</h3>
        <p>Gone are the days of one-size-fits-all HbA1c goals. Current guidelines recommend personalized targets based on life expectancy, comorbidities, hypoglycemia risk, patient preferences, and support systems.</p>

        <h3>2. Comprehensive Cardiovascular Risk Management</h3>
        <p>Diabetes doubles cardiovascular risk. I ensure all my patients receive lipid management with statins when appropriate, blood pressure control (target <130/80 mmHg), antiplatelet therapy when indicated, and regular cardiovascular risk assessment.</p>

        <h3>3. Advanced Monitoring Technologies</h3>
        <p>Continuous glucose monitors (CGMs) have revolutionized diabetes care. These devices provide real-time glucose data, helping patients understand how food, exercise, and stress affect their levels.</p>

        <h2>Evidence-Based Medication Strategies</h2>
        <h3>First-Line Therapy: Metformin</h3>
        <p>Metformin remains the cornerstone of Type 2 diabetes treatment due to its proven cardiovascular benefits, weight neutrality, low hypoglycemia risk, and extensive safety profile.</p>

        <h3>Second-Line Options: Choosing Wisely</h3>
        <p>The selection of additional medications depends on patient-specific factors:</p>
        <ul>
          <li><strong>GLP-1 Receptor Agonists</strong> for patients needing weight loss and cardiovascular protection</li>
          <li><strong>SGLT-2 Inhibitors</strong> for those with heart failure or chronic kidney disease</li>
          <li><strong>Insulin</strong> when other medications are insufficient or contraindicated</li>
        </ul>

        <h2>Lifestyle Medicine: The Foundation of Care</h2>
        <p>No medication can replace the importance of lifestyle interventions:</p>

        <h3>Nutrition Therapy</h3>
        <ul>
          <li>Mediterranean-style eating patterns</li>
          <li>Carbohydrate counting and timing</li>
          <li>Portion control strategies</li>
          <li>Regular meal timing</li>
        </ul>

        <h3>Physical Activity</h3>
        <ul>
          <li>150 minutes of moderate aerobic activity weekly</li>
          <li>Resistance training 2-3 times per week</li>
          <li>Breaking up prolonged sitting</li>
          <li>Post-meal walks to blunt glucose spikes</li>
        </ul>

        <h2>Preventing Complications: A Proactive Approach</h2>
        <p>Regular screening and early intervention are crucial. Annual assessments should include comprehensive eye exams, kidney function monitoring, foot examinations, and cardiovascular risk stratification.</p>

        <h2>Key Takeaways for Patients</h2>
        <ul>
          <li><strong>Diabetes is manageable</strong> with proper care and commitment</li>
          <li><strong>Technology is your ally</strong> – embrace CGMs and diabetes apps</li>
          <li><strong>Lifestyle changes work</strong> – they're often more powerful than medications</li>
          <li><strong>Regular monitoring prevents complications</strong></li>
          <li><strong>Work with your healthcare team</strong> – diabetes care is collaborative</li>
        </ul>

        <h2>Conclusion</h2>
        <p>After 15 years of caring for patients with diabetes, I remain optimistic about the future. With evidence-based treatments, advanced technologies, and a commitment to lifestyle medicine, we can help patients not just survive with diabetes, but thrive.</p>
        <p>If you're living with diabetes or prediabetes, remember that every small step toward better health matters. Partner with your healthcare team, stay informed about new developments, and never lose hope.</p>
      `
    },
    'understanding-anxiety-disorders-clinical-insights-and-treatment-approaches': {
      id: 2,
      title: 'Understanding Anxiety Disorders: Clinical Insights and Treatment Approaches',
      excerpt: 'Anxiety disorders affect millions worldwide. Drawing from clinical experience, Dr. Quadri explores the neurobiological basis of anxiety and evidence-based treatments that help patients reclaim their lives.',
      author: 'Dr. Syed M Quadri',
      authorDetails: {
        name: 'Dr. Syed M Quadri',
        title: 'MD, Internal Medicine & Mental Health',
        bio: 'Dr. Quadri is a board-certified physician with extensive experience in general medicine and mental health care, specializing in anxiety disorders and integrative treatment approaches.'
      },
      category: 'Mental Health',
      publishedAt: '2024-12-16',
      readTime: '11 min read',
      image: '/Services/Anxiety Disorders.svg',
      tags: ['Anxiety', 'Mental Health', 'Neurobiology', 'Psychotherapy'],
      engagement: {
        likes: 287,
        views: 3156,
        comments: 52,
        saves: 189
      },
      content: `
        <p>Anxiety disorders represent the most common category of mental health conditions, affecting approximately 40 million adults in the United States annually. As a physician who has treated countless patients with anxiety over the past 15 years, I've observed how these conditions can profoundly impact every aspect of a person's life—yet with proper understanding and treatment, recovery is not just possible, but expected.</p>

        <h2>The Neurobiological Foundation of Anxiety</h2>
        <p>Understanding anxiety requires appreciating its evolutionary purpose. The anxiety response evolved as a protective mechanism, alerting us to potential threats and preparing our bodies for action. However, in anxiety disorders, this system becomes dysregulated.</p>

        <h3>The Amygdala and Fear Processing</h3>
        <p>The amygdala, our brain's "alarm system," processes emotional information and triggers the fight-or-flight response. In anxiety disorders, the amygdala can become hyperactive, perceiving threats where none exist or responding disproportionately to minor stressors.</p>

        <h3>Neurotransmitter Systems</h3>
        <p>Several neurotransmitter systems are implicated in anxiety disorders:</p>
        <ul>
          <li><strong>GABA:</strong> The brain's primary inhibitory neurotransmitter, often deficient in anxiety disorders</li>
          <li><strong>Serotonin:</strong> Regulates mood and anxiety; imbalances contribute to various anxiety conditions</li>
          <li><strong>Norepinephrine:</strong> Involved in the stress response; excessive activity can perpetuate anxiety symptoms</li>
        </ul>

        <h2>Clinical Presentation: Beyond Worry</h2>
        <p>In my practice, I've learned that anxiety manifests differently in each patient. While excessive worry is common, the full clinical picture often includes:</p>

        <h3>Physical Symptoms</h3>
        <ul>
          <li>Cardiovascular: Palpitations, chest tightness, elevated heart rate</li>
          <li>Respiratory: Shortness of breath, hyperventilation</li>
          <li>Gastrointestinal: Nausea, abdominal distress, irritable bowel symptoms</li>
          <li>Neurological: Dizziness, trembling, muscle tension</li>
        </ul>

        <h3>Cognitive Symptoms</h3>
        <ul>
          <li>Catastrophic thinking patterns</li>
          <li>Difficulty concentrating</li>
          <li>Memory problems</li>
          <li>Racing thoughts</li>
        </ul>

        <h2>Evidence-Based Treatment Approaches</h2>
        <p>The good news is that anxiety disorders are among the most treatable mental health conditions. My approach integrates multiple evidence-based modalities:</p>

        <h3>Cognitive Behavioral Therapy (CBT)</h3>
        <p>CBT remains the gold standard for anxiety treatment. This approach helps patients identify and modify maladaptive thought patterns and behaviors. Key components include:</p>
        <ul>
          <li>Cognitive restructuring to challenge anxious thoughts</li>
          <li>Behavioral experiments to test feared outcomes</li>
          <li>Exposure therapy for specific phobias and panic disorder</li>
        </ul>

        <h3>Pharmacological Interventions</h3>
        <p>When appropriate, medications can provide significant relief:</p>
        <ul>
          <li><strong>SSRIs/SNRIs:</strong> First-line medications with favorable safety profiles</li>
          <li><strong>Benzodiazepines:</strong> For short-term relief, used judiciously due to dependence risk</li>
          <li><strong>Buspirone:</strong> Non-sedating option for generalized anxiety</li>
          <li><strong>Beta-blockers:</strong> For performance anxiety and physical symptoms</li>
        </ul>

        <h3>Integrative Approaches</h3>
        <p>I've found that combining traditional treatments with complementary approaches enhances outcomes:</p>
        <ul>
          <li>Mindfulness-based stress reduction (MBSR)</li>
          <li>Regular aerobic exercise (as effective as medication for some patients)</li>
          <li>Sleep hygiene optimization</li>
          <li>Nutritional interventions (omega-3 fatty acids, magnesium)</li>
        </ul>

        <h2>The Importance of Personalized Care</h2>
        <p>No two patients with anxiety are identical. Factors I consider when developing treatment plans include:</p>
        <ul>
          <li>Specific anxiety disorder subtype</li>
          <li>Comorbid conditions (depression, substance use)</li>
          <li>Previous treatment responses</li>
          <li>Patient preferences and values</li>
          <li>Social support systems</li>
        </ul>

        <h2>Prognosis and Long-Term Management</h2>
        <p>With appropriate treatment, most patients experience significant improvement. Studies show that 70-80% of individuals with anxiety disorders respond well to evidence-based treatments. The key is persistence and patience—recovery is a process, not an event.</p>

        <h3>Maintaining Progress</h3>
        <ul>
          <li>Regular follow-up appointments</li>
          <li>Continued practice of coping skills</li>
          <li>Lifestyle modifications</li>
          <li>Medication management when needed</li>
        </ul>

        <h2>A Message of Hope</h2>
        <p>To patients struggling with anxiety: Your symptoms are real, your suffering is valid, and help is available. Anxiety disorders are medical conditions, not character flaws. With proper treatment and support, you can reclaim your life and rediscover peace of mind.</p>

        <p>If you're experiencing persistent anxiety that interferes with your daily functioning, please reach out to a healthcare professional. Early intervention leads to better outcomes, and you don't have to suffer in silence.</p>

        <h2>Conclusion</h2>
        <p>Anxiety disorders, while challenging, are highly treatable conditions. Through advances in our understanding of neurobiology, evidence-based psychotherapies, and thoughtful medication management, we can offer hope and healing to those affected. The journey to recovery may have its ups and downs, but with the right support and treatment, a fulfilling life is absolutely achievable.</p>
      `
    }
  };

  return posts[slug as keyof typeof posts] || null;
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug) || getHardcodedBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
