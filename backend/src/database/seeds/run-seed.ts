import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { TypeCarSeedService } from './type-car/type-car-seed.service';
import { TypeFuelSeedService } from './type-fuel/type-fuel-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(TypeCarSeedService).run();
  await app.get(TypeFuelSeedService).run();
  await app.close();
};

void runSeed();
