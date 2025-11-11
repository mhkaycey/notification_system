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

export interface EmailMessage {
  id: string;
  to: string;
  template_id: 'welcome' | 'application' | 'offer';
  data: Record<string, any>;
  priority: 'high' | 'normal' | 'low';
  created_at: Date;
}

export interface SendEmailDto {
  to: string;
  template_id: 'welcome' | 'application' | 'offer';
  data: Record<string, any>;
  priority?: 'high' | 'normal' | 'low';
}

export interface EmailQueueMessage {
  id: string;
  to: string;
  template_id: string;
  data: Record<string, any>;
  priority: 'high' | 'normal' | 'low';
  retry_count: number;
  max_retries: number;
  created_at: string;
}

export enum EmailStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SENT = 'sent',
  FAILED = 'failed',
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
  data: {
    email_id: string;
    status: EmailStatus;
  };
}

// ============ SHARED TYPES ============

export interface BaseResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
