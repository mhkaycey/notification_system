
export class RenderTemplateRequestDto {
  templateId: string;
  context: Record<string, any>;
}

export class RenderTemplateResponseDto {
  renderedHtml: string;
}
