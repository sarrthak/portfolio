import { defineField, defineType } from 'sanity';

export const techStack = defineType({
  name: 'techStack',
  title: 'Tech Stack Group',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
            }),
            defineField({
              name: 'tone',
              type: 'string',
              title: 'Color Tone',
              options: {
                list: [
                  { title: 'Blue', value: 'blue' },
                  { title: 'Cyan', value: 'cyan' },
                  { title: 'Green', value: 'green' },
                  { title: 'Orange', value: 'orange' },
                  { title: 'Purple', value: 'purple' },
                  { title: 'Red', value: 'red' },
                ],
              },
              initialValue: 'blue',
            }),
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
});
