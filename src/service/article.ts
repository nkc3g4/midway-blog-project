import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Article } from '../entity/article';
import { Repository } from 'typeorm';

@Provide()
export class ArticleService {
  @InjectEntityModel(Article)
  articleModel: Repository<Article>;

  async getArticleList(page: number, perPage: number) {
    const take = perPage;
    const skip = perPage * (page - 1);
    const [result, total] = await this.articleModel.findAndCount({
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async getArticle(article: { id: number }) {
    //console.log(id);
    const first = await this.articleModel.findOne({
      where: {
        id: article.id,
      },
    });
    return first;
  }

  async postNewArticle(article: Article) {
    const saveResult = await this.articleModel.save(article);
    console.log(saveResult);
    return saveResult;
  }

  async queryArticle(query: string, page: number) {
    const take = 10;
    const skip = take * (page - 1);
    console.log(skip);
    const [result, total] = await this.articleModel
      .createQueryBuilder()
      .select()
      .where(
        `MATCH(title,plaincontent) AGAINST('${query}' IN NATURAL LANGUAGE MODE) LIMIT ${skip},${take}`
      )
      .getManyAndCount();
    return {
      data: result,
      count: total,
    };
  }
}
