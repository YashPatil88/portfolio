'use client';

import dynamic from 'next/dynamic';

const ParticleBackground = () => {
  // Dynamically import Particles with no SSR
  const ParticlesComponent = dynamic(
    () => import('./ParticlesComponent'),
    {
      ssr: false,
      loading: () => <div className="absolute inset-0 -z-10 bg-black" />
    }
  );

  return <ParticlesComponent />;
};

export default ParticleBackground;

