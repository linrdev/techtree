# Runtime and deployment requirements

| Use                     | Requirements                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------- |
| View the site           | A current browser with JavaScript enabled; responsive desktop/tablet/phone layouts     |
| Local development/build | Node.js 22.12+ and npm on Windows, macOS or Linux                                      |
| Static hosting          | Serve `dist/client/`, HTTPS, navigation fallback for `/contact/`                       |
| Sites                   | Use the included build output, Worker and hosting metadata; no reinitialization needed |
| Database/backend        | None                                                                                   |
| Contact                 | Public email address and/or Telegram HTTPS link in `site-config.json`                  |
| Extension download      | A genuine published listing URL for each browser edition                               |

## Static host example

Nginx configuration after copying `dist/client/` to the chosen document root:

```nginx
server {
    listen 80;
    server_name your-domain.example;
    root /var/www/techtree;
    index index.html;

    location /assets/ { try_files $uri =404; }
    location /downloads/ { try_files $uri =404; }
    location = /site-config.json {
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
    location / { try_files $uri $uri/ /index.html; }
}
```

Add HTTPS through your hosting provider or reverse proxy. Replace the example hostname and filesystem path for your deployment.

## Before launch

1. Set the public email/Telegram links, or point `contactPath` to your existing `/contact/` page.
2. Replace each blank store URL with the published TechTree listing.
3. Validate extension capabilities in each browser before changing the page's coming-soon wording.
4. Test navigation fallback by visiting `/contact/` directly.
5. Build and serve the production output, rather than exposing the development server.

## Official marketplace sources

- Firefox: https://addons.mozilla.org/en-US/firefox/
- Chrome: https://chromewebstore.google.com/
- Opera: https://addons.opera.com/en/extensions/
- Edge: https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions
- Safari distribution: https://developer.apple.com/safari/extensions/
- Safari store discovery: https://apps.apple.com/us/mac/story/id1377753262

Checked during implementation on 2026-10-11. Marketplace home/discovery links are fallbacks, not TechTree product listings.
