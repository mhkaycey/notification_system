// TEMPLATE SERVICE TYPES

export interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export interface RenderTemplateDto {
  data: Record<string, any>;
}

export interface RenderedTemplate {
  subject: string;
  content: string;
}

export interface TemplateResponse {
  success: boolean;
  message: string;
  data: Template;
}

export interface TemplateListResponse {
  success: boolean;
  message: string;
  data: Template[];
}

export interface RenderResponse {
  success: boolean;
  message: string;
  data: RenderedTemplate;
}

// EMAIL SERVICE TYPES

export interface SendEmailDto {
  to: string;
  subject: string;
  html: string;
}

// ============ SHARED TYPES ============

export interface BaseResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
