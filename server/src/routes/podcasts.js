import express from 'express';

const router = express.Router();

// Sample podcast data - replace with database calls later
const podcasts = [
  {
    id: 1,
    title: 'Mental Health Awareness',
    description:
      'Understanding the importance of mental health in modern society',
    duration: '45:30',
    publishDate: '2024-01-15',
    category: 'Health',
    audioUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Nutrition and Wellness',
    description: 'How proper nutrition impacts your overall well-being',
    duration: '38:15',
    publishDate: '2024-01-08',
    category: 'Nutrition',
    audioUrl: '#',
    featured: false,
  },
  {
    id: 3,
    title: 'Public Speaking Tips',
    description: 'Overcoming fear and becoming an effective speaker',
    duration: '52:20',
    publishDate: '2024-01-01',
    category: 'Self-Development',
    audioUrl: '#',
    featured: true,
  },
];

// GET /api/podcasts - Get all podcasts
router.get('/', (req, res) => {
  try {
    const { category, featured } = req.query;
    let filteredPodcasts = [...podcasts];

    if (category) {
      filteredPodcasts = filteredPodcasts.filter(
        (podcast) => podcast.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      filteredPodcasts = filteredPodcasts.filter((podcast) => podcast.featured);
    }

    res.json({
      success: true,
      count: filteredPodcasts.length,
      data: filteredPodcasts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch podcasts',
    });
  }
});

// GET /api/podcasts/:id - Get podcast by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const podcast = podcasts.find((p) => p.id === parseInt(id));

    if (!podcast) {
      return res.status(404).json({
        success: false,
        error: 'Podcast not found',
      });
    }

    res.json({
      success: true,
      data: podcast,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch podcast',
    });
  }
});

// GET /api/podcasts/search - Search podcasts
router.get('/search', (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    const searchResults = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(q.toLowerCase()) ||
        podcast.description.toLowerCase().includes(q.toLowerCase()) ||
        podcast.category.toLowerCase().includes(q.toLowerCase())
    );

    res.json({
      success: true,
      count: searchResults.length,
      data: searchResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search podcasts',
    });
  }
});

export default router;
