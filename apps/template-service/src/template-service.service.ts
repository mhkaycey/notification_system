import {
  Injectable,
  Inject,
  OnModuleInit,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { templates } from './seed-template';
import { RenderedTemplate, Template } from 'shared/types';

@Injectable()
export class template_service_service implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async onModuleInit() {
    // seed all template on startup
    await this.seed_templates();
  }
  private async seed_templates(): Promise<void> {
    try {
      for (const [key, template] of Object.entries(templates)) {
        await this.cacheManager.set(
          `template:${key}`,
          JSON.stringify(template),
        );
      }
      // store the template ids
      const template_ids = Object.keys(templates);
      await this.cacheManager.set(
        `template:id:list`,
        JSON.stringify(template_ids),
      );
      console.log(
        `Seeded ${template_ids.length} templates: ${template_ids.join(', ')}`,
      );
    } catch (error) {
      console.error(`error seed template ${String(error)}`);
    }
  }
  // get templates by id
  async find_by_id(id: string): Promise<Template> {
    const get_cached_templates = await this.cacheManager.get<string>(
      `template:${id}`,
    );
    if (!get_cached_templates) {
      throw new NotFoundException(`Template '${id}' not found`);
    }
    return JSON.parse(get_cached_templates) as Template;
  }
  // get list of template ids
  async get_list_of_template_ids(): Promise<string[]> {
    const template_cached_list =
      await this.cacheManager.get<string>('template:id:list');
    return template_cached_list
      ? (JSON.parse(template_cached_list) as string[])
      : [];
  }
  // get all template
  async find_all(): Promise<Template[]> {
    try {
      const template_id = await this.get_list_of_template_ids();
      const templates: Template[] = [];
      for (const id of template_id) {
        const template = await this.find_by_id(id);
        templates.push(template);
      }
      return templates;
    } catch (error) {
      throw new Error(`${String(error)}`);
    }
  }
  // Render template with data
  async render(
    template_id: string,
    data: Record<string, any>,
  ): Promise<RenderedTemplate> {
    const template = await this.find_by_id(template_id);

    // Fill subject
    let subject = template.subject;
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      subject = subject.replace(regex, String(value));
    }

    // Fill content
    let content = template.content;
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      content = content.replace(regex, String(value));
    }

    return {
      subject,
      content,
    };
  }
}
