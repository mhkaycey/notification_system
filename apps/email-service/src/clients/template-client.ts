import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import type { RenderedTemplate } from 'shared/types';

@Injectable()
export class template_client_service {
  private client: AxiosInstance;
  private template_service_url: string;

  constructor(private configService: ConfigService) {
    this.template_service_url =
      this.configService.get<string>('TEMPLATE_SERVICE_URL') ||
      'http://template-service:8000';

    this.client = axios.create({
      baseURL: this.template_service_url,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async render_template(
    template_id: string,
    data: Record<string, any>,
  ): Promise<RenderedTemplate> {
    try {
      console.log(`[Template Client] Rendering template: ${template_id}`, data);

      const response = await this.client.post(
        `/templates/${template_id}/render`,
        { data },
      );

      if (response.data.success) {
        return response.data.data as RenderedTemplate;
      }

      throw new Error('Template rendering failed');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || error.message || 'Unknown error';
        throw new HttpException(
          `Failed to render template '${template_id}': ${message}`,
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  async getTemplate(template_id: string): Promise<any> {
    try {
      const response = await this.client.get(`/templates/${template_id}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException(
          `Failed to fetch template '${template_id}'`,
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
