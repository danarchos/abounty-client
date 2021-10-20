import { ContainerBinding, createContainer } from './core';

const ROOT_TRANSIENTS: ContainerBinding[] = [].map(
  (injectable) => ({
    injectable,
    scope: 'Transient',
  })
);

const rootContainer = createContainer({
  bindings: ROOT_TRANSIENTS,
});

export const getRootContainer = () => rootContainer;
