'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  BookmarkIcon,
  PrinterIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import blogsData from '@/data/blogs.json';

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
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  const post = getBlogPost(params.slug) || getHardcodedBlogPost(params.slug);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (post) {
      // Handle different post types
      const likesCount = 'engagement' in post ? post.engagement.likes : post.likes;
      setLikes(likesCount || 0);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <LoadingAnimation className="text-blue-600 scale-150 mb-8" />
          <p className="text-slate-600 text-lg font-medium">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`);
        break;
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/blog" className="text-blue-500 hover:text-blue-700">
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Article Header */}
        <header className="mb-8 lg:mb-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              post.category === 'Mental Health' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-teal-100 text-teal-800'
            }`}>
              <TagIcon className="w-4 h-4 mr-1" />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-600 mb-6">
            <div className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {new Date('publishedAt' in post ? post.publishedAt : post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isLiked ? (
                <HeartSolidIcon className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              {likes}
            </button>

            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BookmarkIcon className="w-5 h-5" />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
              
              {/* Share Dropdown */}
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={() => handleShare('twitter')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share on Facebook
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share on LinkedIn
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share via Email
                </button>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <PrinterIcon className="w-5 h-5" />
              Print
            </button>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-6">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        {'content' in post && post.content ? (
          <div 
            className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed text-lg mb-8">
              {post.excerpt}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-800 font-medium">
                This article is currently being expanded with full content. Please check back soon for the complete article.
              </p>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              DS
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {'authorDetails' in post ? post.authorDetails.name : post.author}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Dr. Syed M Quadri is a board-certified physician specializing in mental health and general medicine. 
                With over 15 years of experience, he is dedicated to providing evidence-based care and educating 
                patients about their health and wellness journey.
              </p>
              <div className="mt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn more about Dr. Quadri
                  <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Articles
              <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
