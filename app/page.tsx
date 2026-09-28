import Hero from '@/components/Hero';
import QuoteSection from '@/components/QuoteSection';
import Philosophy from '@/components/Philosophy';
import AttorneyPreview from '@/components/AttorneyPreview';
import Credentials from '@/components/Credentials';
import CasesConsultation from '@/components/CasesConsultation';
import LocationPreview from '@/components/LocationPreview';

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <QuoteSection />
      <Philosophy />
      <AttorneyPreview />
      <Credentials />
      <CasesConsultation />
      <LocationPreview />
    </main>
  );
}
