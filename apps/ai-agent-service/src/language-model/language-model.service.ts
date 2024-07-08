import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class LanguageModelService {
  client: OpenAI;
  model: string;

  constructor(private configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      organization: this.configService.get<string>('OPENAI_ORG_ID'),
    });

    this.model = this.configService.get<string>(
      'OPENAI_DEFAULT_MODEL',
      'gpt-4-turbo-preview',
    );
  }

  async generate(messasges: any[], actions?: any[]) {
    let createParams: any = {
      model: this.model,
      response_format: {
        type: 'json_object',
      },
      messages: [...messasges],
    };
    if (actions) {
      createParams = {
        ...createParams,
        tools: actions,
      };
    }
    const completion = await this.client.chat.completions.create(createParams);

    return completion?.choices?.length === 1 ? completion.choices[0] : null;
  }

  async generateEmbeddings() {
    // TO BE IMPLEMENTED
  }
}
