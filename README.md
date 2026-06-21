# kardol.us

My personal site. Playful single-page static site reusing the Citi Bike tracker
design system (Space Grotesk / DM Sans / JetBrains Mono, green accent, light/dark).

- `site/` — the whole site: `index.html`, `style.css`, `favicon.svg`, `img/` (photos).
- `Dockerfile` — nginx:alpine serving `site/`.
- `deploy/k8s/kardol.yaml` — Deployment + Service + Ingress (apex `kardol.us` + `www`→apex 301).

Self-hosted on the forge k8s cluster, public via the platform Cloudflare tunnel.

## Deploy
```
docker build -t kardol-web:vN .
docker save kardol-web:vN | sudo ctr -a /run/k8s-containerd/containerd.sock -n k8s.io images import -
kubectl --context forge -n kardol set image deployment/kardol-web kardol-web=docker.io/library/kardol-web:vN
```
