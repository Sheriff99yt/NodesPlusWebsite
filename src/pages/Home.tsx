import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowUp } from 'react-icons/fa';
import StructuredData, { type FaqItem } from '../components/common/StructuredData';
import PageSeo from '../components/common/PageSeo';
import OptimizedImage from '../components/common/OptimizedImage';
import { BANNER_SRC, DISCORD_URL, FAB_URL, SITE_DESCRIPTION, SITE_NAME } from '../utils/site';
import '../styles/Home.css';

const InteractiveNodeDemo = lazy(() => import('../components/home/InteractiveNodeDemo'));
const ShowcaseGallery = lazy(() => import('../components/home/ShowcaseGallery'));
const EnhancedFeatures = lazy(() => import('../components/home/EnhancedFeatures'));
const GettingStartedGuide = lazy(() => import('../components/home/GettingStartedGuide'));
const PerformanceBenefits = lazy(() => import('../components/home/PerformanceBenefits'));
const CommunityShowcase = lazy(() => import('../components/home/CommunityShowcase'));

const faqItems: FaqItem[] = [
  {
    question: 'What is Nodes Plus?',
    answer:
      'Nodes Plus is a Blueprint function library for Unreal Engine. It adds custom nodes you can drop into Blueprint graphs.',
  },
  {
    question: 'Where is the documentation?',
    answer:
      'This website is the documentation. Search and browse categories in the browser without opening the Unreal Editor.',
  },
  {
    question: 'How do I get the plugin?',
    answer: 'The plugin is listed on Fab under Sherif Hany.',
  },
  {
    question: 'Where can I get help?',
    answer: 'Join the Discord server for questions and examples.',
  },
];

const ComponentLoader = () => (
  <div className="component-loader" role="status">
    <p>Loading section…</p>
  </div>
);

interface SectionProps {
  id: string;
  title: string;
  className: string;
  children: ReactNode;
}

const Section = ({ id, title, className, children }: SectionProps) => (
  <section id={id} className={`${className} section-padding-fix`} aria-labelledby={`${id}-heading`}>
    <div className="section-content">
      <h2 id={`${id}-heading`} className="section-title">
        {title}
      </h2>
      <Suspense fallback={<ComponentLoader />}>{children}</Suspense>
    </div>
  </section>
);

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('on-home-page');

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('on-home-page');
    };
  }, []);

  return (
    <>
      <PageSeo
        title="Nodes Plus — Blueprint nodes for Unreal Engine"
        description={SITE_DESCRIPTION}
        path="/"
      />
      <StructuredData
        pageType="home"
        path="/"
        breadcrumbs={[{ name: 'Home', path: '/' }]}
        faq={faqItems}
      />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="hero-section" ref={heroRef} aria-labelledby="home-hero-title">
          <div className="hero-background" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
            <OptimizedImage
              src={BANNER_SRC}
              alt=""
              loading="eager"
              className="hero-background-image"
              width="2400"
              height="1350"
              isBanner={true}
            />
            <div className="hero-overlay"></div>
          </div>
          <div className="section-content hero-content">
            <h1 id="home-hero-title" className="hero-title">
              {SITE_NAME}: Blueprint nodes for Unreal Engine
            </h1>
            <p className="hero-description">
              A Blueprint function library that extends Unreal Engine with math, string, array, and
              utility nodes. Read the docs here, then install the plugin from Fab.
            </p>
            <div className="hero-buttons">
              <Link to="/documentation" className="hero-button primary-button">
                Open the documentation <FaArrowRight className="button-icon" aria-hidden="true" />
              </Link>
              <Link to="/architecture" className="hero-button secondary-button">
                How Nodes Plus is structured
              </Link>
              <a
                href={FAB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button tertiary-button"
              >
                Get the plugin on Fab
              </a>
            </div>
            <p className="hero-meta">Unreal Engine plugin by Sherif Hany / 99 Studios.</p>
          </div>
        </section>

        <Section id="demo" title="Interactive demo" className="demo-section">
          <InteractiveNodeDemo />
        </Section>
        <Section id="features" title="What the library covers" className="features-overview">
          <EnhancedFeatures />
        </Section>
        <Section id="showcase" title="Node examples" className="showcase-section">
          <ShowcaseGallery />
        </Section>
        <Section id="performance" title="Why a dedicated library" className="performance-section">
          <PerformanceBenefits />
        </Section>
        <Section id="getting-started" title="Getting started" className="getting-started-section">
          <GettingStartedGuide />
        </Section>
        <Section id="community" title="Community" className="community-section">
          <CommunityShowcase />
        </Section>

        <section id="faq" className="faq-section section-padding-fix" aria-labelledby="faq-heading">
          <div className="section-content prose">
            <h2 id="faq-heading" className="section-title">
              Frequently asked questions
            </h2>
            <dl className="faq-list">
              {faqItems.map((item) => (
                <div key={item.question} className="faq-item">
                  <dt>{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
            <p>
              Need more detail? Browse the{' '}
              <Link to="/documentation">Nodes Plus documentation</Link> or ask in{' '}
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                the Discord community
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      {isVisible && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default Home;
