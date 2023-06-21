

import request from 'supertest'
import { CompositionRoot } from '../../bootstrap/service/compositionRoot/compositionRoot';

describe('expressRestAPI', () => {

  let compositionRoot = new CompositionRoot()
  let webAPI = compositionRoot.getWebAPI();

  beforeAll(async() => {
    await webAPI.start();
  })

  afterAll(async() => {
    await webAPI.stop();
  })

  it ('can be reached via the healthcheck API', async () => {
    let server = webAPI.getInstance()
    const response = await request(server).get('/health')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.ok).toEqual(true);
  })

})