import React from 'react';
import { FaBookOpen, FaVideo, FaLightbulb, FaUsers, FaExternalLinkAlt, FaPlay, FaHeart } from 'react-icons/fa';

const Awareness = () => {
  
  // =========================================
  // HELPER: Get YouTube ID for Thumbnails
  // =========================================
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // =========================================
  // DATA SECTIONS
  // =========================================

  // 1. Articles with Real URLs
  const articles = [
    {
      category: "Education",
      readTime: "8 min read",
      title: "Understanding PCOS: A Complete Guide",
      desc: "Everything you need to know about Polycystic Ovary Syndrome, from diagnosis to treatment options.",
      tagColor: "#FCE7F3",
      textColor: "#D6689C",
      link: "https://www.healthline.com/health/polycystic-ovary-disease"
    },
    {
      category: "Mental Health",
      readTime: "6 min read",
      title: "PCOS and Mental Health: Breaking the Stigma",
      desc: "Exploring the psychological impact of PCOS and strategies for emotional well-being.",
      tagColor: "#FEEBC8",
      textColor: "#DD6B20",
      link: "https://www.psychologytoday.com/us/blog/womens-mental-health-matters/201512/pcos-and-depression"
    },
    {
      category: "Fertility",
      readTime: "10 min read",
      title: "Fertility and PCOS: What You Should Know",
      desc: "Navigating fertility challenges with PCOS and understanding your options.",
      tagColor: "#E9D8FD",
      textColor: "#805AD5",
      link: "https://www.mayoclinic.org/diseases-conditions/pcos/diagnosis-treatment/drc-20353443"
    },
    {
      category: "Natural Remedies",
      readTime: "7 min read",
      title: "Natural Remedies for PCOS Symptoms",
      desc: "Evidence-based natural approaches to managing common PCOS symptoms.",
      tagColor: "#C6F6D5",
      textColor: "#276749",
      link: "https://www.medicalnewstoday.com/articles/322637"
    }
  ];

  // 2. Videos with Real YouTube URLs (Thumbnails will be auto-generated)
  const videos = [
    {
      title: "PCOS Explained by Experts",
      desc: "Medical experts break down PCOS causes and treatments.",
      duration: "12:34",
      videoUrl: "https://youtu.be/Zrwzv3-SP7c?si=hN1oMLmQgqPefd5a" // Real PCOS Video ID
    },
    {
      title: "30-Minute PCOS-Friendly Workout",
      desc: "Low-impact exercises designed for hormonal balance.",
      duration: "31:20",
      videoUrl: "https://youtu.be/c57ksNThbKQ?si=fCm-q-w-02hOv3ex" // Generic Workout ID
    },
    {
      title: "Meal Prep for PCOS: Week of Recipes",
      desc: "Delicious anti-inflammatory meals for the whole week.",
      duration: "18:45",
      videoUrl: "https://youtu.be/pFnAXV5tgJE?si=-KyYlPDVf86sqERF" // Meal Prep ID
    }
  ];

  // 3. Tips Data
  const tips = [
    "Track your menstrual cycle using an app to identify patterns",
    "Stay hydrated - aim for at least 8 glasses of water daily",
    "Consider meal timing - eating at regular intervals helps blood sugar",
    "Find a supportive community - you're not alone in this journey",
    "Celebrate small wins - every positive change matters",
    "Communicate openly with your healthcare provider"
  ];

  return (
    <div className="container page-spacing">
      
      {/* 1. HERO SECTION */}
      <div className="text-center mb-16">
        <span className="badge">PCOS Awareness</span>
        <h1 style={{ fontSize: '3rem', margin: '15px 0' }}>
          Knowledge is <span style={{ color: '#D6689C' }}>Power</span>
        </h1>
        <p className="awareness-hero-text">
          Explore articles, videos, and real stories from women managing PCOS. 
          Education is the first step towards empowerment.
        </p>
      </div>

      {/* 2. FEATURED ARTICLES */}
      <div className="diet-section-header" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <div className="icon-header-lg" style={{ margin: 0 }}>
          <FaBookOpen />
        </div>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Featured <span style={{ color: '#D6689C' }}>Articles</span></h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px', marginBottom: '80px' }}>
        {articles.map((item, index) => (
          <div key={index} className="article-card">
            <div className="article-meta">
              <span className="article-tag" style={{ background: item.tagColor, color: item.textColor }}>
                {item.category}
              </span>
              <span className="read-time">{item.readTime}</span>
            </div>
            <h3 className="article-title">{item.title}</h3>
            <p className="article-desc">{item.desc}</p>
            
            {/* External Link */}
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="read-link">
              Read More <FaExternalLinkAlt size={12} />
            </a>
          </div>
        ))}
      </div>

      {/* 3. VIDEO LIBRARY (With Thumbnails) */}
      <div className="diet-section-header" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <div className="icon-header-lg" style={{ margin: 0 }}>
          <FaVideo />
        </div>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Video <span style={{ color: '#D6689C' }}>Library</span></h2>
      </div>

      <div className="result-grid-3" style={{ marginBottom: '80px', marginTop: '0' }}>
        {videos.map((video, index) => {
          // Generate Thumbnail URL
          const videoID = getYouTubeID(video.videoUrl);
          const thumbUrl = videoID 
            ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg` 
            : 'https://via.placeholder.com/320x180.png?text=No+Thumbnail';

          return (
            <a 
              key={index} 
              href={video.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="video-card">
                {/* Thumbnail Container */}
                <div className="video-thumbnail" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: '200px' }}>
                  <img 
                    src={thumbUrl} 
                    alt={video.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {/* Play Button Overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="play-btn-circle">
                      <FaPlay style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                  <span className="duration-badge">{video.duration}</span>
                </div>
                
                <div className="video-content">
                  <h4 className="video-title">{video.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#718096' }}>{video.desc}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* 4. DAILY TIPS */}
      <div className="text-center mb-10">
        <div className="icon-header-lg" style={{ margin: '0 auto 15px auto' }}>
          <FaLightbulb />
        </div>
        <h2 style={{ fontSize: '2rem' }}>Daily <span style={{ color: '#D6689C' }}>Tips</span></h2>
      </div>

      <div className="tips-grid" style={{ marginBottom: '80px' }}>
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <div className="tip-number">{index + 1}</div>
            <p style={{ color: '#4A5568', fontSize: '0.95rem', margin: 0 }}>{tip}</p>
          </div>
        ))}
      </div>

      {/* 5. REAL STORIES */}
      <div className="text-center mb-10">
        <div className="icon-header-lg" style={{ margin: '0 auto 15px auto' }}>
          <FaUsers />
        </div>
        <h2 style={{ fontSize: '2rem' }}>Real <span style={{ color: '#D6689C' }}>Stories</span></h2>
        <p style={{ color: '#718096' }}>Inspiring journeys from women who've navigated their PCOS diagnosis</p>
      </div>

      <div className="stories-grid">
        <div className="story-card">
          <div className="story-header">
            <div className="story-avatar" style={{ background: '#D6689C' }}>S</div>
            <div>
              <h4 style={{ margin: 0, color: '#2D3748' }}>Sarah M.</h4>
              <span style={{ fontSize: '0.85rem', color: '#718096' }}>Age 28</span>
            </div>
          </div>
          <p style={{ fontStyle: 'italic', color: '#4A5568', lineHeight: '1.6' }}>
            "After years of unexplained weight gain and irregular periods, getting diagnosed with PCOS was actually a relief. Now I have answers and a path forward."
          </p>
          <div className="story-tag">
            <FaHeart size={12} /> Lost 30 lbs in 6 months with lifestyle changes
          </div>
        </div>

        <div className="story-card">
          <div className="story-header">
            <div className="story-avatar" style={{ background: '#9F7AEA' }}>P</div>
            <div>
              <h4 style={{ margin: 0, color: '#2D3748' }}>Priya K.</h4>
              <span style={{ fontSize: '0.85rem', color: '#718096' }}>Age 32</span>
            </div>
          </div>
          <p style={{ fontStyle: 'italic', color: '#4A5568', lineHeight: '1.6' }}>
            "I was told I might never conceive naturally. Two years later, with proper management, I'm holding my beautiful baby girl."
          </p>
          <div className="story-tag">
            <FaHeart size={12} /> Natural conception after 2 years of PCOS management
          </div>
        </div>

        <div className="story-card">
          <div className="story-header">
            <div className="story-avatar" style={{ background: '#DD6B20' }}>E</div>
            <div>
              <h4 style={{ margin: 0, color: '#2D3748' }}>Emma L.</h4>
              <span style={{ fontSize: '0.85rem', color: '#718096' }}>Age 25</span>
            </div>
          </div>
          <p style={{ fontStyle: 'italic', color: '#4A5568', lineHeight: '1.6' }}>
            "PCOS made me feel broken. Finding a community of women going through the same thing changed everything for my mental health."
          </p>
          <div className="story-tag">
            <FaHeart size={12} /> Founded a local PCOS support group
          </div>
        </div>
      </div>

    </div>
  );
};

export default Awareness;