import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { ContactActions } from '@/components/ContactActions';
import { PanelFrame } from '@/components/PanelFrame';
import { SectionHeading } from '@/components/SectionHeading';
import { pageMeta } from '@/content/pageMeta';
import { experienceMap, resume, type Role } from '@/content/resume';
import { formatDateRange, formatMonthYear } from '@/lib/dates';
import { buildMailto, getEmailAddress } from '@/lib/email';
import { usePageMeta } from '@/lib/usePageMeta';

const roles: readonly Role[] = resume.experience;

function RevealEmail() {
  const [revealed, setRevealed] = useState(false);
  if (!revealed) {
    return (
      <Button size="small" onClick={() => setRevealed(true)}>
        Show email address
      </Button>
    );
  }
  return (
    <Typography component="p">
      <Link href={buildMailto()}>{getEmailAddress()}</Link>
    </Typography>
  );
}

export function PersonnelFilePage() {
  usePageMeta(pageMeta.personnelFile);

  return (
    <Container sx={{ pt: { xs: 3, md: 6 } }}>
      <Box component="article" sx={{ display: 'grid', gap: { xs: 4, md: 5 }, maxWidth: 900 }}>
        <Box component="header">
          <Typography variant="overline" component="p" sx={{ color: 'text.secondary' }}>
            Personnel File · Resume
          </Typography>
          <Typography variant="h1">{resume.name}</Typography>
          <Typography component="p" sx={{ fontSize: '1.25rem', fontWeight: 600, mt: 1 }}>
            {resume.title} | {resume.tagline}
          </Typography>
          <Typography component="p" sx={{ color: 'text.secondary' }}>
            {resume.location.display}
          </Typography>
          <Box id="contact" sx={{ mt: 3, display: 'grid', gap: 1.5, justifyItems: 'start' }}>
            <ContactActions />
            <RevealEmail />
          </Box>
        </Box>

        <Box component="section" aria-labelledby="summary-heading">
          <SectionHeading id="summary-heading">Summary</SectionHeading>
          <Typography sx={{ maxWidth: '70ch' }}>{resume.summary}</Typography>
        </Box>

        <Box component="section" aria-labelledby="experience-heading">
          <SectionHeading id="experience-heading" flavor="Service Record">
            Experience
          </SectionHeading>
          <Box sx={{ display: 'grid', gap: 4 }}>
            {roles.map((role) => (
              <Box key={role.id} component="section" aria-labelledby={`${role.id}-title`}>
                <Typography variant="h3" id={`${role.id}-title`}>
                  {role.title}
                </Typography>
                <Typography component="p" sx={{ fontWeight: 500 }}>
                  {role.employer}
                  {role.location ? ` · ${role.location}` : ''}
                </Typography>
                <Typography component="p" variant="body2" sx={{ color: 'text.secondary' }}>
                  {formatDateRange(role.start, role.end)}
                </Typography>
                <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2.5, display: 'grid', gap: 0.5 }}>
                  {role.bullets.map((bullet) => (
                    <Typography component="li" key={bullet}>
                      {bullet}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="section" aria-labelledby="education-heading">
          <SectionHeading id="education-heading" flavor="Academy Records">
            Education
          </SectionHeading>
          <Typography>
            <strong>{resume.education.degree}</strong>, {resume.education.school} ·{' '}
            {formatMonthYear(resume.education.graduated)}
          </Typography>
        </Box>

        <Box component="section" aria-labelledby="skills-heading">
          <SectionHeading id="skills-heading" flavor="Qualifications">
            Skills
          </SectionHeading>
          <Box component="dl" sx={{ m: 0, display: 'grid', gap: 1 }}>
            {resume.skillGroups.map((group) => (
              <Box
                key={group.id}
                sx={{ display: 'grid', gridTemplateColumns: { sm: '180px 1fr' }, gap: { sm: 2 } }}
              >
                <Typography component="dt" sx={{ fontWeight: 650 }}>
                  {group.label}
                </Typography>
                <Typography component="dd" sx={{ m: 0 }}>
                  {group.skills.join(', ')}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="aside" aria-labelledby="map-heading" data-print="hide">
          <PanelFrame label="Cross-reference">
            <Typography
              variant="h2"
              id="map-heading"
              sx={{ fontSize: 'clamp(1.3rem, 1.1rem + 0.8vw, 1.7rem)' }}
            >
              How this site maps to my experience
            </Typography>
            <Box component="dl" sx={{ mt: 2, mb: 0, display: 'grid', gap: 1.5 }}>
              {experienceMap.map((item) => (
                <Box key={item.feature}>
                  <Typography component="dt" sx={{ fontWeight: 650 }}>
                    {item.feature}
                  </Typography>
                  <Typography component="dd" sx={{ m: 0, color: 'text.secondary' }}>
                    {item.experience}
                  </Typography>
                </Box>
              ))}
            </Box>
          </PanelFrame>
        </Box>
      </Box>
    </Container>
  );
}
