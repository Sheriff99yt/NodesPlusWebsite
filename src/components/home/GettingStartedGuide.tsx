import React from 'react';
import { FaShoppingCart, FaDownload, FaCog, FaPuzzlePiece, FaProjectDiagram } from 'react-icons/fa';
import '../../styles/GettingStartedGuide.css';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const GettingStartedGuide: React.FC = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Purchase",
      description: "Visit Fab.com marketplace and purchase the NodesPlus plugin.",
      icon: <FaShoppingCart />
    },
    {
      id: 2,
      title: "Access Library",
      description: "Log into Epic Games Launcher and navigate to the Library tab. Look for the FAB Library section and click the refresh button if needed.",
      icon: <FaDownload />
    },
    {
      id: 3,
      title: "Install Plugin",
      description: "Find NodesPlus in your FAB Library and click 'Install to Engine' or 'Add to Project' depending on your preference.",
      icon: <FaCog />
    },
    {
      id: 4,
      title: "Enable Plugin",
      description: "Go to Edit > Plugins in Unreal Engine, find NodesPlus and enable it. Restart the editor when prompted.",
      icon: <FaPuzzlePiece />
    },
    {
      id: 5,
      title: "Start Creating",
      description: "Add NodesPlus nodes to your Blueprint graphs by searching for 'Nodes Plus' in the Blueprint editor's node palette.",
      icon: <FaProjectDiagram />
    }
  ];

  return (
    <div className="getting-started-container">
      <div className="guide-intro">
        <p>Getting started with NodesPlus is quick and easy. Follow these simple steps to begin enhancing your Unreal Engine blueprints.</p>
      </div>
      
      <div className="steps-cards">
        {steps.map(step => (
          <div key={step.id} className="step-card">
            <div className="step-number">{step.id}</div>
            <div className="step-icon-wrapper">
              {step.icon}
            </div>
            <h3 className="step-card-title">{step.title}</h3>
            <p className="step-card-description">{step.description}</p>
          </div>
        ))}
      </div>
      
      <div className="guide-cta">
        <a href="/NodesPlusWebsite/documentation" className="guide-cta-button">
          View Full Documentation
        </a>
      </div>
    </div>
  );
};

export default GettingStartedGuide; 