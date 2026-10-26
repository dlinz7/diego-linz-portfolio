import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SectionHeading } from '@/components/SectionHeading';
import { pageMeta } from '@/content/pageMeta';
import { resume } from '@/content/resume';
import { formatMonthYear } from '@/lib/dates';
import { usePageMeta } from '@/lib/usePageMeta';
import { ExperienceAccordion } from './ExperienceAccordion';
import { Hero } from './Hero';
import { ImpactMetrics } from './ImpactMetrics';
import { SeeHowIBuild } from './SeeHowIBuild';
import { SkillsAtAGlance } from './SkillsAtAGlance';

export function HomePage() {
  usePageMeta(pageMeta.home);
  const { education } = resume;

  return (
    <Container>
      <Box sx={{ display: 'grid', gap: { xs: 5, md: 7 } }}>
        <Hero />
        <ImpactMetrics />
        <SkillsAtAGlance />
        <ExperienceAccordion />
        <Box component="section" aria-labelledby="education-heading">
          <SectionHeading id="education-heading" flavor="Academy Records">
            Education
          </SectionHeading>
          <Typography>
            <strong>{education.degree}</strong>, {education.school} ·{' '}
            {formatMonthYear(education.graduated)}
          </Typography>
        </Box>
        <SeeHowIBuild />
      </Box>
    </Container>
  );
}
