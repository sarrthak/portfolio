import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Short label shown above the title (e.g. "Cheng Wu Challenge Finalist")',
    }),
    defineField({
      name: 'href',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'outcomes',
      title: 'Recruiter Signals',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'stack',
      title: 'Architecture Stack',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Technology' }),
            defineField({ name: 'text', type: 'text', title: 'Description', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
