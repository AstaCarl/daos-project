import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UsersService } from '../src/user/users.service';

describe('userController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    userService = moduleFixture.get<UsersService>(UsersService);
    // Clear the database before each test
    await userService.deleteMany();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //******************* Create user endpoint test *******************/
  it('should signup a valid user', async () => {
    // Arrange
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'test@test.dk',
      password: 'password',
    };
    const expectedObject = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'test@test.dk',
      password: 'password',
    };

    // Act
    const { body } = await request(app.getHttpServer())
      .post('/user')
      .send(validUser)
      .expect(201); // assert

    expect(body._id).toBeDefined();
    expect(body).toMatchObject(expectedObject);
  });

  //******************* Delete endpoint test *******************/

  it('/user (DELETE)', async () => {
    // Arrange
    const validUser: CreateUserDto = {
      name: 'Test1',
      lastname: 'Testsen1',
      email: 'test1@test.dk',
      password: 'password1',
    };
    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(validUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: validUser.email,
        password: validUser.password,
      })
      .expect(200);

    const token = loginResponse.body.access_token;

    // Then, delete the user
    const deletedResponse = await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deletedResponse.body._id).toMatch(userId);
  });

  //******************* Get user by ID *******************/

  it('/user (GET)', async () => {
    // Arrange
    const validUser: CreateUserDto = {
      name: 'Test1',
      lastname: 'Testsen1',
      email: 'test1@test.dk',
      password: 'password1',
    };
    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(validUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    // Act
    const getUserResponse = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200);

    // Assert
    expect(getUserResponse.body._id).toMatch(userId);
  });
});
