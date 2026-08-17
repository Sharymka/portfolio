import { SiteNav } from '@/widgets/site-nav';
import { Hero } from '@/widgets/hero';
import { AboutValue } from '@/widgets/about-value';
import { Skills } from '@/widgets/skills';
import { Cases } from '@/widgets/cases';
import { Think } from '@/widgets/think';
import { AskAi } from '@/widgets/ask-ai';
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
        <Cases />
        <Think />
        <AskAi />
        <Documents />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
