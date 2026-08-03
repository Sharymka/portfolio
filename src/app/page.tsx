import { SiteNav } from '@/widgets/site-nav';
import { Hero } from '@/widgets/hero';
import { AboutValue } from '@/widgets/about-value';
import { Skills } from '@/widgets/skills';
import { Think } from '@/widgets/think';
import { Documents } from '@/widgets/documents';
import { Contact } from '@/widgets/contact';
import { SiteFooter } from '@/widgets/site-footer';

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <AboutValue />
        <Skills />
        {/* Cases section lands here in a follow-up plan (screenshot carousel) */}
        <Think />
        {/* Ask My AI section lands here in a follow-up plan (chat) */}
        <Documents />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
