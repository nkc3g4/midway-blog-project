import {
  Inject,
  Controller,
  Get,
  Param,
  Post,
  Body,
} from '@midwayjs/decorator';
import { ArticleService } from '../service/article';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { Article } from '../entity/article';

@Controller('/api/article')
export class APIController {
  @Inject()
  articleService: ArticleService;

  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Post('/new', { middleware: [JwtPassportMiddleware] })
  async postArticle(@Body() article: Article) {
    console.log('jwt user: ', this.ctx.state.user);
    article.createtime = new Date();
    const stripTagsRE = /<\/?[^>]+>/gi;
    article.plaincontent = String(article.content).replace(stripTagsRE, '');

    const data = await this.articleService.postNewArticle(article);
    return data;
  }

  @Get('/:id')
  async getArticle(@Param('id') id: number) {
    const data = await this.articleService.getArticle({ id: id });
    return data;
  }

  @Get('/list/:perPage/:page')
  async getArticleList(
    @Param('perPage') perPage: number,
    @Param('page') page: number
  ) {
    const data = await this.articleService.getArticleList(page, perPage);

    return data;
  }

  @Get('/search/:query/:page')
  async getQueryList(
    @Param('query') query: string,
    @Param('page') page: number
  ) {
    console.log(query);
    console.log(page);
    return await this.articleService.queryArticle(query, page);
  }
}
