import { Injectable } from '@nestjs/common';
import { FindLocatorDTO } from './dto/find-locator.dto';
import { JSDOM } from 'jsdom';
import { LanguageModelService } from 'src/language-model/language-model.service';
import { findLocatorPrompt } from 'src/common/prompts/find-locator.prompt';

@Injectable()
export class ActionService {
  constructor(private llm: LanguageModelService) {}

  async findLocator(data: FindLocatorDTO) {
    const dom = new JSDOM(data.pageContent);
    const body = dom.window.document.body;
    body
      .querySelectorAll('script, style, iframe')
      .forEach((element) => element.remove());
    const bodyContent = body.innerHTML;
    const prompt = findLocatorPrompt({
      message: data.message,
      pageContent: bodyContent,
    });

    const res = await this.llm.generate([
      {
        role: 'user',
        content: prompt,
      },
    ]);

    const locator = JSON.parse(res.message.content).locator;

    return {
      locator,
    };
  }
}
