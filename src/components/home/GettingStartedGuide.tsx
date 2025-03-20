import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaDownload, FaCog, FaPuzzlePiece, FaProjectDiagram, FaLightbulb, FaChevronRight } from 'react-icons/fa';
import '../../styles/GettingStartedGuide.css';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  docsLink?: string;
}

const GettingStartedGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  const steps: Step[] = [
    {
      id: 1,
      title: "Purchase",
      description: "Visit Fab.com marketplace and purchase the NodesPlus plugin.",
      icon: <FaShoppingCart />,
      docsLink: "/NodesPlusWebsite/documentation#purchase"
    },
    {
      id: 2,
      title: "Download",
      description: "Access your Fab.com library and download the plugin package.",
      icon: <FaDownload />,
      docsLink: "/NodesPlusWebsite/documentation#download"
    },
    {
      id: 3,
      title: "Install",
      description: "Install the plugin via Epic Games Launcher or manually to your project.",
      icon: <FaCog />,
      docsLink: "/NodesPlusWebsite/documentation#installation"
    },
    {
      id: 4,
      title: "Enable",
      description: "Go to Edit > Plugins in Unreal Engine, find NodesPlus and enable it.",
      icon: <FaPuzzlePiece />,
      docsLink: "/NodesPlusWebsite/documentation#enable-plugin"
    },
    {
      id: 5,
      title: "Create",
      description: "Add NodesPlus nodes to your Blueprint graphs - search for Nodes Plus.",
      icon: <FaProjectDiagram />,
      docsLink: "/NodesPlusWebsite/documentation#first-blueprint"
    }
  ];

  // Update progress bar when active step changes
  useEffect(() => {
    const newProgress = ((activeStep - 1) / (steps.length - 1)) * 100;
    setProgress(newProgress);
  }, [activeStep, steps.length]);

  // Handle step selection
  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  // Get the current step
  const currentStep = steps.find(step => step.id === activeStep) || steps[0];

  return (
    <div className="guide-container">
      <div className="steps-progress">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="steps-list">
        {steps.map(step => (
          <button
            key={step.id}
            className={`step-indicator ${step.id === activeStep ? 'active' : ''} ${step.id < activeStep ? 'completed' : ''}`}
            onClick={() => handleStepClick(step.id)}
            aria-selected={step.id === activeStep}
          >
            <div className="step-icon">
              {step.icon}
            </div>
            <div className="step-title">
              {step.title}
            </div>
            {step.id < activeStep && (
              <div className="step-check">✓</div>
            )}
          </button>
        ))}
      </div>
      
      <div className="step-content">
        <h3>{currentStep.title}</h3>
        <p className="step-description">{currentStep.description}</p>
        
        <div className="step-actions">
          <button 
            className="step-button prev"
            onClick={() => activeStep > 1 && setActiveStep(activeStep - 1)}
            disabled={activeStep === 1}
          >
            Previous
          </button>
          
          {currentStep.docsLink && (
            <a 
              href={currentStep.docsLink} 
              className="docs-link"
            >
              Documentation
            </a>
          )}
          
          <button 
            className="step-button next"
            onClick={() => activeStep < steps.length && setActiveStep(activeStep + 1)}
            disabled={activeStep === steps.length}
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedGuide; 