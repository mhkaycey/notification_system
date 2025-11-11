import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Template_service_service } from './template-service.service';
import { Render_templat_dto } from './render-template.dto';

@Controller('templates')
export class TemplateServiceController {
  constructor(private readonly template_service: Template_service_service) {}

  @Get()
  async find_all() {
    const templates = await this.template_service.find_all();
    return {
      success: true,
      message: 'Templates retrieved successfully',
      data: templates,
    };
  }
  @Get('list_of_templates_available')
  async templates_list() {
    const template_ids = await this.template_service.get_list_of_template_ids();
    return {
      success: true,
      message: 'List of available template',
      data: template_ids,
    };
  }
  @Get(':id')
  async find_template_by_id(@Param('id') id: string) {
    const template = await this.template_service.find_by_id(id);
    return {
      success: true,
      message: 'Template retrieved by provided id',
      data: template,
    };
  }
  @Post(':id/render')
  async Render(@Param('id') id: string, @Body() dto: Render_templat_dto) {
    const rendered_template = await this.template_service.render(id, dto.data);
    return {
      success: true,
      message: 'Template rendered successfully',
      data: rendered_template,
    };
  }
}
