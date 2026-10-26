import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { BeforeMatchContext } from '@/components/beforeMatchContext';
import { FindableCollapse } from '@/components/FindableCollapse';
import { SectionHeading } from '@/components/SectionHeading';
import { resume, type Role } from '@/content/resume';
import { formatDateRange } from '@/lib/dates';

const roles: readonly Role[] = resume.experience;
/** The most recent role starts open. */
const DEFAULT_EXPANDED = new Set<string>([roles[0]?.id ?? '']);

const withRole = (id: string, open: boolean) => (prev: Set<string>) => {
  const next = new Set(prev);
  if (open) next.add(id);
  else next.delete(id);
  return next;
};

export function ExperienceAccordion() {
  const [expanded, setExpanded] = useState<Set<string>>(DEFAULT_EXPANDED);
  const allExpanded = expanded.size === roles.length;
  const setRole = (id: string, open: boolean) => setExpanded(withRole(id, open));

  const expandHandlers = useMemo(
    () =>
      Object.fromEntries(
        roles.map((role) => [role.id, () => setExpanded(withRole(role.id, true))]),
      ),
    [],
  );

  return (
    <Box component="section" aria-labelledby="experience-heading">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <SectionHeading id="experience-heading" flavor="Service Record">
          Experience
        </SectionHeading>
        <Button
          onClick={() => setExpanded(allExpanded ? new Set() : new Set(roles.map((r) => r.id)))}
          sx={{ mb: 2 }}
          data-print="hide"
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
        </Button>
      </Box>

      {roles.map((role) => (
        <BeforeMatchContext.Provider key={role.id} value={expandHandlers[role.id] ?? null}>
          <Accordion
            expanded={expanded.has(role.id)}
            onChange={(_event, open) => setRole(role.id, open)}
            slots={{ transition: FindableCollapse }}
            slotProps={{ heading: { component: 'h3' } }}
          >
            <AccordionSummary
              id={`${role.id}-header`}
              aria-controls={`${role.id}-content`}
              expandIcon={<ExpandMoreIcon aria-hidden />}
            >
              <RoleSummary role={role} />
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Box component="ul" sx={{ m: 0, pl: 2.5, display: 'grid', gap: 0.75 }}>
                {role.bullets.map((bullet) => (
                  <Typography component="li" key={bullet}>
                    {bullet}
                  </Typography>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </BeforeMatchContext.Provider>
      ))}
    </Box>
  );
}

function RoleSummary({ role }: { role: Role }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'grid',
        width: '100%',
        gridTemplateColumns: { xs: '1fr', lg: '1fr auto' },
        columnGap: 2,
        rowGap: 0.25,
        pr: 1,
      }}
    >
      <Box component="span" sx={{ display: 'block', fontWeight: 650, fontSize: '1.1rem' }}>
        {role.title}
      </Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          color: 'text.secondary',
          fontWeight: 500,
          fontSize: '0.95rem',
          gridRow: { lg: '1' },
          gridColumn: { lg: '2' },
          textAlign: { lg: 'right' },
          order: { xs: 2, lg: 0 },
        }}
      >
        {formatDateRange(role.start, role.end)}
      </Box>
      <Box component="span" sx={{ display: 'block', fontWeight: 500, order: { xs: 1, lg: 0 } }}>
        {role.employer}
      </Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          color: 'text.secondary',
          fontWeight: 400,
          mt: 0.5,
          order: 3,
          gridColumn: { lg: '1 / -1' },
        }}
      >
        {role.headline}
      </Box>
    </Box>
  );
}
