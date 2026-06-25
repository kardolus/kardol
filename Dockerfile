# kardol.us — static personal site served by nginx.
FROM nginx:1.27-alpine
COPY site/ /usr/share/nginx/html
# small tweak: long cache for static assets, no-cache for the HTML entrypoint
RUN printf 'server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location = /index.html { add_header Cache-Control "no-cache"; }\n\
  location ~* \\.(css|svg|js)$ { add_header Cache-Control "no-cache"; }\n\
  location ~* \\.(webp|png|jpg|woff2)$ { add_header Cache-Control "public, max-age=86400"; }\n\
  location / { try_files $uri $uri/ =404; }\n\
}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
