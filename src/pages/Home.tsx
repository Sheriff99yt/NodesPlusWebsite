import React, { useEffect, useState, useRef, lazy, Suspense, ReactNode } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import StructuredData from '../components/common/StructuredData';
import OptimizedImage from '../components/common/OptimizedImage';
import { FaArrowUp, FaArrowRight, FaWindows, FaApple, FaLinux, FaMobileAlt, FaAndroid } from 'react-icons/fa';
import '../styles/Home.css';

// Lazy loaded components
const InteractiveNodeDemo = lazy(() => import('../components/home/InteractiveNodeDemo'));
const ShowcaseGallery = lazy(() => import('../components/home/ShowcaseGallery'));
const EnhancedFeatures = lazy(() => import('../components/home/EnhancedFeatures'));
const GettingStartedGuide = lazy(() => import('../components/home/GettingStartedGuide'));
const PerformanceBenefits = lazy(() => import('../components/home/PerformanceBenefits'));
const CommunityShowcase = lazy(() => import('../components/home/CommunityShowcase'));

/**
 * Loading component for lazy-loaded sections
 */
const ComponentLoader = () => (
  <div className="component-loader">
    <div className="loader-animation">
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
    </div>
  </div>
);

/**
 * Platform badges component
 */
const PlatformBadges = () => (
  <div className="hero-badges">
    <div className="badge">
      <span className="badge-number">UE 5.0+</span>
      <span className="badge-text">FAB Plugin</span>
    </div>
    <div className="badge platforms">
      <span className="badge-icon" title="Windows"><FaWindows /></span>
      <span className="badge-icon" title="macOS"><FaApple /></span>
      <span className="badge-icon" title="Linux"><FaLinux /></span>
      <span className="badge-icon" title="iOS"><FaMobileAlt /></span>
      <span className="badge-icon" title="Android"><FaAndroid /></span>
    </div>
  </div>
);

/**
 * Content section component
 */
interface SectionProps {
  id: string;
  title: string;
  className: string;
  children: ReactNode;
}

const Section = ({ id, title, className, children }: SectionProps) => (
  <section id={id} className={className}>
    <div className="section-content">
      <h2 className="section-title">{title}</h2>
      <Suspense fallback={<ComponentLoader />}>
        {children}
      </Suspense>
    </div>
  </section>
);

/**
 * Homepage component
 */
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Setup scroll handlers
  useEffect(() => {
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);

    // Handle parallax effect and scroll-to-top button visibility
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > 300);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      <StructuredData pageType="home" />
      <Navbar />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section" ref={heroRef}>
          {/* Background with parallax effect */}
          <div 
            className="hero-background"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          >
            <OptimizedImage 
              src="/NodesPlusWebsite/images/branding/Banner.jpg"
              alt="NodesPlus Blueprint nodes for Unreal Engine"
              loading="eager"
              className="hero-background-image"
              width="2400"
              height="1350"
              isBanner={true}
            />
            <div className="hero-overlay"></div>
          </div>
          
          {/* Hero content */}
          <div className="section-content hero-content">
            <h1 className="hero-title animate-fade-in">
              Extended Blueprint Nodes <span className="highlight">for Unreal Engine</span>
            </h1>
            <p className="hero-description animate-fade-in-delay">
              A collection of custom Blueprint nodes that extend Unreal Engine's functionality, 
              simplifying complex operations and improving your workflow.
            </p>
            
            {/* Hero CTA buttons */}
            <div className="hero-buttons animate-fade-in-delay-2">
              <a 
                href="https://www.fab.com/sellers/Sherif%20Hany" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-button primary-button"
              >
                Get NodesPlus <FaArrowRight className="button-icon" />
              </a>
              <a 
                href="/NodesPlusWebsite/documentation" 
                className="hero-button secondary-button"
              >
                View Documentation
              </a>
              <a 
                href="https://discord.gg/2Pu9ywaptN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-button tertiary-button"
              >
                Join Discord
              </a>
            </div>
            
            {/* Platform badges */}
            <PlatformBadges />
          </div>
        </section>
        
        {/* Main Content Sections */}
        <Section id="demo" title="Interactive Node Demo" className="demo-section">
          <InteractiveNodeDemo />
        </Section>
        
        <Section id="features" title="Key Features" className="features-overview">
          <EnhancedFeatures />
        </Section>
        
        <Section id="showcase" title="Showcase Gallery" className="showcase-section">
          <ShowcaseGallery />
        </Section>
        
        <Section id="performance" title="Performance Benefits" className="performance-section">
          <PerformanceBenefits />
        </Section>
        
        <Section id="getting-started" title="Getting Started" className="getting-started-section">
          <GettingStartedGuide />
        </Section>
        
        <Section id="community" title="Community" className="community-section">
          <CommunityShowcase />
        </Section>
      </main>
      
      {/* Scroll to top button */}
      {isVisible && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
      
      <Footer />
    </>
  );
};

export default Home; 