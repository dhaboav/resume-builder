import * as allTemplates from './plugins';
import type { TemplateStyle } from './types';

const templates: Record<string, TemplateStyle> = {};

export const templateStyleRegistry = {
  register(template: TemplateStyle) {
    templates[template.id] = template;
  },
  get(id: string): TemplateStyle {
    return templates[id] || templates['ats-default'];
  },
  getAll(): TemplateStyle[] {
    return Object.values(templates);
  },
};

Object.values(allTemplates).forEach((template) => {
  templateStyleRegistry.register(template);
});
