import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #111;
  color: white;
  padding: 6rem 2rem 2rem 2rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled(motion.div)`
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberPhoto = styled.div<{ hasImage?: boolean; customPosition?: string }>`
  width: 100%;
  height: 200px;
  background-color: ${props => props.hasImage ? 'transparent' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    object-position: ${props => props.customPosition || 'center center'};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(30,30,30,1) 0%, rgba(30,30,30,0) 50%);
  }
`;

const MemberContent = styled.div`
  padding: 1.5rem;
`;

const MemberName = styled.h3`
  margin-bottom: 0.5rem;
  color: #0ff;
`;

const MemberRole = styled.p`
  color: #ccc;
  font-style: italic;
  margin-bottom: 1rem;
`;

const MemberDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Nayel Rehman",
      role: "President",
      description: "Leading the SIM Officer Core for the 2025-2026 school year.",
      imageUrl: "/nayel.png",
      imagePosition: "center 20%"
    },
    {
      id: 2,
      name: "William Fadden",
      role: "Vice President",
      description: "Helping coordinate club activities and support the leadership team.",
      imageUrl: "/will.png",
      imagePosition: "center 15%"
    },
    {
      id: 3,
      name: "Srivatsa Veera",
      role: "Vice President",
      description: "Working alongside leadership to organize club initiatives and projects.",
      imageUrl: "/srivatsa.png",
      imagePosition: "center 30%"
    },
    {
      id: 4,
      name: "Abhiraj Tiwari",
      role: "Secretary",
      description: "Handling club documentation and communication coordination.",
      imageUrl: "/abhi.png",
      imagePosition: "center 40%"
    },
    {
      id: 5,
      name: "Ashwin Menachery",
      role: "Treasurer",
      description: "Managing club finances and budgeting for projects and events.",
      imageUrl: "/ashwin.png",
      imagePosition: "center 20%"
    },
    {
      id: 6,
      name: "Fabeun Rahman",
      role: "Director of Outreach",
      description: "Establishing connections with other organizations and promoting the club.",
      imageUrl: "/fabeun.png",
      imagePosition: "center 40%"
    },
    {
      id: 7,
      name: "Lance Martinez",
      role: "Director of Technology",
      description: "Overseeing the technical aspects of club projects and simulations.",
      imageUrl: "/lance.jpeg",
      imagePosition: "center 15%"
    },
    {
      id: 8,
      name: "Akhil Saladi",
      role: "Director of Teaching",
      description: "Developing educational resources and workshops for club members.",
      imageUrl: "/akhil.jpg",
      imagePosition: "center 25%"
    },
    {
      id: 9,
      name: "Wasim Daghmash",
      role: "Director of Logistics",
      description: "Coordinating event planning and resource management for the club.",
      imageUrl: "/wasim.jpeg",
      imagePosition: "center 30%"
    },
    {
      id: 10,
      name: "Arjun Nadakuduru",
      role: "Research Coordinator",
      description: "Facilitating research projects and connecting members with resources.",
      imageUrl: "/arjun.png",
      imagePosition: "center 20%"
    },
    {
      id: 11,
      name: "Arhan Menta",
      role: "Competition Coordinator",
      description: "Organizing and preparing teams for competitions and challenges.",
      imageUrl: "/arhan.png",
      imagePosition: "center 25%"
    },
    {
      id: 12,
      name: "Aaditya Malhotra",
      role: "Webmaster",
      description: "Managing the club's online presence and website development.",
      imageUrl: "/aaditya.png",
      imagePosition: "center 30%"
    },
    {
      id: 13,
      name: "Aayush Tendulkar",
      role: "Historian",
      description: "Documenting club activities and maintaining the club's history.",
      imageUrl: "/aayush.jpg",
      imagePosition: "center 25%"
    },
    {
      id: 14,
      name: "Faraaz Rattani",
      role: "Head of AI",
      description: "Leading AI initiatives and projects within the club.",
      imageUrl: "/faraaz.png",
      imagePosition: "center 25%"
    },
    {
      id: 15,
      name: "Swaraj Sainani",
      role: "Director of Internal Communications",
      description: "Managing internal communication and ensuring effective information flow within the club.",
      imagePosition: "center 25%"
    },
    {
      id: 16,
      name: "Amrit Singh",
      role: "Director of Spikeball",
      description: "Leading the spikeball program and team development.",
      imagePosition: "center 25%"
    }
  ];
  
  return (
    <PageContainer>
      <ContentContainer>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet the team
        </Title>
        
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MemberPhoto
                hasImage={!!member.imageUrl}
                customPosition={member.imagePosition}
              >
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                  />
                ) : (
                  <span>{member.name[0]}</span>
                )}
              </MemberPhoto>
              <MemberContent>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberDescription>{member.description}</MemberDescription>
              </MemberContent>
            </TeamMember>
          ))}
        </TeamGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default TeamPage;
