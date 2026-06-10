import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[#222228] bg-[#0A0A0F] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-y-4 text-sm text-[#71717A]">
        <div>{site.footer.copyright}</div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <a href={`mailto:${site.contact.email}`} className="hover:text-white transition-colors">
            {site.contact.email}
          </a>
          {site.contact.youtube && (
            <a 
              href={site.contact.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          )}
          <span>Seoul, Korea</span>
        </div>
      </div>
    </footer>
  );
}
