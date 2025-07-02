import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
} from 'testcontainers';

const composeFilePath = '../';
const composeFile = 'compose.yaml';

let environment: StartedDockerComposeEnvironment | null;

function ldapEnabled(): boolean {
  return process.env.LDAP_ENABLED === 'true';
}

beforeAll(async () => {
  if (ldapEnabled()) {
    environment = await new DockerComposeEnvironment(
      composeFilePath,
      composeFile
    ).up();
  }
}, 60000);

afterAll(async () => {
  await environment?.down();
}, 60000);

const ldapIt = ldapEnabled() ? it : it.skip;

describe('LDAP', () => {
  ldapIt('Login', async () => {
    const url = 'http://backend.localhost/api/v3/auth/ldap';
    const data = {
      username: 'ldap-user',
      password: 'password',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const payload = await response.json();
    expect(response.status).toBe(201);
    expect(payload).toBeDefined();
    expect(payload.access_token).toBeDefined();
    expect(payload.user).toBeDefined();
    expect(payload.user.username).toBe('ldap-user');
    expect(payload.user.authStrategy).toBe('ldap');
    expect(payload.user.email).toBe('ldap-user@facility.com');
  });
});
