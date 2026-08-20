import React, { useEffect } from 'react';
import { MessageSquare, Users, Sparkles, HelpCircle } from 'lucide-react';

interface TalkToUsSectionProps {
  pageUrl?: string;
  pageIdentifier?: string;
}

export const TalkToUsSection: React.FC<TalkToUsSectionProps> = ({
  pageUrl,
  pageIdentifier = 'markets-travel-currency-forum',
}) => {
  useEffect(() => {
    // Current URL fallback
    const canonicalUrl = pageUrl || (typeof window !== 'undefined' ? window.location.href : '');

    // Set Disqus configuration if global window object is available
    (window as any).disqus_config = function (this: any) {
      this.page = this.page || {};
      if (canonicalUrl) {
        this.page.url = canonicalUrl;
      }
      this.page.identifier = pageIdentifier;
    };

    // If DISQUS is already loaded, reset it for the current thread/page
    if (typeof (window as any).DISQUS !== 'undefined') {
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: function (this: any) {
            this.page = this.page || {};
            if (canonicalUrl) {
              this.page.url = canonicalUrl;
            }
            this.page.identifier = pageIdentifier;
          },
        });
      } catch (e) {
        console.error('Error resetting Disqus:', e);
      }
    } else {
      // Load the embed script dynamically as requested
      const d = document;
      const existingScript = d.getElementById('disqus-embed-script');
      if (!existingScript) {
        const s = d.createElement('script');
        s.id = 'disqus-embed-script';
        s.src = 'https://travel-app.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(+new Date()));
        (d.head || d.body).appendChild(s);
      }
    }

    // Ensure count script is loaded as requested
    const existingCountScript = document.getElementById('dsq-count-scr');
    if (!existingCountScript) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//travel-app.disqus.com/count.js';
      countScript.async = true;
      (document.head || document.body).appendChild(countScript);
    }
  }, [pageUrl, pageIdentifier]);

  return (
    <section id="talk-to-us-section" className="mt-12 pt-8 border-t border-[#E5E2DA]">
      <div className="bg-[#F2F0EB] rounded-[32px] border border-[#E5E2DA] p-6 md:p-10 shadow-xs">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E2DA]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#84967F] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Community & Feedback
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif italic text-[#2D332D]">
              Talk to Us & Travel Forum
            </h2>
            <p className="text-xs md:text-sm text-[#5C5852] max-w-2xl leading-relaxed">
              Have questions about currency fluctuations, budget tips, or destination exchange rates? Join the conversation, share your travel stories, and connect with fellow globetrotters.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="bg-white px-4 py-2 rounded-full border border-[#E5E2DA] flex items-center gap-2 shadow-2xs">
              <MessageSquare className="w-4 h-4 text-[#84967F]" />
              <span className="text-xs font-semibold text-[#2D332D]">
                Travel Discussion Forum
              </span>
            </div>
          </div>
        </div>

        {/* Quick Conversation Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          <div className="bg-white/80 rounded-[20px] p-4 border border-[#E5E2DA] space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D332D]">
              <Sparkles className="w-3.5 h-3.5 text-[#D48166]" />
              <span>Currency Arbitrage</span>
            </div>
            <p className="text-[11px] text-[#7A756D] leading-normal">
              Which destination gave you the best purchasing power surprise this year?
            </p>
          </div>

          <div className="bg-white/80 rounded-[20px] p-4 border border-[#E5E2DA] space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D332D]">
              <HelpCircle className="w-3.5 h-3.5 text-[#84967F]" />
              <span>Local Cash vs Cards</span>
            </div>
            <p className="text-[11px] text-[#7A756D] leading-normal">
              Ask about zero-fee ATM cards or cash requirements for your next trip.
            </p>
          </div>

          <div className="bg-white/80 rounded-[20px] p-4 border border-[#E5E2DA] space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D332D]">
              <MessageSquare className="w-3.5 h-3.5 text-[#2D332D]" />
              <span>Feature Suggestions</span>
            </div>
            <p className="text-[11px] text-[#7A756D] leading-normal">
              Tell us which country pairs or financial indicators we should add next!
            </p>
          </div>
        </div>

        {/* Disqus Embed Container */}
        <div className="bg-white rounded-[24px] border border-[#E5E2DA] p-6 md:p-8 min-h-[320px] shadow-2xs">
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="text-[#84967F] underline">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-[#7A756D]">
            Comments are moderated and powered by Disqus community platform.
          </p>
        </div>
      </div>
    </section>
  );
};
