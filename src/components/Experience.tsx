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

import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

import Typography from "@mui/material/Typography";

// Type for each experience entry
interface ExperienceItem {
  date: string;
  company: string;
  title: string;
  icon: React.ReactNode;
}

// Your data here
const experiences: ExperienceItem[] = [
  {
    date: "Oct 2025 - Present",
    company: "Manitou Research",
    title: "Full Stack Developer",
    icon: <WorkIcon />,
  },
  {
    date: "Jun 2025 - Aug 2025",
    company: "EBSCO Information Services",
    title: "Software Engineering Intern",
    icon: <WorkIcon />,
  },
  {
    date: "Jan 2025 - May 2025",
    company: "Manitou Research",
    title: "Software Engineering Intern",
    icon: <WorkIcon />,
  },
  {
    date: "2022 - 2026",
    company: "University of Virginia",
    title: "B.A. in Computer Science",
    icon: <SchoolIcon />,
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
                {exp.icon}
              </TimelineDot>

              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span" sx={{ color: "var(--primary-color)" }}>
                {exp.company}
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>{exp.title}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Element>
  );
};

export default Experience;
