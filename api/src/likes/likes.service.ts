import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {

  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) { }

  async create(createLikeDto: CreateLikeDto) {
    const res=await this.likeRepository.save( createLikeDto);
    return {result: 'success', id: createLikeDto.cat_id};
  }

  async findAll() {
    const res=await this.likeRepository.find({});
    return {data:res}
  }

  async remove(cat_id: string) {
    const res=await this.likeRepository.delete({cat_id});
    return {result: 'success', id: cat_id}
  }
}
