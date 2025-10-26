'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface RawMediumArticle {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  categories: string[];
  content: string;
  description: string;
}

interface MediumArticle extends RawMediumArticle {
  thumbnail: string; // Will always have a value after processing
}

const MediumArticles = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<MediumArticle | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Function to extract the first image URL from article content
  const cleanImageUrl = (url: string): string => {
    // Remove any query parameters and size specifications from Medium CDN URLs
    if (url.includes('cdn-images-1.medium.com')) {
      // Get the base URL without size parameters
      const baseUrl = url.replace(/\/max\/\d+\//, '/');
      // Use a smaller size to prevent timeout issues
      return baseUrl.replace(/^(https:\/\/cdn-images-1\.medium\.com\/)/, '$1max/800/');
    }
    return url;
  };

  const extractImageFromContent = (content: string): string | null => {
    try {
      // Try to find the first good image source
      const imgSources: string[] = [];

      // Look for og:image meta tag
      const ogImageMatch = content.match(/<meta property="og:image" content="([^"]+)"/);
      if (ogImageMatch) imgSources.push(ogImageMatch[1]);

      // Look for figure images
      const figureMatches = content.match(/<figure>.*?<img[^>]+src="([^">]+)".*?<\/figure>/g);
      if (figureMatches) {
        figureMatches.forEach(figure => {
          const imgMatch = figure.match(/src="([^">]+)"/);
          if (imgMatch) imgSources.push(imgMatch[1]);
        });
      }

      // Look for any img tags
      const imgMatches = content.match(/<img[^>]+src="([^">]+)"/g);
      if (imgMatches) {
        imgMatches.forEach(img => {
          const srcMatch = img.match(/src="([^">]+)"/);
          if (srcMatch) imgSources.push(srcMatch[1]);
        });
      }

      // Filter and clean URLs
      const validImages = imgSources
        .filter(url => url.startsWith('https://'))
        .map(cleanImageUrl)
        .filter(url => url.length < 250); // Avoid extremely long URLs

      return validImages[0] || null;
    } catch (error) {
      console.error('Error extracting image:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Replace with your Medium RSS feed URL (add your Medium username)
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yashspatil4779`
        );
        const data: { items: RawMediumArticle[] } = await response.json();
        
        // Process articles to ensure we have images
        const processedArticles: MediumArticle[] = data.items.map(article => ({
          ...article,
          thumbnail: article.thumbnail || extractImageFromContent(article.content) || '/images/default-article.jpg'
        }));
        
        setArticles(processedArticles);
      } catch (error) {
        console.error('Error fetching Medium articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Get all unique categories
  const allCategories = ['All', ...new Set(articles.flatMap(article => article.categories))];

  // Filter articles based on selected category
  const filteredArticles = activeFilter === 'All'
    ? articles
    : articles.filter(article => article.categories.includes(activeFilter));

  // Function to truncate text and add ellipsis
  const truncateText = (text: string, maxLength: number) => {
    const strippedText = text.replace(/<[^>]+>/g, '');
    return strippedText.length > maxLength
      ? `${strippedText.substring(0, maxLength)}...`
      : strippedText;
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 relative inline-block">
            Latest Articles
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Sharing insights and experiences through technical writing
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                  <div className="relative h-48">
                    <Image
                      src={article.thumbnail || '/images/default-article.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // @ts-ignore - typescript doesn't know about currentTarget.src
                        e.currentTarget.src = '/images/default-article.jpg';
                      }}
                      unoptimized // Skip image optimization for external URLs
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.categories.slice(0, 3).map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {truncateText(article.content, 150)}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-400">
                        {formatDate(article.pubDate)}
                      </span>
                      <span className="text-purple-400 group-hover:translate-x-2 transition-transform duration-300">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {!isLoading && articles.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No articles found. Check back soon!
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://medium.com/@yashspatil4779"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:scale-105 transition-transform duration-300"
          >
            View All Articles
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>

        {/* Article Modal */}
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-700/50 text-white hover:bg-gray-700 transition-colors"
                onClick={() => setSelectedArticle(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="relative h-64 sm:h-96">
                <Image
                  src={selectedArticle.thumbnail || '/images/default-article.jpg'}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  onError={(e) => {
                    // @ts-ignore - typescript doesn't know about currentTarget.src
                    e.currentTarget.src = '/images/default-article.jpg';
                  }}
                  unoptimized // Skip image optimization for external URLs
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>

              <div className="p-6 sm:p-8">
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedArticle.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </motion.div>

                <motion.h2
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedArticle.title}
                </motion.h2>

                <motion.p
                  className="text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {truncateText(selectedArticle.content, 300)}
                </motion.p>

                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-blue-400">
                    {formatDate(selectedArticle.pubDate)}
                  </span>
                  <motion.a
                    href={selectedArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Article
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MediumArticles;