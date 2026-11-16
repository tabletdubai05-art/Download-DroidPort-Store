import { AppShowcase } from './components/AppShowcase';
import { FeaturesBento } from './components/FeaturesBento';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { InstallGuide } from './components/InstallGuide';
import { Navbar } from './components/Navbar';
import { useDroidPortData } from './hooks/useDroidPortData';

export default function App() {
  const { config, discordLink, isLoading, error, refetch } = useDroidPortData();

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100">
      <Navbar
        discordLink={discordLink}
        isLoading={isLoading}
        onRetry={refetch}
      />

      <main>
        <HeroSection
          config={config}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />

        <FeaturesBento discordLink={discordLink} />

        <AppShowcase />

        <InstallGuide
          config={config}
          discordLink={discordLink}
          isLoading={isLoading}
          onRetry={refetch}
        />
      </main>

      <Footer
        versaoAtual={config?.versao_atual ?? null}
        discordLink={discordLink}
      />
    </div>
  );
}
