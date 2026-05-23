import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        whoWeAre: resolve(__dirname, 'who-we-are.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        contactUs: resolve(__dirname, 'contact-us.html'),
        startupFundraising: resolve(__dirname, 'startup-fundraising.html'),
        managementConsulting: resolve(__dirname, 'management-consulting.html'),
        sustainabilityConsulting: resolve(__dirname, 'sustainability-consulting.html'),
        businessLending: resolve(__dirname, 'business-lending.html'),
        leadershipAcademy: resolve(__dirname, 'leadership-academy.html'),
        caseStudy: resolve(__dirname, 'case-study.html'),
        blog: resolve(__dirname, 'blog.html'),
        blogAlgorithmicManagement: resolve(__dirname, 'blog-algorithmic-management.html'),
        blogHealthyLiving: resolve(__dirname, 'blog-healthy-living.html'),
        blogInfiniteContent: resolve(__dirname, 'blog-infinite-content.html'),
        blogIntelligenceEq: resolve(__dirname, 'blog-intelligence-eq.html'),
        blogStatutoryEssentials: resolve(__dirname, 'blog-statutory-essentials.html'),
        blogUncommonLeadership: resolve(__dirname, 'blog-uncommon-leadership.html'),
        blogUnicornsInclusive: resolve(__dirname, 'blog-unicorns-inclusive.html'),
      }
    }
  }
});
