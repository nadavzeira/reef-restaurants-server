import { Injectable } from '@nestjs/common';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Storefront } from './entities/storefront.entity';

@Injectable()
export class StorefrontsService {
  create(createStorefrontInput: CreateStorefrontInput) {
    return { exampleField: createStorefrontInput.exampleField };
  }

  findAll(): Storefront[] {
    return [{ exampleField: 1 }];
  }

  findOne(id: number): Storefront {
    return { exampleField: id };
  }

  update(id: number, updateStorefrontInput: UpdateStorefrontInput): Storefront {
    return { exampleField: updateStorefrontInput.id };
  }

  remove(id: number): Storefront {
    return { exampleField: id };
  }
}
``;
