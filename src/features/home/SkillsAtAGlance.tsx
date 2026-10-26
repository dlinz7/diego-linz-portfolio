import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { SectionHeading } from '@/components/SectionHeading';
import { resume } from '@/content/resume';

export function SkillsAtAGlance() {
  return (
    <Box component="section" aria-labelledby="skills-heading">
      <SectionHeading id="skills-heading" flavor="Qualifications">
        Skills
      </SectionHeading>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {resume.skillGroups.map((group, groupIndex) => (
          <Box key={group.id}>
            <Typography variant="h3" sx={{ mb: 1 }}>
              {group.label}
            </Typography>
            <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 0, m: 0 }}>
              {group.skills.map((skill) => (
                <Chip
                  key={skill}
                  component="li"
                  label={skill}
                  variant={groupIndex === 0 ? 'filled' : 'outlined'}
                  color={groupIndex === 0 ? 'primary' : 'default'}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
