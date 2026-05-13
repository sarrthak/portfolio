import type { SchemaTypeDefinition } from 'sanity';
import { project } from './project';
import { experience } from './experience';
import { education } from './education';
import { techStack } from './techStack';

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  experience,
  education,
  techStack,
];
