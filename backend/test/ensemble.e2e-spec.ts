import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../src/test.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UsersService } from '../src/user/users.service';
import { EnsembleService } from '../src/ensemble/ensemble.service';
import { AuthService } from '../src/auth/auth.service';

// This is an end-to-end test of the ensembleController.

describe('Controller (e2e)', () => {
  // Declare the variables that will be used in the tests
  let app: INestApplication;
  let userService: UsersService;
  let ensembleService: EnsembleService;
  let authService: AuthService;

  // before each test, create a new module with the TestModule and get the UsersService, EnsembleService and AuthService.
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    userService = moduleFixture.get<UsersService>(UsersService);
    ensembleService = moduleFixture.get<EnsembleService>(EnsembleService);
    authService = moduleFixture.get<AuthService>(AuthService);

    // Clear the database before each test
    await ensembleService.deleteMany();

    // Create a new Nest application
    app = moduleFixture.createNestApplication();

    // Start the application
    await app.init();
  });

  it('should create an ensemble', async () => {
    // Arrange
    // setting up a valid user to login with
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'carl@test.dk',
      password: 'password',
    };
    await userService.createUser(validUser);

    // Login the user
    const loginResponse = await authService.signIn(
      validUser.email,
      validUser.password,
    );

    // Creating ensemble objects with the required fields
    const ensembleData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: ['Genre1'],
      rehearsalFrequency: 'Once a week',
      playType: 'Projectbased',
    };
    const expectedData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: ['Genre1'],
      rehearsalFrequency: 'Once a week',
      playType: 'Projectbased',
    };

    // Act
    // Send a POST request to the /ensemble endpoint with the ensembleData and the access token received from the login
    const { body } = await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    // Assert
    // Check if the response body contains the expected data, and that the _id is defined
    expect(body._id).toBeDefined();
    expect(body).toMatchObject(expectedData);
  });

  it('should register a user to an ensemble', async () => {
    // Arrange
    // setting up a valid user to login with
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'rikke@test.dk',
      password: 'password',
    };
    await userService.createUser(validUser);

    // login the user
    const loginResponse = await authService.signIn(
      validUser.email,
      validUser.password,
    );

    // Creating ensemble object with the required fields
    const ensembleData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: ['Genre1'],
      rehearsalFrequency: 'Once a week',
      playType: 'Projectbased',
    };

    // sending a POST request to the /ensemble with the ensemble object
    const ensembleResponse = await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    // extracting the ensembleId from the response body
    const ensembleId = ensembleResponse.body._id;

    // Creating a new user object
    const validUser2: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'sam@test.dk',
      password: 'password',
    };
    // Creating the user in the database
    const user2: any = await userService.createUser(validUser2);

    // login the user
    const loginResponse2 = await authService.signIn(
      validUser2.email,
      validUser2.password,
    );

    // Act
    // Send a PATCH request to the /ensemble/:id endpoint with the ensembleId retrieved from the ensemble response and the access token received from the login, to register the user2 to the ensemble
    const { body } = await request(app.getHttpServer())
      .patch(`/ensemble/${ensembleId}`)
      .set('Authorization', `Bearer ${loginResponse2.access_token}`)
      .expect(200);

    // Assert
    // Check if the ensemble now has 2 users, and that the second user is the user2
    expect(body.activeUsers.length).toEqual(2);
    expect(body.activeUsers[1]).toEqual(user2._id.toString());
  });


  it('should get all ensembles', async () => {
    // Arrange
    // setting up a valid user to login with
    const validUser: CreateUserDto = {
      name: 'Test',
      lastname: 'Testsen',
      email: 'mina@test.dk',
      password: 'password',
    };
    await userService.createUser(validUser);

    const loginResponse = await authService.signIn(
      validUser.email,
      validUser.password,
    );

    // Creating two ensemble objects with the required fields
    const ensembleData = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: 'Genre1',
      rehearsalFrequency: 'Once a week',
    };

    await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    const ensembleData2 = {
      title: 'Ensemble1',
      description: 'Ensemble1',
      website: 'ensemble1.dk',
      zipcode: '1234',
      city: 'City1',
      genre: 'Genre1',
      rehearsalFrequency: 'Once a week',
    };

    await request(app.getHttpServer())
      .post('/ensemble')
      .send(ensembleData2)
      .set('Authorization', `Bearer ${loginResponse.access_token}`)
      .expect(201);

    // Act
    // Send a GET request to the /ensemble endpoint to get all
    const { body } = await request(app.getHttpServer())
      .get('/ensemble')
      .expect(200);

    // Assert
    // Check if the response body contains both ensembles
    expect(body.length).toEqual(2);
  });
});
