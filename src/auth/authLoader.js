import authRequire from './authRequire';

export default async function appLoader() {
  await authRequire();
  return null;
}
