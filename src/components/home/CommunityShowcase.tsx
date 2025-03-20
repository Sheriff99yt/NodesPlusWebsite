import React from 'react';
import { FaDiscord, FaShare, FaTwitter, FaFacebook, FaReddit, FaVoteYea, FaLightbulb, FaQuestionCircle, FaComments } from 'react-icons/fa';
import '../../styles/CommunityShowcase.css';

// Static data for community examples

// Discord community features
const discordFeatures = [
  {
    id: 'vote',
    icon: <FaVoteYea />,
    title: 'Vote for Features',
    description: 'Cast your vote on which nodes should be developed next and help shape the future of NodesPlus.'
  },
  {
    id: 'request',
    icon: <FaLightbulb />,
    title: 'Request Custom Nodes',
    description: 'Have a specific need? Request custom nodes and functionality directly from the creator.'
  },
  {
    id: 'support',
    icon: <FaQuestionCircle />,
    title: 'Get Community Support',
    description: 'Ask questions, share solutions, and learn from other experienced Nodes Plus users.'
  },
  {
    id: 'collaborate',
    icon: <FaComments />,
    title: 'Join the Conversation',
    description: 'Suggest ideas for improvements and collaborate with other community members.'
  }
];

const CommunityShowcase: React.FC = () => {
  return (
    <>
      <p className="section-description">
        Explore what the Nodes Plus community has built and see how our nodes have enabled developers to create amazing systems.
      </p>
      
      <div className="discord-join-section">
        <div className="discord-content">
          <h3>Join Sharif's Creator Community</h3>
          <p>
            Connect directly with <strong>Sharif Hany</strong>, the creator of NodesPlus, and other community members in the Sharif Community Club Discord server. Your feedback directly influences the future of NodesPlus!
          </p>
          
          <div className="discord-features">
            {discordFeatures.map(feature => (
              <div key={feature.id} className="discord-feature">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <a 
            href="https://discord.gg/2Pu9ywaptN" 
            target="_blank" 
            rel="noopener noreferrer"
            className="discord-button"
          >
            <FaDiscord className="discord-icon" />
            Join Sharif's Community
          </a>
        </div>
        <div className="discord-preview">
          <div className="discord-preview-header">
            <span className="discord-name">Sharif Community Club</span>
            <span className="discord-members">1,250+ creators</span>
          </div>
          <div className="discord-preview-content">
            <div className="discord-channel">
              <span># announcements</span>
            </div>
            <div className="discord-channel">
              <span># node-requests</span>
            </div>
            <div className="discord-channel">
              <span># feature-voting</span>
            </div>
            <div className="discord-channel">
              <span># showcase</span>
            </div>
            <div className="discord-channel">
              <span># help-and-questions</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityShowcase; 