// src/components/Experience.tsx

import React from "react";
import { Element } from "react-scroll";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

// import company logos (add these files in src/assets/)
import manitouLogo from "../assets/manitou-research-logo.png";
import ebscoLogo from "../assets/ebsco.png";
import uvaLogo from "../assets/uva.png";

import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';

// Type for each experience entry
interface ExperienceItem {
  date: string;
  company: string;
  title: string;
  // optional URL to a logo image
  logoUrl?: string;
  // detailed description that will be shown when expanded
  description?: string;
}

// Your data here (add logo files under src/assets if you want them to appear)
const experiences: ExperienceItem[] = [
  {
    date: "Oct 2025 - Present",
    company: "Manitou Research",
    title: "Full Stack Developer",
    logoUrl: manitouLogo,
    description: "Currently building articleOne"
  },
  {
    date: "Jun 2025 - Aug 2025",
    company: "EBSCO Information Services",
    title: "Software Engineering Intern",
    logoUrl: ebscoLogo,
    description: "Java Spring Boot microservices + REST APIs."
  },
  {
    date: "Jan 2025 - May 2025",
    company: "Manitou Research",
    title: "Software Engineering Intern",
    logoUrl: manitouLogo,
    description: "Python data collection + processing, MongoDB, APIs, HTML + CSS."
  },
  {
    date: "2022 - 2026",
    company: "University of Virginia",
    title: "B.A. in Computer Science",
    logoUrl: uvaLogo,
    description: "GPA 3.8/4.0. Pursuing a Bachelor of Arts in CS with a Minor in Data Science."
  },
];

const Experience: React.FC = () => {
  return (
    <Element name="experience">
      <h1 style={{ textAlign: "center", color: "var(--primary-color)" }}>
        Experience
      </h1>

      <Timeline position="alternate" sx={{ minWidth: "800px" }}>
        {experiences.map((exp, index) => (
          <TimelineItem 
            key={index}
            sx={{
              minHeight: "80px"
            }}
          >
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
            >
              {exp.date}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineConnector />

              <TimelineDot color="info">
                {/* show logo if provided, otherwise fallback to icon */}
                {exp.logoUrl ? (
                  <img
                    src={exp.logoUrl}
                    alt={`${exp.company} logo`}
                    style={{ width: 24, height: 24 }}
                  />
                ) : (
                  exp.company.includes('University') ? <SchoolIcon /> : <WorkIcon />
                )}
              </TimelineDot>

              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: "12px", px: 2, maxWidth: 400, textAlign: 'left' }}>
              {/* accordion for expandable details with rounded corners and left-aligned text */}
              <Accordion sx={{ borderRadius: 2, boxShadow: 1, overflow: 'hidden', textAlign: 'left', '&:before': { display: 'none' } }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-content-${index}`}
                  id={`panel-header-${index}`}
                  sx={{ alignItems: 'center' }}
                >
                  <Box display="flex" alignItems="center" width="100%">
                    {exp.logoUrl && (
                      <img
                        src={exp.logoUrl}
                        alt={`${exp.company} logo`}
                        style={{ width: 32, height: 32, marginRight: 8 }}
                      />
                    )}
                    <Box>
                      <Typography variant="h6" sx={{ color: "black", textAlign: 'left' }}>
                        {exp.company}
                      </Typography>
                      <Typography sx={{ opacity: 0.8, textAlign: 'left' }}>{exp.title}</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {exp.description && (
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
                      {exp.description}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Element>
  );
};

export default Experience;
