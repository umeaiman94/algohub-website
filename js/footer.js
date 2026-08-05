/* ===================================================================
   ALGO HUB — Shared footer (injected into <footer id="site-footer">)
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('site-footer');
  if (!target) return;

  target.innerHTML = `
    <div class="border-t border-[--border-light] bg-[--bg-secondary]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div class="lg:col-span-2">
            <a href="index.html" class="logo-text flex items-center gap-0.5">
              <span class="logo-algo">Algo</span><span class="logo-hub">Hub</span>
            </a>
            <p class="text-sm text-[--grey-1] mt-4 max-w-xs leading-relaxed">
              Stay ahead with the latest technology trends, AI innovations, startup insights, and exclusive course updates.
            </p>
            
            <div class="flex items-center gap-3 mt-6">
              <a href="#" aria-label="LinkedIn" class="social-icon"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
              <a href="#" aria-label="Twitter / X" class="social-icon"><i data-lucide="twitter" class="w-4 h-4"></i></a>
              <a href="#" aria-label="Instagram" class="social-icon"><i data-lucide="instagram" class="w-4 h-4"></i></a>
              <a href="#" aria-label="YouTube" class="social-icon"><i data-lucide="youtube" class="w-4 h-4"></i></a>
            </div>
          </div>

          <div>
            <h4 class="font-display font-semibold text-sm mb-4">Quick Links</h4>
            <ul class="space-y-2.5 text-sm text-[--grey-1]">
              <li><a href="index.html" class="hover:text-[--grad-1] transition-colors">Home</a></li>
              <li><a href="about.html" class="hover:text-[--grad-1] transition-colors">About Us</a></li>
              <li><a href="services.html" class="hover:text-[--grad-1] transition-colors">Services</a></li>
              <li><a href="courses.html" class="hover:text-[--grad-1] transition-colors">Courses</a></li>
              <li><a href="projects.html" class="hover:text-[--grad-1] transition-colors">Projects</a></li>
              <li><a href="#" class="hover:text-[--grad-1] transition-colors">Blog</a></li>
              <li><a href="#" class="hover:text-[--grad-1] transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-display font-semibold text-sm mb-4">Services</h4>
            <ul class="space-y-2.5 text-sm text-[--grey-1]">
              <li><a href="services.html" class="hover:text-[--grad-1] transition-colors">SaaS Development</a></li>
              <li><a href="services.html" class="hover:text-[--grad-1] transition-colors">AI Solutions</a></li>
              <li><a href="services.html" class="hover:text-[--grad-1] transition-colors">Machine Learning</a></li>
              <li><a href="services.html" class="hover:text-[--grad-1] transition-colors">Web Development</a></li>
              <li><a href="services.html" class="hover:text-[--grad-1] transition-colors">Mobile Apps</a></li>
              <li><a href="services.html" class="hover:text-[--grad-1] transition-colors">Startup Consultancy</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-display font-semibold text-sm mb-4">Contact</h4>
            <ul class="space-y-3 text-sm text-[--grey-1]">
              <li class="flex items-start gap-2.5"><i data-lucide="map-pin" class="w-4 h-4 mt-0.5 shrink-0"></i>Pakistan</li>
              <li class="flex items-start gap-2.5"><i data-lucide="mail" class="w-4 h-4 mt-0.5 shrink-0"></i>info@algohub.pk</li>
              <li class="flex items-start gap-2.5"><i data-lucide="phone" class="w-4 h-4 mt-0.5 shrink-0"></i>+92 XXX XXXXXXX</li>
              <li class="flex items-start gap-2.5"><i data-lucide="clock" class="w-4 h-4 mt-0.5 shrink-0"></i>Mon – Sat, 9AM – 6PM</li>
            </ul>
          </div>
        </div>

        <div class="divider-fade mt-12 mb-6"></div>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[--grey-1]">
          <p>&copy; 2026 Algo Hub. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-[--grad-1] transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-[--grad-1] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
});