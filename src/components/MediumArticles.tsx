"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

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
  thumbnail: string;
}

const MediumArticles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const cleanImageUrl = (url: string): string => {
    if (!url) return '';
    
    // Handle Medium CDN URLs
    if (url.includes('cdn-images-1.medium.com') || url.includes('miro.medium.com')) {
      // Remove size parameters and add a reasonable size
      let cleaned = url.replace(/\/max\/\d+\//, '/');
      cleaned = cleaned.replace(/\/w+\d+\//, '/');
      
      // Ensure we have a size parameter for Medium CDN
      if (cleaned.includes('cdn-images-1.medium.com') && !cleaned.includes('/max/')) {
        cleaned = cleaned.replace('cdn-images-1.medium.com/', 'cdn-images-1.medium.com/max/800/');
      }
      
      return cleaned;
    }
    
    return url;
  };

  const extractImageFromContent = (content: string, description?: string): string | null => {
    try {
      const imgSources: string[] = [];
      
      // Try to extract from og:image meta tag
      const ogImageMatch = content.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
      if (ogImageMatch && ogImageMatch[1]) {
        imgSources.push(ogImageMatch[1]);
      }

      // Try to extract from description if provided
      if (description) {
        const descImgMatch = description.match(/https?:\/\/[^\s<>"]+\.(jpg|jpeg|png|gif|webp)/i);
        if (descImgMatch) {
          imgSources.push(descImgMatch[0]);
        }
      }

      // Extract from figure tags
      const figureMatches = content.match(/<figure[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["'][\s\S]*?<\/figure>/gi);
      if (figureMatches) {
        figureMatches.forEach(figure => {
          const imgMatch = figure.match(/src=["']([^"']+)["']/i);
          if (imgMatch && imgMatch[1]) {
            imgSources.push(imgMatch[1]);
          }
        });
      }

      // Extract from any img tags
      const imgMatches = content.match(/<img[^>]+src=["']([^"']+)["']/gi);
      if (imgMatches) {
        imgMatches.forEach(img => {
          const srcMatch = img.match(/src=["']([^"']+)["']/i);
          if (srcMatch && srcMatch[1]) {
            imgSources.push(srcMatch[1]);
          }
        });
      }

      // Filter and clean URLs
      const validImages = imgSources
        .filter(url => {
          if (!url) return false;
          // Must be HTTPS
          if (!url.startsWith('https://')) return false;
          // Must be an image URL
          if (!/\.(jpg|jpeg|png|gif|webp)/i.test(url) && !url.includes('cdn-images') && !url.includes('miro.medium')) return false;
          // Not too long
          if (url.length > 500) return false;
          return true;
        })
        .map(cleanImageUrl)
        .filter(url => url.length > 0);

      return validImages[0] || null;
    } catch (error) {
      console.error('Error extracting image:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yashspatil4779`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data: { items: RawMediumArticle[] } = await response.json();
        
        if (!data.items || !Array.isArray(data.items)) {
          console.error('Invalid data format:', data);
          setIsLoading(false);
          return;
        }
        
        const processedArticles: MediumArticle[] = data.items.map((article, index) => {
          // Try multiple sources for thumbnail
          let thumbnail = article.thumbnail;
          
          // Debug logging
          if (index < 3) {
            console.log(`Article ${index + 1}:`, {
              title: article.title.substring(0, 50),
              hasThumbnail: !!thumbnail,
              thumbnail: thumbnail?.substring(0, 100),
              hasContent: !!article.content,
              contentLength: article.content?.length
            });
          }
          
          // If no thumbnail, try extracting from content
          if (!thumbnail || thumbnail === '' || thumbnail === 'null' || thumbnail === 'undefined') {
            const extracted = extractImageFromContent(article.content || '', article.description || '');
            if (extracted) {
              thumbnail = extracted;
              if (index < 3) console.log(`Extracted image for article ${index + 1}:`, extracted);
            }
          }
          
          // Clean the URL
          if (thumbnail && thumbnail !== '/images/default-article.jpg') {
            thumbnail = cleanImageUrl(thumbnail);
          }
          
          // Final fallback
          if (!thumbnail || thumbnail === '' || thumbnail === 'null' || thumbnail === 'undefined') {
            thumbnail = '/images/default-article.jpg';
          }
          
          return {
            ...article,
            thumbnail
          };
        });
        
        setArticles(processedArticles);
      } catch (error) {
        console.error('Error fetching Medium articles:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    const strippedText = text.replace(/<[^>]+>/g, '');
    return strippedText.length > maxLength
      ? `${strippedText.substring(0, maxLength)}...`
      : strippedText;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section 
      ref={sectionRef}
      id="blog" 
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ y }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        style={{ opacity }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl sm:text-7xl font-bold mb-6 relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Latest Articles
            </span>
            <motion.span
              className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: "0%", scaleX: 0 }}
              whileInView={{ width: "100%", scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Sharing insights and experiences through technical writing
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="group relative perspective-1000"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                />

                {/* Card */}
                <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col transform-3d hover:border-white/30 transition-all">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
                    {!imageErrors.has(article.link) && article.thumbnail && article.thumbnail !== '/images/default-article.jpg' ? (
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log('Image failed to load:', article.thumbnail);
                            setImageErrors(prev => new Set(prev).add(article.link));
                            const target = e.currentTarget;
                            // Try default image first
                            if (target.src !== '/images/default-article.jpg') {
                              target.src = '/images/default-article.jpg';
                            } else {
                              // If default also fails, hide image
                              target.style.display = 'none';
                            }
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', article.thumbnail);
                          }}
                          loading="lazy"
                          crossOrigin="anonymous"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center relative">
                        {/* Gradient background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${
                          index % 3 === 0 ? 'from-blue-600/20 to-purple-600/20' :
                          index % 3 === 1 ? 'from-purple-600/20 to-pink-600/20' :
                          'from-pink-600/20 to-blue-600/20'
                        }`} />
                        {/* Icon */}
                        <div className="relative z-10 text-6xl opacity-50">
                          📝
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    
                    {/* Categories */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {article.categories.slice(0, 2).map((category) => (
                        <motion.span
                          key={category}
                          className="px-3 py-1 glass rounded-full text-xs font-semibold text-white backdrop-blur-md"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {category}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      {article.title}
                    </motion.h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                      {truncateText(article.content, 120)}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>{formatDate(article.pubDate)}</span>
                      </div>
                      <motion.span 
                        className="text-blue-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                        whileHover={{ x: 5 }}
                      >
                        Read
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    style={{
                      transform: 'skewX(-45deg)',
                    }}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">No articles found. Check back soon!</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://medium.com/@yashspatil4779"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Articles</span>
            <FaExternalLinkAlt />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MediumArticles;